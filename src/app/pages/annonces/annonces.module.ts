import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { TablesRoutingModule } from './annonces-routing.module';
import { AnnoncesListDirective } from './annonces-list/annonce-sortable.directive';
import { AnnoncesListComponent } from './annonces-list/annonces-list.component';
import { DataTablesModule } from 'angular-datatables';
import { EditAnnonceComponent } from './edit-annonce/edit-annonce.component';
import { AddAnnonceComponent } from './add-annonce/add-annonce.component';

@NgModule({
  declarations: [AnnoncesListComponent, AnnoncesListDirective, EditAnnonceComponent, AddAnnonceComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    DataTablesModule,    
  ]
})
export class AnnoncesModule { }
