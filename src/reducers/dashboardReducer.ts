import { handleActions } from 'redux-actions';

import { DashboardModel } from '../interfaces/dashboardModel';

export type State = {
  readonly id: number;
  readonly name: String;
  readonly contents: String;
  readonly createdAt: number;
  readonly lastSaved: number;
  readonly public: boolean;
  readonly url: String;
  readonly contentHistory?: String[];
  readonly isFetching?: boolean;
  readonly isSaving?: boolean;
  readonly unsavedChanges?: boolean;
}

import * as DashboardActions from '../actions/dashboardActions';

const initialState: State = {
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

export const dashboardReducer = handleActions<State, DashboardModel>(
  {
    // [DashboardActions.GET_DASHBOARD]: (
    //   state: State
    // ) => ({
    //   isFetching: true,
    //   ...state
    // })
  },
  initialState
);
