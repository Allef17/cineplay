const movie =
JSON.parse(localStorage.getItem('currentMovie'))

const player =
document.getElementById('playerFrame')

if(movie){

  player.src = movie.link

}
