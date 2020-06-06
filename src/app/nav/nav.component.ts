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
    debugger  
    this.myAuthService.P_register({ username, password, email, phone, gender,age }).subscribe((resp: any) => {
      localStorage.setItem('token', resp.token)
      this.myrouter.navigate(['home']);
    })

  }

  login() {
    const { loginFormModalEmail, loginFormModalPassword } = this
    const email = loginFormModalEmail.value
    const password = loginFormModalPassword.value

    this.myAuthService.login({ email, password }).subscribe((resp: any) => {
      localStorage.setItem('token', resp.token)
      this.myrouter.navigate(['home']);
    })
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

