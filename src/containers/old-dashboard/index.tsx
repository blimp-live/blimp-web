import React, {createRef} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DashboardSection from './DashboardSection';
import WidgetListSection from './WidgetListSection';
import WidgetContainer from './WidgetContainer'
import * as widgets from 'blimp-live-widgets';

class OldDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      widgets: this.populateWidgets(),
      sections: {
        'dashboard': {
          id: 'dashboard',
          widgetIds: [],
        },
        'widgetList': {
          id: 'widgetList',
          widgetIds: this.getAllWidgetIDs()
        },
      },
    }
  }

  getAllWidgetIDs() {
    // @ts-ignore
    const widgetIDs = [];
    let count = 1;
    for (let widgetID in widgets) {
        // Don't want to import anything that isn't a component
        // TODO: We'll need to have some sort of 'widget' blacklist
        // in the blimp-live-widgets that indicates it's a theme and not a Component
        // For now: Hard coding is fine...
        if (widgetID != 'ClockThemes') {
          widgetIDs.push(widgetID)
          count += 1
        }
    }
    return widgetIDs
  }

  populateWidgets() {
    // @ts-ignore
    const inputRef = createRef();
    let count = 1;
    let widgetObject = {}
    for (let widgetID in widgets) {
        // Don't want to import anything that isn't a component
        // TODO: We'll need to have some sort of 'widget' blacklist
        // in the blimp-live-widgets that indicates it's a theme and not a Component
        // For now: Hard coding is fine...
        if (widgetID != 'ClockThemes') {
          const WidgetComponent = widgets[widgetID]
          // @ts-ignore
          widgetObject[widgetID] = <WidgetContainer key={count} widgetID={widgetID} index={count} ref={inputRef} widget={WidgetComponent}/>
          count += 1
        }
    }
    return widgetObject
  }

  onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) {
        return;
    }

    const startSection : any = (this as any).state.sections[source.droppableId];
    const finishSection : any = (this as any).state.sections[destination.droppableId];

    console.log("start section");
    console.log(startSection);
    console.log("finish section");
    console.log(finishSection);
    if (startSection.id === finishSection.id){
      console.log("sections are the same");
      const newWidgetIds = Array.from(startSection.widgetIds);
      newWidgetIds.splice(source.index, 1);
      newWidgetIds.splice(destination.index, 0, draggableId);

      const newSection = {
        ...startSection,
        widgetIds: newWidgetIds,
      };

      const newState = {
        ...this.state,
        sections: {
          // @ts-ignore
          ...this.state.sections,
          [newSection.id]: newSection,
        },
      };

      this.setState(newState);
      return;
    }

    // const startWidgetIds = Array.from(startSection.widgetIds);
    // startWidgetIds.splice(source.index, 1); // not sure about this
    // const newStartWidgetIds = {
    //   ...startSection,
    //   widgetIds: startWidgetIds,
    // };
    const finishWidgetIds = Array.from(finishSection.widgetIds);
    finishWidgetIds.splice(destination.index, 0, draggableId);

    const newFinishWidgetIds = {
      ...finishSection,
      widgetIds: finishWidgetIds,
    };

    const newState = {
        ...this.state,
        sections: {
          // @ts-ignore
          ...this.state.sections,
          // [newStartWidgetIds.id]: newStartWidgetIds,
          [newFinishWidgetIds.id]: newFinishWidgetIds,
        },
      };
    this.setState(newState);
  }

  render() {
    // @ts-ignore
    const dashboardSection = this.state.sections['dashboard'];
    // @ts-ignore
    const widgetListSection = this.state.sections['widgetList'];
     // @ts-ignore
    const dashboardWidgets = dashboardSection.widgetIds.map(widgetId => this.state.widgets[widgetId]);
     // @ts-ignore
    const widgetListWidgets = widgetListSection.widgetIds.map(widgetId => this.state.widgets[widgetId]);
    // @ts-ignore
    const section1 = <DashboardSection key='dashboard' section={dashboardSection} widgetComponents={dashboardWidgets}/>;
    // @ts-ignore
    const section2 = <WidgetListSection key='widgetList' section={widgetListSection} widgetComponents={widgetListWidgets} />;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {section1}
        {section2}
      </DragDropContext>
    );
  }
}

export default OldDashboard;
