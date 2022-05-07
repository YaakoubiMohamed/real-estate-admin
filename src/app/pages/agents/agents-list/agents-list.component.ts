import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { User } from '../../shared/classes/user';
import { UserService } from '../../shared/services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.scss'],
  providers: [UserService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class AgentsListComponent implements OnDestroy, OnInit {
  // bread crum data
  breadCrumbItems!: Array<{}>;
  // User data
  //agents: User[];
  public selected: any;
  hideme: boolean[] = [];
  agents$!: Observable<User[]>;
  total$!: Observable<number>;
  editableTable: any;

  public isCollapsed = true;
  dtOptions: DataTables.Settings = {};
  agents: User[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public service: UserService) {
   
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.breadCrumbItems = [{ label: 'Acceuil' }, { label: 'Liste des Agents', active: true }];
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

  delete(id: string){
    this.service.deleteUser(id).then(res=>{
      console.log(res);
    })
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
        Swal.fire('supprimer!', 'Agent supprimé.', 'success');
      }
    });
  }


  /**
   * fetches the table value
   */
  _fetchData() {
    this.service.getUsers().subscribe((res: User[]) => {
      this.agents = res;
      this.agents = this.agents.filter(x=>{
        return x.grade === 'agent';
      })
      this.dtTrigger.next();
      console.log(this.agents);
      for (let i = 0; i <= this.agents.length; i++) {
        this.hideme.push(true);
      }
    });
    
  }
}
