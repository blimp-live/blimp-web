import * as React from "react";
import styles from './styles.module.css';

export class WidgetView extends React.Component<{}> {
  render(){
    return (
      <div className={styles.widgetView}>
        <h1>Widgets</h1>
      </div>
    );
  }
}

export default WidgetView;
