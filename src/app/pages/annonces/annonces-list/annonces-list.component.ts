import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable, Subject } from 'rxjs';

import { Annonce } from './annonce.model';

//import { annonces, editableTable } from './data';

import { AnnonceService } from '../../shared/services/annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonces-list',
  templateUrl: './annonces-list.component.html',
  styleUrls: ['./annonces-list.component.scss'],
  providers: [AnnonceService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class AnnoncesListComponent implements OnDestroy, OnInit {
  // bread crum data
  breadCrumbItems!: Array<{}>;
  // Annonce data
  //annonces: Annonce[];
  public selected: any;
  hideme: boolean[] = [];
  annonces$!: Observable<Annonce[]>;
  total$!: Observable<number>;
  editableTable: any;

  public isCollapsed = true;
  dtOptions: DataTables.Settings = {};
  annonces: Annonce[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public service: AnnonceService) {
    
  }

  delete(id: string){
    this.service.deleteAnnonce(id);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.breadCrumbItems = [{ label: 'Accueil' }, { label: 'liste des annonces', active: true }];
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
    this.service.getAnnonces().subscribe((res: Annonce[]) => {
      this.annonces = res;
      this.dtTrigger.next();
      console.log(this.annonces.length);
      for (let i = 0; i <= this.annonces.length; i++) {
        this.hideme.push(true);
      }
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
        this.delete(id);
        Swal.fire('supprimer!', 'annonce supprimé.', 'success');
      }
    });
  }

  
}
