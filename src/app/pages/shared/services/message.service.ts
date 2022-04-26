import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../classes/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages!: Observable<Message[]>;


  constructor(public afs:Firestore) { }

  addMessage(message:Message){
    const newmessage = collection(this.afs, 'messages'); 
    return addDoc(newmessage, message);
  }

  getMessages(): Observable<Message[]>{
    const messages = collection(this.afs, 'messages');
   return collectionData(messages, { idField: 'id' }) as Observable<Message[]>;
  }

/*
  deleteMessage(id){
    this.afs.collection('messages').doc(id).delete();
  }

  editMessage(message, id){
    this.afs.collection('messages').doc(id).update(message);
  }
  */
}

