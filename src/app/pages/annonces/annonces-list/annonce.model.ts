import { Timestamp } from "firebase/firestore";
import { User } from "../../shared/classes/user";

// Table data
export interface Annonce {
    id?:string;
    prix?:string;
    titre?:string;
    surface?:number;
    nbr_piece?:number;
    description?:string;
    type?:string;
    etage?:number;
    adresse?:string;
    date?:Timestamp;
    delegation?:string;
    ville?:string;
    cpostal?:string;
    available?:Boolean;
    user?:User;
    photo?:String;
}

// Search Data
export interface SearchResult {
    annonces: Annonce[];
    total: number;
}
