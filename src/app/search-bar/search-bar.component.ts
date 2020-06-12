import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public innerWidth: any
  cities: any;
  areas: any;
  selectedValue: any;
  selectedValue2: any;
  location: any
  area: any

  constructor(private myCitiesService: CitiesService, private myRouter: Router) { }


  ngOnInit(): void {
    this.getCities();
    this.innerWidth = window.innerWidth
  }

  getCities() {
    this.cities = this.myCitiesService.getGovernoratesWithSubregions()

  }
  getAreas(city_name) {
    this.areas = this.myCitiesService.getSubregionsByname(city_name)
  }

  onSelectValue(val) {

    this.selectedValue = val
    this.location = this.selectedValue
  }

  onSelectValue2(val) {

    this.selectedValue2 = val
    this.area = this.selectedValue2
  }


  SearchDoc() {

    this.myRouter.navigate(['home',this.location])

  }

}
