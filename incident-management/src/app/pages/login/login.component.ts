import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title!: string;
  formBuilder: FormBuilder = new FormBuilder;

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });
  public errorMessage: string;
  

  constructor(private route: ActivatedRoute) { this.errorMessage="" }
  
  public submit() {
    console.log("Login data: ",this.loginForm.value);
  }

  ngOnInit(): void {

  }

}
