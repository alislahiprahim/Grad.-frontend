import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { DialogData } from '../doctor-profile/doctor-profile.component';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { patientService } from '../services/patient.services';


class MainProblem {

  public problemsArr: any = [];
  public text_problem: any = '';
}

class medicalHistory {
  public text_medical: any = '';
  public medicalArr: any = [];
}

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.scss']
})
export class DiagnosisFormComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  MP_object = new MainProblem
  MH_object = new medicalHistory
  doctorQuesAns: any = []
  avilableDuration: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, calendar: NgbCalendar, private mypatientService: patientService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
  }

  getMainProblem(e) {
    this.MP_object.problemsArr.push(e.target.value)
  }

  getMedicalHitory(e) {
    this.MH_object.medicalArr.push(e.target.value)
  }


  addDiagnosis(event) {

    let val = event.target.value
    this.doctorQuesAns.push(val)
    console.log(this.doctorQuesAns)
  }



  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }


  sendDiagnosis() {
    console.log(this.MH_object, this.MP_object, this.doctorQuesAns, this.fromDate, this.toDate)
    this.avilableDuration = { toDate: this.toDate, fromDate: this.fromDate }
    this.mypatientService.fill_diagnosis({ MainProblem: this.MP_object, medicalHistory: this.MH_object, avilableDuration: this.avilableDuration, doctorQuesAns: this.doctorQuesAns, doctorID: this.data.DId }).subscribe((resp: any) => {
      console.log(resp)
    })
  }



}
