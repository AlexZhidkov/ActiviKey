import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { AdminComponent } from './admin/admin.component';
import { DancesComponent } from './dances/dances.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventsManagementComponent } from './events-management/events-management.component';
import { GymsComponent } from './gyms/gyms.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SportComponent } from './sport/sport.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'gyms', component: GymsComponent },
  { path: 'dances', component: DancesComponent },
  { path: 'sport', component: SportComponent },
  { path: 'sport', component: SportComponent },
  { path: 'admin', component: AdminComponent, canActivate: [LoggedInGuard] },
  { path: 'event', component: EventEditComponent, canActivate: [LoggedInGuard] },
  { path: 'events', component: EventsManagementComponent, canActivate: [LoggedInGuard] },
  { path: 'admin/:activity', component: EventsManagementComponent, canActivate: [LoggedInGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
