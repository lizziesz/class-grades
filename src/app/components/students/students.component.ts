import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }
    from '@angular/forms';
import { Store } from '@ngrx/store';

import { Student } from './../../Student';
import { ADD_STUDENT } from './../../store/actions/students.action';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  student: Student;
  form: FormGroup;
  name = new FormControl('', Validators.required);
  score = new FormControl('', Validators.required);

  constructor(private store: Store<any>, private fb: FormBuilder) {
    this.form = fb.group({
      'name': this.name,
      'score': this.score,
      'userEditing': false,
    });
  }

  ngOnInit() {
  }

  addStudent(value: Student) {
    this.store.dispatch({ type: ADD_STUDENT, payload: { value }});
    this.form.reset();
  }

  onSubmit() {
    console.log("model-based form submitted");
    console.log(this.form);
    this.addStudent(this.form.value);
  }

}
