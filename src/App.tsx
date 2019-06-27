import React from 'react';
import initialData from './initialData';
//import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import DashboardSection from './DashboardSection';
import WidgetListSection from './WidgetListSection';

class App extends React.Component {

  state = initialData;
  //
  // state = {
  //   widgets: any,
  //   sections: any
  //     'widgetList': {
  //       id: 'widgetList',
  //       title: 'Widget List',
  //       widgetIds: ['widget-1', 'widget-2', 'widget-3'],
  //     },
  //   },
  //   sectionOrder: ['section-1', 'section-2'],
  // }

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
    // @ts-ignore
    const finishSection = this.state.sections[destination.droppableId];

    if (startSection === finishSection){
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
          ...this.state.sections,
          [newSection.id]: newSection,
        },
      };

      this.setState(newState);
      return;
    }

    const startWidgetIds = Array.from(startSection.widgetIds);
    startWidgetIds.splice(source.index, 1);
    const newStartWidgetIds = {
      ...startSection,
      widgetIds: startWidgetIds,
    };

    const finishWidgetIds = Array.from(finishSection.widgetIds);
    finishWidgetIds.splice(destination.index, 0, draggableId);
    const newFinishWidgetIds = {
      ...finishSection,
      widgetIds: finishWidgetIds,
    };

    const newState = {
        ...this.state,
        sections: {
          ...this.state.sections,
          [newStartWidgetIds.id]: newStartWidgetIds,
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
    const section1 = <DashboardSection key='dashboard' section={dashboardSection} widgets={dashboardWidgets} />;
    // @ts-ignore
    const section2 = <WidgetListSection key='widgetList' section={widgetListSection} widgets={widgetListWidgets} />;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {section1}
        {section2}
      </DragDropContext>
    );
  }
}

export default App;
