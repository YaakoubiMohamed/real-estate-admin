import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable, Subject } from 'rxjs';


//import { clients, editableTable } from './data';

import { ReservationService } from '../shared/services/reservation.service';
import Swal from 'sweetalert2';
import { Reservation } from '../shared/classes/reservation';

@Component({
  selector: 'app-clientagent',
  templateUrl: './clientagent.component.html',
  styleUrls: ['./clientagent.component.scss']
})
export class ClientagentComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  // Reservation data
  //clients: Reservation[];
  public selected: any;
  hideme: boolean[] = [];
  clients$!: Observable<Reservation[]>;
  total$!: Observable<number>;
  editableTable: any;

  public isCollapsed = true;
  dtOptions: DataTables.Settings = {};
  clients: Reservation[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  user: any;

  constructor(public service: ReservationService) {
    
  }

  accepter(id: string){
    let etat = "accepter";
    let reservation :any  ={};
    reservation['etat'] = etat;
    this.service.updateReservation(reservation, id);
  }

  refuser(id: string){
    let etat = "refuser";
    let reservation :any  ={};
    reservation['etat'] = etat;
    this.service.updateReservation(reservation, id);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.user = JSON.parse(localStorage.getItem('userInfo') || '{}');
    console.log(this.user);

    this.breadCrumbItems = [{ label: 'Accueil' }, { label: 'liste des clients', active: true }];
    /**
     * fetch data
     */
    this._fetchData();
  }

  changeValue(i: number) {
    this.hideme[i] = !this.hideme[i];
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  /**
   * fetches the table value
   */
  _fetchData() {
    this.service.getReservations().subscribe((res: Reservation[]) => {
      this.clients = res;
      this.clients = this.clients.filter(x=>{
        return x.annonce.user?.id == this.user.id;
      })
      this.dtTrigger.next();
      console.log(this.clients);
      
    });
    
  }


  confirm(id: string) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Oui!',
      cancelButtonText: 'Annuler!'
    }).then(result => {
      if (result.value) {
        this.refuser(id);
        Swal.fire('supprimer!', 'reservation supprimé.', 'success');
      }
    });
  }



}
