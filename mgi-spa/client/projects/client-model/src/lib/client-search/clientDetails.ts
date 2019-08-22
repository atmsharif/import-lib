import { Client } from './client';
export class ClientDetails extends Client {

    constructor(identityId: number,email: string, givenName: string, familyName: string, dob: Date,
        dateCreated: Date, ipLevel: string, accountStatus: string, accountStatusReason: string, tcVersion: string, tcAcceptanceDate: Date) {
        super(identityId, email, givenName, familyName, dob);
        this.dateCreated = dateCreated;
        this.ipLevel = ipLevel;
        this.accountStatus = accountStatus;
        this.accountStatusReason = accountStatusReason;
        this.tcVersion = tcVersion;
        this.tcAcceptanceDate = tcAcceptanceDate; 
    }

    // Date created
    dateCreated: Date;
    // IP level
    ipLevel: string;
    // Account status
    accountStatus: string;
    // Account status reason given
    accountStatusReason: string;
    // TC version
    tcVersion: string;
    // TC acceptance date
    tcAcceptanceDate: Date;
}