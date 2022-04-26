import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { TablesRoutingModule } from './clients-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { UIModule } from '../../shared/ui/ui.module';

@NgModule({
  declarations: [ClientsListComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,    
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    Ng2SmartTableModule,
    DataTablesModule,
    UIModule
  ]
})
export class ClientsModule { }
