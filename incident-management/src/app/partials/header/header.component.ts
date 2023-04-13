import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  displayName!: string | null;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn(){
    if(this.auth.getToken()){
      return true
    }
    return false;
  }

  getDisplay(){
    if(this.auth.getDisplayName()){
      this.displayName= this.auth.getDisplayName();
      return true;
    }
    return false;
  }

  logoutUser(){
    this.auth.logout();
  }
}
