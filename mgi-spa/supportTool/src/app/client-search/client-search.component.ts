import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientSearchBasicComponent } from './client-search-basic/client-search-basic.component';
import { ClientSearchAdvancedComponent } from './client-search-advanced/client-search-advanced.component';
import { Client, PagingControl, ImsService, SystemError, ClientResponse } from 'client-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ClientGridResultsComponent } from '../client-grid-results/client-grid-results.component';
import { PaginationComponent } from './pagination/pagination.component';
import { Observable } from 'rxjs';
import { ClientDetailsComponent } from '../client-details/client-details.component';
 

@Component({
    selector: 'lib-client-search',
    templateUrl: `./client-search.component.html`,
    styles: []
})
export class ClientSearchComponent implements OnInit {
    email: any;
    givenName: any;
    familyName: any;
    dob: any;
    
    public showClientDetails: boolean ;
    public clientSearchService: ImsService;
    public filter: string;
    public pagingControl: PagingControl;
    public override: boolean = false;

    // control the loading bar within the grid
    public isLoading: boolean;
    public displayResult: boolean = false;
    clients: Client[];
    public totalPages: number;
    public pageSize: number = 10;

    // component must be declared as a child in order to pass on client id and launch modal
    @ViewChild(ClientGridResultsComponent) public clientGridResultsComponent;
    @ViewChild(ClientSearchBasicComponent) private clientSearchBasicComponent;
    @ViewChild(ClientSearchAdvancedComponent) private clientSearchAdvancedComponent;
    @ViewChild(PaginationComponent) public paginationComponent;
    @ViewChild(ClientDetailsComponent) private clientDetailsComponent;

    // data from the response
    totalResults: number;
    public loading: boolean;
    public showError: boolean;
    public systemError: SystemError;
    public advancedSearchText: string;
    public showAdvancedSearch: boolean;

    constructor(clientSearchService: ImsService) { //, private datePipe: DatePipe
        this.clientSearchService = clientSearchService;
        this.loading = false;
        this.showError = false;
        this.advancedSearchText = 'Show advanced search';
        this.showAdvancedSearch = false;
    }

    ngOnInit(): void {
        this.showClientDetails = false; //default view on page load
    }

    // When "search" button has been clicked
    search(): void {
        this.loading = true;
        this.showError = false;

        if (this.showAdvancedSearch) {
            // Advanced search
            var searchForm = this.clientSearchAdvancedComponent.searchForm;
            var clientSearch = this.clientSearchAdvancedComponent;

            if ((searchForm.value.email === "" || searchForm.value.email === null) &&
                (searchForm.value.givenName === "" || searchForm.value.givenName === null) &&
                (searchForm.value.familyName === "" || searchForm.value.familyName === null) &&
                (searchForm.value.dob === "" || searchForm.value.dob === null)) {
                this.loading = false;
                return;
            }
        }
        else {
            // Basic search
            var searchForm = this.clientSearchBasicComponent.searchForm;
            var clientSearch = this.clientSearchBasicComponent;
        }

        if (searchForm.valid) {
            this.filter = clientSearch.getSearchFilter();
            // new search always starts at page 1
            this.pagingControl = new PagingControl(1, this.pageSize);
            // make the first request 
            this.newSearchRequest(this.pagingControl, this.override); 
            this.override = false;
        }
        else {
            // Validate all form fields
            this.loading = false;
            this.validateAllFormFields(searchForm);
        }
    }

    // Used by initial search, dropdown, pagination
    newSearchRequest(pagingControl: PagingControl, override:boolean) {
        this.loading = false;
        this.isLoading = true;
        let clientsResponse: ClientResponse = this.clientSearchService.search(this.filter, pagingControl, override)
        if (clientsResponse.error == null) { 
            this.displayResult = true;
            this.isLoading = false;
            this.loading = false;
            if (clientsResponse.totalRecords !== null) { //is first search so set up pagination
                this.totalResults = clientsResponse.totalRecords;
                //  console.log(this.totalResults);
                this.totalPages = Math.ceil(this.totalResults / this.pageSize);
                //  // pagination component
                this.paginationComponent.setCurrentPage(1);
                this.paginationComponent.updatePaging(this.totalResults);
            } 
            this.clients = clientsResponse.clients; 
            this.paginationComponent.updatePageDisplay(); 
            // update the paging control from the response 
            pagingControl = clientsResponse.pagingControl;
        } else {
            // deactivate loading bar, populate the system error and display the error message
            this.isLoading = false;
            this.displayResult = false;
            this.loading = false;
            this.systemError = clientsResponse.error;
            this.showError = true;
        } 
    } 

    // Validates all form fields when search button has been clicked
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    toggleAdvancedSearch(): any {
        if (this.showAdvancedSearch) {
            this.showAdvancedSearch = false;
            this.advancedSearchText = 'Show advanced search'; 
        }
        else {
            this.showAdvancedSearch = true;
            this.advancedSearchText = 'Hide advanced search';
        }
    }

    updateLoading(finished: boolean) {
        if (finished) {
            this.loading = true;
        }
        else {
            this.loading = false;
        }
    }

    clearResults(): void {
        if (this.showAdvancedSearch) {
            this.clientSearchAdvancedComponent.resetForm();
            this.override = true;
        }
        else {
            this.clientSearchBasicComponent.resetForm();
        }

        this.filter = null;
        this.displayResult = false;
        this.totalResults = 0;
        this.pageSize = 10;
        this.clients = [];
        this.clientSearchService.setSortOrder("email", "asc");
        this.paginationComponent.reset();
    }

    // Set page size
    onPageSizeChanged(newPageSize) {
        // go back to the first page
        this.paginationComponent.setCurrentPage(1);

        // set page size to the value of the drop down
        this.pageSize = newPageSize.target.value;
        this.paginationComponent.changePageSize(this.pageSize);
        this.pagingControl = new PagingControl(1, this.pageSize);

        // change the total pages
        this.totalPages = Math.ceil(this.totalResults / this.pageSize);
        this.paginationComponent.updatePaging(this.totalResults);

        this.isLoading = true;
        this.loading = true;

        this.newSearchRequest(this.pagingControl,true);
    }

    sortingRequest(sort: [string, string]): void {
        var sortBy: string = String(sort[0]);
        var sortOrder: string = String(sort[1]);

        this.clientSearchService.setSortOrder(sortBy, sortOrder);

        this.paginationComponent.setCurrentPage(1);
        var pagingControl: PagingControl = new PagingControl(1, this.pageSize);

        this.newSearchRequest(pagingControl,true);
    }    

    onViewClient(selectedIdentityId: number) {
        // pass the client id on, call the service and show the client details 
        this.clientDetailsComponent.launchClientDetails(selectedIdentityId);
        this.showClientDetails = true;//hide search and results, show details
    }

    onCloseEvent() {
        this.showClientDetails = false;//show search and results, hide details
    }
}
