import { UserOutput } from "../../db/models/Auth";

export interface CreateUser {
    name: string;
    email: string;
    password: string;
    slug: string;
}

export interface LoginUser {
    email: string;
    password: string;
}
