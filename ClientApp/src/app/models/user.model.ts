
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
    sex :{id:any, name:string};
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

