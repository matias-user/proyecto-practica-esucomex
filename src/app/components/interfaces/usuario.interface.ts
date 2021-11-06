export interface Roles{
    admin?:boolean;
    editor?:boolean;
}

export interface Usuario{
    id?: string;
    name?: string;
    email?:string;
    password?:string;
    photoUrl?: string;
    roles?: Roles;
}