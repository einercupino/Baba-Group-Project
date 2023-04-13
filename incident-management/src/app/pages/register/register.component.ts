import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormT: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
  });

  submitted = false;
  authError= false;

  public errorMessage: string;
  
  constructor(private route: ActivatedRoute,private formBuilder:FormBuilder,private auth:AuthService,private router:Router) { this.errorMessage="" }
  //adding validations to the registerForm 
  ngOnInit(): void {
    this.registerFormT= this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      email: ['',Validators.email],
      displayName: ['',Validators.required]
    })
  }
  ///

  public submit() {
    this.submitted=true;
    
    if(this.registerFormT.invalid){
      return;
    }

    console.log("New User data: ",this.registerFormT.value);
    
    this.auth.register(this.registerFormT.value)
    .subscribe((res)=>{
        this.authError=false;
        this.router.navigate(['/login']);
    },
    (err)=>{
        console.log("Register error ",err.error.msg);
        this.authError= err.error.msg;
    })

  }
  get registerForm(): { [key: string]: AbstractControl } {
    return this.registerFormT.controls;
  }

}
