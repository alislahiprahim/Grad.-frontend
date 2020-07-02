import { Component, OnInit } from '@angular/core';
import { travelAgentService } from '../services/travel-agent.service';

@Component({
  selector: 'app-travel-dashboard',
  templateUrl: './travel-dashboard.component.html',
  styleUrls: ['./travel-dashboard.component.scss']
})
export class TravelDashboardComponent implements OnInit {

  Tdata: any

  constructor(private mytravelAgentService: travelAgentService) { }

  ngOnInit(): void {

  }

  getAccount() {
    this.mytravelAgentService.getAccount().subscribe((resp: any) => {
      this.Tdata = resp.data
    })
  }

}
