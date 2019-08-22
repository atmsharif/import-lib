export class Client {

  constructor(identityId: number, email: string, givenName: string, familyName: string, dob: Date) {
    this.identityId = identityId;
    this.email = email;
    this.givenName = givenName;
    this.familyName = familyName;
    this.dob = dob;
  }

  identityId: number;
  email: string;
  givenName: string;
  familyName: string;
  dob: Date;
}
