import { Injectable } from '@angular/core';
import {HousingLocation} from "./housinglocation";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  readonly rooturl;
  constructor(private http: HttpClient) {
    this.rooturl='http://localhost:3000/api/houseListing'
  }

  getAllHousingLocations(): Promise<HousingLocation[] | undefined> {
    return this.http.get<HousingLocation[]>(`${this.rooturl}`).toPromise();
  }

  getFilteredHousingLocations(city: string, state: string): Observable<HousingLocation[]> {
    const params = new HttpParams()
      .set('city', city)
      .set('state', state);

    return this.http.get<HousingLocation[]>(`${this.rooturl}/houseListingsByLocation`, { params });
  }

  getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    return this.http.get<HousingLocation>(`${this.rooturl}/${id}`).toPromise();
  }

  submitApplication(firstName: string, lastName: string, email: string, id: number): Observable<any> {
    const formData = { firstName, lastName, email, id };
    return this.http.post<any>(`${this.rooturl}/submitApplication`, formData);
  }


}
