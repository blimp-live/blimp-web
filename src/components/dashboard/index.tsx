import * as React from "react";
import Button from '@material-ui/core/Button';
import styles from "./dashboard.module.css"
import { DashboardItem } from "./dashboardItem";
import { DashboardContentsModel } from "../../interfaces/dashboardModel";
<<<<<<< HEAD
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { Dispatch, bindActionCreators } from "redux";
import * as dashboardActions from "../../actions/dashboardActions";
=======
import { Drawer } from '@material-ui/core';
import { WidgetList } from '../../containers/widget-list';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
>>>>>>> Starting files

interface Props {
  contents: DashboardContentsModel;
  widgets: any;
  actions: any;
}

<<<<<<< HEAD
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
=======
interface State {
    widget_list_open: boolean,
}

export class Dashboard extends React.Component<Props, State> {
    constructor(props) {
      super(props);
      this.toggleWidgetList = this.toggleWidgetList.bind(this);

      this.state = {
        widget_list_open: true,
      };
    }

    toggleWidgetList() {
      this.setState({ widget_list_open: !this.state.widget_list_open});
    }

    render(){
        const rootNode = this.props.contents.sections[this.props.contents.rootSection] || this.props.contents.widgets[this.props.contents.rootSection]
        return (
          <div>
            <div className={styles.dashboard}>
                <DashboardItem node={rootNode} contents={this.props.contents} widgets={this.props.widgets} />
            </div>
            <Drawer
             anchor="right"
             variant="persistent"
             open={this.state.widget_list_open}
             onClose={this.toggleWidgetList}>
              <IconButton onClick={this.toggleWidgetList}>
              <ChevronRightIcon/>
             </IconButton>
              <WidgetList actions={false}/>
            </Drawer>
          </div>
        );
>>>>>>> Starting files
    }

    // If dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    this.props.actions.moveWidget(
      source.index,
      source.droppableId,
      destination.index,
      destination.droppableId,
      draggableId,
    );
  }

  loadDashboard = () => {
    this.props.actions.loadDashboard(0);
  };

  saveDashboard = () => {
    this.props.actions.saveDashboard(0);
  };

  render(){
    const rootNode = this.props.contents.sections[this.props.contents.rootSection] || this.props.contents.widgets[this.props.contents.rootSection]
    return (
      <div>
        <div className={styles.headerButtons}>
          <Button variant="contained" className={styles.saveButton} onClick={() => this.saveDashboard()}>Save</Button>
          <Button variant="contained" className={styles.loadButton} onClick={() => this.loadDashboard()}>Load</Button>
        </div>
        <DragDropContext
            onDragEnd={this.onDragEnd}
        >
          <div className={styles.dashboard}>
            <DashboardItem node={rootNode} contents={this.props.contents} widgets={this.props.widgets} index={0} />
          </div>
        </DragDropContext>
      </div>
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
