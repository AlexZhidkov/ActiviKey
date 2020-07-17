import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from '../environments/environment';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DancesComponent } from './dances/dances.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventsManagementComponent } from './events-management/events-management.component';
import { GymsComponent } from './gyms/gyms.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material-module';
import { SportComponent } from './sport/sport.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GymsComponent,
    DancesComponent,
    SportComponent,
    AdminComponent,
    LoginComponent,
    EventsManagementComponent,
    EventEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FlexLayoutModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, undefined, {
      toastMessageOnAuthSuccess: false,
      authGuardFallbackURL: '/login',
      authGuardLoggedInURL: '/'
    }),
    MatPasswordStrengthModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
