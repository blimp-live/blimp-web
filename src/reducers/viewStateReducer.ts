import { ViewStateModel } from '../interfaces/viewStateModel';

import {
  EDIT_DASHBOARD,
  VIEW_DASHBOARD,
  VIEW_HOME
} from '../actions/viewStateActions';

const initialState: ViewStateModel = {
  editDashboard: false,
  home: true,
  viewDashboard: false
}

export function viewStateReducer(
  state = initialState,
  action: any
): ViewStateModel {
  switch(action.type) {
    case VIEW_HOME:
      return {
        ...state,
        home: true,
        viewDashboard: false,
        editDashboard: false,
      }
    case VIEW_DASHBOARD:
      return {
        ...state,
        home: false,
        viewDashboard: true,
        editDashboard: false,
      }
    case EDIT_DASHBOARD:
      return {
        ...state,
        home: false,
        viewDashboard: false,
        editDashboard: true,
      }
    default:
      return state
  }
}
