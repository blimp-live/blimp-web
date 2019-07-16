import { DashboardModel } from '../interfaces/dashboardModel';
import { RootNodeModel, SectionNodeModel, WidgetModel } from '../interfaces/nodeModels';
import uuid4 from 'uuid4';

import {
  FETCHING_DASHBOARD,
  SET_DASHBOARD,
  ADD_WIDGET,
  REMOVE_WIDGET,
} from '../actions/dashboardActions';

function removeWidgetFromState(id: String, contents: RootNodeModel) {
  // Helper that will cycle through the contents childrens recurisvely
  // and look for a widget of said Id


  return contents;
}

const Root : RootNodeModel = {
  children: [
    {
      children: [
        {
          widgetType: 'Clock',
          id: uuid4(),
          options: null,
          version: 1.0,
          type: 'WidgetModel',
        } as WidgetModel,
        {
          widgetType: 'Clock',
          id: uuid4(),
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

    case ADD_WIDGET:
      return {
        ...state
      }
    case REMOVE_WIDGET:
      return {
        ...state,
        contents: removeWidgetFromState(action.widgetId, state.contents),
      }
    default:
      return state
  }
}
