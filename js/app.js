async function loadMovies(){

  const response = await fetch('./content/movies.json');

  const movies = await response.json();

  console.log(movies);

  const container = document.querySelector('.content-grid');

  container.innerHTML = '';

  movies.forEach(movie => {

    container.innerHTML += `

      <div class="card">

        <img src="https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg">

        <h3>${movie.title}</h3>

      </div>

    `;

  });

}

loadMovies();
