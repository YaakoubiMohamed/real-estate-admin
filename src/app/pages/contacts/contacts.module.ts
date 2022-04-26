import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';



import { ContactsRoutingModule } from './contacts-routing.module';

import { UsergridComponent } from './usergrid/usergrid.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ProfileComponent } from './profile/profile.component';
import { UIModule } from '../../shared/ui/ui.module';

@NgModule({
  declarations: [UsergridComponent, UserlistComponent, ProfileComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule, ReactiveFormsModule ,
    NgbTooltipModule,
    UIModule
  ]
})
export class ContactsModule { }
