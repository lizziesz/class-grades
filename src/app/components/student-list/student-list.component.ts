import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder }
    from '@angular/forms';
import { Store } from '@ngrx/store';

import { Student } from './../../Student';
import { DELETE_STUDENT, UPDATE_STUDENT } from './../../store/actions/students.action';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  editing = false;
  indexToEdit: number | null;
  students: Student[];
  student: Student;
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

  deleteStudent(index: number) {
    this.store.dispatch({ type: DELETE_STUDENT, payload: { index }});
    console.log(this.students);
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

}
