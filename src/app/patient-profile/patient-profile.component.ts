import { Component, OnInit } from '@angular/core';
import { patientService } from '../services/patient.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnapshotAction } from '@angular/fire/database';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  treatmentPlans: any

  constructor(public mypatientService: patientService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.get_patient()
  }

  get_patient() {
    this.mypatientService.get_patient().subscribe((resp: any) => {
      debugger
      this.treatmentPlans = resp.data
    })
  }

  approveTreat(Did, flag) {
    this.mypatientService.treatment_Approvment({ treatmentID: Did, accept_flag: flag }).subscribe((resp: any) => {
      if (resp.message == 'success') {
        if (flag == 'true') {
          this.openSnackBar('Approvement', 'Done')
          this.get_patient()
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
