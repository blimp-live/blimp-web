import React from 'react';
import styles from './widget.module.css';
import { Draggable } from 'react-beautiful-dnd';
import { WidgetModel } from '../../interfaces/nodeModels';
import OptionsModal from '../dashboard/optionsModal';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../../reducers";

interface WidgetProps {
  key: string;
  widgetComponent: any;
  index: number;
  data: WidgetModel;
  style?: React.CSSProperties;
}

interface WidgetState {
  modalOpen: boolean;
}

class Widget extends React.Component<WidgetProps, WidgetState> {
  constructor(WidgetProps) {
    super(WidgetProps);
    this.state = {
      modalOpen: false
    };
  }

  handleClickOpen = () => {
    this.setState({
      modalOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      modalOpen: false
    });
  };

  generateWidget() {
    const WidgetComponent = this.props.widgetComponent;
    return (
      <Draggable draggableId={this.props.data.id} index={this.props.index}>
        {(provided: any, snapshot) => {
          // While dragging, change the size
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
              <button className={styles.optionsButton} onClick={this.handleClickOpen}>...</button>
              <OptionsModal open={this.state.modalOpen} onClose={this.handleClose} propTypesList={this.props.widgetComponent.propTypes} widgetId={this.props.data.id} />
              <WidgetComponent {...this.props.data.options} />
            </div>
          )}}
      </Draggable>
    )
  }
  // @ts-ignore
  refCallback = element => {
    if (element) {
      console.log("CALLBACK IS HAPPENING");
      console.log(element.getBoundingClientRect());
    }
  };

  render() {
    return (
      this.generateWidget()
    );
  }
}

const actions: any = Object.assign({}, null);

function mapStateToProps(state: RootState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widget);
