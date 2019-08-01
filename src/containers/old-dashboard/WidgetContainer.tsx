import React from 'react';
import './WidgetContainer.css';
import { Draggable } from 'react-beautiful-dnd';

interface WidgetContainerProps {
  widgetID: any;
  index: number;
  widget: any;
  key: number;
}

class WidgetContainer extends React.Component<WidgetContainerProps> {
  // @ts-ignore
  constructor(WidgetContainerProps) {
    super(WidgetContainerProps);
  }

  generateWidget() {
    const WidgetComponent = this.props.widget;
    return <WidgetComponent/>
  }

  // for sectioning logic purposes perhaps
  // @ts-ignore
  refCallback = element => {
    if (element) {
      console.log(element.getBoundingClientRect());
    }
  };

  render() {
    return (
      <div ref={this.refCallback}>
        <Draggable draggableId={this.props.widgetID} index={this.props.index}>
          {(provided: any, snapshot) => (
            <div
              className='container'
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {this.generateWidget()}
            </div>
          )}
        </Draggable>
      </div>
    );
  }
}

export default WidgetContainer;
