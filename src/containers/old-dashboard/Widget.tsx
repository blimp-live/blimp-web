import React from 'react';
import './Widget.css';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';

interface WidgetProps {
  key: string;
  widget: any;
  index: number;
}

class Widget extends React.Component<WidgetProps> {
  // @ts-ignore
  constructor(WidgetProps) {
    super(WidgetProps);
    this.state = React.createRef<Widget>();
    // console.log(this.state);
  }

  generateWidget() {
    const WidgetComponent = this.props.widget;
    return <WidgetComponent/>
  }
  // @ts-ignore
  refCallback = element => {
    if (element) {
      console.log("CALLBACK IS HAPPENING");
      console.log(element.getBoundingClientRect());
    }
  };

  render() {
    // console.log(this);
    // const position = ReactDOM?.findDOMNode(this.forwardRef['UniqueElementIdentifier']).getBoundingClientRect(); //outputs <h3> coordinates
    // console.log(ReactDOM?.findDOMNode(this.props.forwardRef === 'UniqueElementIdentifier')));
    console.log(this.props.index)
    return (
      <div ref={this.refCallback}>
        <Draggable draggableId={"widget"+this.props.index} index={this.props.index}>
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
// const Widget: React.FC = () => {
//   return (
//     <div className="header">
//       <div className="redo-undo-div">
//         <Button className='undo-button button'>Undo</Button>
//         <Button className='redo-button button'>Redo</Button>
//       </div>
//       <Button className='save-button button'>Save</Button>
//     </div>
//   );
// }

export default Widget;
