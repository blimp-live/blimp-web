import React, {useRef} from 'react';
import Widget from './Widget'
import { Droppable } from 'react-beautiful-dnd';
import './DashboardSection.css';

class DashboardSection extends React.Component {

  render () {
    return (
      // @ts-ignore
      <div className='left-content-div'>
        <div className='dashboard-container'>
          <Droppable droppableId={
            // @ts-ignore
            this.props.section.id}>
            { provided => (
                // @ts-ignore
                <div className='dashboard-widget' ref={provided.innerRef} {...provided.droppableProps}>
                  {
                    // @ts-ignore
                    this.props.widgets.map((widget, index) => (<Widget key={widget.id} widget={widget} index={index}/>))
                  }
                  {provided.placeholder}
                </div>
              )
            }
            </Droppable>
        </div>
     </div>
    );
  }
}

export default DashboardSection;
