import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class patientService {

    constructor(private myHttpClient: HttpClient) { }

    backendURL = 'http://localhost:8085/patient/'

    fill_diagnosis(data) {
        return this.myHttpClient.post(this.backendURL + 'fillDiagnosisForm', data)
    }
}