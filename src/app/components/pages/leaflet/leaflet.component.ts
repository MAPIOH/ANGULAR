import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { Map } from 'src/app/utils/models/map.model';
import { MapIcone } from 'src/app/utils/models/mapicone.model';
import { ApiService } from 'src/app/utils/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss'],
})
export class LeafletComponent implements OnInit {
  bounds = [[0, 0], [1000, 1000]];
  iconUrl: any = 'https://cdn-icons-png.flaticon.com/128/1029/1029183.png';

  icon: any = L.icon({ iconUrl: this.iconUrl, iconSize: [50, 50] });
  popup: any = L.popup({ closeOnClick: false, autoClose: false, closeButton: false });
  tabLeafletMarkers: MapIcone[] = [];
  map!: Map;

  leafletMap!: L.Map;

  constructor(private apiService: ApiService, private router: Router, private activeRoute: ActivatedRoute) { }

  async ngOnInit() {
    let mapName = this.activeRoute.snapshot.paramMap.get('name');
    if (!mapName) {
      await this.router.navigate(['maps']);
      return;
    }

    this.getMap(mapName);

    setTimeout(() => {

      this.leafletMap = L.map('map', {
        crs: L.CRS.Simple, maxBounds: [[0, 0], [800, 800]],
        attributionControl: false,
        maxZoom: 3,
      });

      var image = L.imageOverlay(environment.apiImageUrl + this.map.link, [[0, 0], [800, 800]]).addTo(this.leafletMap);
      this.leafletMap.fitBounds([[0, 0], [800, 800]]);

      this.leafletMap.on('click', <LeafletMouseEvent>(e: any) => {
        this.addIconOnLeafletClick(e.latlng.lat, e.latlng.lng, this.leafletMap);

      });
    }, 200);
  }

  getMap(mapName: string): Promise<void> {
    return new Promise<void>(() => {
      this.apiService.getByName('maps/name', mapName).subscribe({
        next: (data: Map) => {
          this.map = data;

          setTimeout(() => {
            this.map.listMapIcone.forEach(element => {
              this.addIconOnLeafletClick(element.coordX, element.coordY, this.leafletMap);

            });
          }, 300);

          Promise.resolve();
        },
        error: (err) => {
          console.log(err);
          Promise.reject();
        },
      });
    });
  }

  updateMap() {
    //todo iconid est en dur, il faut le recup dans le form du popup quand on ajoute un marker
    this.apiService.createIcon('maps', this.map.name, 1, this.tabLeafletMarkers).subscribe({});
  }

  addIconOnLeafletClick(lat: number, lng: number, map: any) {
    this.tabLeafletMarkers.push({ coordX: lat, coordY: lng, listTags: [], icone_id: 1 });
    var marker = L.marker([lat, lng], { icon: this.icon }).addTo(map);
    this.popup.setLatLng([lat, lng]);
    this.popup.setContent('<div>' + lat + '</div><div>' + lng + '</div>');
    marker.bindPopup(this.popup);
    marker.on('contextmenu', () => {
      marker.remove();
      this.tabLeafletMarkers = this.tabLeafletMarkers.filter(element => element.coordX !== lat && element.coordY !== lng);
    });
  }

  getCoordinateLeafletOnClick() {
    console.log('getCoordinateLeafletOnClick');
  }
}
