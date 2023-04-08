import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIncidentsComponent } from './pages/add-incidents/add-incidents.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'login',component:LoginComponent, data:{title:'Login'}},
  {path: 'register',component:RegisterComponent, data:{title:'Register'}},
  {path: 'incidents/create',component:AddIncidentsComponent, data:{title:'Create Incidents'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
