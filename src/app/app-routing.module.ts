import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DancesComponent } from './dances/dances.component';
import { GymsComponent } from './gyms/gyms.component';
import { HomeComponent } from './home/home.component';
import { SportComponent } from './sport/sport.component';


const routes: Routes = [
  { path: 'gyms', component: GymsComponent },
  { path: 'dances', component: DancesComponent },
  { path: 'sport', component: SportComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
