import { ViewStateModel } from '../interfaces/viewStateModel';

import {


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
  return initialState;
}
