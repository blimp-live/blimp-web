import * as React from "react";
import { NodeModel, WidgetModel, SectionNodeModel } from "../../../interfaces/nodeModels";
import Widget from "../../../components/widget";
import Section from "../section";

interface Props {
    contents: NodeModel;
    widgets: any;
}

export class DashboardItem extends React.Component<Props> {

    createDashboardItems() {
      const dashboardItems = [];
      let key = 0;
      for(let child of (this.props.contents as SectionNodeModel).children) {
        dashboardItems.push(<DashboardItem key={key} contents={child} widgets={this.props.widgets} />)
        key += 1;
      }
      return dashboardItems;
    }

    render() {
        // This is the case that we hit a Leaf Node (Widget)
        if (this.props.contents.type === 'WidgetModel') {
            return (
                <Widget key='1' index={1} widget={this.props.widgets[(this.props.contents as WidgetModel).widgetType]} />
            );
        }
        // This is handling the case that we're not at a Leaf node
        // We're at a Section, and a Section can be composed of more Sections
        // or Leafs (Widgets)
        // We have a recursive style to this
        else if (this.props.contents.type === 'SectionModel') {
            return (
                <Section
                    sectionDivision={(this.props.contents as SectionNodeModel).sectionDivision}
                    relativeSize={(this.props.contents as SectionNodeModel).relativeSize} >
                    {this.createDashboardItems()}
                </Section>
            )
        }
    }
}

export default DashboardItem;
