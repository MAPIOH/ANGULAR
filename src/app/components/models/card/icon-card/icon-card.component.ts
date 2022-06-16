import { Component, Input, OnInit } from '@angular/core';
import { Icon } from 'src/app/utils/models/icon.model';
import { ApiService } from 'src/app/utils/services/api.service';

@Component({
  selector: 'app-icon-card',
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss']
})
export class IconCardComponent implements OnInit {
  @Input() icon!: Icon;
  loaded : boolean = false;
  url !: string;

  editable: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getIcon();
  }

  getIcon(){
    this.apiService.getById('icons', this.icon.id).subscribe({
      next: (data) => {
        this.icon = data;
        this.loaded = true;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  apiUpdate() {
    var text = document.getElementById('iconName')?.textContent;

    this.apiService
      .update('icons', {
        id: this.icon.id,
        link: this.icon.link,
        name: text,
      })
      .subscribe({
        next: () => {
          this.getIcon();
        },
      });
  }

  apiDelete(url: string, id: number) {
    url = "icons";
    this.apiService.delete(url, id).subscribe({
      next: () => {
        location.reload();
      },
    });
  }
}
