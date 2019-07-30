import { DashboardModel } from '../interfaces/dashboardModel';
import uuid4 from 'uuid4';
import {
  addWidgetToState,
  removeWidgetFromState,
  moveWidget
} from '../utils/dashboardModelUtils';
import { SectionNodeModel, WidgetModel } from '../interfaces/nodeModels';

import {
  FETCHING_DASHBOARD,
  SET_DASHBOARD,
  ADD_WIDGET,
  REMOVE_WIDGET,
  EDIT_WIDGET,
  MOVE_WIDGET,
} from '../actions/dashboardActions';

const widgets = {
  'live-feed': {
    id: 'live-feed',
    widgetType: 'Clock',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'left'
  } as WidgetModel,
  'schedule': {
    id: 'schedule',
    widgetType: 'ScrollingText',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'left'
  } as WidgetModel,
  'logo': {
    id: 'logo',
    widgetType: 'Countdown',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'top-right-infobar-left'
  } as WidgetModel,
  'weather': {
    id: 'weather',
    widgetType: 'ExampleComponent',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'top-right-infobar-right'
  } as WidgetModel,
  'clock': {
    id: 'clock',
    widgetType: 'HelloWorld',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'top-right-infobar-left'
  } as WidgetModel,
  'countdown': {
    id: 'countdown',
    widgetType: 'IFrameComponent',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'top-right-infobar-right'
  } as WidgetModel,
  'wayfinding': {
    id: 'wayfinding',
    widgetType: 'ScrollingText',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'top-right'
  } as WidgetModel,
  'social': {
    id: 'social',
    widgetType: 'Clock',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'bottom-right'
  } as WidgetModel,
  'bottom': {
    id: 'bottom',
    widgetType: 'Countdown',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'bottom-right'
  } as WidgetModel,
}

const sections = {
  'root' : {
    id: 'root',
    sectionDivision: 'VERTICAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['left', 'right']
  } as SectionNodeModel,
  'left' : {
    id: 'left',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['live-feed', 'schedule'],
    parentId: 'root',
  } as SectionNodeModel,
  'right' : {
    id: 'right',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['top-right', 'bottom-right'],
    parentId: 'root',
  } as SectionNodeModel,
  'top-right' : {
    id: 'top-right',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.2, 0.8],
    type: 'SectionModel',
    children: ['top-right-infobar', 'wayfinding'],
    parentId: 'right',
  } as SectionNodeModel,
  'top-right-infobar' : {
    id: 'top-right-infobar',
    sectionDivision: 'VERTICAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['top-right-infobar-left', 'top-right-infobar-right'],
    parentId: 'top-right',
  } as SectionNodeModel,
  'bottom-right' : {
    id: 'bottom-right',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.85, 0.15],
    type: 'SectionModel',
    children: ['social', 'bottom'],
    parentId: 'right',
  } as SectionNodeModel,
  'top-right-infobar-left' : {
    id: 'top-right-infobar-left',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['logo', 'clock'],
    parentId: 'top-right-infobar',
  } as SectionNodeModel,
  'top-right-infobar-right' : {
    id: 'top-right-infobar-right',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['weather', 'countdown'],
    parentId: 'top-right-infobar',
  } as SectionNodeModel,
}

const initialState: DashboardModel = {
  id: -1,
  name: '',
  contentHistory: [],
  contents: {
    rootSection: 'root',
    sections: sections,
    widgets: widgets,
  },
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
        ...state,
        contents: addWidgetToState(
          state.contents,
          action.widgetId,
          action.parentId,
          action.index,
        )
      }
    case REMOVE_WIDGET:
      return {
        ...state,
        contents: removeWidgetFromState(state.contents, action.widgetId),
      }
    case MOVE_WIDGET:
      return {
        ...state,
        contents: moveWidget(
          state.contents,
          action.sourceIndex,
          action.sourceContainerId,
          action.destinationIndex,
          action.destinationContainerId,
          action.widgetId,
        ),
      }
    case EDIT_WIDGET:
      return {
        ...state,
        contents: {
          ...state.contents,
          widgets: {
            ...state.contents.widgets,
            [action.widgetId]: {
              ...state.contents.widgets[action.widgetId],
              options: action.options,
            }
          }
        }
      }
    default:
      return state
  }
}
