import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip'

// declare component
@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})


// create Edit Trip class as component
export class EditTrip implements OnInit {

  //Reactive form instance
  public editForm!: FormGroup;

  // holds the trup data object
  trip!: Trip;

  // tracks for if the form has been submitted
  submitted = false;

  // user message for console troubleshooting
  message: string = '';

  // constructor
  constructor(

    // for building a reactive form
    private formBuilder: FormBuilder,

    // for navigation between routes
    private router: Router,

    // for fetch/update data service
    private tripData: TripData
  ) { }

  // run once conponent is intiealized
  ngOnInit(): void {
    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem("tripCode");

    // if no trip code exists
    if (!tripCode) {

      // send alert that no tripcode found
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }


    // logging elements for troubleshooting
    // console.log('EditTripComponent::ngOnInit');
    // console.log('tripcode:' + tripCode);


    // Reactive form with controls and validation
    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      title: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })


    // Fetch the trip from the parameterized trip code
    this.tripData.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {

          // get the first trip from the returned array
          this.trip = value[0];

          // Convert the ISO string to yyyy-MM-dd
          if (this.trip.start) {
            const date = new Date(this.trip.start);
            // Format it to yyyy-MM-dd
            const formattedDate = date.toISOString().split('T')[0];
            this.trip.start = formattedDate;
          }

          // Populate our record into the form
          this.editForm.patchValue(this.trip);

          // If there is no value, update message
          if (!value) {
            this.message = 'No Trip Retrieved!';
          }

          // If there is a trip found, include trip code in message
          else {
            this.message = 'Trip: ' + tripCode + ' retrieved';
          }

          // log the formatted message
          console.log(this.message);
        },

        // log any errors found
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  // Method for executing on submission of form
  public onSubmit() {

    // updated submitted status
    this.submitted = true;

    // if the form is valid...
    if (this.editForm.valid) {

      // run the updateTrip method using the form data
      this.tripData.updateTrip(this.editForm.value)
        .subscribe({

          // for all values sog sucess
          next: (value: any) => {
            console.log(value);
            // navigate away from page
            this.router.navigate(['']);
          },

          // display errors
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
    }
  }

  // Method for deleting trips
  public deleteTrip() {

    // request confirmation for deletion
    const confirmDelete = confirm(`Are you sure you want to delete trip "${this.trip.title}"?`);


    // continue to delete if confirmed and if trip code valid
    if (confirmDelete && this.trip.code) {

      // delete trup
      this.tripData.deleteTrip(this.trip.code)
        .subscribe({
          next: () => {

            // remove trip code from local storage
            localStorage.removeItem('tripCode');

            // Navigate back to home or list
            this.router.navigate(['']);
          },

          // if there is an error, send alert to user and console
          error: (error: any) => {
            console.error('Delete failed:', error);
            alert('An error occurred while deleting the trip.');
          }
        });
    }
  }


  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
}
