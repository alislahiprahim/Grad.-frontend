import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-travel-agent-sign-up',
  templateUrl: './travel-agent-sign-up.component.html',
  styleUrls: ['./travel-agent-sign-up.component.scss']
})
export class TravelAgentSignUpComponent implements OnInit {

  location: any = this.route.snapshot.queryParams.location;
  area: any = this.route.snapshot.queryParams.area;
  cities: any;
  areas: any
  constructor(private myCitiesService: CitiesService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCities()
  }

  hide = true;

  getCities() {
    this.cities = this.myCitiesService.getGovernoratesWithSubregions()

  }
  getAreas(event) {
    if (event.target.value == 'all') {
      this.location = ''
      this.area = ''
    } else {
      this.location = event.target.value
      this.areas = this.myCitiesService.getSubregionsByname(this.location)
    }
  }

}
