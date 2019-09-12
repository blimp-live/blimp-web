import * as React from "react";
import { NodeModel, WidgetModel, SectionNodeModel } from "../../../interfaces/nodeModels";
import Section from "../section";
import { DashboardContentsModel } from "../../../interfaces/dashboardModel";
import Widget from "../../widget";

interface Props {
  contents: DashboardContentsModel;
  widgets: any;
  node: NodeModel;
  index: number;
  style?: React.CSSProperties;
}

export class DashboardItem extends React.Component<Props> {

  createDashboardItems(ids: string[], relativeSize: number[], sectionDivision: string) {
    const dashboardItems = [];
    ids.forEach((id, i) => {
      const node = this.props.contents.sections[id] || this.props.contents.widgets[id]

      // generate a new style used for sectioning logic
      const style = {
        // Sizing logic
        display: 'flex',
        flexGrow: 1,
        flexBasis: `${relativeSize[i]*100}%`,
        // When the section is divided horizontally
        // height is constrained, but width takes up 100% of available space
        // vice versa for the vertical case
        width: sectionDivision == 'HORIZONTAL' ? 'calc(100%)' : `calc(${relativeSize[i]*100}% 5px)`,
        height: sectionDivision == 'VERTICAL' ? 'calc(100%)' : `calc(${relativeSize[i]*100}% 5px)`,
        overflow: 'hidden',
      }

      dashboardItems.push(
        <DashboardItem key={id} contents={this.props.contents} widgets={this.props.widgets} node={node} index={i} style={style} />
      )
    })
    return dashboardItems;
  }

  render() {
      // This is the case that we hit a Leaf Node (Widget)
      if (this.props.node.type === 'WidgetModel') {
        const widget = this.props.node as WidgetModel;
        return (
          <Widget
            key={widget.id}
            index={this.props.index}
            data={widget}
            widgetComponent={this.props.widgets[widget.widgetType]}
            style={this.props.style}
          />
        );
      }
      // This is handling the case that we're not at a Leaf node
      // We're at a Section, and a Section can be composed of more Sections
      // or Leafs (Widgets)
      // We have a recursive style to this
      else if (this.props.node.type === 'SectionModel') {
          const section = this.props.node as SectionNodeModel;
          return (
              <Section
                  key={section.id}
                  id={section.id}
                  sectionDivision={section.sectionDivision}
                  relativeSize={section.relativeSize}
                  style={this.props.style}>
                  {this.createDashboardItems(section.children, section.relativeSize, section.sectionDivision)}
              </Section>
          )
      }
  }
}

export default DashboardItem;
