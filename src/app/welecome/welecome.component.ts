import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';


@Component({
  selector: 'app-welecome',
  templateUrl: './welecome.component.html',
  styleUrls: ['./welecome.component.scss']
})


export class WelecomeComponent implements OnInit {
  cities: any;
  areas: any;
  selectedValue: any
  selectedValue2: any;
  constructor(private myCitiesService: CitiesService) { }


  ngOnInit(): void {
    this.getCities()
  }

  getCities() {
    this.cities = this.myCitiesService.getGovernoratesWithSubregions()

  }
  getAreas(city_name) {
    this.areas = this.myCitiesService.getSubregionsByname(city_name)
  }

  onSelectValue(val) {
    this.selectedValue = val
  }

  onSelectValue2(val){
    
    this.selectedValue2 = val
  }

}
