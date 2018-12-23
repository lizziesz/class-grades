import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Student } from './../../Student';

@Component({
  selector: 'app-score-summary',
  templateUrl: './score-summary.component.html',
  styleUrls: ['./score-summary.component.scss']
})
export class ScoreSummaryComponent implements OnInit {
  students: Student[];
  scores: number[] = [];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select('studentReducer')
      .subscribe(data => {
        this.students = data;
        // TODO: move scores logic to reducer?
        this.scores = [];
        if (this.students.length) {
          this.students.forEach(student => {
            this.scores.push(student.score);
          })
        }
      });
  }

  getAverage() {
    return this.scores.reduce( ( a, b ) => a + b, 0 ) / this.scores.length;
  }

  getMinScore() {
    return Math.min.apply(undefined, this.scores);
  }

  getMaxScore() {
    return Math.max.apply(undefined, this.scores);
  }

}
