import { ChangePassword } from './user.model';

export class Student {
    id: any;
    firstName: string;
    lastName: string;
    userName: string;
    dateOfBirth: string;
    address: string;
    sex :{id:any, name:string};
    grade :{id:any, name:string};
    password:any;
    country:string;
    state:string;
    lGA:string;
    genoType:{id:any, name:string};
    bloodGroup:{id:any, name:string};
    religion:{id:any, name:string};
    hairColor:string;
    nkName:string;
    nkPhone: string;
    nkRelationship:{id:any, name:string};
    nkAddress:string;
}

export class Grade {
    id: any;
    name: string;
}

export class changePassword{
    id: any;
    password: string;
}

export class EditStudent{
    id:any;
    firstName: string;
    lastName: string;
    userName: string;
    dateOfBirth: string;
    address: string;
    fileName: string;
    sex :{id:any, name:string};
    grade :{id:any, name:string};
}