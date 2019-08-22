import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment_ from 'moment';
const moment = moment_;
//import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-client-search-advanced',
  templateUrl: `./client-search-advanced.component.html`,
  styles: []
})
export class ClientSearchAdvancedComponent implements OnInit {
  email: string;
  givenName: string;
  familyName: string;
  dob: string;

  // Validation for form inputs
  searchForm = new FormGroup({
    'email': new FormControl('', [
      Validators.maxLength(255),
      Validators.pattern("^[a-zA-Z0-9@._\(\)\-]*$")
    ]),
    'givenName': new FormControl('', [
      Validators.maxLength(255),
      Validators.pattern("^[a-zA-Z0-9@._\(\)\-]*$")
    ]),
    'familyName': new FormControl('', [
      Validators.maxLength(255),
      Validators.pattern("^[a-zA-Z0-9@._\(\)\-]*$")
    ]),
    'dob': new FormControl(null, [
      Validators.maxLength(255),
      this.validateDate,
      this.validateFutureDate
    ])
  });

    constructor() {   //private datePipe: DatePipe, config: NgbDatepickerConfig
    // Earliest date to be shown on datepicker
   // config.minDate = {year: 1800, month: 1, day: 1};
  }

  // Email validation
  checkEmailError(): boolean {
    var email = this.searchForm.get('email');

    if (email.invalid && (email.dirty || email.touched)) 
    {
        return true;
    }
    else 
        return false;
  }

  // Given name validation
  checkGivenNameError(): boolean {
    var givenName = this.searchForm.get('givenName');

    if (givenName.invalid && (givenName.dirty || givenName.touched))
    {
        return true;
    }
    else 
        return false;
  }

  // Family name validation
  checkFamilyNameError(): boolean {
    var familyName = this.searchForm.get('familyName');

    if (familyName.invalid && (familyName.dirty || familyName.touched)) 
    {
        return true;
    }
    else 
        return false;
  }

  // Date of birth validation
  checkDobError(): boolean {
    var dob = this.searchForm.get('dob');
    if (!dob.valid && dob.dirty)
    {
        return true;
    }
    else 
        return false;
  }

   

  // Checks if valid date of birth
  validateDate(control: AbstractControl) {
    // regEx for dd/mm/yyyy format
    var re = new RegExp("^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$");
    var dobInput = moment(control.value, "DD/MM/YYYY");
    var min = moment().subtract(120, 'years')
      if (((re.test(control.value) && dobInput.isValid()) && dobInput.isAfter(min)) || 
        control.value === "" || 
        control.value === null) {
      // No error
      return null;
    }
    else {
      // Error
      return { validDate: true };
    }

  }

  // Checks if date of birth entered is a future date
  validateFutureDate(control: AbstractControl) {
    var dobInput = moment(control.value, "DD/MM/YYYY");
    var yesterday = moment().subtract(1, 'days')

    // Error if user selects today's date
    if (dobInput.isAfter(yesterday)) {
      // Error
      return { futureDate: true };
    }
    // No error
    return null;
  }

  getSearchFilter(): string {
    var email = this.searchForm.get('email').value;
    var givenName = this.searchForm.get('givenName').value;
    var familyName = this.searchForm.get('familyName').value;
    var dob = this.searchForm.get('dob').value;

    var filterEmail: string  = "";
    var filterGivenName: string  = "";
    var filterFamilyName: string  = "";
    var filterDob: string  = "";

    if (!(email === "" || email === null)) {
      filterEmail = "emails[value co \""+ email +"\"]";
    }

    if (!(givenName === "" || givenName === null)) {
      filterGivenName = "name[givenName co \"" + givenName +"\"]";
    }

    if (!(familyName === "" || familyName === null)) {
      filterFamilyName = "name[familyName co \"" + familyName + "\"]";
    }

    if (!(dob === "" || dob === null)) {
        var newDob = moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD");
        filterDob = "urn:ausid:gov:au:schemas:core:1.0:Identity:dateOfBirth co \"" + newDob +"\"";
        
       // filterDob = "urn:ausid:gov:au:schemas:core:1.0:Identity:dateOfBirth co \"" + dob + "\"";
    }

    // Appends "and" to any valid input
    // Same as .filter(x => x), discards nulls, undefined, empty strings
    var filter: string = [filterEmail, filterGivenName, filterFamilyName, filterDob].filter(Boolean).join(" and ");

    return filter;
  }

  resetForm(): void {
    // Sets all fields to null
    this.searchForm.reset();
  }

  ngOnInit(): void {
  }
}
