import { NodeModel } from './nodeModel';

export interface pageNodeModel extends NodeModel {
  children: NodeModel[],
  sectionDivision?: 'VERTICAL' | 'HORIZONTAL'
}
