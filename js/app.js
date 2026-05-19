async function loadApp() {

  const res = await fetch('./content/all.json');
  const data = await res.json();

  const hero = document.getElementById('hero');
  const sections = document.getElementById('sections');

  const movies = data.filter(i => i.type === 'movie');

  // ===== HERO CAROUSEL =====
  movies.slice(0,6).forEach((movie, index) => {

    hero.innerHTML += `
      <div class="hero-item ${index === 0 ? 'active' : ''}">
        <img src="${movie.banner}">
        <div class="hero-text">
          <h1>${movie.title}</h1>
          <p>${movie.genre} • ${movie.year}</p>
        </div>
      </div>
    `;

  });

  let current = 0;
  setInterval(() => {

    const items = document.querySelectorAll('.hero-item');
    items[current].classList.remove('active');

    current = (current + 1) % items.length;

    items[current].classList.add('active');

  }, 6000);

  // ===== SEÇÕES =====
  const types = ['movie','serie','anime'];

  types.forEach(type => {

    const filtered = data.filter(i => i.type === type);

    const section = document.createElement('div');

    section.innerHTML = `
      <div class="section-title">
        ${type === 'movie' ? 'Filmes' : type === 'serie' ? 'Séries' : 'Animes'}
      </div>

      <div class="cards">
        ${filtered.map(item => `
          <div class="card" onclick="openContent('${item.embed || ''}')">
            <img src="${item.poster}">
          </div>
        `).join('')}
      </div>
    `;

    sections.appendChild(section);

  });

}

function openContent(embed){
  window.location.href = `player.html?url=${encodeURIComponent(embed)}`;
}

loadApp();
