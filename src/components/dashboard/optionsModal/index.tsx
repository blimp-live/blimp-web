import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import * as dashboardActions from "../../../actions/dashboardActions";

interface OptionsProps {
  open: boolean;
  onClose: any;
  propTypesList: any; //TODO: get list of formatted names - probably have to create a function in each widget // TODO: also create a function in each widget for the expected types for each option
  actions: any;
  widgetId: string;
}

class OptionsModal extends React.Component<OptionsProps> {
  // @ts-ignore
  constructor(OptionsProps) {
    super(OptionsProps);
  }

  handleClose = () => {
    this.props.onClose();
  };

  saveOptions = () => {
    var optionsMap = {};
    Object.keys(this.props.propTypesList).map(option => {
          optionsMap[option] = (document.getElementById("option-" + option) as HTMLInputElement).value;
      }
    )
    this.props.actions.editWidget(optionsMap, this.props.widgetId)
  };

  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.props.open}>
        <DialogTitle id="modal-title">Set Widget Options</DialogTitle>
        {
          Object.keys(this.props.propTypesList).map(option => (
            <label key={"option-" + option}>
              {option + ": "}
              <input id={"option-" + option}></input>
            </label>
          ))
        }
        <button onClick={this.saveOptions}> Save Options</button>
      </Dialog>
    );
  }
}

const actions: any = Object.assign({}, dashboardActions);

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(OptionsModal);

