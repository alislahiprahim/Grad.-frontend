import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorDashboardComponent implements OnInit {

  panelOpenState = false;
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;


  Did = this.myActivatedRoute.snapshot.paramMap.get('id')
  DData: any;
  Patients: any;
  Diagnosis_Form: any
  public img: any;
  public username: any;
  public gender: any;
  cost: any;
  description: any;
  treatmentPlan: any;
  Patient_TP: any;
  Patient_DF: any;


  constructor(private config: NgbDatepickerConfig, calendar: NgbCalendar, public myDoctorService: DoctorService, private myActivatedRoute: ActivatedRoute, private modalService: NgbModal) {

    this.config.maxDate = { year: 2020, month: 7, day: 30 };
    this.config.minDate = { year: 2020, month: 6, day: 9 };

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    if (!this.DData) { this.getDoctor(); }
    if (!this.Diagnosis_Form) { this.getAllDiagnosis() }
    if (!this.treatmentPlan) { this.getAllTreatmentPlan() }
  }

  getDoctor() {
    this.myDoctorService.getDoctorProfile({ Did: this.Did }).subscribe((resp: any) => {

      this.DData = resp.data
      this.Patients = this.DData.patients
      this.img = this.DData.profileIMG
      this.username = this.DData.username
    })

  }

  getAllDiagnosis() {
    this.myDoctorService.getAllDiagnosis().subscribe((resp: any) => {
      this.Diagnosis_Form = resp.data
    })
  }

  getDiagnosis(pid) {
    this.Patient_DF = this.Diagnosis_Form.find(df => {
      return df.patientID._id == pid
    })
  }

  getAllTreatmentPlan() {

    this.myDoctorService.getTreatment().subscribe((resp: any) => {
      this.treatmentPlan = resp.data
    })
  }

  geTreatment(pid) {
    this.Patient_TP = this.treatmentPlan.find(tp => {
      return tp.patientID._id == pid
    })
  }
  checkTreatment(pid): Boolean {

    const ts = this.treatmentPlan.find(tp => {
      if (tp.patientID._id == pid) {
    
        return true;
      } else { return false }
    });
    return ts
  }

  sendTreatmentPlan(Pid) {

    this.myDoctorService.createTreatmentPlan({ description: this.description, cost: this.cost, treatmentDate: { toDate: this.toDate, fromDate: this.fromDate }, patientID: Pid }).subscribe((resp: any) => {
      console.log(resp.data)
      if (resp.message == 'success') {
        
      }
    })

  };


  openLg(content) {
    this.modalService.open(content, { size: 'xl', scrollable: true, centered: true });
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



}
