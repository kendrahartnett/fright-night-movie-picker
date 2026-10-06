const DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie";
const MOVIE_URL = "https://api.themoviedb.org/3/movie";
const IMAGE_URL = "https://image.tmdb.org/t/p/w342";
const statusMessage = document.querySelector("#top-ten-status");
const movieGrid = document.querySelector("#top-ten-grid");

loadTopTenMovies();

async function loadTopTenMovies() {
  if (!window.TMDB_API_KEY) {
    showStatus("Add your TMDB API key to config.js before opening the Top 10 list.", true);
    return;
  }

  try {
    const query = new URLSearchParams({
      api_key: window.TMDB_API_KEY,
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      sort_by: "vote_average.desc",
      "vote_count.gte": "500",
      with_genres: "27",
    });
    const response = await fetch(`${DISCOVER_URL}?${query}`);

    if (!response.ok) {
      throw new Error("TMDB could not load the Top 10 list.");
    }

    const data = await response.json();
    const movies = Array.isArray(data?.results) ? data.results.slice(0, 10) : [];

    if (!movies.length) {
      showStatus("Nothing climbed out of the vault. Please try again.", true);
      return;
    }

    const details = await Promise.all(movies.map((movie) => getMovieDetails(movie.id)));
    details.filter(Boolean).forEach((movie, index) => movieGrid.append(createMovieCard(movie, index + 1)));
    showStatus(details.some(Boolean) ? "" : "The ticket vault is empty. Please try again.", !details.some(Boolean));
  } catch (error) {
    console.error("Unable to load the Top 10:", error);
    showStatus("Something went bump in the API. Please try again.", true);
  }
}

async function getMovieDetails(movieId) {
  try {
    const query = new URLSearchParams({ api_key: window.TMDB_API_KEY, language: "en-US" });
    const response = await fetch(`${MOVIE_URL}/${movieId}?${query}`);
    return response.ok ? response.json() : null;
  } catch (error) {
    return null;
  }
}

function createMovieCard(movie, rank) {
  const card = document.createElement("article");
  card.className = "top-movie-card";
  const genres = Array.isArray(movie.genres) ? movie.genres.map((genre) => genre.name).join(", ") : "Genre unknown";
  const year = typeof movie.release_date === "string" ? movie.release_date.slice(0, 4) : "Unknown";
  const rating = Number.isFinite(movie.vote_average) && movie.vote_count > 0 ? `${movie.vote_average.toFixed(1)} / 10` : "Not yet rated";
  const overview = typeof movie.overview === "string" && movie.overview ? movie.overview : "No synopsis escaped the crypt for this one.";
  const scare = getScareFactor(movie);

  card.innerHTML = `<div class="rank">${rank}</div><div class="top-poster"></div><div class="top-details"><p class="top-label"></p><h2></h2><p class="top-rating"></p><p class="top-overview"></p></div>`;
  card.querySelector(".top-label").textContent = `${year} · ${genres}`;
  card.querySelector("h2").textContent = movie.title || "Untitled horror";
  card.querySelector(".top-rating").textContent = `TMDB ${rating} · Scare ${scare.score}/5 — ${scare.label}`;
  card.querySelector(".top-overview").textContent = overview;

  if (typeof movie.poster_path === "string" && movie.poster_path) {
    const image = document.createElement("img");
    image.src = `${IMAGE_URL}${movie.poster_path}`;
    image.alt = `${movie.title || "Movie"} poster`;
    image.addEventListener("error", () => image.remove(), { once: true });
    card.querySelector(".top-poster").append(image);
  }

  return card;
}

function getScareFactor(movie) {
  const genres = Array.isArray(movie.genres) ? movie.genres.map((genre) => genre.name) : [];
  let score = 1 + Number(genres.includes("Horror")) + Number(genres.includes("Thriller") || genres.includes("Mystery"));
  if (Number(movie.runtime) >= 100) score += 1;
  if (Number(movie.runtime) >= 120) score += 1;
  const labels = ["Spooky", "Creepy", "Scary", "Very Scary", "Nightmare Fuel"];
  score = Math.min(score, 5);
  return { score, label: labels[score - 1] };
}

function showStatus(message, isError) {
  statusMessage.textContent = message;
  statusMessage.hidden = !message;
  statusMessage.classList.toggle("is-error", isError);
}
