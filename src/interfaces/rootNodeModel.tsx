import { NodeModel } from './nodeModel';
import { SectionDivision } from './sectionDivision';

export interface RootNodeModel extends NodeModel {
  children: NodeModel[],
  sectionDivision?: SectionDivision,
  theme: string // TODO, how are we handling themes?
}
