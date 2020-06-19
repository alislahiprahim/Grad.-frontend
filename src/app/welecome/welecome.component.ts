import { Component, OnInit ,HostListener} from '@angular/core';


@Component({
  selector: 'app-welecome',
  templateUrl: './welecome.component.html',
  styleUrls: ['./welecome.component.scss']
})


export class WelecomeComponent implements OnInit {

  scrHeight:any;
  scrWidth:any; 
  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.scrHeight = window.innerHeight + "px";
          this.scrWidth = window.innerWidth + "px";
          console.log(this.scrHeight, this.scrWidth);
    }

  constructor(){ }

  ngOnInit(): void {
    
    
  }

}
