import React from 'react';
import Widget from './Widget'
import { Droppable } from 'react-beautiful-dnd';
import './WidgetListSection.css';

export default class WidgetListSection extends React.Component {
  render () {
    return (
      // @ts-ignore
      <div className="right-content-div">
        <div className='widget-list-container'>
            <Droppable
              // @ts-ignore
              isDropDisabled={true}
              droppableId={
              // @ts-ignore
              this.props.section.id}>
              { provided => (
                  // @ts-ignore
                  <div className='widget-list' ref={provided.innerRef} {...provided.droppableProps}>
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
