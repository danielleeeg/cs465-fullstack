import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData]
})
export class TripListing implements OnInit {
  trips!: Trip[];
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router
  ) {

    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Method for getting trip data
  private getStuff(): void {

    // call getTrips GET request to return all trips
    this.tripData.getTrips()
      .subscribe({

        next: (value: any) => {
          this.trips = value;


          // if there are more than zero trips, update message
          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' tripsavailable.';
          }

          // if no trips are available, update message
          else {
            this.message = 'There were no trips retireved from the database';
          }

          // log message
          console.log(this.message);
        },

        // send any errors to the console
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }



  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
