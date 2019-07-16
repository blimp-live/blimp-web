import { createAction } from 'redux-actions';
import { DashboardModel } from '../interfaces/dashboardModel';
import { RootNodeModel, NodeModel } from '../interfaces/nodeModels';
import {root} from '../config/endpoints';

const querystring = require('querystring');

const Root : RootNodeModel = {
  children: null,
  type: 'RootNode',
}

const sampleDashboard = {
  id: 102,
  name: 'Stanleys Dashboard',
  contents: Root,
  createdAt: 1558475608,
  lastSaved: 1558475608,
  public: true,
  url: 'bhavika-sharma'
}

export const FETCHING_DASHBOARD = "FETCHING_DASHBOARD"
export const SET_DASHBOARD = "SET_DASHBOARD"

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

export function addWidget(widgetId: String) {
  // This will add a Widget to the current contents
}

export function removeWidget(widgetId: String) {

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
