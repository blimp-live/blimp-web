import * as React from "react";
import { NodeModel, WidgetModel, SectionNodeModel } from "../../../interfaces/nodeModels";
import Widget from "../../../components/widget";
import Section from "../section";
import { DashboardContentsModel } from "../../../interfaces/dashboardModel";
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  contents: DashboardContentsModel;
  widgets: any;
  node: NodeModel;
  index: number;
}

export class DashboardItem extends React.Component<Props> {

  createDashboardItems(ids: string[]) {
    const dashboardItems = [];
    ids.forEach((id, i) => {
      const node = this.props.contents.sections[id] || this.props.contents.widgets[id]
      dashboardItems.push(<DashboardItem key={id} contents={this.props.contents} widgets={this.props.widgets} node={node} index={i} />)
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
                  relativeSize={section.relativeSize} >
                  {this.createDashboardItems(section.children)}
              </Section>
          )
      }
  }
}

export default DashboardItem;
