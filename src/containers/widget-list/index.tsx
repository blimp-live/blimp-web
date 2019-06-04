import * as React from "react";
import { Link } from "react-router-dom";

// @ts-ignore -> no way to get around this because it's an external library
import * as widgets from 'blimp-live-widgets';

interface Props {
  actions: any;
}

export class WidgetList extends React.Component<Props> {

  // This loops through the set of widgets and
  // renders them
  // This is just done on a page for now
  // TODO: In future need containers and to have the Drag and Drop functionality
  // around this
  generateListOfWidgets() {
    const widgetComponents = []
    for (let widget in widgets) {
      if (widget != 'ClockThemes') {
        const WidgetComponent = widgets[widget]
        widgetComponents.push(<div><h1>{widget}</h1><WidgetComponent/></div>)
      }
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
