import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  Doctors: any

  constructor(public myAdminServices: AdminServices) { }

  ngOnInit(): void {
    if (this.Doctors) { } else { this.listDoctors() }
  }

  listDoctors() {
    this.myAdminServices.listDoctors().subscribe((resp: any) => {
      if (resp.message == 'success') {
        console.log(resp)
        this.Doctors = resp.data
      }
      else {
        alert('response error')
      }
    })
  };

  approveDoc(Did,flag) {

    this.myAdminServices.approveDoc({ ID: Did, approveFlag: flag }).subscribe((resp: any) => {
      console.log(resp.any)
    })
  }

}
