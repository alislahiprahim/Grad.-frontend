import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour-programs',
  templateUrl: './tour-programs.component.html',
  styleUrls: ['./tour-programs.component.scss']
})
export class TourProgramsComponent implements OnInit {

  constructor() { }
  arr=[1,2,3,4,5,6,7,8,9]
  ngOnInit(): void {
  }

}
