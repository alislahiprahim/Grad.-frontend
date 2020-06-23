import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  validatingForm: FormGroup;
  validatingForm2: FormGroup;
  type: any;
  id: any
  hide = true;
  email: any
  username: any
  password: any
  phone: any
  gender: any
  age: any

  constructor(public myAuthService: AuthService, private myrouter: Router) { }

  ngOnInit(): void {

  }



  register() {

    const {
      email,
      username,
      password,
      phone,
      gender,
      age
    } = this

    this.myAuthService.P_register({ username, password, email, phone, gender, age }).subscribe((resp: any) => {
      if (resp.token) {
        localStorage.setItem('token', resp.token)
        localStorage.setItem('type', resp.type)
        this.myrouter.navigate(['home']);
      }
    })

  }

  login() {
    const { email, password } = this
    this.myAuthService.login({ email, password }).subscribe((resp: any) => {
      debugger
      if (resp.token) {
        localStorage.setItem('token', resp.token)
        localStorage.setItem('type', resp.type)
        localStorage.setItem('id', resp.id)

        if (resp.type == 'patient') {
          this.myrouter.navigate(['home']);
        } else if (resp.type == 'doctor') {
          this.myrouter.navigate(['dashboard', localStorage.getItem('id')]);

        }
        else if (resp.type == 'travelAgent') {
          this.myrouter.navigate(['dashboard', localStorage.getItem('id')]);
          this.id = resp.id
        }
        else if (resp.type == 'admin') {
          this.myrouter.navigate(['admin']);
        }
        else {
          this.myrouter.navigate(['home']);
        }
      }
    })

  }

  myAccount() {

    if (localStorage.getItem('type') == 'patient') {
      this.myrouter.navigate(['Pdashboard', localStorage.getItem('id')]);
    }
    if (localStorage.getItem('type') == 'doctor') {
      this.myrouter.navigate(['dashboard', localStorage.getItem('id')]);
    }
    if (localStorage.getItem('type') == 'travelAgent') {
      //this.myrouter.navigate(['dashboard', this.id]);
    }
    if (localStorage.getItem('type') == 'admin') {
      this.myrouter.navigate(['admin']);
    }
  }




}

