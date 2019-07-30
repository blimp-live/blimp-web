
// Helper to grab all elements with a certain theme
// remove the old theme and apply the new one
// Note this is for an overall theme, we can add more later to update a variable in a certain theme
export function changeTheme(oldTheme: string, newTheme: string) {
  let oldThemeSelector = ".theme" + "--" + oldTheme;
  let newThemeClassValue= "theme" + "--" + newTheme;

  const elements: NodeListOf<Element> = document.querySelectorAll(".theme" + "--" + oldTheme);

  // By default we can only iterate over arrays or strings within typescript
  // Changing this to 'any' to get around this for now
  for(let element of elements as any) {
    element.setAttribute("class", newThemeClassValue);
  }

}
