let DATA = [];

async function init(){

  DATA = await fetch('./content/movies.json').then(r=>r.json());

  renderHero();
  renderList();

  const audio = document.getElementById("introSound");
  audio.volume = 0.4;
  audio.play().catch(()=>{});
}

function renderHero(){

  const hero = document.getElementById("hero");
  const first = DATA[0];

  hero.innerHTML = `<img src="${first.banner}">`;
}

function renderList(){

  const el = document.getElementById("list");

  el.innerHTML = `
    <div class="cards">
      ${DATA.slice(0,30).map(i=>`
        <div class="card" onclick="openDetails('${i.id}')">
          <img src="${i.poster}">
        </div>
      `).join("")}
    </div>
  `;
}

function openDetails(id){
  window.location.href = "details.html?id="+id;
}

init();
