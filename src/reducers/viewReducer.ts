<<<<<<< HEAD
import { viewStateModel } from '../interfaces/viewStateModel';
=======
import { ViewStateModel } from '../interfaces/viewStateModel';
>>>>>>> d2b7aeef7e4557e08ed3256ceed745283b588bfa

import {


} from '../actions/viewStateActions';

<<<<<<< HEAD
const initialState: viewStateModel = {
=======
const initialState: ViewStateModel = {
>>>>>>> d2b7aeef7e4557e08ed3256ceed745283b588bfa
  editDashboard: false,
  home: false,
  viewDashboard: false
}

export function viewStateReducer(
  state = initialState,
  action: any
<<<<<<< HEAD
): viewStateModel {




=======
): ViewStateModel {
  return initialState;
>>>>>>> d2b7aeef7e4557e08ed3256ceed745283b588bfa
}
