const TMDB_DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie";
const TMDB_KEYWORD_SEARCH_URL = "https://api.themoviedb.org/3/search/keyword";
const HORROR_GENRE_ID = "27";
const THRILLER_GENRE_ID = "53";

const STYLE_KEYWORDS = {
  supernatural: "supernatural",
  slasher: "slasher",
  psychological: "psychological thriller",
};

const pickMovieButton = document.querySelector("#pick-movie-button");
const justScareButton = document.querySelector("#just-scare-button");
const movieResult = document.querySelector("#movie-result");
const movieResultText = document.querySelector("#movie-result-text");

pickMovieButton.addEventListener("click", () => getMovieRecommendation(false));
justScareButton.addEventListener("click", () => getMovieRecommendation(true));

async function getMovieRecommendation(ignorePreferences) {
  const apiKey = window.TMDB_API_KEY;
  const activeButton = ignorePreferences ? justScareButton : pickMovieButton;

  if (!apiKey) {
    showResult("Add your TMDB API key to config.js before summoning a movie.", "error");
    return;
  }

  setLoading(true, activeButton);

  try {
    const preferences = ignorePreferences ? null : readPreferences();
    const query = await buildDiscoverQuery(apiKey, preferences, ignorePreferences);
    const response = await fetch(`${TMDB_DISCOVER_URL}?${query}`);

    if (!response.ok) {
      throw new Error(`TMDB request failed with status ${response.status}`);
    }

    const data = await response.json();
    const movie = pickRandomMovie(data.results);

    if (!movie) {
      showResult("Nothing crawled out of the crypt. Try changing your preferences.", "error");
      return;
    }

    const movieDetails = await getMovieDetails(movie.id, apiKey);
    sessionStorage.setItem(
      "frightNightMovie",
      JSON.stringify({
        movie: movieDetails,
        selectedScareLevel: preferences?.scareLevel || "surprise",
      }),
    );
    window.location.href = "movie.html";
  } catch (error) {
    console.error("Unable to get a movie from TMDB:", error);
    showResult("Something went bump in the API. Please check your TMDB key and try again.", "error");
  } finally {
    setLoading(false, activeButton);
  }
}

function readPreferences() {
  return {
    scareLevel: document.querySelector('input[name="scare-level"]:checked').value,
    horrorStyle: document.querySelector('input[name="horror-style"]:checked').value,
    movieEra: document.querySelector('input[name="movie-era"]:checked').value,
  };
}

async function buildDiscoverQuery(apiKey, preferences, ignorePreferences) {
  const query = new URLSearchParams({
    api_key: apiKey,
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    sort_by: "popularity.desc",
  });

  if (ignorePreferences) {
    query.set("with_genres", `${HORROR_GENRE_ID}|${THRILLER_GENRE_ID}`);
    return query;
  }

  query.set("with_genres", preferences.horrorStyle === "thriller" ? THRILLER_GENRE_ID : HORROR_GENRE_ID);
  addScareLevelFilter(query, preferences.scareLevel);
  addEraFilter(query, preferences.movieEra);

  const keyword = STYLE_KEYWORDS[preferences.horrorStyle];
  if (keyword) {
    const keywordId = await findKeywordId(keyword, apiKey);
    if (keywordId) {
      query.set("with_keywords", keywordId);
    }
  }

  return query;
}

function addScareLevelFilter(query, scareLevel) {
  if (scareLevel === "mild") {
    query.set("certification_country", "US");
    query.set("certification.lte", "PG-13");
  }

  if (scareLevel === "creepy" || scareLevel === "terrifying") {
    query.set("certification_country", "US");
    query.set("certification", "R");
  }

  if (scareLevel === "terrifying") {
    query.set("vote_count.gte", "100");
  }
}

function addEraFilter(query, movieEra) {
  if (movieEra === "classic") {
    query.set("primary_release_date.lte", "1979-12-31");
  }

  if (movieEra === "80s-90s") {
    query.set("primary_release_date.gte", "1980-01-01");
    query.set("primary_release_date.lte", "1999-12-31");
  }

  if (movieEra === "modern") {
    query.set("primary_release_date.gte", "2000-01-01");
  }
}

async function findKeywordId(keyword, apiKey) {
  const query = new URLSearchParams({ api_key: apiKey, query: keyword });
  const response = await fetch(`${TMDB_KEYWORD_SEARCH_URL}?${query}`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.results?.[0]?.id || null;
}

function pickRandomMovie(movies) {
  if (!movies?.length) {
    return null;
  }

  return movies[Math.floor(Math.random() * movies.length)];
}

async function getMovieDetails(movieId, apiKey) {
  const query = new URLSearchParams({ api_key: apiKey, language: "en-US" });
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?${query}`);

  if (!response.ok) {
    throw new Error(`TMDB detail request failed with status ${response.status}`);
  }

  return response.json();
}

function showResult(message, state) {
  movieResultText.textContent = message;
  movieResult.classList.toggle("is-error", state === "error");
  movieResult.classList.remove("is-loading");
}

function setLoading(isLoading, activeButton) {
  pickMovieButton.disabled = isLoading;
  justScareButton.disabled = isLoading;
  activeButton.textContent = isLoading ? "Searching the shadows…" : activeButton === justScareButton ? "Just Scare Me" : "Pick My Scary Movie";
  movieResult.classList.toggle("is-loading", isLoading);

  if (isLoading) {
    movieResultText.textContent = "Looking for a horror movie…";
    movieResult.classList.remove("is-error");
  }
}
