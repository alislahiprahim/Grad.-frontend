import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { patientService } from '../services/patient.services';
import { DoctorService } from '../services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

  Did = this.myActivatedRoute.snapshot.paramMap.get('id')

  hoveredDate: NgbDate | null = null;
  agreeConditions:any=false

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  MP_object = new MainProblem
  MH_object = new medicalHistory
  doctorQuesAns: any = []
  avilableDuration: any
  DData: any;

  constructor(config: NgbModalConfig,private modalService: NgbModal, private myelementRef: ElementRef, private _snackBar: MatSnackBar, private myDoctorService: DoctorService, private myActivatedRoute: ActivatedRoute, calendar: NgbCalendar, private mypatientService: patientService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngAfterViewInit(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#195e83'
  }
  ngOnDestroy(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f3f7f3'
  }


  ngOnInit(): void {
    if (!this.DData) {
      this.getDoctorProfile()
    }
  }

  getDoctorProfile() {
    const { Did } = this

    this.myDoctorService.getDoctorProfile({ Did }).subscribe((resp: any) => {
      this.DData = resp.data
      debugger

    })

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
    this.avilableDuration = { toDate: this.toDate, fromDate: this.fromDate }
    this.mypatientService.fill_diagnosis({ MainProblem: this.MP_object, medicalHistory: this.MH_object, avilableDuration: this.avilableDuration, doctorQuesAns: this.doctorQuesAns, doctorID: this.Did }).subscribe((resp: any) => {
      if (resp.data) {
        setTimeout(() => {
          this.openSnackBar('Diagnosis Created Successfully', 'done')
        }, 2000);
        window.close()
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
