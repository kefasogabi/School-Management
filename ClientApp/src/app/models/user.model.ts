

export interface KeyValuePair { 
    id: number; 
    name: string; 
  }


export class User {
    id: any;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    address: string;
    password:any;
    role:any;
    fileName: string;
    sex :KeyValuePair;
    country:string;
    state:string;
    lga:string;
    genoType:KeyValuePair;
    bloodGroup:KeyValuePair;
    religion:KeyValuePair;
    hairColor:string;
    nkName:string;
    nkPhoneNumber: string;
    nkRelationship:KeyValuePair;
    nkAddress:string;
}

export class EditUser {
    id: any;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    address: string;
    password:any;
    // role:any;
    fileName: string;
    sex :KeyValuePair;
    country:string;
    state:string;
    lga:string;
    genoType:KeyValuePair;
    bloodGroup:KeyValuePair;
    religion:KeyValuePair;
    hairColor:string;
    nkName:string;
    nkPhoneNumber: string;
    nkRelationship:KeyValuePair;
    nkAddress:string;
   
}

export class saveUser{
    id: any;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    address: string;
    sexId :any;
    role :any;
    password:any;
    country:string;
    state:string;
    lga:string;
    genoTypeId:any;
    bloodGroupId:any;
    religionId:any;
    hairColor:string;
    nkName:string;
    nkPhoneNumber: string;
    nkRelationshipId:any;
    nkAddress:string;
}

export class ChangePassword{
    // id: any;
    oldPassword: string;
    newPassword: string;
}

export class upload{
    id: any;
    fileName: string;
}

export class Term{
    id: any;
    name: string;
}


export class Session{
    id: any;
    name: string;
}

export class Login{
    email: string;
    password: string;
}

