import React, {createRef} from 'react';
import Widget from './Widget'
import { Droppable } from 'react-beautiful-dnd';
import * as widgets from 'blimp-live-widgets';
import './WidgetListSection.css';

export default class WidgetListSection extends React.Component {


  populateWidgets() {
    const widgetComponents = [];
    const inputRef = createRef();
    let count = 1;
    for (let widget in widgets) {
      // Don't want to import anything that isn't a component
      // TODO: We'll need to have some sort of 'widget' blacklist
      // in the blimp-live-widgets that indicates it's a theme and not a Component
      // For now: Hard coding is fine...
      if (widget != 'ClockThemes') {
        const WidgetComponent = widgets[widget]
          // @ts-ignore
        widgetComponents.push(<Widget key={count} widgetID={widget} index={count} ref={inputRef} widget={WidgetComponent}/>)
        count += 1
      }
    }
    return widgetComponents;
  }

  render () {
    // console.log(inputRef)

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
                      this.populateWidgets()
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
