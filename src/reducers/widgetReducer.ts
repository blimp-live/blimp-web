import * as widgets from 'blimp-live-widgets';

import { SET_WIDGETS } from "../actions/widgetActions"

const initialState = {
  widgets: widgets,
}

export function widgetReducer(
  state = initialState,
  action: any
) {
  switch(action.type) {
    case SET_WIDGETS:
      return {
        ...state,
        ...action.payload.contents,
      }
    default:
      return state
  }
}
