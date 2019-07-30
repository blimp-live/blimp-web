import * as React from "react";
import styles from "./dashboard.module.css"
import { DashboardItem } from "./dashboardItem";
import { DashboardContentsModel } from "../../interfaces/dashboardModel";
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { Dispatch, bindActionCreators } from "redux";
import * as dashboardActions from "../../actions/dashboardActions";

interface Props {
  contents: DashboardContentsModel;
  widgets: any;
  actions: any;
}

export class Dashboard extends React.Component<Props> {
  onDragEnd = result => {
    // Sample result format
    // {
    //   "draggableId" : "live-feed",
    //   "type" : "DEFAULT",
    //   "source" : {
    //     "index" : 0,
    //     "droppableId" : "left"
    //   },
    //   "reason" : "DROP",
    //   "mode" : "FLUID",
    //   "destination" : {
    //     "droppableId" : "left",
    //     "index" : 1
    //   },
    //   "combine" : null
    // }

    const { destination, source, draggableId } = result;

    // If no destination
    if (!destination) {
      return;
    }

    // If dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    this.props.actions.removeWidget(draggableId);
  }

  render(){
    const rootNode = this.props.contents.sections[this.props.contents.rootSection] || this.props.contents.widgets[this.props.contents.rootSection]
    return (
      <DragDropContext
          onDragEnd={this.onDragEnd}
      >
        <div className={styles.dashboard}>
          <DashboardItem node={rootNode} contents={this.props.contents} widgets={this.props.widgets} index={0} />
        </div>
      </DragDropContext>
    );
  }
}

const actions: any = Object.assign({}, dashboardActions);

function mapStateToProps(state: RootState) {
  return {
    contents: state.dashboardReducer.contents,
    widgets: state.widgetReducer.widgets,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
