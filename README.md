# Fright Night Movie Picker

Fright Night Movie Picker is a Halloween-themed movie recommender for choosing a horror or thriller film. Pick a scare level, horror style, and era—or let the app surprise you—then receive a movie on a vintage admission-ticket result page.

## Features

- Recommends horror and thriller movies with the TMDB API.
- Filters by scare level, horror style, and release era.
- Filters by TMDB rating bands: 0–5, 6–7, or 8–10.
- Includes a “Just Scare Me” option for a random horror/thriller pick.
- Includes a compact Top 10 page for highly rated TMDB horror movies only.
- Displays a poster, title, year, genres, TMDB rating, synopsis, and a Fright Night scare factor.
- Handles unavailable data, no results, API failures, network failures, and missing ticket data with friendly messages.
- Works on desktop and mobile, with a reduced-motion fallback for decorative popcorn animation.

## Built With

- HTML, CSS, and vanilla JavaScript
- Fetch API
- [TMDB API](https://www.themoviedb.org/documentation/api)

## Run Locally

1. Clone or download this repository.
2. Open PowerShell in the project folder.
3. Create your local API configuration file:

   ```powershell
   Copy-Item config.example.js config.js
   ```

4. Follow the API setup steps below.
5. Open `index.html` with a local development server, such as VS Code Live Server. You can also run:

   ```powershell
   python -m http.server 8000
   ```

6. Visit `http://localhost:8000` in your browser.

## TMDB API Setup

1. Create or sign in to a [TMDB account](https://www.themoviedb.org/).
2. In TMDB account settings, copy the **API Key (v3 auth)**.
3. Open local `config.js`.
4. Add the key between the quotation marks:

   ```js
   window.TMDB_API_KEY = "your-v3-api-key";
   ```

5. Save the file and refresh the browser.

`config.js` is ignored by Git. Do not commit your API key or paste it into an issue, pull request, or chat.

## How Recommendations Work

The picker uses TMDB discover filters for genres, keywords, content certification, and release dates. It randomly selects from matching results, then requests details for the selected movie.

The Fright Night scare factor is separate from the TMDB rating. It is a simple app-made 1–5 guide using the selected scare level, movie genres, and runtime. A Terrifying selection always displays at least `4 — Very Scary`.

## Project Structure

```text
fright-night-movie-picker/
├── assets/
├── config.example.js
├── index.html
├── movie.html
├── movie.css
├── movie-stage8.css
├── movie.js
├── prompts.md
├── README.md
├── scope.md
├── script.js
├── stage8.css
├── top10.html
├── top10.css
├── top10-mobile.css
├── top10.js
└── styles.css
```

## Testing Notes

- Pick movies with different scare levels, styles, and eras.
- Use “Just Scare Me” multiple times to confirm varied results.
- Try every TMDB rating range and confirm returned ratings fall within it.
- Open the Top 10 list and confirm ten compact horror-only movie cards load.
- On a small screen, confirm Top 10 descriptions use smaller text and stop after three lines.
- Confirm Terrifying returns a scare factor of 4 or 5.
- Try a restrictive combination and confirm the no-results message is friendly.
- Use DevTools Network → Offline and confirm the offline message appears.
- Use an invalid API key and confirm the API error message appears.
- Open `movie.html` directly and confirm the safe return-to-picker state.
- View the picker on a narrow screen and with reduced motion enabled.

## Documentation

- [Scope and MVP plan](scope.md)
- [Prompt log](prompts.md)

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB. Movie data and poster images are provided by TMDB.
