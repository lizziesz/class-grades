import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { ScoreSummaryComponent } from './components/score-summary/score-summary.component';
import * as fromRoot from './../app/store/reducers/student.reducer';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(fromRoot.studentReducer),
      ],
      declarations: [
        AppComponent,
        StudentsComponent,
        StudentListComponent,
        ScoreSummaryComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'class-grades'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('class-grades');
  });
});
