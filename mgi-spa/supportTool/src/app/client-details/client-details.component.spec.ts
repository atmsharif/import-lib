import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImsService } from 'client-model';
import { ClientDetailsComponent } from './client-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 
import { ClientModule } from '../client.module';
import { ClientSearchMockService } from 'projects/client-mock/src/public_api';
  
 describe('ClientDetailsComponent', () => {
   let component: ClientDetailsComponent;
   let fixture: ComponentFixture<ClientDetailsComponent>;

   beforeEach(async(() => {
     TestBed.configureTestingModule({
        // declarations: [ClientDetailsComponent],
         imports: [BrowserModule, ReactiveFormsModule, FormsModule, ClientModule],
         providers: [
             { provide: ImsService, useClass: ClientSearchMockService }
         ]
     })
     .compileComponents();
   }));

   beforeEach(() => {
       fixture = TestBed.createComponent(ClientDetailsComponent);
       
       component = fixture.componentInstance;
        
     fixture.detectChanges();
   });

   it('should create', () => {
     expect(component).toBeTruthy();
   }); 

     it('should get a valid client when passed a valid id, and popup values should be reset', () => {
         component.launchClientDetails(1);
         expect(component.clientDetails.givenName == "Vincent").toBeTruthy() &&
             expect(component.selectedStatus == null).toBeTruthy() &&
             expect(component.selectedReason == "unchosen").toBeTruthy();
     });

 });

 