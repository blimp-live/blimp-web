import React from 'react';
import styles from './uneditableWidget.module.css';
import { Draggable } from 'react-beautiful-dnd';
import { WidgetModel } from '../../interfaces/nodeModels';
import OptionsModal from '../dashboard/optionsModal';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../../reducers";


interface UneditableWidgetProps {
  key: string;
  id: string;
  options: any;
  widgetComponent: any;
  index: number;
  style?: React.CSSProperties;
}


export class UneditableWidget extends React.Component<UneditableWidgetProps> {
  constructor(WidgetProps) {
    super(WidgetProps);
  }

  generateWidget() {
    const WidgetComponent = this.props.widgetComponent;
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided: any, snapshot) => {
          //While dragging, change the size
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
            <div
              style={{
                height: '100px',
                width: '100px',
              }} />
              { <WidgetComponent {...this.props.options} />
            }
            </div>
          )}}
      </Draggable>
    )
  }
  // @ts-ignore
  refCallback = element => {
    if (element) {
    }
  };

  render() {
    return (
      this.generateWidget()
    );
  }
}

//const actions: any = Object.assign({}, null);

/*function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UneditableWidget);*/
