import { RootNodeModel, SectionNodeModel, WidgetModel } from '../interfaces/nodeModels';


export function removeWidgetFromState(contents: any, id: String) {
  // Helper to remove a widget from contents that get passed in
  // Note: We are passing in contents which is of the form
  /*contents: {
      rootSection: {}
      sections: {}
      widgets: {}
  }*/

  // First remove widget from section
  for(let section in contents.sections) {
    if(contents.section[section].children.includes(id)) {
      contents.section[section].children = contents.section[section].children.filter((value) => value != id);
    }

  }

  contents.widgets = delete contents.widgets[id];

  return contents;
}

function removeSection(contents: any, id: String) {
  // Helper to remove a section recursively

}


export function addWidgetToState(contents: any, parentId: String) {


}
