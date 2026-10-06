const selectedMovie = JSON.parse(sessionStorage.getItem("frightNightMovie"));

if (!selectedMovie) {
  document.querySelector(".movie-ticket").innerHTML = `
    <div class="empty-ticket">
      <p class="ticket-label">The ticket booth is empty</p>
      <h1>Pick a movie first</h1>
      <a class="pick-another" href="index.html">Return to the picker</a>
    </div>`;
} else {
  renderMovieTicket(selectedMovie);
}

function renderMovieTicket(movie) {
  document.querySelector("#movie-title").textContent = movie.title || "Untitled horror";
  document.querySelector("#movie-year").textContent = movie.release_date?.slice(0, 4) || "Unknown";
  document.querySelector("#movie-genre").textContent = movie.genres?.map((genre) => genre.name).join(", ") || "Genre unknown";
  const hasRating = Number.isFinite(movie.vote_average) && movie.vote_count > 0;
  document.querySelector("#movie-rating").textContent = hasRating ? `${movie.vote_average.toFixed(1)} / 10` : "Not yet rated";
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

function showPosterPlaceholder() {
  document.querySelector("#poster-frame img")?.remove();
  document.querySelector("#poster-placeholder").hidden = false;
}
