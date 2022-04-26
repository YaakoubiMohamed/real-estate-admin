import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Publication } from '../classes/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  publications!: Observable<Publication[]>;


  constructor(public afs:Firestore) { }

  addPublication(publication:Publication){
    const newpublication = collection(this.afs, 'publications'); 
    return addDoc(newpublication, publication);
  }

  getPublications(): Observable<Publication[]>{
    const publications = collection(this.afs, 'publications');
   return collectionData(publications, { idField: 'id' }) as Observable<Publication[]>;
  }

  deletePublication(id: string) {
    const publicationDocRef = doc(this.afs, `publications/${id}`);
    return deleteDoc(publicationDocRef);
  }

  getPublicationByID(id: string) {
    const publicationDocRef = doc(this.afs, `publications/${id}`);
    return docData(publicationDocRef, { idField: 'id' }) as Observable<Publication>;
  }
  
  updatePublication(publication: Publication,id: string) {
    const publicationDocRef = doc(this.afs, `publications/${id}`);
    return setDoc(publicationDocRef, publication);
  }
  
}
