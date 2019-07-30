import * as React from "react";
import styles from "./dashboard.module.css"
import { DashboardItem } from "./dashboardItem";
import { DashboardContentsModel } from "../../interfaces/dashboardModel";
import { DragDropContext } from 'react-beautiful-dnd';

interface Props {
  contents: DashboardContentsModel;
  widgets: any;
}

export class Dashboard extends React.Component<Props> {
  onDragEnd = result => {
      // TODO add state change here
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

export default Dashboard;
