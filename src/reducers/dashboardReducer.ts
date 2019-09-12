import { DashboardModel, DashboardContentsModel } from '../interfaces/dashboardModel';
import {
  addWidgetToState,
  removeWidgetFromState,
  moveWidget
} from '../utils/dashboardModelUtils';
import { SectionNodeModel, WidgetModel } from '../interfaces/nodeModels';
import produce, { applyPatches } from "immer";

import {
  FETCHING_DASHBOARD,
  SET_DASHBOARD,
  ADD_WIDGET,
  REMOVE_WIDGET,
  EDIT_WIDGET,
  MOVE_WIDGET,
  UNDO,
  REDO
} from '../actions/dashboardActions';

const widgets = {
  'live-feed': {
    id: 'live-feed',
    widgetType: 'IFrameComponent',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'left'
  } as WidgetModel,
  'schedule': {
    id: 'schedule',
    widgetType: 'ScrollingText',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'left'
  } as WidgetModel,
  'logo': {
    id: 'logo',
    widgetType: 'Logo',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'top-right-infobar-left'
  } as WidgetModel,
  'weather': {
    id: 'weather',
    widgetType: 'Weather',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'weather-countdown'
  } as WidgetModel,
  'clock': {
    id: 'clock',
    widgetType: 'Clock',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'time'
  } as WidgetModel,
  'countdown': {
    id: 'countdown',
    widgetType: 'Countdown',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'weather-countdown'
  } as WidgetModel,
  'wayfinding': {
    id: 'wayfinding',
    widgetType: 'Gallery',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'top-right'
  } as WidgetModel,
  'social': {
    id: 'social',
    widgetType: 'TwitterComponent',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'bottom-right'
  } as WidgetModel,
  'date': {
    id: 'date',
    widgetType: 'DateComponent',
    options: null,
    version: 1.0,
    type: 'WidgetModel',
    parentId: 'time'
  } as WidgetModel,
}

const sections = {
  'root' : {
    id: 'root',
    sectionDivision: 'VERTICAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['left', 'right']
  } as SectionNodeModel,
  'left' : {
    id: 'left',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['live-feed', 'schedule'],
    parentId: 'root',
  } as SectionNodeModel,
  'right' : {
    id: 'right',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.3, 0.3, 0.3],
    type: 'SectionModel',
    children: ['top-right', 'middle-right', 'bottom-right'],
    parentId: 'root',
  } as SectionNodeModel,
  'top-right' : {
    id: 'top-right',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.2, 0.8],
    type: 'SectionModel',
    children: ['top-right-logo', 'top-right-infobar-utilities'],
    parentId: 'right',
  } as SectionNodeModel,
  'top-right-logo' : {
    id: 'top-right-logo',
    sectionDivision: 'VERTICAL',
    relativeSize: [1.0],
    type: 'SectionModel',
    children: ['logo'],
    parentId: 'top-right',
  } as SectionNodeModel,
  'top-right-infobar-utilities' : {
    id: 'top-right-infobar-utilities',
    sectionDivision: 'VERTICAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['time', 'weather-countdown'],
    parentId: 'top-right',
  } as SectionNodeModel,
  'weather-countdown' : {
    id: 'weather-countdown',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['weather', 'countdown'],
    parentId: 'top-right-infobar-utilities',
  } as SectionNodeModel,
  'time' : {
    id: 'time',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.5, 0.5],
    type: 'SectionModel',
    children: ['clock', 'date'],
    parentId: 'top-right-infobar-utilities',
  } as SectionNodeModel,
  'middle-right' : {
    id: 'bottom-right',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [1.0],
    type: 'SectionModel',
    children: ['wayfinding'],
    parentId: 'right',
  } as SectionNodeModel,
  'bottom-right': {
    id: 'bottom-right',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [1.0],
    type: 'SectionModel',
    children: ['social'],
    parentId: 'right',
  } as SectionNodeModel,
  'top-right-infobar-left' : {
    id: 'top-right-infobar-left',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [0.5],
    type: 'SectionModel',
    children: ['logo'],
    parentId: 'top-right-infobar',
  } as SectionNodeModel,
  'top-right-infobar-right' : {
    id: 'top-right-infobar-right',
    sectionDivision: 'HORIZONTAL',
    relativeSize: [],
    type: 'SectionModel',
    children: [],
    parentId: 'top-right-infobar',
  } as SectionNodeModel,
}

const initialState: DashboardModel = {
  id: -1,
  name: '',
  contents: {
    rootSection: 'root',
    sections: sections,
    widgets: widgets,
    timeline: {
      past: [],
      future: [],
      index: -1,
    },
  },
  createdAt: 0,
  isFetching: false,
  isSaving: false,
  lastSaved: -1,
  public: false,
  unsavedChanges: false,
  url: ''
}

const contentsReducer = (state, action) => {
  if (action.type == UNDO) {
    // Restore an old state only if there are states left to restore
    // Decrement index, use this to keep track of which state you are at
    if (state.timeline.index >= 0) {
      let nextState = applyPatches(state, state.timeline.past[state.timeline.index])
      return produce<DashboardContentsModel>(nextState, draft => {
        draft.timeline.index--;
      })
    }
  }

  if (action.type == REDO) {
    // Re-do a state that has been previously undone
    // Only if there are states to be done
    if (state.timeline.index < state.timeline.future.length - 1) {
      let nextState = applyPatches(state, state.timeline.future[state.timeline.index + 1])
      return produce<DashboardContentsModel>(nextState, draft => {
        draft.timeline.index++;
      })
    }
  }

  // The following is any other Dashbaord Contents action (which is undoable)
  // Here we're using Immer to magically make our state immutable
  // Immer also has an amazing feature that allows us to create patches for our state changes
  // This means that given an original state A and modifications are made to make state B
  // Immer can create patches which describe how A was changed to B and the other way around
  // We'll store all of these patches, that way we can re-play these patches which becomes our undo/redo
  // IMPORTANT: make sure you are not re-defining the immer state object
  // Only mutate it directly or return a new object
  // E.g. don't do this: draft = abc do this instead: return abc
  // Learn more here: https://github.com/immerjs/immer
  let patch = null;   // Will store our A -> B patch
  let undo = null;    // Will store our reverse B -> A patch

  let nextState = produce<DashboardContentsModel>(state, draft => {
    switch (action.type) {
      case SET_DASHBOARD:
        return action.contents;
      case ADD_WIDGET:
        return addWidgetToState(draft, action.widgetId, action.parentId, action.index);
      case REMOVE_WIDGET:
        return removeWidgetFromState(draft, action.widgetId);
      case MOVE_WIDGET:
        return moveWidget(
          draft,
          action.sourceIndex,
          action.sourceContainerId,
          action.destinationIndex,
          action.destinationContainerId,
          action.widgetId,
        );
      case EDIT_WIDGET:
        draft.widgets[action.widgetId].options = action.options;
        return;
    }
  },
  (patches, inversePatches) => {
    // Storing these patches into variables defined above
    undo = inversePatches;
    patch = patches
  })

  // When we tell immer to create patches for us, immer won't apply the new state immediately
  // We solve this by applying the new patch that was just created, because we want this applied to our state
  nextState = applyPatches(state, patch);

  // Only if the state change resulted in something undoable or redoable
  if (!((undo === undefined || undo.length == 0) && (patch === undefined || patch.length == 0))) {
    // If we're in the middle of a undo/redo stack, let's throw away everything ahead of it
    // This is for the case where: something -> something -> undo -> something
    // For above, you shouldn't be able to redo because it makes no sense
    // We're also adding the inverse and forward patch into our history
    nextState = produce<DashboardContentsModel>(nextState, draft => {
      draft.timeline.past.splice(draft.timeline.index + 1)
      draft.timeline.future.splice(draft.timeline.index + 1)
      draft.timeline.past.push(undo);
      draft.timeline.future.push(patch);
      draft.timeline.index = draft.timeline.past.length - 1;
    })
  }

  return nextState;
}

// Here we're using a nested reducer (contents reducer above and nested here)
export const dashboardReducer = (state = initialState, action) => {
  return produce<DashboardModel>(state, draft => {
    switch (action.type) {
      case FETCHING_DASHBOARD:
        draft.isFetching = true;
        break;
      case SET_DASHBOARD:
        draft.isFetching = false;
        break;
    }
    draft.contents = contentsReducer(state.contents, action)
    return;
  })
}
