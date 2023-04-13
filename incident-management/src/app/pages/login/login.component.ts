
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl,AbstractControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title!: string;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submitted = false;
  authError= false;

  public errorMessage: string;
  
  constructor(private route: ActivatedRoute,private formBuilder:FormBuilder,private auth:AuthService,private router:Router) { this.errorMessage="" }
  //adding validations to the form 
  ngOnInit(): void {
    this.form= this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  get loginForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public submit() {
    this.submitted=true;
    
    if(this.form.invalid){
      return;
    }
    console.log("Login data: ",this.form.value);
    
    this.auth.login(this.form.value.username,this.form.value.password)
    .subscribe((response)=>{
        this.authError=false;
        this.auth.setLocalStorage(response);
        this.auth.setUserData(response);
        this.router.navigate(['/incidents']);
      },
      // If there is an error
      (error) => {
        console.log("Login error ",error.error.msg);
        this.authError= error.error.msg;
    });
    
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
