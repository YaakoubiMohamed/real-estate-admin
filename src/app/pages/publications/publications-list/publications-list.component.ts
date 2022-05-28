import { Publication } from './../../shared/classes/publication';
import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { PublicationService } from '../../shared/services/publication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss'],
  providers: [PublicationService, DecimalPipe, DatePipe]
})

/**
 * Advanced table component
 */
export class PublicationsListComponent implements OnDestroy, OnInit {
  // bread crum data
  breadCrumbItems!: Array<{}>;
  // Publication data
  //publications: Publication[];
  public selected: any;

  publications$!: Observable<Publication[]>;
  total$!: Observable<number>;
  editableTable: any;

  public isCollapsed = true;
  dtOptions: DataTables.Settings = {};
  publications: Publication[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public service: PublicationService) {
   
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.breadCrumbItems = [{ label: 'Accueil' }, { label: 'Liste publications', active: true }];
    /**
     * fetch data
     */
    this._fetchData();
  }

 


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  /**
   * fetches the table value
   */
  _fetchData() {
    this.service.getPublications().subscribe((res: Publication[]) => {
      this.publications = res;
      this.dtTrigger.next();
      console.log(this.publications[0].date!.toDate());
    });
    
  }

  delete(id: string){
    this.service.deletePublication(id);
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
