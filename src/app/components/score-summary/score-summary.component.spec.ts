import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { ScoreSummaryComponent } from './score-summary.component';
import * as fromRoot from './../../store/reducers/student.reducer';

describe('ScoreSummaryComponent', () => {
  let component: ScoreSummaryComponent;
  let fixture: ComponentFixture<ScoreSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromRoot.studentReducer),
      ],
      declarations: [ ScoreSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
