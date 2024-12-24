export interface UserInterface{
    uid: string;
    email: string
    username: string
    roles:Roles
}
export interface Roles{
    subscriber?: boolean
    editor?: boolean
    admin?: boolean
}
export interface User{
    uid: string
    email: string
    roles: Roles
}