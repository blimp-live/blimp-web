import React from 'react';
import styles from './widget.module.css';
import { Draggable } from 'react-beautiful-dnd';
import { WidgetModel } from '../../interfaces/nodeModels';

interface WidgetProps {
  key: string;
  widgetComponent: any;
  index: number;
  data: WidgetModel;
  style?: React.CSSProperties;
}

class Widget extends React.Component<WidgetProps> {
  // @ts-ignore
  constructor(WidgetProps) {
    super(WidgetProps);
    this.state = React.createRef<Widget>();
  }

  generateWidget() {
    const WidgetComponent = this.props.widgetComponent;
    return (
      <Draggable draggableId={this.props.data.id} index={this.props.index}>
        {(provided: any, snapshot) => {
          // While dragging, change the size
          if (snapshot.isDragging) {
            provided.draggableProps.style = {...provided.draggableProps.style, ...this.props.style, width: '250px', height: '250px'}
          }
          else {
            provided.draggableProps.style = {...provided.draggableProps.style, ...this.props.style}
          }

          return (
            <div
              className={styles.container}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <WidgetComponent {...this.props.data.options} />
            </div>
          )}}
      </Draggable>
    )
  }
  // @ts-ignore
  refCallback = element => {
    if (element) {
      console.log("CALLBACK IS HAPPENING");
      console.log(element.getBoundingClientRect());
    }
  };

  render() {
    return (
      this.generateWidget()
    );
  }
}

export default Widget;
