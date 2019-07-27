import { DashboardModel, DashboardContentsModel } from '../interfaces/dashboardModel';
import { WidgetModel } from '../interfaces/nodeModels';
import { root } from '../config/endpoints';

const querystring = require('querystring');

const sampleContents : DashboardContentsModel = {
  sections: {},
  widgets: {
    'clock': {
      id: 'clock',
      widgetType: 'ScrollingText',
      options: null,
      version: 1.0,
      type: 'WidgetModel',
      parentId: 'top-right-infobar-left'
    } as WidgetModel,
  },
  rootSection: 'clock',
}

const sampleDashboard = {
  id: 102,
  name: 'Stanleys Dashboard',
  contents: sampleContents,
  createdAt: 1558475608,
  lastSaved: 1558475608,
  public: true,
  url: 'bhavika-sharma'
}

export const FETCHING_DASHBOARD = "FETCHING_DASHBOARD"
export const SET_DASHBOARD = "SET_DASHBOARD"
export const ADD_WIDGET = "ADD_WIDGET";
export const REMOVE_WIDGET = "REMOVE_WIDGET";

export function fetchingDashboard() {
  return {
    type: FETCHING_DASHBOARD,
  }
}

export function setDashboard(contents: DashboardModel) {
  return {
    type: SET_DASHBOARD,
    payload: {
      contents
    }
  }
}

export function loadDashboard(id: number) {
  return (dispatch: any) => {
    dispatch(fetchingDashboard());

    fetch(`${root}/dashboard/id/${id}`, {
      method: 'GET'
    }).then(
        (response: any) => response.json()
    ).then(
        (contents: any) => dispatch(setDashboard(contents))
    ).catch(
        (err: any) => {
          console.error(`NETWORK ERROR: ${err.message}`)
          dispatch(setDashboard(sampleDashboard))
        }
    )
  }
}

export function saveDashboard(id: number, name: String, contents: DashboardModel) {
  return (dispatch: any) => {
    dispatch(fetchingDashboard());

    fetch(`${root}/dashboard/id/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: querystring.stringify({name: name, contents: contents})
    }).then(
        (response: any) => response.json()
    ).then(
        (contents: any) => dispatch(setDashboard(contents.data))
    ).catch(
        (err: any) => {
          console.error(`NETWORK ERROR: ${err.message}`)
          dispatch(setDashboard(sampleDashboard))
        }
    )
  }
}

export function addWidgetAfter() {
  return {
    type: ADD_WIDGET,
  }
}

export function removeWidget(widgetId: String) {
  // We associate a widget with some unique identifier
  // All this does is it removes the from the contents/model
  return {
    type: REMOVE_WIDGET,
    widgetId: widgetId
  }
}

export function createDashboard(name: String, userId: number) {
  return (dispatch: any) => {
    dispatch(fetchingDashboard());

    fetch(`${root}/dashboard`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: querystring.stringify({name: name, userid: userId})
    }).then(
      (response: any) => response.json()
    ).then(
      (contents: any) => dispatch(setDashboard(contents.data))
    ).catch(
      (err: any) => {
        console.error(`NETWORK ERROR: ${err.message}`)
        dispatch(setDashboard(sampleDashboard))
      }
    )
  }
}
