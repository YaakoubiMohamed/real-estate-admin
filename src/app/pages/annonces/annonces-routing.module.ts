import { AddAnnonceComponent } from './add-annonce/add-annonce.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnoncesListComponent } from './annonces-list/annonces-list.component';
import { EditAnnonceComponent } from './edit-annonce/edit-annonce.component';


const routes: Routes = [
    
    {
        path: '',
        component: AnnoncesListComponent
    },
    {
        path: 'add-annonce',
        component: AddAnnonceComponent
    },
    {
        path: 'edit-annonce/:id',
        component: EditAnnonceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TablesRoutingModule { }
