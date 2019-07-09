import { DashboardModel } from '../interfaces/dashboardModel';
import { RootNodeModel, SectionNodeModel, WidgetModel } from '../interfaces/nodeModels';

import {
  FETCHING_DASHBOARD,
  SET_DASHBOARD,
} from '../actions/dashboardActions';

const Root : RootNodeModel = {
  children: [
    {
      children: [
        {
          widgetType: 'Clock',
          options: null,
          version: 1.0,
          type: 'WidgetModel',
        } as WidgetModel,
        {
          widgetType: 'Clock',
          options: null,
          version: 1.0,
          type: 'WidgetModel',
        } as WidgetModel,
      ],
      sectionDivision: 'VERTICAL',
      relativeSize: [0.5, 0.5],
      type: 'SectionModel',
    } as SectionNodeModel,
   ],
  type: 'RootNode',
}

const initialState: DashboardModel = {
  id: -1,
  name: '',
  contentHistory: [],
  contents: Root,
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
