import * as React from "react";
import Dashboard from "../../components/dashboard"

interface Props {
  match: any;
  actions: any;
}

export default class DashboardView extends React.Component<Props> {
  render() {
    return (
      <div>
        <title>Hack The North</title>
        <Dashboard />
      </div>
    );
  }
}
