import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    let optionsMap = {};
    Object.keys(this.props.propTypesList).map(option => {
          optionsMap[option] = (document.getElementById("option-" + option) as HTMLInputElement).value;
      }
    )
    this.props.actions.editWidget(optionsMap, this.props.widgetId)
  };

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle id="modal-title">Set Widget Options</DialogTitle>
        <DialogContent>
          {
             (this.props.propTypesList && typeof Object.keys(this.props.propTypesList) !== 'undefined' && Object.keys(this.props.propTypesList).length > 0) &&
              Object.keys(this.props.propTypesList).map(option => (
                <label key={"option-" + option}>
                  <TextField
                    id={"option-" + option}
                    label={option + ": "}
                    fullWidth
                  />
                </label>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary">Close</Button>
          <Button onClick={this.saveOptions} color="primary">Save Options</Button>
        </DialogActions>
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
