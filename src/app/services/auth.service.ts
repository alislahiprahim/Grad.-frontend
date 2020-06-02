import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendURL = 'http://localhost:8080/patient/';

  constructor(private myHttpClient: HttpClient) { }

  P_register(data) {
    return this.myHttpClient.post(this.backendURL + 'signUp', data)
  }


  login(data) {
    return this.myHttpClient.post('http://localhost:8080/login/', data)
  }

  isLoggedin() {
    return !!localStorage.getItem('token');
  }

  
  logout(){
    return localStorage.removeItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

}
