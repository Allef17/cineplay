async function loadMovies() {
  const response = await fetch('./content/movies.json');
  const movies = await response.json();

  const sections = document.getElementById('sections');

  if (!sections) return;

  // cria uma seção única (estável)
  const section = document.createElement('div');
  section.className = 'section';

  let cardsHTML = '';

  movies.forEach(movie => {
    cardsHTML += `
      <div class="card" onclick="openMovie('${movie.embed}')">
        <img src="https://via.placeholder.com/300x170" />
        <div class="card-overlay"></div>
        <div class="card-info">
          <div class="card-title">${movie.title}</div>
          <div class="card-meta">${movie.year} • ${movie.genre}</div>
        </div>
      </div>
    `;
  });

  section.innerHTML = `
    <div class="section-title">Filmes</div>
    <div class="cards">
      ${cardsHTML}
    </div>
  `;

  sections.appendChild(section);
}

function openMovie(embed) {
  window.location.href = `player.html?url=${encodeURIComponent(embed)}`;
}

loadMovies();
