import { Component, OnInit, ElementRef } from '@angular/core';
import { travelAgentService } from '../services/travel-agent.service';

@Component({
  selector: 'app-tour-programs',
  templateUrl: './tour-programs.component.html',
  styleUrls: ['./tour-programs.component.scss']
})
export class TourProgramsComponent implements OnInit {
  Allprograms: any;

  constructor(private myelementRef: ElementRef, private mytravelAgentService: travelAgentService) { }
  arr = ["Sea Tours" , "Culture Tours" , "Romantic" ,"Nile Tours" , "Adventure Tours" , "Fishing" , "Honey Moon" , "Religious Tours" , "Surfing"]

  ngOnInit(): void {
    this.getAllprograms()
  }

  ngAfterViewInit(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f2f2f2'
  }
  ngOnDestroy(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff'

  }

  getAllprograms() {
    this.mytravelAgentService.getAllprograms().subscribe((resp: any) => {
      this.Allprograms = resp.data
    })
  }


}
