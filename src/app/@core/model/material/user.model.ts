import { Material } from './material.model'

export interface User {
    _id: string;
    name: string;
    username: string;
    image: string;
    email: string;
    password: string;
    wallet: number;
    cart: Material[];
}