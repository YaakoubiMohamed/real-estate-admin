import { User } from "./user";
import { Timestamp } from "firebase/firestore";

export class Message {
    id?:string;
    emetteur?:User;
    recepteur?:User;
    date?:Date;
    texte?:string;
}
