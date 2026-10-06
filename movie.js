const storedSelection = readStoredSelection();
const selectedMovie = storedSelection?.movie || storedSelection;
const selectedScareLevel = storedSelection?.selectedScareLevel || "surprise";

if (!selectedMovie || typeof selectedMovie !== "object") {
  document.querySelector(".movie-ticket").innerHTML = `
    <div class="empty-ticket">
      <p class="ticket-label">The ticket booth is empty</p>
      <h1>Pick a movie first</h1>
      <a class="pick-another" href="index.html">Return to the picker</a>
    </div>`;
} else {
  renderMovieTicket(selectedMovie, selectedScareLevel);
}

function renderMovieTicket(movie, selectedScareLevel) {
  const title = typeof movie.title === "string" && movie.title ? movie.title : "Untitled horror";
  const genreNames = getGenreNames(movie);
  document.querySelector("#movie-title").textContent = title;
  document.querySelector("#movie-year").textContent = typeof movie.release_date === "string" ? movie.release_date.slice(0, 4) || "Unknown" : "Unknown";
  document.querySelector("#movie-genre").textContent = genreNames.join(", ") || "Genre unknown";
  const hasRating = Number.isFinite(movie.vote_average) && movie.vote_count > 0;
  document.querySelector("#movie-rating").textContent = hasRating ? `${movie.vote_average.toFixed(1)} / 10` : "Not yet rated";
  const scareFactor = calculateScareFactor(movie, selectedScareLevel);
  document.querySelector("#scare-dots").textContent = `${"●".repeat(scareFactor.score)}${"○".repeat(5 - scareFactor.score)}`;
  document.querySelector("#scare-label").textContent = `${scareFactor.score} — ${scareFactor.label}`;
  document.querySelector("#movie-synopsis").textContent = typeof movie.overview === "string" && movie.overview ? movie.overview : "No synopsis escaped the crypt for this one.";

  if (typeof movie.poster_path === "string" && movie.poster_path) {
    document.querySelector("#poster-placeholder").hidden = true;
    const image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    image.alt = `${title} poster`;
    image.addEventListener("error", showPosterPlaceholder, { once: true });
    document.querySelector("#poster-frame").prepend(image);
  }
}

function calculateScareFactor(movie, selectedScareLevel) {
  const genres = getGenreNames(movie);
  let score = 1;

  if (genres.includes("Horror")) {
    score += 1;
  }

  if (genres.includes("Thriller") || genres.includes("Mystery")) {
    score += 1;
  }

  if (Number(movie.runtime) >= 100) {
    score += 1;
  }

  if (Number(movie.runtime) >= 120) {
    score += 1;
  }

  const minimumScores = { mild: 1, creepy: 2, terrifying: 4, surprise: 1 };
  const labels = ["Spooky", "Creepy", "Scary", "Very Scary", "Nightmare Fuel"];
  const cappedScore = Math.min(Math.max(score, minimumScores[selectedScareLevel] || 1), 5);
  return { score: cappedScore, label: labels[cappedScore - 1] };
}

function getGenreNames(movie) {
  if (!Array.isArray(movie.genres)) {
    return [];
  }

  return movie.genres
    .map((genre) => genre?.name)
    .filter((name) => typeof name === "string" && name);
}

function readStoredSelection() {
  try {
    const savedMovie = sessionStorage.getItem("frightNightMovie");
    return savedMovie ? JSON.parse(savedMovie) : null;
  } catch (error) {
    console.warn("Could not read the saved movie:", error);
    return null;
  }
}

function showPosterPlaceholder() {
  document.querySelector("#poster-frame img")?.remove();
  document.querySelector("#poster-placeholder").hidden = false;
}
