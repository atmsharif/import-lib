import { Client } from './client';
import { PagingControl } from './paging-control';
import { SystemError } from '../errorMessage';
 

export class ClientResponse {

    constructor(clients: Client[], pagingControl: PagingControl, totalRecords: number) {
      this.clients = clients;
      this.pagingControl = pagingControl;
      this.totalRecords = totalRecords;
    }
  
    clients: Client[];
    pagingControl: PagingControl;e
    totalRecords: number;
    error: SystemError;
  }