import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reservation } from '../classes/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservation?: Observable<Reservation[]>;


  constructor(public afs:Firestore) { }

  addReservation(reservation:any){
    const newreservation = collection(this.afs, 'reservation'); 
    return addDoc(newreservation, reservation);
  }

  getReservations(): Observable<Reservation[]>{
    const reservation = collection(this.afs, 'reservation');
   return collectionData(reservation, { idField: 'id' }) as Observable<Reservation[]>;
  }
  deleteReservation(id:string) {
    const reservationDocRef = doc(this.afs, `reservation/${id}`);
    return deleteDoc(reservationDocRef);
  }

  getReservationByID(id: string) {
    const reservationDocRef = doc(this.afs, `reservation/${id}`);
    return docData(reservationDocRef, { idField: 'id' }) as Observable<Reservation>;
  }
  
  updateReservation(reservation: any,id:string) {
    const reservationDocRef = doc(this.afs, `reservation/${id}`);
    return setDoc(reservationDocRef, reservation);
  }
  
}

