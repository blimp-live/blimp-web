import * as React from "react";
import Widget from "../../components/widget";
import OptionsModal from "../../components/dashboard/optionsModal";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState, rootReducer } from "../../reducers";
import "./index.css"
import { WidgetModel } from "../../interfaces/nodeModels";
import * as dashboardActions from "../../actions/dashboardActions";

interface Props {
    key: string;
    widget: any;
    index: number;
    data: WidgetModel;
    actions: any;
}

interface State {
  modalOpen: boolean;
}

export class WidgetContainer extends React.Component<Props, State> {
  constructor(Props) {
    super(Props);
    this.state = {
      modalOpen: false
    };
  }


  handleClickOpen = () => {
    this.setState({
      modalOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      modalOpen: false
    });
  };

  removeWidget = () => {
    this.props.actions.removeWidget(this.props.data.id)
  };

  render(){
    return (
      <div>
        <div>
          <button className="options-button" onClick={this.handleClickOpen}>...</button>
          <button className="remove-button" onClick={this.removeWidget}>x</button>
          <OptionsModal open={this.state.modalOpen} onClose={this.handleClose} propTypesList={this.props.widget.propTypes} widgetId={this.props.data.id} />
        </div>
        <Widget key={this.props.key} index={this.props.index} widget={this.props.widget} options={this.props.data.options} />
      </div>
    );
  }
}

const actions: any = Object.assign({}, dashboardActions);

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
)(WidgetContainer);
