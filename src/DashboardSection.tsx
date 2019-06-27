import React, {useRef} from 'react';
import Widget from './Widget'
import { Droppable } from 'react-beautiful-dnd';
import './DashboardSection.css';

class DashboardSection extends React.Component {
  /*populateWidgets() {
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
  }*/

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
                    //this.props.widgets.map((widget, index) => (<Widget key={widget.id} widget={widget} index={index}/>))
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
