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

  constructor(public myAuthService: AuthService, private myrouter: Router) { }

  ngOnInit(): void {

    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });

    this.validatingForm2 = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
      signupFormModalPhone: new FormControl('', Validators.required),
      signupFormModalGender: new FormControl('', Validators.required),
      signupFormModalAge: new FormControl('', Validators.required),

    });
  }



  register() {

    const email = this.signupFormModalEmail.value
    const username = this.signupFormModalName.value
    const password = this.signupFormModalPassword.value
    const phone = this.signupFormModalPassword.value
    const gender = this.signupFormModalGender.value
    const age = this.signupFormModalAge.value

    this.myAuthService.P_register({ username, password, email, phone, gender, age }).subscribe((resp: any) => {
      if (resp.token) {
        localStorage.setItem('token', resp.token)
        localStorage.setItem('type', resp.type)
        this.myrouter.navigate(['home']);
      }
    })

  }

  login() {
    const { loginFormModalEmail, loginFormModalPassword } = this
    const email = loginFormModalEmail.value
    const password = loginFormModalPassword.value

    this.myAuthService.login({ email, password }).subscribe((resp: any) => {
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
        } else {
          this.myrouter.navigate(['home']);
        }
      }
    })

  }

  myAccount() {
    
    if (localStorage.getItem('type') == 'patient') {
      // navigate patient profile
    }
    if (localStorage.getItem('type') == 'doctor') {
      this.myrouter.navigate(['dashboard', localStorage.getItem('id')]);
    }
    if (localStorage.getItem('type') == 'travelAgent') {
      //this.myrouter.navigate(['dashboard', this.id]);
    }
  }


  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }


  get signupFormModalName() {
    return this.validatingForm2.get('signupFormModalName');
  }

  get signupFormModalEmail() {
    return this.validatingForm2.get('signupFormModalEmail');
  }

  get signupFormModalPassword() {
    return this.validatingForm2.get('signupFormModalPassword');
  }

  get signupFormModalPhone() {
    return this.validatingForm2.get('signupFormModalPhone');
  }

  get signupFormModalGender() {
    return this.validatingForm2.get('signupFormModalGender');
  }

  get signupFormModalAge() {
    return this.validatingForm2.get('signupFormModalAge');
  }



}

