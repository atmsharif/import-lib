import { Injectable, Inject, Optional } from '@angular/core';
import { Client, ClientDetails, PagingControl, ClientResponse, SystemError, ImsService } from 'client-model';
import { Observable, of, throwError, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { IAppConfig } from 'client-model';

@Injectable({
    providedIn: 'root'
})
export class ClientSearchService implements ImsService {
    public msServiceEndpoint: string;
    sortBy = 'emails[value]';
    sortOrder = 'Ascending';
    lastFilter = '';

    constructor(public http: HttpClient, private datePipe: DatePipe,
                @Inject('errorMessages') @Optional() public errorMessages?: any,
                @Inject('errorCode') @Optional() public errorCode?: any) {
        // if (AppConfig.settings.useMock === false) {
        //     this.msServiceEndpoint = AppConfig.settings.serviceEndpoint.managedServiceClients;
        // } else {
        //     this.msServiceEndpoint = '';
        // }

    }

    search(filter: string, pagingControl: PagingControl, override: boolean): ClientResponse {
        let rtnObj: ClientResponse = new ClientResponse([], null, 0);
        if (this.lastFilter !== filter || override == true) {// determine if this is new search or paging or sortorder changed
            this.lastFilter = filter; // assign this filter to store
            forkJoin(
                [this.getTotalResults(filter),
                this.doSearch(filter, pagingControl)]
            ).subscribe(([first, second]) => {
                // forkJoin returns an array of values, here we map those values to an object
                second.totalRecords = first; // totalRecords added here for resetting pagination
                rtnObj = second;
            },
                err => {
                    rtnObj.error = new SystemError('Error', err.statusText, err.status, 'mock');
                }
            );
        } else {
            // this is subsequent request so no total records number should be
            // passed as it would trigger pagination setup
            this.doSearch(filter, pagingControl).subscribe((response) => {
                rtnObj = response;
            },
                err => {
                    rtnObj.error = new SystemError('Error', err.statusText, err.status, 'mock');
                });
        }
        return rtnObj;
    }

    private doSearch(filter: string, pagingControl: PagingControl)
        : Observable<ClientResponse> {
        let accessToken = JSON.parse(sessionStorage.getItem('adminspa-session')).AccessToken;
        const httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            )
        };

        // need to add paging control values into the body
        let requestBody = {
            'schemas': ['urn:ietf:params:scim:api:messages:2.0:SearchRequest'],
            'filter': { 'Filter': filter },
            'startIndex': pagingControl.startIndex,
            'count': pagingControl.pageSize,
            'sortBy': this.sortBy,
            'sortOrder': this.sortOrder
        };

        let newRequestBody = JSON.stringify(requestBody);

        return this.http.post(this.msServiceEndpoint, newRequestBody, httpOptions).pipe(
            map(response => this.mapToClient(response, pagingControl, null)), catchError(error => throwError(this.mapError(error))));

    }

    private getTotalResults(filter: string): Observable<number> {
        let accessToken = JSON.parse(sessionStorage.getItem('adminspa-session')).AccessToken;

        const httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            )
        };

        // need to add paging control values into the body
        let requestBody = {
            'schemas': ['urn:ietf:params:scim:api:messages:2.0:SearchRequest'],
            'filter': { 'Filter': filter },
            'startIndex': 1,
            'count': 0,
            'sortBy': this.sortBy,
            'sortOrder': this.sortOrder
        };

        let newRequestBody = JSON.stringify(requestBody);

        return this.http.post(this.msServiceEndpoint, newRequestBody, httpOptions).pipe(
            map(response => this.mapToTotalResults(response)), catchError(error => throwError(this.mapError(error))));
    }

    mapToTotalResults(response: any): number {
        let totalResults =  response.totalResults as number;
        return totalResults;
    }

    mapError(error: HttpErrorResponse): SystemError {
        let systemError: SystemError;

        if (error.status === 401) {
            systemError = this.errorMessages[[this.errorCode.E1000].toString()];
        } else if (error.status === 500 || error.status === 503) {
            systemError = this.errorMessages[[this.errorCode.E1001].toString()];
        } else {
            systemError = this.errorMessages[[this.errorCode.E1002].toString()];
        }

        return systemError;
    }

    mapToClient(response: any, pagingControl: PagingControl, allrecordsNo?: number): ClientResponse {
        let clients = [];
        let totalResults = response.Resources.length; // response.totalResults;
        let client;

        for (let i = 0; i < totalResults; i++) {
            let identityId: number = response.Resources[i].id;
            let email: string;
            let givenName: string;
            let familyName: string;
            let dob: Date;

            if (response.Resources[i].emails === null) {
                email = '';
            } else {
                email = response.Resources[i].emails[0].value;
            }

            if (response.Resources[i].name === null || response.Resources[i].name.givenName === null) {
                givenName = '';
            } else {
                givenName = response.Resources[i].name.givenName;
            }

            if (response.Resources[i].name === null || response.Resources[i].name.familyName === null) {
                familyName = '';
            } else {
                familyName = response.Resources[i].name.familyName;
            }

            // var familyName: string = response.Resources[i].name.familyName;
            dob = new Date(response.Resources[i]['urn:ausid:gov:au:schemas:core:1.0:Identity'].dateOfBirth);

            client = new Client(identityId, email, givenName, familyName, dob);
            clients.push(client);
        }

        // allrecordsNo is used for initial search to return number records for pagination
        // var pagingControl = new PagingControl(1, 10);
        let clientResponse = new ClientResponse(clients, pagingControl, allrecordsNo);
        return clientResponse;
    }

    getClientByIdentityId(identityId: number): Observable<ClientDetails> {
        let accessToken = JSON.parse(sessionStorage.getItem('adminspa-session')).AccessToken;

        const httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            )
        };

        // need to add paging control values into the body
        let requestBody = {
            'schemas': ['urn:ietf:params:scim:api:messages:2.0:SearchRequest'],
            'filter': { 'Filter': 'id eq "' + identityId + '"' },
            'startIndex': 1,
            'count': 10,
            'sortBy': 'emails[value]',
            'sortOrder': 'Ascending'
        };

        return this.http.post(this.msServiceEndpoint, requestBody, httpOptions).pipe(
            map(response => this.mapToClientDetails(response))
            , catchError(error => throwError(this.mapError(error))));
    }

    setClientStatus(identityId: number, status: string, reason: string): string {
        let accessToken = JSON.parse(sessionStorage.getItem('adminspa-session')).AccessToken;

        const httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            )
        };

        // TODO ############################
        // IMPLEMENT API CALL
        // return this.http.put(this.msServiceEndpoint, requestBody, httpOptions).pipe(
        //     map(response => this.mapToClientDetails(response))
        //    , catchError(error => throwError(this.mapError(error))));
        // ####################################
        return 'done';

    }

    mapToClientDetails(response: any): ClientDetails {
        let identityId: number = response.Resources[0].id;
        let email: string = response.Resources[0].emails[0].value;
        let givenName: string = response.Resources[0].name.givenName;
        let familyName: string = response.Resources[0].name.familyName;
        let dob: string = response.Resources[0]['urn:ausid:gov:au:schemas:core:1.0:Identity'].dateOfBirth;
        let dateCreated: string = response.Resources[0].meta.created;
        let ipLevel: string = response.Resources[0]['urn:ausid:gov:au:schemas:core:1.0:Identity'].ipLevel;
        let accountStatus: string = response.Resources[0]['urn:ausid:gov:au:schemas:core:1.0:Identity'].status;
        let accountStatusChangeReason: string = response.Resources[0]['urn:ausid:gov:au:schemas:core:1.0:Identity'].changeReason;
        let tcVersion: string = response.Resources[0]['urn:ausid:gov:au:schemas:core:1.0:Identity'].acceptedTermsAndConditions.acceptedVersion;
        let tcAcceptanceDate: string = response.Resources[0]['urn:ausid:gov:au:schemas:core:1.0:Identity'].acceptedTermsAndConditions.acceptedDate;
        let clientDetails = new ClientDetails(identityId, email, givenName, familyName,
            new Date(dob), new Date(dateCreated), ipLevel, accountStatus, accountStatusChangeReason, tcVersion, new Date(tcAcceptanceDate));
        return clientDetails;
    }

    setSortOrder(sortBy: string, sortOrder: string) {
        if (sortBy == 'email') {
            this.sortBy = 'emails[value]';
        } else if (sortBy == 'givenName') {
            this.sortBy = 'name[givenName]';
        } else if (sortBy == 'familyName') {
            this.sortBy = 'name[familyName]';
        } else if (sortBy == 'dob') {
            this.sortBy = 'urn:ausid:gov:au:schemas:core:1.0:Identity:dateOfBirth';
        }

        if (sortOrder == 'asc') {
            this.sortOrder = 'Ascending';
        } else if (sortOrder == 'desc') {
            this.sortOrder = 'Descending';
        }
    }
}
