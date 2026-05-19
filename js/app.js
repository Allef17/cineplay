let DATA = [];
let tab = "home";
let query = "";

/* INICIAL */
window.onload = async () => {
  try {
    DATA = await base44.entities.Movie.list();
  } catch (e) {
    console.log("Base44 não carregado, usando mock");

    DATA = [
      {
        id:"1",
        title:"Homem-Aranha",
        categories:["movie"],
        coverUrl:"https://via.placeholder.com/300x450"
      }
    ];
  }

  render();
};

/* TROCA ABA */
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

  document.getElementById("app").innerHTML = `
    <div class="grid">
      ${list.map(card).join("")}
    </div>
  `;
}

/* CARD */
function card(item){
  return `
    <div class="card" onclick="alert('${item.title}')">
      <img src="${item.coverUrl}">
      <div class="card-title">${item.title}</div>
    </div>
  `;
}
