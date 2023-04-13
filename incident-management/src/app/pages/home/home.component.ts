import { Component, OnInit } from '@angular/core';
import { IncidentsService } from 'src/app/services/incidents.service';
import { Incident } from 'src/app/Model/incident.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  incidents: Incident[] = [];
  
  constructor(private incidentService:IncidentsService,private router:Router) { }

  ngOnInit(): void {
    //getting the incidents list on loading
    this.incidentService.getIncidents()
    .subscribe(
      (res)=>{
        //saving response to local state
        console.log("Incident data: ",res);
        this.incidents= res;
      },
      (err)=>{
        console.log("Fetcing data error : ",err);
      }
    )
  }
  //handling the edit part
  handleEdit(value:Incident){
    //routing to edit page
    console.log("The id click: ",value);
    this.incidentService.setSelectedIncident(value);
    this.router.navigate(['/incidents/edit']);
  }
  //deleting the id 
  handleDelete(id:number){
    this.incidentService.deleteIncident(id)
    .subscribe(
      (res)=>{
        console.log("dEleted..");
        //reloading the page
        this.ngOnInit();
      },
      (err)=>{
        console.log("Delete error: ",err);
      }
    )
  }
}
