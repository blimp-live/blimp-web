import { DashboardModel, DashboardContentsModel } from '../interfaces/dashboardModel';
import { WidgetModel } from '../interfaces/nodeModels';
import { root } from '../config/endpoints';

// const querystring = require('querystring');
const qs = require('qs');

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
export const EDIT_WIDGET = "EDIT_WIDGET"
export const MOVE_WIDGET = "MOVE_WIDGET"
export const UNDO = "UNDO";
export const REDO = "REDO";

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
      headers: {'Content-Type': 'application/json'},
      body: qs.stringify({name: name, contents: contents})
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

/**
 * Adds an existing widget to an existing section
 *
 * @param {string} widgetId - Id of a widget that exists in the store
 * @param {string} parentId - Id of a section that exists in the store
 * @param {number} index - Index of where the widget should appear in the section
 * @return {string} An action dispatch
 *
 * @example
 *
 *     addWidget('live-feed', 'left-section', 0)
 */
export function addWidget(
  widgetId: string,
  parentId: string,
  index: number,
) {
  return {
    type: ADD_WIDGET,
    widgetId: widgetId,
    parentId: parentId,
    index: index,
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

/**
 * Moves an existing widget from one existing section to another existing section
 * Mainly called when dragging and dropping
 *
 * @param {number} sourceIndex - The position of the widget inside the source section
 * @param {string} sourceContainerId - Id of the section that the widget was moved from
 * @param {number} destinationIndex - The position of the widget inside the destination section
 * @param {string} destinationContainerId - Id of the section that the widget was moved to
 * @param {string} widgetId - Id of an existing widget in the store
 * @return {string} An action dispatch
 *
 * @example
 *
 *     moveWidget(0, 'left-section', 1, 'right-section', 'live-feed')
 */
export function moveWidget(
  sourceIndex: number,
  sourceContainerId: string,
  destinationIndex: number,
  destinationContainerId: string,
  widgetId: string,
) {
  return {
    type: MOVE_WIDGET,
    sourceIndex: sourceIndex,
    sourceContainerId: sourceContainerId,
    destinationIndex: destinationIndex,
    destinationContainerId: destinationContainerId,
    widgetId: widgetId
  }
}

export function createDashboard(name: String, userId: number) {
  return (dispatch: any) => {
    dispatch(fetchingDashboard());

    fetch(`${root}/dashboard`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: qs.stringify({name: name, userid: userId})
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

export function editWidget(options: any, widgetId: string) {
  return {
    type: EDIT_WIDGET,
    widgetId: widgetId,
    options: options,
  }
}

export function undo() {
  return {
    type: UNDO,
  }
}

export function redo() {
  return {
    type: REDO,
  }
}
