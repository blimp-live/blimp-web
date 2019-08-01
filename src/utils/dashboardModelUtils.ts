import { RootNodeModel, SectionNodeModel, WidgetModel } from '../interfaces/nodeModels';
import { DashboardContentsModel, DashboardModel } from '../interfaces/dashboardModel';

export function removeWidgetFromState(contents: DashboardContentsModel, id: string) {
  // Helper to remove a widget from contents that get passed in

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

  let section = contents.widgets[id].parentId;
  // Call helper to remove the child from the section and redistribute
  // sizing amongst the remaining children
  removeChildAndReDistributeSizing(contents.sections, section, id);

  // IF remaining children is 0 or 1 we have to do some extra stuff
  // This will be handled by the 'removeSection' function
  if(contents.sections[section].children.length <= 1) {
    removeSection(contents, contents.widgets[id].parentId);
  }

  // Finally remove the widget
  delete contents.widgets[id];
}

export function moveWidget(
  contents: DashboardContentsModel,
  sourceIndex: number,
  sourceContainerId: string,
  destinationIndex: number,
  destinationContainerId: string,
  widgetId: string
) {
  // TODO: There's no need to redistribute sizing if it's the same container
  // E.g. moving something in the same section shouldn't resize it
  // Noting this down to maybe fix in the future
  removeChildAndReDistributeSizing(contents.sections, sourceContainerId, widgetId)
  addWidgetToState(contents, destinationContainerId, widgetId, destinationIndex)

  // IF remaining children is 0 or 1 we have to do some extra stuff
  // This will be handled by the 'removeSection' function
  if (contents.sections[sourceContainerId].children.length <= 1) {
    removeSection(contents, sourceContainerId);
  }
  // return newState;
}

function removeSection(contents: DashboardContentsModel, id: string) {
  // Two Cases to Consider:

  /*
      Case 1: 0 Children in the Section
        - Remove the Section, recurse on its parent

      Case 2: 1 Child in the Section
        - We want to remove the section and put the child in the section's parent section
  */

  // Base case
  if(id == 'root') {
    return;
  }

  if(contents.sections[id].children.length == 0) {
    // Call helper to remove the child from the section and redistribute
    // sizing amongst the remaining children
    // contents = removeChildAndReDistributeSizing(contents, contents.sections[id].parentId, id);

    // Recurse if we aren't at the top level
    if(contents.sections[id].parentId != 'root') {
        removeSection(contents, contents.sections[id].parentId)
    }

    // Remove the section completely
    delete contents.sections[id];

  } else if(contents.sections[id].children.length == 1) {
    // Take current section's one child and put it into the section's parent section
    let parentId = contents.sections[id].parentId;
    let currentSectionIndex = contents.sections[parentId].children.indexOf(id);
    let childId = contents.sections[id].children[0];

    // Replace current section with the child in the section's parent
    contents.sections[parentId].children[currentSectionIndex] = childId;

    // Checking if the child is a widget or a section
    if(contents.sections[childId] != null) {
        contents.sections[childId].parentId = parentId;
    } else {
        contents.widgets[childId].parentId = parentId;
    }

    // Remove the section completely
    delete contents.sections[id];
  }
}

function removeChildAndReDistributeSizing(
  sections: {
    [key: string] : SectionNodeModel;
  },
  section: string,
  id: string
  ) {
  // This function gets the index of the child in it's parent section
  // It removes the child from the parent section
  // It gets the current relative sizing of the child
  // It removes the relative sizing responding to the now (removed) child
  // This 'relative sizing' of the removed child gets divided by the remaining children
  // This then gets added to the rest of the children

  // Getting the location of the current child
  let childIndex = sections[section].children.indexOf(id);

  // Remove the child from the section
  sections[section].children = sections[section].children.filter((value) => value != id);

  // // Get the relative sizing of the child that has been removed
  let childRelativeSize = sections[section].relativeSize[childIndex];

  // // Calculate the amount to distribute to the remaining children
  let sizeToAllocateToRemainingChildren = childRelativeSize/sections[section].children.length;
  // // Remove the relative sizing entry of the child
  sections[section].relativeSize.splice(childIndex, 1);

  // // Distribute remaining space to the remaining children
  for (let i = 0; i < sections[section].relativeSize.length; i++) {
      sections[section].relativeSize[i] += sizeToAllocateToRemainingChildren;
  }
}

export function addWidgetToState(contents: DashboardContentsModel, parentId: string, widgetId: string, index: number) {
  // Current this handles adding an existing widget to an existing section
  // TODO: handle other possibilities?

  let sections = contents.sections;
  let section = sections[parentId];

  // // Add widget to section list children at specified position
  section.children.splice(index, 0, widgetId);
  // // Initialize relative size value to 0
  section.relativeSize.splice(index, 0, 1/section.children.length);

  // Make space proportionally for the new widget
  for (let i = 0; i < section.relativeSize.length; i++) {
    if (i !== index) {
      section.relativeSize[i] = section.relativeSize[i] * (1 - (1/section.children.length));
    }
  }
}
