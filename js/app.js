let DATA = [];
let tab = "home";
let query = "";

async function init(){
  DATA = await fetch('./content/movies.json').then(r=>r.json());
  renderHero();
  render();
  clock();
}

function setTab(t){
  tab = t;
  render();
}

function search(){
  query = document.getElementById("search").value.toLowerCase();
  render();
}

function renderHero(){
  const hero = document.getElementById("hero");
  const item = DATA[0];
  hero.innerHTML = `<img src="${item.banner}">`;
}

function render(){

  let list = DATA;

  if(tab !== "home"){
    list = list.filter(i=>i.type === tab);
  }

  if(query){
    list = list.filter(i=>i.title.toLowerCase().includes(query));
  }

  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="row">
      ${list.map(i=>`
        <div class="card" onclick="openItem('${i.id}')">
          <img src="${i.poster}">
          <div class="card-title">${i.title}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function openItem(id){
  window.location.href = "details.html?id="+id;
}

function clock(){
  setInterval(()=>{
    document.getElementById("clock").innerText =
    new Date().toLocaleString("pt-BR");
  },1000);
}

init();
