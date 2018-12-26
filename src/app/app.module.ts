import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { studentReducer } from './store/reducers/student.reducer';
import { StudentListComponent } from './components/student-list/student-list.component';
import { ScoreSummaryComponent } from './components/score-summary/score-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentListComponent,
    ScoreSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    StoreModule.forRoot({ studentReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
