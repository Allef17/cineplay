async function loadMovies(){

  const response = await fetch('./content/movies.json');

  const movies = await response.json();

  const cardsContainers = document.querySelectorAll('.cards');

  if(cardsContainers[0]){

    cardsContainers[0].innerHTML = '';

    movies.forEach(movie => {

      cardsContainers[0].innerHTML += `

        <div class="card" onclick="openMovie('${movie.embed}')">

          <img src="https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg">

          <div class="card-overlay"></div>

          <div class="card-info">

            <div class="card-title">
              ${movie.title}
            </div>

            <div class="card-meta">
              ${movie.year} • ${movie.genre}
            </div>

          </div>

        </div>

      `;

    });

  }

}

loadMovies();

function openMovie(embed){

  window.location.href =
  `player.html?url=${encodeURIComponent(embed)}`;

}
