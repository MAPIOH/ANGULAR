import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/utils/services/api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  listItems: any[] = [];
  imgLink!: string;
  url!: string;

  constructor(public router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.router.url.includes('maps')
      ? (this.apiGetAll('maps'), (this.url = 'maps'))
      : (this.apiGetAll('icons'), (this.url = 'icons'));
  }

  apiGetAll(url: string) {
    this.apiService.getAll(url).subscribe({
      next: (data: any[]) => {
        data.forEach((item) => {
          this.listItems.push({
            id: item.id,
            name: item.name,
            listFigure: item.listFigure,
          });
        });
      },
    });
  }
}
