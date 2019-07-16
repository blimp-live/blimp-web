import * as React from "react";
import styles from "./dashboard.module.css"
import NumberInput from '../numberInput'
import { RootNodeModel } from "../../interfaces/nodeModels";
import { DashboardItem } from "./dashboardItem";

interface Props {
    contents: RootNodeModel;
    widgets: any;
}

export class Dashboard extends React.Component<Props> {
    render(){
        return (
            <div className={styles.dashboard}>
                <DashboardItem contents={this.props.contents.children[0]} widgets={this.props.widgets} />
            </div>
        );
    }
}

export default Dashboard;
