import { DashboardModel } from '../interfaces/dashboardModel';

import {
  FETCHING_DASHBOARD,
  SET_DASHBOARD,
} from '../actions/dashboardActions';

const initialState: DashboardModel = {
  id: -1,
  name: '',
  contentHistory: [],
  contents: '',
  createdAt: 0,
  isFetching: false,
  isSaving: false,
  lastSaved: -1,
  public: false,
  unsavedChanges: false,
  url: ''
}

export function dashboardReducer(
  state = initialState,
  action: any
 ): DashboardModel {
  switch(action.type) {
    case FETCHING_DASHBOARD:
      return {
        ...state,
        isFetching: true,
      }
    case SET_DASHBOARD:
      return {
        ...state,
        ...action.payload.contents,
        isFetching: false,
      }
    default:
      return state
  }
}
