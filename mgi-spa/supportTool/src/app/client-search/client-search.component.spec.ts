import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientSearchComponent } from './client-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '../../../../../node_modules/@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { Client, ImsService } from 'client-model';
import { ClientModule } from '../client.module';
import { ClientSearchMockService } from 'projects/client-mock/src/public_api';

describe('ClientSearchComponent', () => {
  let comp: ClientSearchComponent;
  let fixture: ComponentFixture<ClientSearchComponent>;
 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        FormsModule,
        ReactiveFormsModule,
          AgGridModule,
          ClientModule
      ], 
      declarations: [ ], 
        providers: [
            DatePipe,{ provide: ImsService, useClass: ClientSearchMockService }
        ]
      
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ClientSearchComponent);

      comp = fixture.componentInstance;
 
    });
  }));

    it('should create the ClientSearchComponent', () => {
     const fixture = TestBed.createComponent(ClientSearchComponent);
     const app = fixture.debugElement.componentInstance;
     expect(app).toBeTruthy();
   });

});
