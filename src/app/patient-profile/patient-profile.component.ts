import { Component, OnInit } from '@angular/core';
import { patientService } from '../services/patient.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  treatmentPlans: any
  diagnosis_form: any;

  constructor(public mypatientService: patientService, private _snackBar: MatSnackBar, private myRouter: Router) { }

  ngOnInit(): void {
    this.get_patient()
  }

  get_patient() {
    this.mypatientService.get_patient().subscribe((resp: any) => {
      debugger
      this.treatmentPlans = resp.data
      this.diagnosis_form = resp.patient.diagnosisForm
    })
  }

  approveTreat(Did, flag) {
    this.mypatientService.treatment_Approvment({ treatmentID: Did, accept_flag: flag }).subscribe((resp: any) => {
      if (resp.message == 'success') {
        if (flag == 'true') {
          this.openSnackBar('Approvement', 'Done')
          this.get_patient()
          setTimeout(() => {
            this.openSnackBar('Directing to tourism programs', '...')
          }, 500)
          setTimeout(() => {
            this.myRouter.navigate(['/programstour', resp.data.location.location])
          }, 1000)
        } else {
          this.openSnackBar('DisApprovement', 'Done')
          this.get_patient()
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


}
