const userRepo = repo => {
  const {
    created_at,
    description,
    full_name,
    language,
    name,
    updated_at
  } = repo,
    createdAt = new Date(created_at).toLocaleDateString(),
    updatedAt = new Date(updated_at).toLocaleDateString(),
    nameFormated = name.replace(/-/g, ' ')
  return `
    <article class="repo">
      <h2 class="repo__title">${nameFormated}</h2>
      <p class="repo__description">${description}</p>
      <a href="https://github.com/${full_name}" target="_blank" rel="noopener noreferrer">Ver repositório</a>
      <p class="repo__infos">
        <small class="repo__info repo__info--language">${language || '-'}</small>
        <small class="repo__info repo__info--created">${createdAt}</small>
        <small class="repo__info repo__info--updated">${updatedAt}</small>
      </p>
    </article>
    <hr>
  `
}

export default userRepo