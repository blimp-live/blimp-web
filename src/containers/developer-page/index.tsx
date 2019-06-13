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
  dashboard_name = ''
  dashboard_id = 0
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

        <form>
          <label>
            Dashboard Name:
            <input type="text" name="name" onChange={(evt) => { this.dashboard_name = evt.target.value; }}/>
          </label>
          <button onClick={() => this.props.actions.createDashboard(this.dashboard_name, 1)}>Create</button>
        </form>
        <br/>

        <form>
          <label>
            Dashboard Name:
            <input type="text" name="name" onChange={(evt) => { this.dashboard_name = evt.target.value; }}/>
          </label>
          <label>
            Dashboard ID:
            <input type="number" name="id" onChange={(evt) => { this.dashboard_id = parseInt(evt.target.value); }}/>
          </label>
          <button onClick={() => this.props.actions.saveDashboard(this.dashboard_id, this.dashboard_name, '{}')}>Save</button>
        </form>
        <br/>

        <form>
          <label>
            Dashboard ID:
            <input type="number" name="id" onChange={(evt) => { this.dashboard_id = parseInt(evt.target.value); }}/>
          </label>
          <button onClick={() => this.props.actions.loadDashboard(this.dashboard_id)}>Load</button>
        </form>
        <br/>

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
