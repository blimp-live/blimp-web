import { createAction } from 'redux-actions';
import { DashboardModel } from '../interfaces/dashboardModel';

export const Type = {
  GET_DASHBOARD: "GET_DASHBOARD",
  SET_DASHBOARD: "SET_DASHBOARD",
};

export const getDashboard = createAction<{ id: number }>(
  Type.GET_DASHBOARD
);

export const setDashboard = createAction<{ payload: DashboardModel }>(
  Type.SET_DASHBOARD
);
