const ADMIN_PASSWORD = '170421@'

function checkPassword(){

  const password =
  document.getElementById('adminPassword').value

  if(password === ADMIN_PASSWORD){

    document.getElementById('adminLogin').style.display =
    'none'

    document.getElementById('adminPanel').style.display =
    'block'

    loadContents()

  }else{

    alert('Senha incorreta')

  }

}

function saveContent(){

  const content = {

    id: Date.now(),

    type:
    document.getElementById('contentType').value,

    title:
    document.getElementById('title').value,

    genre:
    document.getElementById('genre').value,

    year:
    document.getElementById('year').value,

    rating:
    document.getElementById('rating').value,

    poster:
    document.getElementById('poster').value,

    banner:
    document.getElementById('banner').value,

    link:
    document.getElementById('link').value,

    description:
    document.getElementById('description').value

  }

  let contents =
  JSON.parse(localStorage.getItem('tvplay_contents')) || []

  contents.push(content)

  localStorage.setItem(
    'tvplay_contents',
    JSON.stringify(contents)
  )

  alert('Conteúdo salvo')

  loadContents()

}

function loadContents(){

  const list =
  document.getElementById('contentList')

  list.innerHTML = ''

  let contents =
  JSON.parse(localStorage.getItem('tvplay_contents')) || []

  contents.forEach(content => {

    list.innerHTML += `

      <div class="admin-card">

        <img src="${content.poster}">

        <div>

          <h2>${content.title}</h2>

          <p>${content.genre}</p>

        </div>

        <button onclick="deleteContent(${content.id})">
          Excluir
        </button>

      </div>

    `

  })

}

function deleteContent(id){

  let contents =
  JSON.parse(localStorage.getItem('tvplay_contents')) || []

  contents =
  contents.filter(item => item.id != id)

  localStorage.setItem(
    'tvplay_contents',
    JSON.stringify(contents)
  )

  loadContents()

}
