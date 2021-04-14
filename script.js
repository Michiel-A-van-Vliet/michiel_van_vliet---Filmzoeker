// This won't change
const moviesList = document.getElementById("movies__list");
const radioFilters = document
  .getElementById("movie-filter")
  .getElementsByTagName("input");

// Show movies on page
function addMoviesToDom(films) {
  moviesList.innerHTML = "";
  films.forEach((film) => {
    let newLi = document.createElement("li");
    let newImg = document.createElement("img");
    let newA = document.createElement("a");
    let newUrl = "https://www.imdb.com/title/" + film.imdbID + "/";
    moviesList.append(newLi);
    newLi.append(newA);
    newA.append(newImg);
    newLi.setAttribute("class", "movies__item");
    newA.setAttribute("href", newUrl);
    newA.setAttribute("target", "_blank");
    newImg.setAttribute("class", "movies__poster");
    newImg.setAttribute("src", film.Poster);
    newImg.setAttribute("alt", film.Title);
  });
}

// Show all movies
addMoviesToDom(movies);

// Filter radio buttons stuff
var i;
for (i = 0; i < radioFilters.length; i++) {
  let currentFilter = radioFilters[i];
  currentFilter.addEventListener("change", function () {
    switch (currentFilter.getAttribute("id")) {
      case "all":
        addMoviesToDom(movies);
        break;
      case "new":
        addMoviesToDom(filterYear(2014));
        break;
      case "avengers":
        addMoviesToDom(filterTitle("Avengers"));
        break;
      case "x-men":
        addMoviesToDom(filterTitle("X-Men"));
        break;
      case "princess":
        addMoviesToDom(filterTitle("Princess"));
        break;
      case "batman":
        addMoviesToDom(filterTitle("Batman"));
        break;
      case "title-search":
        let temp = filterTitle(this.value);
        if (temp.length === 0) {
          moviesList.innerHTML =
            "<br>Sorry, geen resultaat voor '" +
            this.value +
            "'.<br><br>De zoekopdracht is hoofdletttergevoelig.";
          console.log("oops", this.value);
        } else {
          addMoviesToDom(temp);
        }
        break;
    }
  });
}

// Manual search for word in title

// Filter word in title
function filterTitle(wordInTitle) {
  let filteredMovies = [];
  movies.forEach((movie) => {
    if (movie.Title.includes(wordInTitle)) {
      filteredMovies.push(movie);
    }
  });
  return filteredMovies;
}

// Filter newer: later than year
function filterYear(year) {
  let filteredMovies = [];
  movies.forEach((movie) => {
    if (movie.Year >= year) {
      // Java is lief, dat ik een string met een getal mag vergelijken :)
      filteredMovies.push(movie);
    }
  });
  return filteredMovies;
}
