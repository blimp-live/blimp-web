import { combineReducers } from "redux";
import { routerReducer as router, RouterState } from "react-router-redux";

import {
  calculatorReducer,
  State as CalculatorState
} from "./calculatorReducer";

import { CalculatorModel } from "../interfaces/calculatorModels";

import {
  dashboardReducer,
  State as DashboardState
} from './dashboardReducer';

import { DashboardModel } from '../interfaces/dashboardModel';

interface StoreEnhancerState {}

export interface RootState extends StoreEnhancerState {
  router: RouterState;
  calculatorReducer: CalculatorState;
  dashboardReducer: DashboardState;
}
export const rootReducer = combineReducers<RootState>({
  router,
  calculatorReducer: calculatorReducer as any,
  dashboardReducer: dashboardReducer as any,
});
