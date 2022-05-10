import { Timestamp } from "firebase/firestore";
import { User } from "./user";
import { Annonce } from "./annonce";

export class Reservation{
    id!: string;
    date!:Timestamp;
    user!: User;
    annonce!: Annonce;
    etat!: string;
}