import * as React from "react";
import { NodeModel, SectionDivision } from "../../../interfaces/nodeModels";
import styles from "./section.module.css";

interface Props {
  relativeSize: number[];
  sectionDivision: SectionDivision;
}

export class Section extends React.Component<Props> {
  render() {
    return (
      <div className={`${styles.section} ${this.props.sectionDivision === 'HORIZONTAL' ? styles.sectionHorizontal : styles.sectionVertical} `}>
        {this.props.children}
      </div>
    );
  }
}

export default Section;
