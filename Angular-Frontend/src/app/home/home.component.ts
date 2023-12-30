// home.component.ts

import { Component } from '@angular/core';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #cityInput />
        <input type="text" placeholder="Filter by state" #stateInput />
        <button class="primary" type="button" (click)="filterResults(cityInput.value, stateInput.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor(private housingService: HousingService) {
    // Fetch all housing locations initially
    this.housingService.getAllHousingLocations().then(
      (allLocations: HousingLocation[] | undefined) => {
        if (allLocations) {
          this.housingLocationList = allLocations;
          this.filteredLocationList = allLocations;
        }
      }
    );
  }

  filterResults(city: string, state: string) {
    if (!city || !state) {
      // If either city or state is not provided, show all locations
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    // Filter locations based on the provided city and state
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(city.toLowerCase()) &&
        housingLocation?.state.toLowerCase().includes(state.toLowerCase())
    );
  }
}
