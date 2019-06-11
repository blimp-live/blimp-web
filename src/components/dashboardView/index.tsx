import * as React from "react";
import styles from './styles.module.css';

interface Props {
  className?: string,
}

export class DashboardView extends React.Component<Props> {
  render(){
    return (
      <div className={`${styles.dashboardView} ${this.props.className}`}>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default DashboardView;
