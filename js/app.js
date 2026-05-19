let DATA = [];
let TAB = "home";
let HERO_INDEX = 0;

async function init(){

  DATA = await fetch('./content/movies.json').then(r=>r.json());

  renderHero();
  render();

  setInterval(nextHero, 6000);

  // splash sound
  const audio = document.getElementById("introSound");
  audio.volume = 0.4;
  audio.play().catch(()=>{});
}

function setTab(tab){
  TAB = tab;
  render();
}

function renderHero(){

  const hero = document.getElementById("hero");
  const movies = DATA.filter(i=>i.type==="movie").slice(0,5);

  hero.innerHTML = movies.map((m,i)=>`
    <div class="hero-slide ${i===0?'active':''}">
      <img src="${m.banner}">
      <div class="hero-text">
        <h1>${m.title}</h1>
        <p>${m.genre}</p>
      </div>
    </div>
  `).join("");
}

function nextHero(){
  const slides = document.querySelectorAll(".hero-slide");
  slides[HERO_INDEX].classList.remove("active");
  HERO_INDEX = (HERO_INDEX + 1) % slides.length;
  slides[HERO_INDEX].classList.add("active");
}

function render(){

  const container = document.getElementById("sections");
  container.innerHTML = "";

  let filtered = TAB==="home"
    ? DATA
    : DATA.filter(i=>i.type===TAB);

  container.innerHTML = `
    <div class="section-title">${TAB.toUpperCase()}</div>

    <div class="cards">
      ${filtered.map(item=>`
        <div class="card" onclick='openItem(${JSON.stringify(item)})'>
          <img src="${item.poster}">
        </div>
      `).join("")}
    </div>
  `;
}

function openItem(item){

  if(item.type==="movie"){
    window.location.href=`player.html?url=${encodeURIComponent(item.embed)}`;
  }

  if(item.type==="serie"||item.type==="anime"){
    localStorage.setItem("serie",JSON.stringify(item));
    window.location.href="serie.html";
  }
}

init();
