import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState, rootReducer } from "../../reducers";
import { Link } from "react-router-dom"

interface Props {
  actions: any;
}

export class MarketingPage extends React.Component<Props> {
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
            <li>
              <Link to="/widget-list/">Widget List</Link>
            </li>
          </ul>
        </nav>
        <h1>Welcome Home!</h1>
      </div>
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
)(MarketingPage);
