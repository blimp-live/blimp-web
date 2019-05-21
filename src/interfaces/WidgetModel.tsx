import { NodeModel } from './nodeModel';
import { SectionDivision } from './sectionDivision';

export interface WidgetModel extends NodeModel {
  type: string,
  options: any,
  version: number
}
