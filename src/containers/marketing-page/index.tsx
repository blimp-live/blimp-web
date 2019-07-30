import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState, rootReducer } from "../../reducers";
import { Link } from "react-router-dom"
import "../../themes/themes.css";
import "../../themes/styles.css";
import { changeTheme } from "../../themes/changeTheme";

interface Props {
  actions: any;
}

interface State {
  theme: string;
}

export class MarketingPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      theme: "dark"
    };
    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme() {
    if(this.state.theme == "dark") {
      this.setState({theme: "light"});
    } else {
      this.setState({theme: "dark"});
    }
  }
  render(){
    return (
      <div className={"theme--"+ this.state.theme}>
        <nav className={"theme--" + this.state.theme}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calculator-example/">Calculator Example</Link>
            </li>
            <li>
              <Link to="/midterm/">Midterm Demo</Link>
            </li>
            <li>
              <Link to="/developer/">Developer</Link>
            </li>
            <li>
              <Link to="/dashboard-view/">Dashboard View</Link>
            </li>
          </ul>
        </nav>
        <h1>Welcome Home!</h1>
        <button className="button" onClick={this.changeTheme}>Click Me!</button>
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
