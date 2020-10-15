import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FactureListComponent } from './facture-list/facture-list.component';
import { SingleFactureComponent } from './facture-list/single-facture/single-facture.component';
import { FactureFormComponent } from './facture-list/facture-form/facture-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FacturesService } from './services/factures.service';
import { ContratService } from './services/contrat.service';
import { ClientService } from './services/client.service';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ContratListComponent } from './contrat-list/contrat-list.component';
import { SingleContratComponent } from './contrat-list/single-contrat/single-contrat.component';
import { ContratFormComponent } from './contrat-list/contrat-form/contrat-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { SingleClientComponent } from './client-list/single-client/single-client.component';
import { ClientFormComponent } from './client-list/client-form/client-form.component';
import { UserFormComponent } from './user-info/user-form/user-form.component';
import { UserSingleComponent } from './user-info/user-single/user-single.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'factures', canActivate: [AuthGuardService], component: FactureListComponent },
  { path: 'factures/new', canActivate: [AuthGuardService], component: FactureFormComponent },
  { path: 'factures/view/:id', canActivate: [AuthGuardService], component: SingleFactureComponent },
  { path: 'contrats', canActivate: [AuthGuardService], component: ContratListComponent},
  { path: 'contrats/new', canActivate: [AuthGuardService], component: ContratFormComponent},
  { path: 'contrats/view/:id', canActivate: [AuthGuardService], component: SingleContratComponent},
  { path: 'clients', canActivate: [AuthGuardService], component: ClientListComponent},
  { path: 'clients/new', canActivate: [AuthGuardService], component: ClientFormComponent},
  { path: 'clients/view/:id', canActivate: [AuthGuardService], component: SingleClientComponent},
  { path: 'user', canActivate : [AuthGuardService], component: UserSingleComponent },
  { path: 'user/edit', canActivate: [AuthGuardService], component: UserFormComponent},
  { path: '', redirectTo: 'factures', pathMatch: 'full'},
  { path: '***', redirectTo: 'factures'}
];


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    FactureListComponent,
    SingleFactureComponent,
    FactureFormComponent,
    HeaderComponent,
    ContratListComponent,
    SingleContratComponent,
    ContratFormComponent,
    ClientListComponent,
    SingleClientComponent,
    ClientFormComponent,
    UserFormComponent,
    UserSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, AuthGuardService, FacturesService, ContratService, ClientService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
