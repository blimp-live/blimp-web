import * as React from "react";
import styles from "./dashboard.module.css"
import { DashboardItem } from "./dashboardItem";
import { DashboardContentsModel } from "../../interfaces/dashboardModel";

interface Props {
    contents: DashboardContentsModel;
    widgets: any;
}

export class Dashboard extends React.Component<Props> {
    render(){
        const rootNode = this.props.contents.sections[this.props.contents.rootSection] || this.props.contents.widgets[this.props.contents.rootSection]
        return (
            <div className={styles.dashboard}>
                <DashboardItem node={rootNode} contents={this.props.contents} widgets={this.props.widgets} />
            </div>
        );
    }
}

export default Dashboard;
