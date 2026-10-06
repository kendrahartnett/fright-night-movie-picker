const TMDB_PROXY_URL = "/api/tmdb";
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
  const activeButton = ignorePreferences ? justScareButton : pickMovieButton;

  setLoading(true, activeButton);

  try {
    const preferences = ignorePreferences ? null : readPreferences();
    const query = await buildDiscoverQuery(preferences, ignorePreferences);
    const response = await fetch(`${TMDB_PROXY_URL}?action=discover&${query}`);

    if (!response.ok) {
      throw new Error(`TMDB request failed with status ${response.status}`);
    }

    const data = await response.json();
    const movie = pickRandomMovie(data?.results);

    if (!movie?.id) {
      showResult("Nothing crawled out of the crypt. Try changing your preferences.", "error");
      return;
    }

    const movieDetails = await getMovieDetails(movie.id);
    saveMovieSelection(movieDetails, preferences?.scareLevel || "surprise");
    window.location.href = "movie.html";
  } catch (error) {
    console.error("Unable to get a movie from TMDB:", error);
    const message = error instanceof TypeError
      ? "The crypt is offline. Check your connection and try again."
      : "Something went bump in the API. Please try again.";
    showResult(message, "error");
  } finally {
    setLoading(false, activeButton);
  }
}

function readPreferences() {
  return {
    scareLevel: document.querySelector('input[name="scare-level"]:checked')?.value || "surprise",
    horrorStyle: document.querySelector('input[name="horror-style"]:checked')?.value || "surprise",
    movieEra: document.querySelector('input[name="movie-era"]:checked')?.value || "any",
    tmdbRating: document.querySelector('input[name="tmdb-rating"]:checked')?.value || "surprise",
  };
}

async function buildDiscoverQuery(preferences, ignorePreferences) {
  const query = new URLSearchParams({
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
  addRatingFilter(query, preferences.tmdbRating);

  const keyword = STYLE_KEYWORDS[preferences.horrorStyle];
  if (keyword) {
    const keywordId = await findKeywordId(keyword);
    if (keywordId) {
      query.set("with_keywords", keywordId);
    }
  }

  return query;
}

function addRatingFilter(query, tmdbRating) {
  if (tmdbRating === "0-5") {
    query.set("vote_average.lte", "5");
  }

  if (tmdbRating === "6-7") {
    query.set("vote_average.gte", "6");
    query.set("vote_average.lte", "7.99");
  }

  if (tmdbRating === "8-10") {
    query.set("vote_average.gte", "8");
    query.set("vote_average.lte", "10");
  }
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

async function findKeywordId(keyword) {
  try {
    const query = new URLSearchParams({ action: "keyword", query: keyword });
    const response = await fetch(`${TMDB_PROXY_URL}?${query}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.results?.[0]?.id || null;
  } catch (error) {
    console.warn("Could not look up a style keyword:", error);
    return null;
  }
}

function pickRandomMovie(movies) {
  if (!movies?.length) {
    return null;
  }

  return movies[Math.floor(Math.random() * movies.length)];
}

async function getMovieDetails(movieId) {
  const query = new URLSearchParams({ action: "movie", id: movieId, language: "en-US" });
  const response = await fetch(`${TMDB_PROXY_URL}?${query}`);

  if (!response.ok) {
    throw new Error(`TMDB detail request failed with status ${response.status}`);
  }

  const movieDetails = await response.json();

  if (!movieDetails || typeof movieDetails !== "object") {
    throw new Error("TMDB returned incomplete movie details");
  }

  return movieDetails;
}

function saveMovieSelection(movie, selectedScareLevel) {
  try {
    sessionStorage.setItem(
      "frightNightMovie",
      JSON.stringify({ movie, selectedScareLevel }),
    );
  } catch (error) {
    throw new Error("Could not save the selected movie");
  }
}

function showResult(message, state) {
  movieResultText.textContent = message;
  movieResult.hidden = false;
  movieResult.classList.toggle("is-error", state === "error");
}

function setLoading(isLoading, activeButton) {
  pickMovieButton.disabled = isLoading;
  justScareButton.disabled = isLoading;
  activeButton.textContent = isLoading ? "Searching the shadows…" : activeButton === justScareButton ? "Just Scare Me" : "Pick My Scary Movie";
  movieResult.classList.toggle("is-loading", isLoading);

  if (isLoading) {
    movieResult.hidden = false;
    movieResultText.textContent = "Looking for a horror movie…";
    movieResult.classList.remove("is-error");
  }
}
