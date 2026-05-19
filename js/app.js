let DATA = [];
let currentTab = "home";
let searchValue = "";

async function init() {
  DATA = await fetch('./content/movies.json').then(r => r.json());
  render();
}

/* ===== ABAS ===== */
function setTab(tab) {
  currentTab = tab;
  render();
}

/* ===== BUSCA ===== */
function search() {
  searchValue = document.getElementById("search").value.toLowerCase();
  render();
}

/* ===== RENDER PRINCIPAL ===== */
function render() {
  let list = DATA;

  // FILTRO POR ABA
  if (currentTab !== "home") {
    list = list.filter(i => i.type === currentTab);
  }

  // FILTRO POR BUSCA
  if (searchValue) {
    list = list.filter(i =>
      i.title.toLowerCase().includes(searchValue)
    );
  }

  const app = document.getElementById("app");

  if (!list.length) {
    app.innerHTML = `<p style="padding:20px">Nada encontrado</p>`;
    return;
  }

  app.innerHTML = `
    <div class="row">
      ${list.map(item => card(item)).join("")}
    </div>
  `;
}

/* ===== CARD (COM NOME + IMAGEM) ===== */
function card(item) {
  return `
    <div class="card" onclick="openDetails('${item.id}')">
      <img src="${item.poster}" alt="${item.title}">
      <div style="
        font-size:12px;
        margin-top:5px;
        text-align:center;
        color:#fff;
      ">
        ${item.title}
      </div>
    </div>
  `;
}

/* ===== ABRIR DETALHES ===== */
function openDetails(id) {
  window.location.href = "serie.html?id=" + id;
}

init();
