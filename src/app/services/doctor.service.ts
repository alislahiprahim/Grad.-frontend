import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DoctorService {

    backendURL = 'http://localhost:8085/doctor/'

    constructor(private myHttpClient: HttpClient) { }

    getDoctors() {
        return this.myHttpClient.get(this.backendURL + 'listAll')
    }

    getDoctorProfile(Did) {
        return this.myHttpClient.post(this.backendURL + 'account', Did)
    }

}
