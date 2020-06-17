import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-signup-doc',
  templateUrl: './signup-doc.component.html',
  styleUrls: ['./signup-doc.component.scss']
})
export class SignupDocComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  username: any
  email: any
  password: any
  phone: any
  briefSummery: any
  location: any
  area: any
<<<<<<< HEAD
=======

>>>>>>> Design_Editing

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  dynamicForm: FormGroup;
  submitted = false;
  doc_questions
  cities: any;
  areas: any;

  constructor(private myCitiesService: CitiesService, public myAuthService: AuthService, private myRouter: Router, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
<<<<<<< HEAD

=======
>>>>>>> Design_Editing
    this.firstFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required],
      locationCtrl: ['', Validators.required],
      areaCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
      repasswordCtrl: [this.password, Validators.required]
<<<<<<< HEAD

=======
>>>>>>> Design_Editing
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
<<<<<<< HEAD

    window.scroll(0, 0);

=======
>>>>>>> Design_Editing
    this.dynamicForm = this.formBuilder.group({
      numberOfQuestions: ['', Validators.required],
      Questions: new FormArray([])
    });
    this.getCities();
<<<<<<< HEAD

=======
>>>>>>> Design_Editing
  }


  Register() {
    const { username, email, password, phone, briefSummery } = this
    const Questions = this.doc_questions
<<<<<<< HEAD
    this.myAuthService.d_register({ username, email, password, phone, briefSummery, Questions, location: { location: this.location, area: this.area } }).subscribe((resp: any) => {
      if (resp.message = "success") {
        this.myRouter.navigate(['/'])
      }
      else if(resp.message = "error"){
=======
    debugger
    this.myAuthService.d_register({ username, email, password, phone, briefSummery, Questions }).subscribe((resp: any) => {
      if(resp.message == "success"){
        this.myRouter.navigate(['/', resp.data._id])

      }

>>>>>>> Design_Editing

      }
    })
  }


  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get q() { return this.f.Questions as FormArray; }

  onChangeQuestions(e) {
    console.log(e)
    const numberOfQuestions = e.target.value || 0;
    if (this.q.length < numberOfQuestions) {
      for (let i = this.q.length; i < numberOfQuestions; i++) {
        this.q.push(this.formBuilder.group({
          question: ['', Validators.required],
          type: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.q.length; i >= numberOfQuestions; i--) {
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

    this.doc_questions = this.dynamicForm.value.Questions
    this.onReset()
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

  getCities() {
    this.cities = this.myCitiesService.getGovernoratesWithSubregions()
<<<<<<< HEAD

  }
  getAreas(city_name) {
    this.areas = this.myCitiesService.getSubregionsByname(city_name)
  }

=======
>>>>>>> Design_Editing

  }
  getAreas(city_name) {
    this.areas = this.myCitiesService.getSubregionsByname(city_name)
  }

}
