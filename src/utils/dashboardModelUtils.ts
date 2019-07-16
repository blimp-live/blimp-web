
import { RootNodeModel, SectionNodeModel, WidgetModel } from '../interfaces/nodeModels';

function sectionModelHandler(id: String, contents: SectionNodeModel) {
  for(let child of (contents as SectionNodeModel).children) {
    if(child.type == "SectionModel") {
      return sectionModelHandler(id, child as SectionNodeModel);
    } else if(child.type == "WidgetModel") {
      let widget = child as WidgetModel;
      /*if(child.id == id) {
        //delete child
        console.log("Found");
      }*/
    }
  }
}

export function removeWidgetFromState(id: String, contents: RootNodeModel) {
  // Helper that will cycle through the contents childrens recurisvely
  // and look for a widget of said Id
  for(let child of contents.children) {
    if(child.type == "SectionModel") {
      return sectionModelHandler(id, child as SectionNodeModel);
    } else if(child.type == "WidgetModel") {
      /*if(child.id == id) {
        console.log("Found");
      }*/
    }
  }

  return contents;
}
