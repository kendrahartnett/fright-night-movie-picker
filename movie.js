const storedSelection = JSON.parse(sessionStorage.getItem("frightNightMovie"));
const selectedMovie = storedSelection?.movie || storedSelection;
const selectedScareLevel = storedSelection?.selectedScareLevel || "surprise";

if (!selectedMovie) {
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
  document.querySelector("#movie-title").textContent = movie.title || "Untitled horror";
  document.querySelector("#movie-year").textContent = movie.release_date?.slice(0, 4) || "Unknown";
  document.querySelector("#movie-genre").textContent = movie.genres?.map((genre) => genre.name).join(", ") || "Genre unknown";
  const hasRating = Number.isFinite(movie.vote_average) && movie.vote_count > 0;
  document.querySelector("#movie-rating").textContent = hasRating ? `${movie.vote_average.toFixed(1)} / 10` : "Not yet rated";
  const scareFactor = calculateScareFactor(movie, selectedScareLevel);
  document.querySelector("#scare-dots").textContent = `${"●".repeat(scareFactor.score)}${"○".repeat(5 - scareFactor.score)}`;
  document.querySelector("#scare-label").textContent = `${scareFactor.score} — ${scareFactor.label}`;
  document.querySelector("#movie-synopsis").textContent = movie.overview || "No synopsis escaped the crypt for this one.";

  if (movie.poster_path) {
    document.querySelector("#poster-placeholder").hidden = true;
    const image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    image.alt = `${movie.title || "Movie"} poster`;
    image.addEventListener("error", showPosterPlaceholder, { once: true });
    document.querySelector("#poster-frame").prepend(image);
  }
}

function calculateScareFactor(movie, selectedScareLevel) {
  const genres = movie.genres?.map((genre) => genre.name) || [];
  let score = 1;

  if (genres.includes("Horror")) {
    score += 1;
  }

  if (genres.includes("Thriller") || genres.includes("Mystery")) {
    score += 1;
  }

  if (movie.runtime >= 100) {
    score += 1;
  }

  if (movie.runtime >= 120) {
    score += 1;
  }

  const minimumScores = { mild: 1, creepy: 2, terrifying: 4, surprise: 1 };
  const labels = ["Spooky", "Creepy", "Scary", "Very Scary", "Nightmare Fuel"];
  const cappedScore = Math.min(Math.max(score, minimumScores[selectedScareLevel] || 1), 5);
  return { score: cappedScore, label: labels[cappedScore - 1] };
}

function showPosterPlaceholder() {
  document.querySelector("#poster-frame img")?.remove();
  document.querySelector("#poster-placeholder").hidden = false;
}
