import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(keyword: string): Observable<any[]> {
    return this.http.get<any>(this.url + keyword + '/all');
  }

  getById(keyword: string, id: number): Observable<any> {
    return this.http.get<any>(this.url + keyword + '/' + id);
  }

  getByName(keyword: string, name: string): Observable<any> {
    return this.http.get<any>(this.url + keyword + '/' + name);
  }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

  create(keyword: string, options: any): Observable<any> {
    return this.http.post<any>(this.url + keyword + '/create/', options);
  }

  createIcon(keyword: string, name: string, idIcon: number,  options: any): Observable<any> {
    return this.http.post<any>(this.url + keyword + '/' + name + '/' + idIcon + '/addIcon/', options);
  }

  update(keyword: string, options: any): Observable<any> {
    return this.http.put<any>(this.url + keyword + '/update', options);
  }

  delete(keyword: string, id: number): Observable<any> {
    return this.http.delete<any>(this.url + keyword + '/delete/' + id);
  }
}
