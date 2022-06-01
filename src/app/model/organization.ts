import {Role} from "../enum/role.enum";

export interface  Organization{
    organizationId: number;
    organizationName: string;
    organizationLogin: string;
    organizationPassword: string;
    role: Role;
}
