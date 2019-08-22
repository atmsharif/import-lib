import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientGridResultsComponent } from './client-grid-results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { Client } from 'client-model';


describe('ClientDetailsComponent', () => {
  let comp: ClientGridResultsComponent;
  let fixture: ComponentFixture<ClientGridResultsComponent>;
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
        ClientGridResultsComponent
      ],
      providers: [DatePipe]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ClientGridResultsComponent);

      comp = fixture.componentInstance;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(ClientGridResultsComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

//   it('should have expected column headers', () => {
//     const mockClients: Client[] = [{ identityId: 13, givenName: 'Hugh', familyName: 'Jass', dob: new Date('01/01/1900'), email: 'hugh_mungus@happy.com'}];
//     comp.gridOptions.rowData = mockClients
//     comp.clients = mockClients;

//     //comp.clientSearchService.search();
//     fixture.detectChanges();

//     let input = fixture.debugElement.query(By.css('input'));
//     let el = input.nativeElement;

//     //expect(el.value).toBe('peeskillet');

//     el.value = 'hugh_mungus@happy.com';
//     el.dispatchEvent(new Event('input'));
//     const elm = fixture.nativeElement;

//     let button = fixture.debugElement.nativeElement.querySelector('button');
//     button.click();

//     const grid = elm.querySelector('ag-grid-angular');
//     const headerCells = grid.querySelectorAll('.ag-header-cell-text');
//     const headerTitles = Array.from(headerCells).map((cell: any) =>
//         cell.textContent.trim()
//     );
//     expect(headerTitles).toEqual(['ID', 'Quantity']);
// });

});
