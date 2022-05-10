import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './dashboards/default/default.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ClientagentComponent } from './clientagent/clientagent.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
 
  { path: 'dashboard', component: DefaultComponent },
  { path: 'annonces', loadChildren: () => import('./annonces/annonces.module').then(m => m.AnnoncesModule) },
  { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
  { path: 'publications', loadChildren: () => import('./publications/publications.module').then(m => m.PublicationsModule) },
  { path: 'agents', loadChildren: () => import('./agents/agents.module').then(m => m.AgentsModule) },
  { path: 'chat', component: ChatComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'clientsagent', component: ClientagentComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
