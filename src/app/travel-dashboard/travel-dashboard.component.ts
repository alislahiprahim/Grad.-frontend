import { Component, OnInit } from '@angular/core';
import { travelAgentService } from '../services/travel-agent.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CitiesService } from '../services/cities.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface Included {
  name: string;
}

export interface Excluded {
  name: string;
}

@Component({
  selector: 'app-travel-dashboard',
  templateUrl: './travel-dashboard.component.html',
  styleUrls: ['./travel-dashboard.component.scss']
})
export class TravelDashboardComponent implements OnInit {
  programID: any
  hideNextBtn = false
  showError = false
  Tdata: any
  dynamicForm: FormGroup;
  submitted = false;
  Itinerary
  cities: any;

  programList = {
    "itinerary": [
      {
        "dayTitle": "Day 1: Amman – Wadi Rum",
        "dayDescription": "We start from Amman -Arriving Wadi Rum at noon , on the first day we’ll visit, Kazali canyon, little bridge and the sand dunes.hiking up Um Froth rock bridge, a visit to Lawrence’s house, have a light lunch,,Then we’ll hike to our campsite – A Bedouin camp."
      },
      {
        "dayTitle": "Day 2: Wadi Rum – Petra – Amman",
        "dayDescription": "On the second day we’ll start early in the morning moving to the kingdom to Petra. The Nabatean red, Rose City of Petra that is considered one of the wonders of the world. and head back to Amman"
      }
    ],
    "included": [
      "Wadi Rum & Petra Two Full Days Tour from Amman.",
      "English speaking Driver.",
      "An Sedan Car or H1 Van is used with AC including gas .",
      "Water, 3 Hours Jeep Tour at Rum Valley & one night sleep at a Bedouin camp including dinner & breakfast.",
      "Home / Hotel Pick-up and drop-of"
    ],
    "excluded": [
      "Entry Fees.",
      "Local Site tour quid .",
      "travel Insurance and other meals are not included.",
      "local tour guides and other meals are not included."
    ],
    "title": "Wadi Rum & Petra Two Days Tour From Amman",
    "catygory": "Sea Tours ",
    "numberOfDays": "5",
    "cost": {
      "Adults": "232",
      "Children": "321"
    },
    "IMG": "https://media-cdn.tripadvisor.com/media/photo-s/09/6b/09/05/khasab-sea-tours-day.jpg"
  }
  allPrograms: any;


  constructor(private mytravelAgentService: travelAgentService, public formBuilder: FormBuilder, private myCitiesService: CitiesService, private modalService: NgbModal) { }
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      titleCtrl: ['', Validators.required],
      categoryCtrl: ['', Validators.required],
      adultCtrl: ['', Validators.required],
      childrenCtrl: ['', Validators.required],
      daysCtrl: ['', Validators.required],
      locationCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      includeCtrl: [[], Validators.required],
      excludeCtrl: [[], Validators.required]
    });


    this.dynamicForm = this.formBuilder.group({
      itineraryNumber: ['', Validators.required],
      itineraryList: new FormArray([])
    });

    this.getCities();
    this.getAccount();
  }

  getAccount() {
    this.mytravelAgentService.getAccount().subscribe((resp: any) => {
      this.Tdata = resp.data
      this.allPrograms = this.Tdata.tourismPrograms
      console.log(this.Tdata,'=====',this.allPrograms)
    })
  }






  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get q() { return this.f.itineraryList as FormArray; }

  onChangeQuestions(e) {
    console.log(e)
    const itineraryNumber = e.target.value || 0;
    if (this.q.length < itineraryNumber) {
      for (let i = this.q.length; i < itineraryNumber; i++) {
        this.q.push(this.formBuilder.group({
          description: ['', Validators.required],
          title: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.q.length; i >= itineraryNumber; i--) {
        this.q.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    this.Itinerary = this.dynamicForm.value.itineraryList
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.q.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.q.reset();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //// Included


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  includes: Included[] = [
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.includes.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(include: Included): void {
    const index = this.includes.indexOf(include);

    if (index >= 0) {
      this.includes.splice(index, 1);
    }
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //// Excluded


  EXvisible = true;
  Exselectable = true;
  Exremovable = true;
  EXaddOnBlur = true;
  readonly ExseparatorKeysCodes: number[] = [ENTER, COMMA];
  excludes: Excluded[] = [
  ];

  Exadd(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.excludes.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  Exremove(exclude: Excluded): void {
    const index = this.excludes.indexOf(exclude);

    if (index >= 0) {
      this.excludes.splice(index, 1);
    }
  }

  getCities() {
    this.cities = this.myCitiesService.getGovernoratesWithSubregions()

  }


  AddProgram() {

    this.mytravelAgentService.addProgram({
      title: this.firstFormGroup.value.titleCtrl,
      catygory: this.firstFormGroup.value.categoryCtrl,
      numberOfDays: this.firstFormGroup.value.daysCtrl,
      location: this.firstFormGroup.value.locationCtrl,
      itinerary: this.Itinerary,
      included: this.includes,
      excluded: this.excludes,
      cost: { adultCost: this.firstFormGroup.value.adultCtrl, childrenCost: this.firstFormGroup.value.childrenCtrl },

    }).subscribe((resp: any) => {
      if (resp.message == "success") {
        this.showError = false
        this.programID = resp.data._id
        this.hideNextBtn = true
      }
      else {
        this.hideNextBtn = false
        this.showError = true
      }


    })


  }


  // Start Modal Configration 
  closeResult = '';

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: true, backdrop: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  // End Modal Configration 



}
