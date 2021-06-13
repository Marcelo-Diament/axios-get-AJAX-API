import makeRequest from './api/makeRequest.js'
import { displayUserDetails } from './inc/user.js'

const loadAndShowUserDetails = name => makeRequest(name, 'user', displayUserDetails)

const loadContent = name => {
  loadAndShowUserDetails(name)
}

window.onload = () => {
  const name = prompt('Digite o nome do usuário')
  name && loadContent(name)
}
