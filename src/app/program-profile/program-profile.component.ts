import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { travelAgentService } from '../services/travel-agent.service';

@Component({
  selector: 'app-program-profile',
  templateUrl: './program-profile.component.html',
  styleUrls: ['./program-profile.component.scss']
})
export class ProgramProfileComponent implements OnInit {

  prog_id = this.myActivatedRoute.snapshot.paramMap.get('id')

  adult: Number = 1
  children: Number = 0
  i = 1
  j = 1
  programData: any;

  constructor(private myActivatedRoute: ActivatedRoute, private mytravelAgentService: travelAgentService) { }

  ngOnInit(): void {
    this.getProgram()
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

  getProgram() {
    this.mytravelAgentService.getprogram({ programID: this.prog_id }).subscribe((resp: any) => {
      this.programData = resp.data
    })
  }



}
