import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Map } from 'src/app/utils/models/map.model';
import { ApiService } from 'src/app/utils/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss'],
})
export class MapCardComponent implements OnInit {
  @Input() map!: Map;
  apiUrl = environment.apiUrl + 'maps/delete';
  imageUrl = environment.apiImageUrl;
  loaded: boolean = false;
  url!: string;

  constructor(private apiService: ApiService) {}

  editable: boolean = true;

  ngOnInit(): void {
    this.getMap();
  }

  getMap() {
    this.apiService.getById('maps', this.map.id).subscribe({
      next: (data) => {
        this.map = data;
        this.loaded = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  downloadFile(): void {
    this.apiService
      .download(this.imageUrl + this.map.link)
      .subscribe((blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = this.map.name;
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }

  printFile() {
    var win = window.open('');
    var img = win?.document.createElement('img');
    img!.src = environment.apiImageUrl + this.map.link;
    win?.document.body.appendChild(img!);
    img!.onload = function () {
      setTimeout(function () {
        win?.print();
      }, 500);
      win!.onfocus = function () {
        setTimeout(function () {
          win!.close();
        }, 500);
      };
    };
  }

  apiUpdate() {
    var text = document.getElementById('mapName')?.textContent;

    this.apiService
      .update('maps', {
        id: this.map.id,
        name: text,
        link: this.map.link,
      })
      .subscribe({
        next: () => {
          this.getMap();
        },
      });
  }

  apiDelete(url: string, id: number) {
    url = 'maps';
    this.apiService.delete(url, id).subscribe({
      next: () => {
        location.reload();
      },
    });
  }
}
