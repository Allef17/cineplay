async function loadMovies(){

  const response = await fetch('./content/movies.json');

  const movies = await response.json();

  console.log(movies);

}

loadMovies();
