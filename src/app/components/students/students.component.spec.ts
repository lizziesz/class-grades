import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { StudentsComponent } from './students.component';
import * as fromRoot from './../../store/reducers/student.reducer';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(fromRoot.studentReducer),
      ],
      declarations: [ StudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add student form is invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('submitting the form adds a student', () => {
    component.form.controls['name'].setValue('Maggie');
    component.form.controls['score'].setValue(95);
    const addStudenSpy = spyOn(component, 'addStudent');
    component.onSubmit();
    expect(addStudenSpy).toHaveBeenCalled();
  });
});
