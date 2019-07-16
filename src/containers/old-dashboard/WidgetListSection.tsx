import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './WidgetListSection.css';

interface WidgetListProps {
  widgetComponents: any;
  key: any;
  section: any;
}

export default class WidgetListSection extends React.Component<WidgetListProps> {
  render () {
    return (
      <div className="right-content-div">
        <div className='widget-list-container'>
            <Droppable
              isDropDisabled={true}
              droppableId={
              this.props.section.id}>
              { provided => (
                  // @ts-ignore
                  <div className='widget-list' ref={provided.innerRef} {...provided.droppableProps}>
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
