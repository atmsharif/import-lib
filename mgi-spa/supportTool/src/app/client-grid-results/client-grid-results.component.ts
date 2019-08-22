import { Component, OnInit, ViewChild, EventEmitter, Input, Output} from '@angular/core';
import { ClientDetailsComponent} from '../client-details/client-details.component';
import { Client, PagingControl, ImsService } from 'client-model';
import { GridOptions} from "ag-grid-community";
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lib-client-grid-results',
  templateUrl: `./client-grid-results.component.html`,
  styles: []
})
export class ClientGridResultsComponent implements OnInit {
  // data from the response
  selectedClient: Client;
 
  public clientSearchService: ImsService;
  public pageDisplay;
  public currentPage: number = 1;
  public pageSize = 10;
  public isLoading: boolean;
  public gridOptions: GridOptions;
  private gridApi;
  private gridColumnApi;

  // Validation for form inputs
  goToPageForm = new FormGroup({
    'goToPageNumber': new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/)
    ])
  });

 

  @Input() clients: Client[];
  @Input() totalResults: number;
  @Input() displayResult: boolean;
    @Output() sortingRequest: EventEmitter<[string, string]> = new EventEmitter();
    @Output() viewClientEvent: EventEmitter<number> = new EventEmitter<number>();
   
  constructor(clientSearchService: ImsService, private datePipe: DatePipe) {  
    this.clientSearchService = clientSearchService;
    this.gridOptions = <GridOptions>{
      columnDefs: [
        {
            headerName: "Email address",
            field: "email",
            width: 300,
            unSortIcon: true
        },
        {
            headerName: "Given name/s",
            field: "givenName",
            width: 245,
            unSortIcon: true
        },
        {
            headerName: "Family name",
            field: "familyName",
            width: 245,
            unSortIcon: true
        },
        {
            headerName: "Date of birth",
            field: "dob",
            width: 200,
            unSortIcon: true,
            valueFormatter: (date) => {return datePipe.transform(date.value, 'dd/MM/yyyy')}
        },
        // For "arrow" which opens up the modal
        {
            headerName: "",
            field: "value",
            colId: "params",
            width: 10,
            cellRenderer: () => {
               return `<div class="icon-accordion-click"></div>`;
            },
            onCellClicked:(event) => { 
              this.selectedClient = event.data;
              let selectedIdentityId:number = this.selectedClient.identityId;
              this.viewClientEvent.emit(selectedIdentityId); //notify container control and send id 
            }
        },

      ],
      suppressMovableColumns: true,
      domLayout: "autoHeight",
      paginationPageSize: 10,
      pagination: false,
      enableSorting: true,
      accentedSort: true
  };
  }

  // Only initialised once
  onGridReady(params) {
    var defaultSortModel = [
        {
          colId: "email"
        },
        {
          colId: "givenName"
        },
        {
          colId: "familyName"
        },
        {
          colId: "dob"
        },
      ];
  }

  onRowDataChanged(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    // Required to enable and disable sorting for basic/advanced search
    if (this.totalResults > 1) {
    this.gridOptions.enableSorting = true;
    this.gridApi.refreshHeader();
    }
    else {
    this.gridOptions.enableSorting = false;
    this.gridApi.refreshHeader();
    }
  }

  onSortChanged(): void {
    var sortBy;
    var sortOrder;

    // "Default" sort will be empty
    if (this.gridApi.getSortModel().length > 0) {
      sortBy= this.gridApi.getSortModel()[0].colId;
      sortOrder = this.gridApi.getSortModel()[0].sort;
    }
    else {
      sortBy= "email";
      sortOrder = "asc";
    }
    
    this.sortingRequest.emit([sortBy, sortOrder]);
  }

  ngOnInit(): void {
  }


}
