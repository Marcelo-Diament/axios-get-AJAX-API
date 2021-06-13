// Responsável por realizar a request AJAX via axios

const makeRequest = (username, purpose, callback) => {
  let endpoint = `${username}`
  axios.get(`https://api.github.com/users/${endpoint}`)
    .then(response => callback(response.data))
    .catch(error => console.error(error))
}

export default makeRequest