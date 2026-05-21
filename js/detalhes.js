async function loadDetails() {

  const params = new URLSearchParams(window.location.search)

  const id = params.get('id')

  const response = await fetch('./contente/filmes.json')

  const movies = await response.json()

  const movie = movies.find(item => item.id == id)

  if(!movie) return

  document.getElementById('detailsTitle').innerText =
  movie.title

  document.getElementById('detailsGenre').innerText =
  movie.genre

  document.getElementById('detailsYear').innerText =
  movie.year

  document.getElementById('detailsRating').innerText =
  movie.rating

  document.getElementById('detailsDescription').innerText =
  movie.description

  document.querySelector('.details-banner').style.background =
  `
  linear-gradient(to right, rgba(0,0,0,.95), rgba(0,0,0,.4)),
  url(${movie.banner})
  `

  document.querySelector('.details-banner').style.backgroundSize =
  'cover'

  document.querySelector('.details-banner').style.backgroundPosition =
  'center'

  document.getElementById('watchButton')
  .onclick = () => {

    localStorage.setItem(
      'currentMovie',
      JSON.stringify(movie)
    )

    window.location.href = 'player.html'

  }

  document.getElementById('favoriteButton')
  .onclick = () => {

    let favorites =
    JSON.parse(localStorage.getItem('favorites')) || []

    const exists =
    favorites.find(item => item.id == movie.id)

    if(!exists){

      favorites.push(movie)

      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites)
      )

      alert('Adicionado aos favoritos')

    }

  }

}

loadDetails()
