import { createAction } from 'redux-actions';

export const SET_WIDGETS = "SET_WIDGETS"

export function setDashboard(contents) {
  return {
    type: SET_WIDGETS,
    payload: {
      contents
    }
  }
}
