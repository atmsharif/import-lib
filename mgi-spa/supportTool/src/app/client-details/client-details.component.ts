import { Component, OnInit, Input, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client, ClientDetails, ImsService } from 'client-model';
import { DatePipe } from '@angular/common';
// required for launching the ato-bootstrap modal
declare var $: any;

@Component({
    selector: 'lib-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
    clientSearchService: ImsService;
    clientDetails: ClientDetails;
    public loading: boolean;
    public selectedStatus: string;
    public selectedReason: string;
    public statuses: any[];
    public reasons: any[];
    private clientID: number;

    @Output() closeEvent: EventEmitter<string> = new EventEmitter<string>();

    constructor(clientSearchService: ImsService, private datePipe: DatePipe) {
        this.clientSearchService = clientSearchService;
        this.loading = false;
    }

    ngOnInit() {
        this.clientDetails = new ClientDetails(0, "", "", "", null, null, "", null, null, "", null);
        this.statuses = [
            { title: "Active", value: "Active" }
            , { title: "Suspended", value: "Suspended" }
            , { title: "Fraudulent", value: "Fraudulent" }
            , { title: "Cancelled", value: "Cancelled" }
            , { title: "Deceased", value: "Deceased" }]

        this.reasons = [
            { title: "Client reported suspicious activity", value: "Client reported suspicious activity" }
            , { title: "Client requested identity suspension", value: "Client requested identity suspension" }
            , { title: "Client requested identity deletion", value: "Client requested identity deletion" }
            , { title: "Client requested identity to be re-instated", value: "Client requested identity to be re-instated" }
            , { title: "Client matched on fraudulent list", value: "Client matched on fraudulent list" }
            , { title: "Client removed from fraudulent list", value: "Client removed from fraudulent list" }
            , { title: "Client matched fact of death file", value: "Client matched fact of death file" }
            , { title: "Other", value: "Other" }]
    }

    // method takes a clientId, makes a new request with it and launches the modal
    launchClientDetails(identityId: number): void {
        this.loading = true;
        this.clientID = identityId;
        // $("#myModal").modal('show');
        // $("#myModal").show();
        this.clientSearchService.getClientByIdentityId(identityId)
            .subscribe((clientDetailsResponse) => {
                this.loading = false;
                this.clientDetails = clientDetailsResponse;

            }
        );
        //reset popup variable values
        this.selectedStatus = null;
        this.selectedReason = "unchosen";
    }

    showStatusEdit() {
        $("#statusModal").modal('show');
    }

    updateClientStatus(): void {
        $("#statusModal").modal('hide');
        //transfer popup variable values to main object
        this.clientDetails.accountStatus = this.selectedStatus;
        this.clientDetails.accountStatusReason = this.selectedReason;
        let response: string = this.clientSearchService
            .setClientStatus(this.clientID, this.selectedStatus, this.selectedReason);
        
    }

    onCloseEvent() {
        this.closeEvent.emit("close");
    }
}
