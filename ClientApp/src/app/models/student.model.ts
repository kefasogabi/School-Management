import { ChangePassword } from './user.model';

export interface KeyValuePair { 
    id: number; 
    name: string; 
  }

export class Student {
    id: any;
    firstName: string;
    lastName: string;
    userName: string;
    fileName:string;
    dateOfBirth: string;
    address: string;
    sex :KeyValuePair;
    grade :KeyValuePair;
    session:KeyValuePair;
    password:any;
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
    results:Result[];
    terms:any[]
}

export class SaveStudent {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    dateOfBirth: string;
    address: string;
    sexId :number;
    gradeId :number;
    password:any;
    country:string;
    state:string;
    lGA:string;
    genoTypeId:number;
    bloodGroupId:number;
    religionId:number;
    hairColor:string;
    nKName:string;
    nKPhoneNumber: string;
    nKRelationshipId:number;
    nKAddress:string;
}

export class Stud {
    results:any[];
    terms:any[];
}

export class Grade {
    id: any;
    name: string;
}

export class StudentTerm{
    studentId: any;
    termId: any;
}

export class Login{
    userName: string;
    password: string;
}



export class Result{
    id: any;
    name: string;
    ass1: string;
    ass2: string;
    cA1: string;
    cA2: string;
    exam: string;
    year: string;
    studentId: any;
    total:any;
}

export class resetResult{
    id: any;
    name: string;
    ass1: string;
    ass2: string;
    cA1: string;
    cA2: string;
    exam: string;
}

export class changePassword{
    id: any;
    password: string;
}

export class EditStudent{
    id: any;
    firstName: string;
    lastName: string;
    userName: string;
    dateOfBirth: string;
    address: string;
    sex :KeyValuePair;
    grade :KeyValuePair;
    session:KeyValuePair;
    password:any;
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