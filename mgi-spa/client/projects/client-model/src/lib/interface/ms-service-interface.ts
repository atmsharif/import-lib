import { Client } from '../client-search/client';
import { ClientDetails } from '../client-search/clientDetails';
import { PagingControl } from '../client-search/paging-control';
import { ClientResponse } from '../client-search/client-response';
import { Observable } from 'rxjs';

export abstract class ImsService { 
    abstract search(filter: string, pagingControl: PagingControl, override: boolean): ClientResponse;
    abstract getClientByIdentityId(identityId: number): Observable<ClientDetails>;
    abstract setSortOrder(sortBy: string, sortOrder: string);
    abstract setClientStatus(identityId: number, status: string, reason: string): string;
 }