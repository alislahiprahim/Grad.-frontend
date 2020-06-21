import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendURL = 'http://localhost:8085/patient/';

  constructor(private myHttpClient: HttpClient) { }

  P_register(data) {
    return this.myHttpClient.post(this.backendURL + 'signUp', data)
  }

  d_register(data) {
    return this.myHttpClient.post('http://localhost:8085/doctor/' + 'signUp', data)
  }

  login(data) {
    return this.myHttpClient.post('http://localhost:8085/login/', data)
  }

  isLoggedin() {
    return !!localStorage.getItem('token');
  }


  logout() {
    localStorage.removeItem('type')
    localStorage.removeItem('id')
    return localStorage.removeItem('token')


  }

  getToken() {
    return localStorage.getItem('token')
  }

  getType() {
    return localStorage.getItem('type')
  }


}
