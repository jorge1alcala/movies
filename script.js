const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8643f31144aff1a0b8346141ef870a23&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=8643f31144aff1a0b8346141ef870a23&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
  console.log(data);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    let picture_movie = `${IMG_PATH}${poster_path}`;
    if (poster_path === null) {
      picture_movie = `https://images.unsplash.com/photo-1545129139-1beb780cf337?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHRoZWF0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=430`;
    }
    movieEl.innerHTML = `
    
        <img
          src="${picture_movie}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `;
    main.appendChild(movieEl);
  });
}

//try to difined a null picture an empty picture
// function pictureNull(picture) {
//   if (picture !== null) {
//     return picture_movie;
//   } else {
//     return "https://media.istockphoto.com/photos/pop-corn-and-on-red-armchair-cinema-picture-id1271522601?b=1&k=20&m=1271522601&s=170667a&w=0&h=azZRRchShbrwRgq58omc1HOYABnfDDOzXJatuaZrueQ=";
//   }
// }

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
