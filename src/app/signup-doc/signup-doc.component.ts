import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-signup-doc',
  templateUrl: './signup-doc.component.html',
  styleUrls: ['./signup-doc.component.scss']
})
export class SignupDocComponent implements OnInit {

  username: any
  email: any
  password: any
  phone: any
  briefSummery: any

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  dynamicForm: FormGroup;
  submitted = false;
  doc_questions

  constructor(public myAuthService: AuthService, private myRouter: Router, public formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.dynamicForm = this.formBuilder.group({
      numberOfQuestions: ['', Validators.required],
      Questions: new FormArray([])
    });

  }


  Register() {
    const { username, email, password, phone, briefSummery } = this
    const Questions = this.doc_questions
    this.myAuthService.d_register({ username, email, password, phone, briefSummery, Questions }).subscribe((resp: any) => {
      if (resp.token) {
        localStorage.setItem('token', resp.token)
        localStorage.setItem('type', resp.type)
        this.myRouter.navigate(['/dashboard',resp.data._id])
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



}
