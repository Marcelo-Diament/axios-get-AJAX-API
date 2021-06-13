// Responsável por renderizar as informações no DOM

import { selector } from '../helpers/general.js'
import userTags from '../templates/userTags.js'
import userRepo from '../templates/userRepo.js'

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

const displayUserRepos = repos => {
  let reposContent = ''
  for (let repo of repos) {
    reposContent += userRepo(repo)
  }
  selector('.repos')[0].innerHTML = reposContent
}

export { displayUserDetails, displayUserRepos }