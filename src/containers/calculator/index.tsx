import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as dashboardActions from "../../actions/dashboardActions";
import { RootState, rootReducer } from "../../reducers";
import { CalculatorModel } from "../../interfaces/calculatorModels";
import InputHolder from '../../components/inputHolder'
import OutputHolder from '../../components/outputHolder'

interface Props {
    calculatorState: CalculatorModel;
    actions: any;
}
const calculatorStyle = {
    marginLeft: '30%',
    marginTop: '20px',
    display: 'grid'
}
const divStyle = {
    color: 'indigo',
    fontSize: 'xx-large'
}
export class Calculator extends React.Component<Props> {
    render(){
        return (
            <div style={calculatorStyle}>
                <div style = {divStyle}>This is a simple calculator</div>
                <InputHolder
                    actions = {this.props.actions}
                    calculatorState = {this.props.calculatorState}
                />
                <OutputHolder
                    calculatorState = {this.props.calculatorState}
                />
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
)(Calculator);
