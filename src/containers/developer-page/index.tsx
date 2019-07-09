import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState, rootReducer } from "../../reducers";
import { Link } from "react-router-dom";
import * as dashboardActions from "../../actions/dashboardActions";

interface Props {
  actions: any;
}

export class DeveloperPage extends React.Component<Props> {
  render(){
    return (
      <div>
        <h1>Developer</h1>
        <button onClick={() => this.props.actions.createDashboard('Stanley Huang', 1)}>Hello</button>
        <button onClick={() => this.props.actions.saveDashboard(1, 'Riley Gowanlock', '{}')}>Save</button>
      </div>
    );
  }
}

const actions: any = Object.assign({}, dashboardActions);

function mapStateToProps(state: RootState) {
  return {
    calculatorState: state.calculatorReducer
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
)(DeveloperPage);
