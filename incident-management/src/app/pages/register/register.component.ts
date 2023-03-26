import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title!: string;

  formBuilder: FormBuilder = new FormBuilder;

  registerForn = this.formBuilder.group({
    username: '',
    password: '',
    email:'',
    displayName:''
  });

  constructor(private route: ActivatedRoute){  }

  public submit() {
    console.log("New User data: ",this.registerForn.value);
  }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
  }

}
