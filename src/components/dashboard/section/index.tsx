import * as React from "react";
import { NodeModel, SectionDivision } from "../../../interfaces/nodeModels";
import styles from "./section.module.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  relativeSize: number[];
  sectionDivision: SectionDivision;
  id: string;
  style?: React.CSSProperties;
}

export class Section extends React.Component<Props> {
  render() {
    const children = this.props.children
    const relativeSize = this.props.relativeSize
    return (
      <Droppable droppableId={this.props.id}>
        { provided => (
          <div
            className={`${styles.section} ${this.props.sectionDivision === 'HORIZONTAL' ? styles.sectionHorizontal : styles.sectionVertical} `}
            style={this.props.style}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {this.props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default Section;
