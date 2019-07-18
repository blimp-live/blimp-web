import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './DashboardSection.css';

interface DashboardProps {
  widgetComponents: any;
  key: any;
  section: any;
}

export default class DashboardSection extends React.Component<DashboardProps> {
  render () {
    return (
      // @ts-ignore
      <div className='left-content-div'>
        <div className='dashboard-container'>
          <Droppable droppableId={
            this.props.section.id}>
            { provided => (
                <div className='dashboard-widget' ref={provided.innerRef} {...provided.droppableProps}>
                  {
                    this.props.widgetComponents
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
