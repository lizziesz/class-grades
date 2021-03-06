import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }
    from '@angular/forms';
import { Store } from '@ngrx/store';

import { Student } from '../../models/Student';
import { DELETE_STUDENT, UPDATE_STUDENT } from './../../store/actions/students.action';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  indexToEdit: number | null;
  students: Student[];
  student: Student;
  form: FormGroup;

  constructor(private store: Store<any>, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.store.select('studentReducer')
      .subscribe(data => {
        this.students = data;
      });
  }

  onOutsideClick() {
    if (this.form.valid && this.form.touched) {
      this.updateStudent(this.form.value);
    }
  }

  deleteStudent(index: number) {
    this.store.dispatch({ type: DELETE_STUDENT, payload: { index }});
  }

  editStudent(student: Student, index: number) {
    if (this.student && this.student.userEditing) {
      this.updateStudent(this.form.value);
    }
    this.form = this.fb.group({
      'name': [student.name, Validators.required],
      'score': [student.score, Validators.required],
      'userEditing': false,
    });
    this.indexToEdit = index;
    const updatedStudent = student;
    updatedStudent['userEditing'] = true;
    this.store.dispatch({
      type: UPDATE_STUDENT,
      payload: { index: this.indexToEdit, newValue: updatedStudent } });
    this.student = student;
  }

  cancelEdit() {
    const updatedStudent = this.student;
    updatedStudent['userEditing'] = false;
    this.store.dispatch({
      type: UPDATE_STUDENT,
      payload: { index: this.indexToEdit, newValue: updatedStudent } });
    this.indexToEdit = null;
  }

  updateStudent(updatedStudent: Student) {
    this.store.dispatch({
      type: UPDATE_STUDENT,
      payload: { index: this.indexToEdit, newValue: updatedStudent } });
    this.indexToEdit = null;
    this.form.reset();
  }

  onSubmit() {
    this.updateStudent(this.form.value);
  }

}
