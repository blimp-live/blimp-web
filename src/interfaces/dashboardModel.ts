import { RootNodeModel, SectionNodeModel, NodeModel } from './nodeModels';

export interface DashboardContentsModel {
  rootSection: string;
  sections: {
    [key: string] : SectionNodeModel;
  }
  widgets: {
    [key: string] : NodeModel;
  }
}

export interface DashboardModel {
  id: number;
  name: String;
  createdAt: number;
  lastSaved: number;
  public: boolean;
  url: String;
  contentHistory?: String[];
  isFetching?: boolean;
  isSaving?: boolean;
  unsavedChanges?: boolean;
  contents: DashboardContentsModel;
}
