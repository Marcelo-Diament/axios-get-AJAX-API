import { selector, setAttributes } from './helpers/general.js'
import makeRequest from './api/makeRequest.js'
import { displayUserDetails, displayUserRepos } from './inc/user.js'

const loadAndShowUserDetails = name => makeRequest(name, 'user', displayUserDetails)
const loadAndShowUserRepos = name => makeRequest(name, 'repos', displayUserRepos)

const addBtnSeeMore = name => {
  const userArticle = selector('.user article')[0],
    btnSeeMore = document.createElement('btn'),
    btnSeeMoreTxt = document.createTextNode('Ver Repositórios'),
    loadUserRepos = () => loadAndShowUserRepos(name)
  setAttributes(btnSeeMore, {
    class: 'btn btn--see-more',
    'data-name': name,
    id: 'seeRepos',
    href: '#'
  })
  btnSeeMore.addEventListener('click', loadUserRepos)
  btnSeeMore.appendChild(btnSeeMoreTxt)
  userArticle.appendChild(btnSeeMore)
}

const loadContent = name => {
  loadAndShowUserDetails(name)
  addBtnSeeMore(name)
}

window.onload = () => {
  const name = prompt('Digite o nome do usuário')
  name && loadContent(name)
}
