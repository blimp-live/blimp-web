import React from 'react';
import './Widget.css';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

interface WidgetProps {
  key: string;
  widget: any;
  index: number;
}

class Widget extends React.Component<WidgetProps> {
  render() {
    console.log(this.props);
    return (
      <Draggable draggableId={this.props.widget.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            className='container'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {this.props.widget.content}
          </div>
        )}
      </Draggable>
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
