import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Icon } from 'src/app/utils/models/icon.model';
import { ApiService } from 'src/app/utils/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  url!: string;
  uploadForm!: FormGroup;
  urlImages = environment.apiImageUrl;
  apiUrl = environment.apiUrl + "maps/create";
  loaded: boolean = false;
  icon!: Icon;
  formText!: string;
  regexImage =
    'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+';

  name = new FormControl({ value: '', disabled: true }, [Validators.required]); //Récupère les données du formulaire
  link = new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(this.regexImage)]);
  file = new FormControl({ value: '', disabled: true }, [Validators.required]);

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private activeRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.url = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);

    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

    setTimeout(() => {

      if (this.url === 'map') {
        this.formText = 'Nom de la map';
        this.name.enable();
        this.file.enable();
      }
      else if (this.router.url.includes('edit')) {
        this.getIcon();
        this.link.enable();
      }
      else {
        this.formText = "Nom de l'icone";
        this.name.enable();
        this.link.enable();
      }
    }, 100);
  }

  createMap() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile')?.value);
    formData.append('name', this.name.value);
    formData.append('link', this.uploadForm.get('profile')?.value.name);

    this.http.post<any>(this.apiUrl, formData).subscribe({
      next: (data) => {
        this.router.navigate(['maps']);
      },
      error: (err: HttpErrorResponse) => { }
    });
  }

  getIcon() {
    this.apiService.getByName('icons/name', this.url).subscribe({
      next: (data) => {
        this.icon = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  createIcon(name: string, imglink: string) {
    this.apiService
      .create('icons', {
        id: 0,
        name: name,
        link: imglink,
      })
      .subscribe({
        next: (data) => {
          this.router.navigate(['icons']);
        },
        error: (err: HttpErrorResponse) => { },
      });
  }

  updateIcon() {
    this.apiService
      .update('icons', {
        id: this.icon.id,
        name: this.icon.name,
        link: this.link.value,
      })
      .subscribe({
        next: () => {
          this.getIcon();
          this.router.navigate(['icons']);
        },
      });
  }

  async createElement() {
    this.loaded = true;
    await this.delay(3000);
    if (this.url.includes('map')) {
      this.createMap();
    }
    else if (this.router.url.includes('edit')) {
      this.updateIcon();
    }
    else {
      this.createIcon(this.name.value, this.link.value);
    }
    this.loaded = false;
  }

  backEntry() {
    if (this.url.includes('maps')) {
      this.router.navigate(['maps']);
    } else {
      this.router.navigate(['icons']);
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  upload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile')?.setValue(file);
    }
  }
}
