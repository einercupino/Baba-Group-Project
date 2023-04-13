import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Incident } from 'src/app/Model/incident.model';
import { IncidentsService } from 'src/app/services/incidents.service';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css']
})
export class EditIncidentComponent implements OnInit {
  
  incidentData!: Incident;
  
  ngOnInit(): void {
    this.incidentData=this.incidentService.getSelectedIncident();
    this.title = this.route.snapshot.data['title'];
  }
  title!: string;

  formBuilder: FormBuilder = new FormBuilder;

  incidentEditForm = this.formBuilder.group({
    number: `${this.incidentService.selectedIncident.number}`,
    state: `${this.incidentService.selectedIncident.state}`,
    customerName: `${this.incidentService.selectedIncident.custname}`,
    priority:`${this.incidentService.selectedIncident.priority}`,
    customerContact:`${this.incidentService.selectedIncident.custcontact}`,
    type:`${this.incidentService.selectedIncident.type}`,
    createdBy:`${this.incidentService.selectedIncident.createdby}`,
    description:`${this.incidentService.selectedIncident.description}`
  });

  constructor(private route: ActivatedRoute,private incidentService:IncidentsService,private router:Router){  }

  public submit() {
    console.log("New edited Incident data: ",this.incidentEditForm.value);
    const payload={
        _id:this.incidentEditForm.value.number,
        state: this.incidentEditForm.value.state,
        priority: this.incidentEditForm.value.priority,
        type: this.incidentEditForm.value.type,
        custname: this.incidentEditForm.value.customerName,
        custcontact: this.incidentEditForm.value.customerContact,
        createdby: this.incidentEditForm.value.createdBy,
        description: this.incidentEditForm.value.description
    }
    if(this.incidentService.selectedIncident._id)
    this.incidentService.editIncident(this.incidentService.selectedIncident._id,payload)
    .subscribe(
      (res)=>{
        this.router.navigate(['/incidents'])
      },
      (err)=>{
        console.log("Fetcing data error : ",err);
      }
    )
  }

}
