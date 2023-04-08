import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-incidents',
  templateUrl: './add-incidents.component.html',
  styleUrls: ['./add-incidents.component.css']
})
export class AddIncidentsComponent implements OnInit {
  title!: string;

  formBuilder: FormBuilder = new FormBuilder;

  incidentForm = this.formBuilder.group({
    state: '',
    customerName: '',
    priority:'',
    customerContact:'',
    type:'',
    createdBy:'',
    description:''
  });

  constructor(private route: ActivatedRoute){  }

  public submit() {
    console.log("New Incident data: ",this.incidentForm.value);
  }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
  }

}
