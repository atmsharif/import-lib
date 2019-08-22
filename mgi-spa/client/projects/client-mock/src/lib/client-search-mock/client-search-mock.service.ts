import { Injectable, Inject, Optional } from '@angular/core';
import { Client, ClientDetails, PagingControl, ClientResponse, ImsService, SystemError } from 'client-model';
import { Observable, EMPTY, throwError, Observer, race, forkJoin, from } from 'rxjs';
import { CLIENTS, CLIENT_DETAILS } from './client-search-mock';
import { of } from 'rxjs'


@Injectable({
    providedIn: 'root'
})
export class ClientSearchMockService implements ImsService {
    sortBy: string = "email";
    sortOrder: string = "Ascending";
    lastFilter: string = "";
    constructor(@Inject('errorMessages') @Optional() public errorMessages?: any,
        @Inject('errorCode') @Optional() public errorCode?: any) { }

    search(filter: string, pagingControl: PagingControl, override: boolean): ClientResponse {
        let rtnObj: ClientResponse = new ClientResponse([], null, 0);
        if (this.lastFilter !== filter || override == true) {//determine if this is new search or paging or sortorder changed           
            this.lastFilter = filter;//assign this filter to store
            forkJoin(
                [this.getTotalResults(filter),
                this.doSearch(filter, pagingControl)]
                ).subscribe(([first, second]) => {
                    // forkJoin returns an array of values, here we map those values to an object
                    second.totalRecords = first; //totalRecords added here for resetting pagination
                    rtnObj = second;
                },
                err => {
                    rtnObj.error = new SystemError('Error', err.statusText, err.status, 'mock');
                }
            );
        } else {
            //this is subsequent request so no total records number should be 
            //passed as it would trigger pagination setup
            this.doSearch(filter, pagingControl).subscribe((response) => {
                rtnObj = response;
            },
            err => {
                rtnObj.error = new SystemError('Error', err.statusText, err.status, 'mock');
            });
        }
        return rtnObj;
    }

    private doSearch(filter: string, pagingControl: PagingControl): Observable<ClientResponse> {
        var clientResponse;
        var clients: Client[] = this.doFilter(filter, pagingControl); 
        clientResponse = new ClientResponse(clients, pagingControl, null);//set count to null as it will be added in forkjoin if required 
        return of(clientResponse);
    }

    private getTotalResults(filter: string): Observable<number> {
        var clients: Client[] = this.doFilter(filter, null); 
        return of(clients.length);  
    }

    setSortOrder(sortBy: string, sortOrder: string) { 
       this.sortBy = sortBy; 
        if (sortOrder == "asc") {
            this.sortOrder = "Ascending";
        } else if (sortOrder == "desc") {
            this.sortOrder = "Descending";
        }
    }

    clients: Client[] = [];
    private doFilter(filter: string, pagingControl: PagingControl) {
        
        let EmailMatch: string = this.getEmailFromFilter(filter);
        let NameMatch: string = this.getGivenFromFilter(filter);
        let FamilyMatch: string = this.getFamilyFromFilter(filter);
        let DobMatch: string = this.getDOBFromFilter(filter);  

        let found: boolean = false;
         
        if (EmailMatch) { //&& EmailMatch.length > 0
            let regex: any = new RegExp(EmailMatch, 'i')
            this.clients = CLIENTS.filter(person => regex.test(person.email));
            found = true;
        }
        if (NameMatch) { // && NameMatch.length > 0
            let regex: any = new RegExp(NameMatch, 'i') 
            if (found == true) {
                this.clients = this.clients.filter(person => regex.test(person.givenName));
            }
            else {
                this.clients = CLIENTS.filter(person => regex.test(person.givenName));
                found = true;
            }

        }
        if (FamilyMatch) { // && FamilyMatch.length > 0
            let regex: any = new RegExp(FamilyMatch, 'i')
            if (found == true) {
                this.clients = this.clients.filter(person => regex.test(person.familyName));
            }
            else {
                this.clients = CLIENTS.filter(person => regex.test(person.familyName));
                found = true;
            }

        }
        if (DobMatch) { //&& DobMatch.length > 0

            var d = this.convertStringToDate(DobMatch);
            if (found == true) {
                this.clients = this.clients.filter(person => person.dob.toLocaleDateString() === d.toLocaleDateString());
            }
            else {
                this.clients = CLIENTS.filter(person => person.dob.toLocaleDateString() === d.toLocaleDateString());
                found = true;
            }

        }
        this.sortArray(this.sortBy, this.sortOrder);
        if (pagingControl !== null) {
            this.clients = this.paginate(this.clients, pagingControl.pageSize, pagingControl.startIndex);
        }
        return this.clients;
    } 

    private paginate(array: any, page_size: number, page_number: number) {
        return array.slice((page_number - 1) * page_size, (page_number) * page_size);
    }

    private sortArray(propName: string, order: string): void {
        this.clients.sort((a, b) => {
            if (a[propName] < b[propName])
                return -1;
            if (a[propName] > b[propName])
                return 1;
            return 0;
        });

        if (order == "Descending") {
            this.clients.reverse();            
        }  
    } 

    private getEmailFromFilter(filter: string) {
        //get actual email from search expression  eg: 'emails[value eq "frank@sinatra.org"]'         
        let matches: string[] = filter.match(/(emails\[value\seq\s\")(.*?)(?=\")|(emails\[value\sco\s\")(.*?)(?=\")/i);
        if (matches && matches.length > 0) {
            matches = matches.filter(r => r != undefined);
            if (matches && matches.length > 0) {
                matches = matches.filter(r => r.search(/\[/) == -1);
                if (matches.length > 0) {
                    return matches[0];
                }
            }
        }
        return null;  
    }

    private getGivenFromFilter(filter: string) {
        //get actual givenName from search expression  eg: "name[givenName co "max"]"        
        let matches: string[] = filter.match(/(name\[givenName\sco\s\")(.*?)(?=\")/i);
        if (matches && matches.length > 2) {
            return matches[2];
        }
        return null;
    }

    private getFamilyFromFilter(filter: string) {
        //get actual familyName from search expression  eg: 'name[familyName co "pow"]'      
        let matches: string[] = filter.match(/(name\[familyName\sco\s\")(.*?)(?=\")/i);
        if (matches && matches.length > 2) {
            return matches[2];
        }
        return null;
    }

    private getDOBFromFilter(filter: string) {
        //get actual dob from search expression  eg: 'dbo co "01/01/1901"]'
        let matches: string[] = filter.match(/(dateOfBirth\sco\s\")(\d{4}\-\d{2}\-\d{2})(?=\")/i);
       // let matches: string[] = filter.match(/(dateOfBirth\sco\s\")(\d{2}\/\d{2}\/\d{4})(?=\")/i);
        if (matches && matches.length > 2) {
            return matches[2];
        }
        return null;
    }

    private convertStringToDate(val: string) {
        //let from: string[] = val.split("/");
        //var f = new Date(Number(from[2]), Number(from[1]) - 1, Number(from[0]));
        //return f;

        let from: string[] = val.split("-");
        var f = new Date(Number(from[0]), Number(from[1]) - 1, Number(from[2]));
        return f;
    }

    getClientByIdentityId(identityId: number): Observable<ClientDetails> {
        var clientDetails: ClientDetails;

        for (let client of CLIENT_DETAILS) {
            if (client.identityId === identityId) {
                clientDetails = client;
            }
        }

        return of(clientDetails);
    }

    setClientStatus(identityId: number, status: string, reason: string): string {
        let x: number = CLIENT_DETAILS.findIndex(x => x.identityId == identityId);
        if (x > 0) {
            CLIENT_DETAILS[x].accountStatus = status;
            CLIENT_DETAILS[x].accountStatusReason = reason;
        }
        
        return "done";

    }
}
