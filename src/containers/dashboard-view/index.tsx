import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState, rootReducer } from "../../reducers";
import { RootNodeModel } from "../../interfaces/nodeModels";
import Dashboard from "../../components/dashboard"

interface Props {
  match: any;
  actions: any;
  contents: any;
  widgets: any;
}

export class DashboardView extends React.Component<Props> {
  render(){
    return (
      <div>
        <Dashboard contents={this.props.contents} widgets={this.props.widgets} />
      </div>
    );
  }
}

const actions: any = Object.assign({}, null);

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
)(DashboardView);
