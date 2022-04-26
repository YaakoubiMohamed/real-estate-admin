import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AgentsRoutingModule } from './agents-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { AgentsListComponent } from './agents-list/agents-list.component';
import { DetailAgentComponent } from './detail-agent/detail-agent.component';
import { UIModule } from '../../shared/ui/ui.module';

@NgModule({
  declarations: [AgentsListComponent, DetailAgentComponent],
  imports: [
    CommonModule,
    AgentsRoutingModule,
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
export class AgentsModule { }
