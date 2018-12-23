import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }
    from '@angular/forms';
import { Store } from '@ngrx/store';

import { Student } from './../../Student';
import { ADD_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from './../../store/actions/students.action';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: Student[];
  student: Student;
  editing = false;
  indexToEdit: number | null;
  form: FormGroup;
  name = new FormControl('', Validators.required);
  score = new FormControl('', Validators.required);

  constructor(private store: Store<any>, private fb: FormBuilder) {
    this.form = fb.group({
      'name': this.name,
      'score': this.score,
    });
  }

  ngOnInit() {
    this.store.select('studentReducer')
      .subscribe(data => {
        this.students = data;
      });
  }

  addStudent(value: Student) {
    console.log('student added', value);
    this.store.dispatch({ type: ADD_STUDENT, payload: { value }});
    console.log(this.students);
    this.form.reset();
  }

  deleteStudent(index: number) {
    this.store.dispatch({ type: DELETE_STUDENT, payload: { index }});
  }

  editStudent(student: Student, index: number) {
    console.log(student);
    this.form = this.fb.group({
      'name': student.name,
      'score': student.score,
    });
    this.editing = true;
    this.student = student;
    this.indexToEdit = index;
  }

  cancelEdit() {
    this.editing = false;
    this.indexToEdit = null;
  }

  updateStudent(updatedStudent: Student) {
    this.store.dispatch({
      type: UPDATE_STUDENT,
      payload: { index: this.indexToEdit, newValue: updatedStudent } });
    this.indexToEdit = null;
    this.editing = false;
    console.log(this.students);
    this.form.reset();
  }

  onSubmit() {
    console.log("model-based form submitted");
    console.log(this.form);
    if (this.editing) {
      this.updateStudent(this.form.value);
    } else {
      this.addStudent(this.form.value);
    }
  }

}
