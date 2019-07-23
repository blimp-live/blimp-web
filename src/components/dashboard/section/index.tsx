import * as React from "react";
import { NodeModel, SectionDivision } from "../../../interfaces/nodeModels";
import styles from "./section.module.css";

interface Props {
  relativeSize: number[];
  sectionDivision: SectionDivision;
}

export class Section extends React.Component<Props> {
  render() {
    const children = this.props.children
    const relativeSize = this.props.relativeSize
    return (
      <div className={`${styles.section} ${this.props.sectionDivision === 'HORIZONTAL' ? styles.sectionHorizontal : styles.sectionVertical} `}>
        {React.Children.map(children, (child, i) => {
          // Generate a random colour
          let colour = [];
          for (var j = 0; j < 3; j++) {
            colour.push(Math.floor(Math.random()*256));
          }
          return (
            <div style={{
              backgroundColor: `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`,
              // Sizing logic
              flexBasis: `${relativeSize[i]*100}%`,
              // When the section is divided horizontally
              // height is constrained, but width takes up 100% of available space
              // vice versa for the vertical case
              width: this.props.sectionDivision == 'HORIZONTAL' ? '100%' : `${relativeSize[i]*100}%`,
              height: this.props.sectionDivision == 'VERTICAL' ? '100%' : `${relativeSize[i]*100}%`,
              overflow: 'hidden',
            }}>
              {child}
            </div>
          )
        })}
      </div>
    );
  }
}

export default Section;
