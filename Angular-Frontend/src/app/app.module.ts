import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { HousingLocationComponent } from './housing-location/housing-location.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    HousingLocationComponent,
    // Add other components
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'your-app-id' }),
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'details/:id', component: DetailsComponent },
      // Add other routes
    ]),
    HttpClientModule,
    ReactiveFormsModule,
    // Add other modules
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

