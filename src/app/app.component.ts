import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private myelementRef: ElementRef) { }

  ngAfterViewInit(): void {
   this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor='#f3f7f3' 
  }
}
