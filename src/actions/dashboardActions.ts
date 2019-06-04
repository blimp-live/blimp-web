import { createAction } from 'redux-actions';
import { DashboardModel } from '../interfaces/dashboardModel';

const root = 'http://localhost:8000'
const sampleDashboard = {
  id: 102,
  name: 'Stanleys Dashboard',
  contents: "hi",
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

export function saveDashboard(id: number, userId: number, contents: DashboardModel) {
  // This is making a post request to the api?

}

export function createDashboard(name: String, userId: number) {
  return (dispatch: any) => {
    dispatch(fetchingDashboard());

    fetch(`${root}/dashboard`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        userId
      })
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
