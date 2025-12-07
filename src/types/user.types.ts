import { Address } from "./address.types";

export interface User {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    dob?: string;
    gender?: string;
    tryOnImage?: string;
    tryOnLimit: number;
    tier?: "free" | "pro" | "premium";
    addresses?: Array<Address>;
    createdAt?: string;
    updatedAt?: string;
}