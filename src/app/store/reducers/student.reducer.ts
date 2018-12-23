import { Action } from '@ngrx/store';

import { Student } from './../../Student';

import * as StudentActions from '../actions/students.action';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface StudentPayload {
  index?: number;
  value?: Student;
  newValue?: Student;
}

export function studentReducer(state = [], action: ActionWithPayload<StudentPayload>) {
  switch (action.type) {
    case StudentActions.ADD_STUDENT:
      console.log('adding student', [action.payload.value, ...state]);
      return [...state, action.payload.value];
    case StudentActions.DELETE_STUDENT:
      return state.filter((item, index) => index !== action.payload.index);
    case StudentActions.UPDATE_STUDENT:
      return state.map((item, index) => {
        return index === action.payload.index
          ? Object.assign({}, item, action.payload.newValue)
          : item;
      });
    default:
      return state;
  }
}
