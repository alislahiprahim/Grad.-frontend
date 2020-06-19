import { Component, OnInit } from '@angular/core';
import { patientService } from '../services/patient.services';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  treatmentPlans: any

  constructor(public mypatientService: patientService) { }

  ngOnInit(): void {
    this.get_patient()
  }

  get_patient() {
    this.mypatientService.get_patient().subscribe((resp: any) => {
      debugger
      this.treatmentPlans = resp.data
    })
  }

}
