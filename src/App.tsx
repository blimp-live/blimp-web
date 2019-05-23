import React from 'react';
import initialData from './initialData';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import Section from './Section';

class App extends React.Component {

  state = initialData;

  // @ts-ignore
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) {
        return;
    }

    // @ts-ignore
    const startSection = this.state.sections[source.droppableId];
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
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="container">
          {this.state.sectionOrder.map(sectionId => {
            // @ts-ignore
            const section = this.state.sections[sectionId];
            // @ts-ignore
            const widgets = section.widgetIds.map(widgetId => this.state.widgets[widgetId]);
            // @ts-ignore
            return <Section key={section.id} section={section} widgets={widgets} />;
          })}
        </div>
      </DragDropContext>
    );
  }
}

  // return (
  //   <div className='content-container'>
  //     <div className='dashboard-container'>
  //         <Header></Header>
  //         <Dashboard>
  //           {this.renderLists()}
  //         </Dashboard>
  //     </div>
  //     <div className='widgetlist-container'>
  //       <WidgetList></WidgetList>
  //     </div>
  //   </div>
  // );

export default App;
