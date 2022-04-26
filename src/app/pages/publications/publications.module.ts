import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { TablesRoutingModule } from './publications-routing.module';
import { PublicationsListComponent } from './publications-list/publications-list.component';
import { DataTablesModule } from 'angular-datatables';
import { AddPublicationComponent } from './add-publication/add-publication.component';
import { EditPublicationComponent } from './edit-publication/edit-publication.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UIModule } from '../../shared/ui/ui.module';

@NgModule({
  declarations: [PublicationsListComponent, AddPublicationComponent, EditPublicationComponent],
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
    CKEditorModule,
    UIModule
  ]
})
export class PublicationsModule { }
