const selector = selectionQuery => {
  return selectionQuery.substr(0, 1) === '#'
    ? document.querySelector(selectionQuery)
    : document.querySelectorAll(selectionQuery)
}

const setAttributes = (element, attributes) => {
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute])
  }
}

export {
  selector,
  setAttributes
}