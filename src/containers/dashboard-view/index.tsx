import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState, rootReducer } from "../../reducers";

interface Props {
  match: any;
  actions: any;
}

export class DashboardView extends React.Component<Props> {
  render(){
    return (
      <h1>{this.props.match.params.username}'s Dashboard named {this.props.match.params.dashboardName}</h1>
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
)(DashboardView);
