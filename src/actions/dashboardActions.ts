import { createAction } from 'redux-actions';
import { DashboardModel } from '../interfaces/dashboardModel';

const root = 'localhost:8000'

export const GET_DASHBOARD = "GET_DASHBOARD"
export const CREATE_DASHBOARD = "CREATE_DASHBOARD"

export function getDashboard(id: number) {
  return {
    type: GET_DASHBOARD,
    id
  }
}

export function createDashboard(name: String, userId: number) {
  fetch(`/dashboard`, {
    method: 'POST',
  }).then(
    (response: any) => response.json()
  ).then((contents: DashboardModel) => console.log(contents))
  return {
    type: CREATE_DASHBOARD
  }
}
