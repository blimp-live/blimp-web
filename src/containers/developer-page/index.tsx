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
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calculator-example/">Calculator Example</Link>
            </li>
            <li>
              <Link to="/hackthenorth/2019/">Hack the North</Link>
            </li>
            <li>
              <Link to="/developer/">Developer</Link>
            </li>
          </ul>
        </nav>
        <h1>Developer</h1>
        <button onClick={() => this.props.actions.createDashboard('Stanley Huang', 69)}>Hello</button>
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
