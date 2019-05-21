import { NodeModel } from './nodeModel';
import { SectionDivision } from './sectionDivision';

export interface SectionNodeModel extends NodeModel {
  children: NodeModel[],
  sectionDivision?: SectionDivision,
  relativeSize: number
}
