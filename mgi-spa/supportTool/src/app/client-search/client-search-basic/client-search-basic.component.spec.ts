import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientSearchBasicComponent } from './client-search-basic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { Client } from 'client-model';


describe('ClientSearchBasicComponent', () => {
  let comp: ClientSearchBasicComponent;
  let fixture: ComponentFixture<ClientSearchBasicComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [       
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule
      ],
      declarations: [
        ClientSearchBasicComponent
      ],
      providers: [DatePipe]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ClientSearchBasicComponent);

      comp = fixture.componentInstance;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ClientSearchBasicComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // Validation
  it('client search should be invalid - empty email input', () => {
    comp.searchForm.controls['email'].setValue('');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // Validation
  it('client search should be invalid - invalid character email input', () => {
    comp.searchForm.controls['email'].setValue('(hugh)@mungus.com');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // Validation
  it('client search should be invalid - maximum character email input', () => {
    comp.searchForm.controls['email'].setValue('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
    expect(comp.searchForm.valid).toBeFalsy();
  });

  // Validation
  it('client search should be valid', () => {
    comp.searchForm.controls['email'].setValue('che@cheese.org');
    expect(comp.searchForm.valid).toBeTruthy();
  });

});
