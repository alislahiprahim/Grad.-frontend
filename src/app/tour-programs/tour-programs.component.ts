import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tour-programs',
  templateUrl: './tour-programs.component.html',
  styleUrls: ['./tour-programs.component.scss']
})
export class TourProgramsComponent implements OnInit {

  constructor(private myelementRef: ElementRef) { }
  arr = [1, 2, 3]
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f2f2f2'
  }
  ngOnDestroy(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff'

  }


}
