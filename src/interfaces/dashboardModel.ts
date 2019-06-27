import { RootNodeModel } from './nodeModels';

export interface DashboardModel {
  id: number;
  name: String;
  contents: RootNodeModel;
  createdAt: number;
  lastSaved: number;
  public: boolean;
  url: String;
  contentHistory?: String[];
  isFetching?: boolean;
  isSaving?: boolean;
  unsavedChanges?: boolean;
}
