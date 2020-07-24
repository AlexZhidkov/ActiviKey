import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { AdminComponent } from './admin/admin.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventsManagementComponent } from './events-management/events-management.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PartnersListComponent } from './partners-list/partners-list.component';
import { SettingsComponent } from './settings/settings.component';
import { WeeklyEventsListComponent } from './weekly-events-list/weekly-events-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [LoggedInGuard] },
  { path: 'partners', component: PartnersListComponent },
  { path: 'calendar', component: CalendarListComponent },
  { path: 'weekly', component: WeeklyEventsListComponent },
  { path: 'admin', component: AdminComponent, canActivate: [LoggedInGuard] },
  { path: 'event', component: EventEditComponent, canActivate: [LoggedInGuard] },
  { path: 'event/:id', component: EventEditComponent, canActivate: [LoggedInGuard] },
  { path: 'events', component: EventsManagementComponent, canActivate: [LoggedInGuard] },
  { path: 'admin/:activity', component: EventsManagementComponent, canActivate: [LoggedInGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
