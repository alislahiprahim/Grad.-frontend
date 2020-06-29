import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-profile',
  templateUrl: './program-profile.component.html',
  styleUrls: ['./program-profile.component.scss']
})
export class ProgramProfileComponent implements OnInit {

  adult: Number = 1
  children: Number = 0
  i = 1
  j = 1
  constructor() { }

  ngOnInit(): void {
  }

  plus(event) {
    if (event == 'a') {
      if (this.i != 100) {
        this.i++;
        this.adult = this.i
      }
    }
    if (event == 'c') {
      if (this.j != 100) {
        this.j++;
        this.children = this.j
      }
    }

  }

  minus(event) {
    if (event == 'a') {
      if (this.i != 1) {
        this.i--;
        this.adult = this.i
      }
    }
    if (event == 'c') {
      if (this.j != 0) {
        this.j--;
        this.children = this.j
      }
    }

  }

}
