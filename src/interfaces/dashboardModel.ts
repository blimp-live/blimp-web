import { RootNodeModel, SectionNodeModel, NodeModel, WidgetModel } from './nodeModels';

export interface DashboardContentsModel {
  rootSection: string;
  sections: {
    [key: string] : SectionNodeModel;
  }
  widgets: {
    [key: string] : WidgetModel;
  }
  timeline?: {        // Used for undo/redo
    past: any;        // Holds patches to reverse changes
    future: any;      // Holds patches to apply changes
    index: number;    // Holds the index of the current patch
  }
}

export interface DashboardModel {
  id: number;
  name: String;
  createdAt: number;
  lastSaved: number;
  public: boolean;
  url: String;
  isFetching?: boolean;
  isSaving?: boolean;
  unsavedChanges?: boolean;
  contents: DashboardContentsModel;
}
