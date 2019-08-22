import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';
import { ClientModule } from '../client.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ClientSearchService } from './client-search.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ClientSearchService', () => {
    let injector: TestBed;
    let service: ClientSearchService;
    let httpMock: HttpTestingController;
     

   beforeEach(async(() => {
     TestBed.configureTestingModule({
       imports: [
           RouterTestingModule,
           HttpClientTestingModule 
       ],
       
         providers: [
             ErrorMessageComponent, DatePipe, HttpClient, ClientSearchService
         ]
       })

       injector = getTestBed();
       service = injector.get(ClientSearchService);
       httpMock = injector.get(HttpTestingController);
   }));

    it('should create the ClientSearchService', () => { 
        expect(service).toBeTruthy();
   });

    
});

 



// ###################   NOTE  : the search functions are tested in the 
//client-search-advanced.spec.ts, 
//client-search-basic.spec.ts,
//client-details.component.spec.ts 
//files