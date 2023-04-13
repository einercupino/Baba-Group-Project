import { Injectable } from '@angular/core';
import { HttpHeaderResponse, HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Incident } from '../Model/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  apiUrlExpress= 'http://localhost:3000/';
  selectedIncident!: Incident;

  constructor(private http:HttpClient){
    //do nothing
  }
  getIncidents():Observable<any>{
    return this.http.get(`${this.apiUrlExpress}incidents`);
  }

  addIncidents(payload:any):Observable<any>{
    return this.http.post(`${this.apiUrlExpress}incidents/create`,payload);
  }

  editIncident(id:number,payload:any):Observable<any>{
    return this.http.post(`${this.apiUrlExpress}incidents/update/${id}`,payload);
  }

  setSelectedIncident(value:Incident){
    this.selectedIncident= value;
  }

  getSelectedIncident(){
    return this.selectedIncident;
  }

  deleteIncident(id:number){
    return this.http.get(`${this.apiUrlExpress}incidents/delete/${id}`);
  }
}
