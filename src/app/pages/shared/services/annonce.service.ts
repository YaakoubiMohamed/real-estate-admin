import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Annonce } from '../classes/annonce';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  annonces!: Observable<Annonce[]>;


  constructor(public afs:Firestore) { }

  addAnnonce(annonce:Annonce){
    const newannonce = collection(this.afs, 'annonces'); 
    return addDoc(newannonce, annonce);
  }

  getAnnonces(): Observable<Annonce[]>{
    const annonces = collection(this.afs, 'annonces');
   return collectionData(annonces, { idField: 'id' }) as Observable<Annonce[]>;
  }
  deleteAnnonce(id: string) {
    const annonceDocRef = doc(this.afs, `annonces/${id}`);
    return deleteDoc(annonceDocRef);
  }

  getAnnonceByID(id: string) {
    const annonceDocRef = doc(this.afs, `annonces/${id}`);
    return docData(annonceDocRef, { idField: 'id' }) as Observable<Annonce>;
  }
  
  updateAnnonce(annonce: Annonce,id: string) {
    const annonceDocRef = doc(this.afs, `annonces/${id}`);
    return setDoc(annonceDocRef, annonce);
  }
  
}

