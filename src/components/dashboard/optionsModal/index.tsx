import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

interface OptionsProps {
  open: boolean;
  onClose: any; //check if there is a function type
  propTypesList: any; //check if there is a map type //TODO IN FUTURE: get list of formatted names - probably have to create a function in each widget
}

class OptionsModal extends React.Component<OptionsProps> {
  // @ts-ignore
  constructor(OptionsProps) {
    super(OptionsProps);
    // this.state = React.createRef<Widget>();
  }

  // const { onClose, open } = this.props;

  handleClose = () => {
    this.props.onClose();
  };

  saveOptions = () => {
    var optionsList = [];
    Object.keys(this.props.propTypesList).map(option => { 
          optionsList.push((document.getElementById("option-" + option) as HTMLInputElement).value);
      }
    )
    console.log(optionsList)
  };

  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.props.open}>
        <DialogTitle id="modal-title">Set Widget Options</DialogTitle>
        {
          // this.props.propTypesList.map(widget => (
          //   <div> widget </div>
          //   )
          // )
          Object.keys(this.props.propTypesList).map(option => (
            <div> 
              {option + ": "} 
              <input id={"option-" + option}></input>
            </div>
          ))
        }
        <button onClick={this.saveOptions}> Save Options</button>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
      </Dialog>
    );
  }
}


export default OptionsModal;
