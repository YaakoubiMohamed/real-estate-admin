import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  users!: Observable<User[]>;


  constructor(public afs:Firestore) { }

  addUser(user:User){
    const newuser = collection(this.afs, 'users'); 
    return addDoc(newuser, user);
  }

  blockUser(user:any, id: any) {
    const userDocRef = doc(this.afs, `users/${id}`);
    return setDoc(userDocRef, user);
  }

  getUsers(): Observable<User[]>{
    const users = collection(this.afs, 'users');
   return collectionData(users, { idField: 'id' }) as Observable<User[]>;
  }

  deleteUser(id: string) {
    const userDocRef = doc(this.afs, `users/${id}`);
    return deleteDoc(userDocRef);
  }

  getUserByID(id: string) {
    const userDocRef = doc(this.afs, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<User>;
  }
  
  updateUser(user: User, id: string) {
    const userDocRef = doc(this.afs, `users/${id}`);
    return setDoc(userDocRef, user);
  }
}
