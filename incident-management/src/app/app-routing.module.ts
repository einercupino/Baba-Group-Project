import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIncidentsComponent } from './pages/add-incidents/add-incidents.component';
import { EditIncidentComponent } from './pages/edit-incident/edit-incident.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: 'incidents', component: HomeComponent, data: {title: 'Home'},canActivate:[AuthGuardService]},
  {path: 'login',component:LoginComponent, data:{title:'Login'}},
  {path: 'register',component:RegisterComponent, data:{title:'Register'}},
  {path: 'incidents/create',component:AddIncidentsComponent, data:{title:'Create Incidents'},canActivate:[AuthGuardService]},
  {path: 'incidents/edit',component:EditIncidentComponent,data:{title:'Edit Incident'},canActivate:[AuthGuardService]},
  {path: '', redirectTo: '/incidents', pathMatch: 'full'},
  {path: '**', redirectTo: '/incidents', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
