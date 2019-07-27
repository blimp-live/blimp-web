import { RootNodeModel, SectionNodeModel, WidgetModel } from '../interfaces/nodeModels';


export function removeWidgetFromState(contents: any, id: String) {
  // Helper to remove a widget from contents that get passed in
  // Note: We are passing in contents which is of the form
  /*contents: {
      rootSection: {}
      sections: {}
      widgets: {}
  }*/

  for(let section in contents.sections) {
    if(contents.sections[section].children.includes(id)) {
      // Get relative sizing because we need to split this amongst remaining children
      let widgetIndex = contents.sections[section].children.indexOf(id);
      contents.sections[section].children = contents.sections[section].children.filter((value) => value != id);
      // Relative sizing
      let widgetRelativeSize = contents.sections[section].relativeSize[widgetIndex];

      let sizeToAllocateToRemainingChildren = widgetRelativeSize/contents.sections[section].children.length;
      contents.sections[section].relativeSize.splice(widgetIndex, 1);

      for (let i = 0; i < contents.sections[section].relativeSize.length; i++) {
          contents.sections[section].relativeSize[i] += sizeToAllocateToRemainingChildren;
      }
      // IF remaining children is 0 or 1 we have to do some extra stuff
      // Recursive section adjustment
      if(contents.sections[section].children.length <= 1) {
        // Handling 1 and 0 remaining children
        // Recursive section stuff

      }
      // Given the assumption that a widget can only be in one section
      // We break to save some time
      break;
    }

  }

  // Deleting the actual widget itself from the structure
  // NOTE: This modifies the object directly do we want this?
  delete contents.widgets[id];

  return contents;
}

function removeSection(contents: any, id: String) {
  // Helper to remove a section recursively

}


export function addWidgetToState(contents: any, parentId: String) {
  // Given a Parent ID

}
