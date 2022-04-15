import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { User } from '../../shared/classes/user';
import { UserService } from '../../shared/services/user.service';



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
  breadCrumbItems: Array<{}>;
  // User data
  //agents: User[];
  public selected: any;
  hideme: boolean[] = [];
  agents$: Observable<User[]>;
  total$: Observable<number>;
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
