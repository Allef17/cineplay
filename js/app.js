async function loadMovies() {

  const response = await fetch('./content/movies.json');
  const movies = await response.json();

  const container = document.getElementById('sections');

  const section = document.createElement('div');

  section.innerHTML = `
    <div class="section-title">Filmes</div>
    <div class="cards">
      ${movies.map(movie => `
        <div class="card" onclick="openMovie('${movie.embed}')">
          
          <img src="${movie.poster}" />

          <div class="card-overlay"></div>

          <div class="card-info">
            <div class="card-title">${movie.title}</div>
            <div class="card-meta">${movie.year} • ${movie.genre}</div>
          </div>

        </div>
      `).join('')}
    </div>
  `;

  container.appendChild(section);
}

function openMovie(embed){
  window.location.href = `player.html?url=${encodeURIComponent(embed)}`;
}

loadMovies();
