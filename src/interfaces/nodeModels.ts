export type SectionDivision = 'VERTICAL' | 'HORIZONTAL';

export interface NodeModel {
  id: string,
  parentId?: string,
  type: string,
  theme?: string,
  themeOptions?: any, // TODO, how are we handling themes?
};

export interface SectionNodeModel extends NodeModel {
  children: string[],
  sectionDivision: SectionDivision,
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
  options: any,
  version: number,
}
