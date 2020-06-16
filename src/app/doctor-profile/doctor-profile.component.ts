import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DiagnosisFormComponent } from '../diagnosis-form/diagnosis-form.component';


export interface DialogData {
  DId(DId: any);
  questions: []
}

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  Did = this.myActivatedRoute.snapshot.paramMap.get('id')
  DData: any;
  apiData: any;

  constructor(private myMatDialog: MatDialog, private myelementRef: ElementRef, private myHttpClient: HttpClient, private myActivatedRoute: ActivatedRoute, public myDoctorService: DoctorService) { }


  ngAfterViewInit(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#195e83'
  }
  ngOnDestroy(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f3f7f3'

  }

  ngOnInit() {
    this.getDoctorProfile()
  }

  getDoctorProfile() {
    const { Did } = this

    this.myDoctorService.getDoctorProfile({ Did }).subscribe((resp: any) => {
      this.DData = resp.data

    })

  }

  openDialog() {
    const dialogRef = this.myMatDialog.open(DiagnosisFormComponent, {
      data: { DId: this.Did, questions: this.DData.Questions },
      height: '100vh',
      maxHeight:'100vh',
      width:'150vh',
      maxWidth:'150vh'
    });


  }



}