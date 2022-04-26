import { EditPublicationComponent } from './edit-publication/edit-publication.component';
import { AddPublicationComponent } from './add-publication/add-publication.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicationsListComponent } from './publications-list/publications-list.component';


const routes: Routes = [
    
    {
        path: '',
        component: PublicationsListComponent
    },
    {
        path: 'add-publication',
        component: AddPublicationComponent
    },
    {
        path: 'edit-publication/:id',
        component: EditPublicationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TablesRoutingModule { }
