const makeRequest = (username, purpose, callback) => {
  let endpoint = `${username}`
  switch (purpose) {
    case 'repos':
      endpoint += `/repos?type=public&sort=updated&direction=desc`
      break
    default:
      endpoint
  }
  axios.get(`https://api.github.com/users/${endpoint}`)
    .then(response => callback(response.data))
    .catch(error => console.error(error))
}

export default makeRequest