import { RootNodeModel, SectionNodeModel, WidgetModel } from '../interfaces/nodeModels';


export function removeWidgetFromState(contents: any, id: string) {
  // Helper to remove a widget from contents that get passed in

  // Creating a copy of the original object
  let rootSection = contents.rootSection;
  let sections = {...contents.sections};
  let widgets = {...contents.widgets};

  let new_contents = {
    rootSection: rootSection,
    sections: sections,
    widgets: widgets
  };

  // This is composed of 2 Steps:
  /*
      Step 1:
        - Find the section that the widget is contained in
        - Remove it from the section's children
        - Adjust the relative sizing of the section's remaining children
        - If the sections children are 0 or 1, we need to do some adjustments
        - If the above is the case call removeSection to handle this

      Step 2:
        - Remove the Widget from the Widgets list
  */

  for(let section in new_contents.sections) {
    if(new_contents.sections[section].children.includes(id)) {

      // Call helper to remove the child from the section and redistribute
      // sizing amongst the remaining children
      new_contents = removeChildAndReDistributeSizing(new_contents, section, id);

      // IF remaining children is 0 or 1 we have to do some extra stuff
      // This will be handled by the 'removeSection' function
      if(new_contents.sections[section].children.length <= 1) {
        new_contents = removeSection(new_contents, new_contents.widgets[id].parentId);
      }

      // Given the assumption that a widget can only be in one section
      // We break to save some time
      break;
    }

  }

  // Finally remove the widget
  delete new_contents.widgets[id];

  return new_contents;
}

function removeSection(contents: any, id: string) {
  // Two Cases to Consider:

  /*
      Case 1: 0 Children in the Section
        - Remove the Section, recurse on its parent

      Case 2: 1 Child in the Section
        - We want to remove the section and put the child in the section's parent section
  */

  if(id == 'root') {
    return contents;
  }

  if(contents.sections[id].children.length == 0) {

    // Call helper to remove the child from the section and redistribute
    // sizing amongst the remaining children
    contents = removeChildAndReDistributeSizing(contents, contents.sections[id].parent, id);

    // Recurse if we aren't at the top level
    if(contents.sections[id].parent != 'root') {
        contents = removeSection(contents, contents.sections[id].parent)
    }

    // Remove the section completely
    delete contents.sections[id];

  } else if(contents.sections[id].children.length == 1) {

    // Take current section's one child and put it into the section's parent section
    let parentId =contents.sections[id].parent;
    let currentSectionIndex = contents.sections[parentId].children.indexOf(id);
    let childId = contents.sections[id].children[0];

    // Replace current section with the child in the section's parent
    contents.sections[parentId].children[currentSectionIndex] = childId;

    // Checking if the child is a widget or a section
    if(contents.sections[childId] != null) {
        contents.sections[childId].parent = parentId;
    } else {
        contents.widgets[childId].parentId = parentId;
    }

    // Recurse if not at the top level
    if(contents.sections[parentId].parent != 'root') {
        contents = removeSection(contents, contents.sections[id].parent)
    }

    // Remove the section completely
    delete contents.sections[id];
  }

  return contents;
}

function removeChildAndReDistributeSizing(contents: any, section: string, id: string) {

  // This function gets the index of the child in it's parent section
  // It removes the child from the parent section
  // It gets the current relative sizing of the child
  // It removes the relative sizing responding to the now (removed) child
  // This 'relative sizing' of the removed child gets divided by the remaining children
  // This then gets added to the rest of the children

  // Getting the location of the current child
  let childIndex = contents.sections[section].children.indexOf(id);

  // Remove the child from the section
  contents.sections[section].children = contents.sections[section].children.filter((value) => value != id);

  // Get the relative sizing of the child that has been removed
  let childRelativeSize = contents.sections[section].relativeSize[childIndex];

  // Calculate the amount to distribute to the remaining children
  let sizeToAllocateToRemainingChildren = childRelativeSize/contents.sections[section].children.length;
  // Remove the relative sizing entry of the child
  contents.sections[section].relativeSize.splice(childIndex, 1);

  // Distribute remaining space to the remaining children
  for (let i = 0; i < contents.sections[section].relativeSize.length; i++) {
      contents.sections[section].relativeSize[i] += sizeToAllocateToRemainingChildren;
  }

  return contents;
}

export function addWidgetToState(contents: any, parentId: string) {
  // Given a Parent ID we will add a widget to the parent

  // TODO: How do we handle section splitting?
  return contents;
}
