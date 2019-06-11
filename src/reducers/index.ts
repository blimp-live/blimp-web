import { combineReducers } from "redux";
import { routerReducer as router, RouterState } from "react-router-redux";

import { calculatorReducer } from "./calculatorReducer";
import { CalculatorModel } from "../interfaces/calculatorModels";

import { dashboardReducer } from './dashboardReducer';
import { DashboardModel } from '../interfaces/dashboardModel';

import { viewStateReducer } from './viewStateReducer';
import { ViewStateModel } from '../interfaces/viewStateModel';

interface StoreEnhancerState {}

export interface RootState extends StoreEnhancerState {
  router: RouterState;
  calculatorReducer: CalculatorModel;
  dashboardReducer: DashboardModel;
  viewStateReducer: ViewStateModel;
}
export const rootReducer = combineReducers<RootState>({
  router,
  calculatorReducer: calculatorReducer as any,
  dashboardReducer: dashboardReducer as any,
  viewStateReducer: viewStateReducer as any,
});
