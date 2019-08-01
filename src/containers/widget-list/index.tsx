import * as React from "react";
import { Link } from "react-router-dom";
import Widget from "../../components/widget";
import { WidgetModel } from "../../interfaces/nodeModels";
import uuid4 from 'uuid4';
// @ts-ignore -> no way to get around this because it's an external library
import * as widgets from 'blimp-live-widgets';

interface Props {
  actions: any;
}

export class WidgetList extends React.Component<Props> {

  generateListOfWidgets() {
    const widgetComponents = []
    let count = 0;
    for (let widget in widgets) {
      // Don't want to import anything that isn't a component
      // TODO: We'll need to have some sort of 'widget' blacklist
      // in the blimp-live-widgets that indicates it's a theme and not a Component
      // For now: Hard coding is fine...
      if (widget != 'ClockThemes') {
        const WidgetComponent = widgets[widget];
        widgetComponents.push(<WidgetComponent/>)
      }
      count += 1;
    }
    return widgetComponents;
  }

  render(){
    return (
      <div>
        {this.generateListOfWidgets()}
      </div>
    );
  }
}
