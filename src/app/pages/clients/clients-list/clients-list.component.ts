import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/classes/user';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  providers: [UserService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class ClientsListComponent implements OnDestroy, OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  // User data
  //clients: User[];
  public selected: any;
  hideme: boolean[] = [];
  clients$: Observable<User[]>;
  total$: Observable<number>;
  editableTable: any;

  public isCollapsed = true;
  dtOptions: DataTables.Settings = {};
  clients: User[] = [];

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

    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Advanced User', active: true }];
    /**
     * fetch data
     */
    this._fetchData();
  }

  changeValue(i) {
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
    this.service.getUsers().subscribe((res: User[]) => {
      this.clients = res;
      this.clients = this.clients.filter(x=>{
        return x.grade === 'client';
      })
      this.dtTrigger.next();
      console.log(this.clients.length);
      for (let i = 0; i <= this.clients.length; i++) {
        this.hideme.push(true);
      }
    });
    
  }
}
