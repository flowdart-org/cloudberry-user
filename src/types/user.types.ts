export interface User {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    dob?: string;
    gender?: string;
    tryOnImage?: string;
    tryOnCount: number;
    tier: "free" | "pro" | "premium";
    createdAt?: string;
    updatedAt?: string;
}