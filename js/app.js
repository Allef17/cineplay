let DATA = [];

async function init(){

  DATA = await fetch('./content/movies.json').then(r=>r.json());

  renderHome();
}

function renderHome(){

  const container = document.getElementById("app");

  const movies = DATA.filter(i=>i.type==="movie");

  container.innerHTML = `
    <h2 class="title">Filmes</h2>
    <div class="row">
      ${movies.map(m=>card(m)).join("")}
    </div>

    <h2 class="title">Séries</h2>
    <div class="row">
      ${DATA.filter(i=>i.type==="serie").map(m=>card(m)).join("")}
    </div>
  `;
}

function card(item){
  return `
    <div class="card" onclick="openDetails('${item.id}')">
      <img src="${item.poster}">
    </div>
  `;
}

function openDetails(id){
  window.location.href = "serie.html?id="+id;
}

init();
