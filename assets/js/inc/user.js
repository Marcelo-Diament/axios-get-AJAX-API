// Responsável por renderizar as informações no DOM

import { selector } from '../helpers/general.js'
import userTags from '../templates/userTags.js'

const displayUserDetails = details => {
  for (let userTag in userTags) {
    const prop = selector(userTags[userTag]),
      value = details[userTag]
    switch (userTag) {
      case 'avatar_url':
        prop.setAttribute('src', value)
        break
      case 'html_url':
        prop.setAttribute('href', value)
        break
      default:
        prop.innerText = value
    }
  }
}

export { displayUserDetails }