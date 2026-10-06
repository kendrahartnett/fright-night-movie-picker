const TMDB_DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie";
const HORROR_GENRE_ID = "27";

const pickMovieButton = document.querySelector("#pick-movie-button");
const movieResult = document.querySelector("#movie-result");
const movieResultText = document.querySelector("#movie-result-text");

pickMovieButton.addEventListener("click", getBasicMovieRecommendation);

async function getBasicMovieRecommendation() {
  const apiKey = window.TMDB_API_KEY;

  if (!apiKey) {
    showResult("Add your TMDB API key to config.js before summoning a movie.", "error");
    return;
  }

  setLoading(true);

  try {
    const query = new URLSearchParams({
      api_key: apiKey,
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      sort_by: "popularity.desc",
      with_genres: HORROR_GENRE_ID,
    });
    const response = await fetch(`${TMDB_DISCOVER_URL}?${query}`);

    if (!response.ok) {
      throw new Error(`TMDB request failed with status ${response.status}`);
    }

    const data = await response.json();
    const movie = data.results?.[0];

    if (!movie) {
      showResult("TMDB connected, but no horror movies were returned.", "error");
      return;
    }

    const movieDetails = await getMovieDetails(movie.id, apiKey);
    sessionStorage.setItem("frightNightMovie", JSON.stringify(movieDetails));
    window.location.href = "movie.html";
  } catch (error) {
    console.error("Unable to get a movie from TMDB:", error);
    showResult("Something went bump in the API. Please check your TMDB key and try again.", "error");
  } finally {
    setLoading(false);
  }
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

function setLoading(isLoading) {
  pickMovieButton.disabled = isLoading;
  pickMovieButton.textContent = isLoading ? "Searching the shadows…" : "Pick My Scary Movie";
  movieResult.classList.toggle("is-loading", isLoading);

  if (isLoading) {
    movieResultText.textContent = "Looking for a horror movie…";
    movieResult.classList.remove("is-error");
  }
}
