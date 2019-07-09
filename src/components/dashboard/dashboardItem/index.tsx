import * as React from "react";
import { NodeModel, WidgetModel, SectionNodeModel } from "../../../interfaces/nodeModels";
import Widget from "../../../components/widget";
import Section from "../section";

interface Props {
    contents: NodeModel;
    widgets: any;
}

export class DashboardItem extends React.Component<Props> {
    render() {
        if (this.props.contents.type === 'WidgetModel') {
            return (
                <Widget key='1' index={1} widget={this.props.widgets[(this.props.contents as WidgetModel).widgetType]} />
            );
        }
        else if (this.props.contents.type === 'SectionModel') {
            return (
                <Section>
                    {
                        <DashboardItem contents={(this.props.contents as SectionNodeModel).children[0]} widgets={this.props.widgets} />
                        // (this.props.contents as SectionNodeModel).children.map((child, index) => {
                        //     <DashboardItem key={index} contents={child} widgets={this.props.widgets} />
                        // })
                    }
                </Section>
            )
        }
    }
}

export default DashboardItem;
