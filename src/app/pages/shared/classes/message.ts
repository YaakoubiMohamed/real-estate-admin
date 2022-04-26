import { User } from "./user";
import { Timestamp } from "firebase/firestore";

export class Message {
    id?:string;
    emetteur?:User;
    recepteur?:User;
    date?:string;
    texte?:string;
}
