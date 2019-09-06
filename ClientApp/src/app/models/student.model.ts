import { ChangePassword } from './user.model';

export class Student {
    id: any;
    firstName: string;
    lastName: string;
    userName: string;
    fileName:string;
    dateOfBirth: string;
    address: string;
    sex :{id:any, name:string};
    grade :{id:any, name:string};
    session:{id:any, name:string};
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
    results:any[];
    terms:any[]
}

export class SaveStudent {
    id: any;
    firstName: string;
    lastName: string;
    userName: string;
    dateOfBirth: string;
    address: string;
    sex :{id:any, name:string};
    grade :{id:any, name:string};
    // session:{id:any, name:string};
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


    id:any;
    name: string;
    cA1: string;
    cA2: string;
    exam: string;
    year: string;
    studentId:any;
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