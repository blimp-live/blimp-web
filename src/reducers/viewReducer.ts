import { ViewStateModel } from '../interfaces/viewStateModel';

<<<<<<< HEAD

=======
>>>>>>> a3237986b8457dae43ede0de41ecbd9e0f58894e
import {
  EDIT_DASHBOARD,
  VIEW_DASHBOARD,
  VIEW_HOME
} from '../actions/viewStateActions';

const initialState: ViewStateModel = {
  editDashboard: false,
  home: false,
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
      }
    case VIEW_DASHBOARD:
      return {
        ...state,
        viewDashboard: true,
      }
    case EDIT_DASHBOARD:
      return {
        ...state,
        editDashboard: true,
      }
    default:
      return state
  }
}
