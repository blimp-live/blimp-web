import { DashboardModel } from '../interfaces/dashboardModel';
import { RootNodeModel, SectionNodeModel, WidgetModel } from '../interfaces/nodeModels';
import uuid4 from 'uuid4';

import {
  FETCHING_DASHBOARD,
  SET_DASHBOARD,
} from '../actions/dashboardActions';

const Root : RootNodeModel = {
  type: 'RootNode',
  children: [
    {
      sectionDivision: 'VERTICAL',
      relativeSize: [0.5, 0.5],
      type: 'SectionModel',
      children: [
        {
          // Left side of dashboard
          sectionDivision: 'HORIZONTAL',
          relativeSize: [0.5, 0.5],
          type: 'SectionModel',
          children: [
            {
              // Live Feed
              widgetType: 'IFrameComponent',
              options: null,
              version: 1.0,
              type: 'WidgetModel',
            } as WidgetModel,
            {
              // Schedule
              widgetType: 'ScrollingText',
              options: null,
              version: 1.0,
              type: 'WidgetModel',
            } as WidgetModel,
          ],
        } as SectionNodeModel,
        {
          // Right side of dashboard
          sectionDivision: 'HORIZONTAL',
          relativeSize: [0.20, 0.30, 0.4, 0.10],
          type: 'SectionModel',
          children: [
            {
              // Top infobar
              sectionDivision: 'VERTICAL',
              relativeSize: [0.5, 0.5],
              type: 'SectionModel',
              children: [
                {
                  // Top row of top infobar
                  sectionDivision: 'HORIZONTAL',
                  relativeSize: [0.5, 0.5],
                  type: 'SectionModel',
                  children: [
                    {
                      // Hack the North Logo
                      widgetType: 'HelloWorld',
                      options: null,
                      version: 1.0,
                      type: 'WidgetModel',
                    } as WidgetModel,
                    {
                      // Time
                      widgetType: 'Clock',
                      options: null,
                      version: 1.0,
                      type: 'WidgetModel',
                    } as WidgetModel,
                  ],
                } as SectionNodeModel,
                {
                  // Bottom row of top infobar
                  sectionDivision: 'HORIZONTAL',
                  relativeSize: [0.5, 0.5],
                  type: 'SectionModel',
                  children: [
                    {
                      // Weather
                      widgetType: 'ExampleComponent',
                      options: null,
                      version: 1.0,
                      type: 'WidgetModel',
                    } as WidgetModel,
                    {
                      // Countdown
                      widgetType: 'Countdown',
                      options: null,
                      version: 1.0,
                      type: 'WidgetModel',
                    } as WidgetModel,
                  ],
                } as SectionNodeModel,
              ],
            } as SectionNodeModel,
            {
              widgetType: 'ExampleComponent',
              options: null,
              version: 1.0,
              type: 'WidgetModel',
            } as WidgetModel,
            {
              widgetType: 'HelloWorld',
              options: null,
              version: 1.0,
              type: 'WidgetModel',
            } as WidgetModel,
            {
              widgetType: 'ScrollingText',
              options: null,
              version: 1.0,
              type: 'WidgetModel',
            } as WidgetModel,
          ],
        } as SectionNodeModel,
      ],
    } as SectionNodeModel,
   ],
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
