let DATA = [];
let tab = "home";
let query = "";

/* INICIAL */
window.onload = async () => {
  await loadData();
  render();
};

/* CARREGAR DADOS (COM FALLBACK FORÇADO) */
async function loadData() {
  try {
    if (window.base44?.entities?.Movie) {
      DATA = await base44.entities.Movie.list();
    } else {
      throw new Error("Base44 não existe");
    }
  } catch (e) {
    console.log("Usando dados mock");

    DATA = [
      {
        id: "1",
        title: "Homem-Aranha",
        categories: ["movie"],
        coverUrl: "https://via.placeholder.com/300x450",
      },
      {
        id: "2",
        title: "Matrix",
        categories: ["movie"],
        coverUrl: "https://via.placeholder.com/300x450",
      },
      {
        id: "3",
        title: "Naruto",
        categories: ["anime"],
        coverUrl: "https://via.placeholder.com/300x450",
      }
    ];
  }
}

/* TROCAR ABA */
function setTab(t){
  tab = t;
  render();
}

/* BUSCA */
function search(){
  query = document.getElementById("search").value.toLowerCase();
  render();
}

/* FILTRO */
function getData(){

  let list = DATA;

  if(tab !== "home"){
    list = list.filter(i =>
      i.categories?.includes(tab)
    );
  }

  if(query){
    list = list.filter(i =>
      i.title.toLowerCase().includes(query)
    );
  }

  return list;
}

/* RENDER */
function render(){

  const list = getData();

  const app = document.getElementById("app");

  if(!list.length){
    app.innerHTML = `
      <p style="padding:20px;color:#aaa">
        Nenhum conteúdo encontrado
      </p>
    `;
    return;
  }

  app.innerHTML = `
    <div class="grid">
      ${list.map(card).join("")}
    </div>
  `;
}

/* CARD */
function card(item){
  return `
    <div class="card">
      <img src="${item.coverUrl || 'https://via.placeholder.com/300x450'}">
      <div class="card-title">${item.title}</div>
    </div>
  `;
}
