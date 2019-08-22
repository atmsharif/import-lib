import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lib-client-search-basic',
  templateUrl: `./client-search-basic.component.html`,
  styles: []
})
export class ClientSearchBasicComponent implements OnInit {
  email: string;

  // Validation for form inputs
  searchForm = new FormGroup({
    'email': new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ])
  });

  constructor() {  
  }

  // Error validation
  checkError(): any {
    var email = this.searchForm.get('email');

    if (email.invalid && (email.dirty || email.touched)) {
        return true;
    }
    else 
        return false;
  }

  getSearchFilter(): string {
    var email = this.searchForm.get('email').value;
    var filter: string = "emails[value eq \"" + email + "\"]";
    return filter;
  }

  resetForm(): void {
    // Sets all fields to null
    this.searchForm.reset();
  }

  ngOnInit(): void {
  }

}
