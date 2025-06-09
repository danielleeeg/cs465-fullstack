import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripData } from '../services/trip-data';

// Declare component as a standalone page
@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip implements OnInit {
  addForm!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripData
  ) { }
  ngOnInit() {
    this.addForm = this.formBuilder.group({
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
  }

  // Method to call at form completion-- triggers POST request
  public onSubmit() {

    // set submitted status to true
    this.submitted = true;

    // if the form is valid...
    if (this.addForm.valid) {

      // send POST request to add form contents
      this.tripService.addTrip(this.addForm.value)
        .subscribe({

          // for all data log it and then navigate back to home
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },

          // if there is an error, log it in the console
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }
  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}
