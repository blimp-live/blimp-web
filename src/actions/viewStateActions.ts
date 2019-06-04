import { createAction } from 'redux-actions';
import {ViewStateModel} from '../interfaces/viewStateModel';
import {root} from '../config/endpoints';

const sampleViewStateHomePage = {
  editDashboard: false,
  viewDashboard: false,
  home: true
}

const sampleViewStateViewDashboard = {
  editDashboard: false,
  viewDashboard: true,
  home: false
}

const sampleViewStateEditDashboard = {
  editDashboard: true,
  viewDashboard: false,
  home: false
}

export const EDIT_DASHBOARD = "EDIT_DASHBOARD"
export const VIEW_DASHBOARD = "VIEW_DASHBOARD"
export const VIEW_HOME = "VIEW_HOME"

export function editDashboard() {
  // This will be called and put the dashboard into 'edit' mode
  return {
    type: EDIT_DASHBOARD,
  }
}

export function viewDashboard() {
  // This is called when we 'view' a dashboard
  return {
    type: VIEW_DASHBOARD,
  }
}

export function viewHome() {
  // Called when we are viewing a home page
  return {
    type: VIEW_HOME,
  }
}
