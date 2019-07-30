import * as React from "react";
import { NodeModel, SectionDivision } from "../../../interfaces/nodeModels";
import styles from "./section.module.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  relativeSize: number[];
  sectionDivision: SectionDivision;
  id: string;
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
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {React.Children.map(children, (child, i) => {
              // generate a new style used for sectioning logic
              return (
                <div style={{
                    // Sizing logic
                    display: 'flex',
                    flexGrow: 1,
                    flexBasis: `${relativeSize[i]*100}%`,
                    // When the section is divided horizontally
                    // height is constrained, but width takes up 100% of available space
                    // vice versa for the vertical case
                    width: this.props.sectionDivision == 'HORIZONTAL' ? '100%' : `${relativeSize[i]*100}%`,
                    height: this.props.sectionDivision == 'VERTICAL' ? '100%' : `${relativeSize[i]*100}%`,
                    overflow: 'hidden',
                  }}
                >
                  {
                    child
                  }
                </div>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default Section;
