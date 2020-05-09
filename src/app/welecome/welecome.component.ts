import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welecome',
  templateUrl: './welecome.component.html',
  styleUrls: ['./welecome.component.scss']
})
export class WelecomeComponent implements OnInit {

  constructor(private myelementRef:ElementRef) { }


  ngOnInit(): void {
  }

}
