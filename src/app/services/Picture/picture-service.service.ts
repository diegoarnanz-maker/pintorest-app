import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureServiceService {

  private baseUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  pictureSubject = new BehaviorSubject<any>({
    pictures: [],
    loading: false,
    newPicture: null
  });

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
  }

  getPictures(): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get(`${this.baseUrl}api/pictures`, { headers: headers })
      .pipe(
        tap((pictures) => {
          const currentState = this.pictureSubject.value;
          this.pictureSubject.next({ ...currentState, pictures });
        })
      );
  }

  createPicture(picture: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .post(`${this.baseUrl}api/picture`, picture, { headers: headers })
      .pipe(
        tap((newPicture) => {
          const currentState = this.pictureSubject.value;
          this.pictureSubject.next({
            ...currentState, pictures:
              [newPicture, ...currentState.pictures]
          });
        })
      );
  }

  updatePicture(picture: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}api/picture/${picture.id}`, picture, { headers: headers })
      .pipe(
        tap((updatedPicture: any) => {
          const currentState = this.pictureSubject.value;
          const updatedPictures = currentState.pictures.map((item: any) => {
            if (item.id === updatedPicture.id) {
              return updatedPicture;
            }
            return item;
          })
          this.pictureSubject.next({
            ...currentState, pictures: updatedPictures
          });
        })
      );
  }

  deletePicture(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.baseUrl}api/pictures/${id}`, { headers: headers, responseType: 'text' }) // Cambia a 'text'
      .pipe(
        tap((deletedPicture: any) => {
          const currentState = this.pictureSubject.value;
          const updatedPictures = currentState.pictures.filter((item: any) => item.id !== id);
          this.pictureSubject.next({
            ...currentState, pictures: updatedPictures
          });
        })
      );
}

  likePicture(id:any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}api/picture/${id}/like`, { headers: headers })
      .pipe(
        tap((updatedPicture:any) => {
          const currentState = this.pictureSubject.value;
          const updatedPictures = currentState.pictures.map((item:any) => {
            if (item.id === updatedPicture.id) {
              return updatedPicture;
            }
            return item;
          })
          this.pictureSubject.next({
            ...currentState, pictures: updatedPictures
          });
        })
      );
  }

}
