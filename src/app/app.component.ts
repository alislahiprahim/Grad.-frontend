import { Component, ElementRef, OnInit } from '@angular/core';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private myelementRef: ElementRef) { }
  value = 'Doctourism.com@gmail.com'
  ngAfterViewInit(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff'
  }
  hide = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (localStorage.getItem('type') == 'admin' || localStorage.getItem('type') == 'doctor') {
      this.hide = true
    }
  }
}
