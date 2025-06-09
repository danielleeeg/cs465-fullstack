import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard implements OnInit {
  @Input('trip') trip: any;
  constructor(private router: Router) { }
  ngOnInit(): void {

  }

  // Method for editing a trip
  public editTrip(trip: Trip) {

    // remove trip code from local storage
    localStorage.removeItem('tripCode');

    // update the trip code parameter to the contents from input
    localStorage.setItem('tripCode', trip.code);

    // route to the edit trip form
    this.router.navigate(['edit-trip'])
  }

}
