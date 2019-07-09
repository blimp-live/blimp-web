import * as React from "react";
import { NodeModel } from "../../../interfaces/nodeModels";

interface Props {
}

export class Section extends React.Component<Props> {
    render(){
        return (
            <React.Fragment>
                <h1>Section</h1>
                <div>{this.props.children}</div>
            </React.Fragment>
        );
    }
}

export default Section;
