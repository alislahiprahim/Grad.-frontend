import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  Did = this.myActivatedRoute.snapshot.paramMap.get('id')
  DData: any;
  apiData: any;

  constructor(private myelementRef: ElementRef, private myHttpClient: HttpClient, private myActivatedRoute: ActivatedRoute, public myDoctorService: DoctorService) { }


  ngAfterViewInit(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#195e83'
  }
  ngOnDestroy(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f3f7f3'

  }

  ngOnInit() {
    debugger
    this.getDoctorProfile()
  }

  getDoctorProfile() {
    const { Did } = this

    this.myDoctorService.getDoctorProfile({ Did }).subscribe((resp: any) => {
      debugger
      this.DData = resp.DData

    })

  }



}
