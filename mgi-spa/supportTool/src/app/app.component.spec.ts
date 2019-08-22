import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { ClientModule } from 'client'; 
import {ClientSearchComponent} from './client-search/client-search.component'
import { ClientSearchMockService } from 'client-mock';
import { ImsService } from 'client-model';

describe('AppComponent', () => {
    let app: AppComponent;
    let searchcomp: ComponentFixture<ClientSearchComponent>;
    let searchCompInst: ClientSearchComponent;
    let fixture: ComponentFixture<AppComponent>; 

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                ClientModule
            ],
            declarations: [
                AppComponent 
            ],
            providers: [
                { provide: ImsService, useClass: ClientSearchMockService }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            app = fixture.componentInstance; //AppComponent test instance
            searchcomp = TestBed.createComponent(ClientSearchComponent);
            searchCompInst = searchcomp.debugElement.componentInstance; 
        });;
    }));

    it('should create the app', () => {
        //  app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }); 

    it(`should have as title 'MyGovId Support Tool'`, () => {
        // app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('MyGovId Support Tool');
    });

    it('should create the search component', () => {
        //  app = fixture.debugElement.componentInstance;
        expect(searchCompInst).toBeTruthy();
    });

    it('should open with simple search by default', () => {
        fixture.detectChanges(); 
        const el = fixture.debugElement.nativeElement.querySelector('#basicSearch')
        expect(el).toBeDefined();
    });

    it('should open advance search when "Show advanced search" hyperlink clicked', () => {
        fixture.detectChanges();
        searchcomp.detectChanges();
        const el = searchcomp.debugElement.nativeElement.querySelector('.hyperlink-button');
        el.click();
        const el2 = fixture.debugElement.nativeElement.querySelector('#advancedSearch')
        expect(el2).toBeDefined(); 
    }); 

});
