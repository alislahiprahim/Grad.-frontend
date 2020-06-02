import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  username: any;
  password: any;
  email: any;
  gender: any;
  phone: any;

  constructor(public myAuthService: AuthService, private myrouter: Router) { }

  ngOnInit(): void {
  }

  register() {

    const { username, password, email, phone, gender } = this
    debugger
    this.myAuthService.P_register({ username, password, email, phone, gender }).subscribe((resp: any) => {
      localStorage.setItem('token', resp.token)
      this.myrouter.navigate(['home']);
    })

  }

  login() {
    const { email, password } = this
    this.myAuthService.login({ email, password }).subscribe((resp: any) => {
      localStorage.setItem('token', resp.token)
      this.myrouter.navigate(['home']);
    })
  }


}
