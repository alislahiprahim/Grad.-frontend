import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  Did = this.myActivatedRoute.snapshot.paramMap.get('id')
  DData: any;

  constructor(private myActivatedRoute: ActivatedRoute, public myDoctorService: DoctorService) { }

  ngOnInit() {
    this.getDoctorProfile()
  }

  getDoctorProfile() {
    const { Did } = this

    this.myDoctorService.getDoctorProfile({ Did }).subscribe((resp: any) => {
      this.DData = resp.DData
  
    })

  }


}
