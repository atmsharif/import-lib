import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientSearchAdvancedComponent } from './client-search-advanced.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { Client } from 'client-model';
import { NgbModule, NgbDate, NgbDatepicker, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

// Test orders
//const mockClients: Client[] = [{ identityId: 13, firstName: 'Hugh', familyName: 'Jass', dob: new Date('01/01/1900'), email: 'hugh_mungus@happy.com'}];


describe('ClientSearchComponent', () => {
  let comp: ClientSearchAdvancedComponent;
  let fixture: ComponentFixture<ClientSearchAdvancedComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
        NgbModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule
      ],
      declarations: [
        ClientSearchAdvancedComponent
      ],
      providers: [DatePipe]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ClientSearchAdvancedComponent); 
      comp = fixture.componentInstance; 
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ClientSearchAdvancedComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // Email validation
  it('email should be invalid - invalid character email input', () => {
    comp.searchForm.controls['email'].setValue('(max*-)@power.com');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // Email validation
  it('email should be invalid - maximum character email input', () => {
    comp.searchForm.controls['email'].setValue('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // Email validation
  it('email should be valid', () => {
    comp.searchForm.controls['email'].setValue('che@cheese.org');
    expect(comp.searchForm.valid).toBeTruthy();
  });

  // First name validation
  it('givenName should be invalid - invalid character givenName input', () => {
    comp.searchForm.controls['givenName'].setValue('Max^Power');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // First name validation
  it('givenName should be invalid - maximum character givenName input', () => {
    comp.searchForm.controls['givenName'].setValue('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // First name validation
  it('givenName should be valid', () => {
    comp.searchForm.controls['givenName'].setValue('Max');
    expect(comp.searchForm.valid).toBeTruthy();
  });

  // Last name validation
  it('familyName should be invalid - invalid character last name input', () => {
    comp.searchForm.controls['familyName'].setValue('^Power^');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // Last name validation
  it('familyName search should be invalid - maximum character last name input', () => {
    comp.searchForm.controls['familyName'].setValue('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // Last name validation
  it('familyName should be valid', () => {
    comp.searchForm.controls['familyName'].setValue('Power');
    expect(comp.searchForm.valid).toBeTruthy();
  });

  // Date of birth validation
  it('dob should be invalid - invalid character dob input', () => {
    comp.searchForm.controls['dob'].setValue('01-01-2000');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // Date of birth validation
  it('dob should be invalid - maximum character dob input', () => {
    comp.searchForm.controls['dob'].setValue('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // Date of birth validation
  it('dob should be valid', () => {
    comp.searchForm.controls['dob'].setValue('01/01/2000');
    expect(comp.searchForm.valid).toBeTruthy();
  });

});
