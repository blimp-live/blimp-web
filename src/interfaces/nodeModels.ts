export type SectionDivision = 'VERTICAL' | 'HORIZONTAL';

export interface NodeModel {
  type: string,
  theme?: string,
  themeOptions?: any, // TODO, how are we handling themes?
};

export interface SectionNodeModel extends NodeModel {
  children: NodeModel[],
  sectionDivision?: SectionDivision,
  relativeSize: number[],
}

export interface PageNodeModel extends NodeModel {
  children: NodeModel[],
  transition: any, // TODO, how are we handling page transitions?
}

export interface RootNodeModel extends NodeModel {
  children: NodeModel[],
}

export interface WidgetModel extends NodeModel {
  widgetType: string,
  Id: string,
  options: any,
  version: number,
}
