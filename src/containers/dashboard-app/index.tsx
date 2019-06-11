import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState, rootReducer } from "../../reducers";
import DashboardView from "../../components/dashboardView";
import { Link } from "react-router-dom";
import WidgetView from "../../components/widgetView";

import dashboardViewStyles from '../../components/dashboardView/styles.module.css'
import * as viewStateActions from "../../actions/viewStateActions";

interface Props {
  isEditing: Boolean,
  actions?: any,
}

const editButtonStyle = {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 999,
} as React.CSSProperties

export class DashboardApp extends React.Component<Props> {
  render(){
    return (
      <React.Fragment>
        <button style={editButtonStyle} onClick={() => {this.props.actions.editDashboard()}}>Edit</button>>
        <WidgetView />
        <DashboardView className={this.props.isEditing ? dashboardViewStyles.editing : ''}/>
      </React.Fragment>
    );
  }
}

const actions: any = Object.assign({}, viewStateActions);

function mapStateToProps(state: RootState) {
  return {
    isEditing: state.viewStateReducer.editDashboard,
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
)(DashboardApp as any);
