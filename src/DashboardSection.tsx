import React from 'react';
import Widget from './Widget'
import { Droppable } from 'react-beautiful-dnd';
import './DashboardSection.css';

export default class DashboardSection extends React.Component {
  render () {
    return (
      // @ts-ignore
      // <div className='dashboard-div'>
        <div className='dashboard-container'>
          <h3 className='title'>
            {
              // @ts-ignore
              this.props.section.title
            }
            </h3>
            <Droppable droppableId={
              // @ts-ignore
              this.props.section.id}>
              { provided => (
                  // @ts-ignore
                  <div className='widgetList' ref={provided.innerRef} {...provided.droppableProps}>
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
     // </div>
    );
  }
}
