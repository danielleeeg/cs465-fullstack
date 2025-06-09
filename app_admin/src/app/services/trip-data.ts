import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripData {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/api/trips';


  /** Call the Express GET /trips endpoint */
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  /** Call the Express POST/trips endpoint */
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  /** Call the Express GET /trips/:tripCode endpoint */
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode)
  }

  /** Call the Express PUT /trips/:tripCode endpoint */
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  /** Call the Express DELETE /trips/:tripCode endpoint */
  deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + tripCode);
  }


}
