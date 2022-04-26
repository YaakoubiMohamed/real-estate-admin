import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { TablesRoutingModule } from './annonces-routing.module';
import { AnnoncesListComponent } from './annonces-list/annonces-list.component';
import { DataTablesModule } from 'angular-datatables';
import { EditAnnonceComponent } from './edit-annonce/edit-annonce.component';
import { AddAnnonceComponent } from './add-annonce/add-annonce.component';
import { UIModule } from '../../shared/ui/ui.module';

@NgModule({
  declarations: [AnnoncesListComponent, EditAnnonceComponent, AddAnnonceComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    DataTablesModule,
    UIModule   
  ]
})
export class AnnoncesModule { }
