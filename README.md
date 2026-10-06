# Fright Night Movie Picker

Fright Night Movie Picker is a Halloween-themed horror recommender powered by TMDB. Visitors can filter by scare level, style, era, and TMDB rating, then receive a movie on a vintage ticket page or browse a horror-only Top 10 list.

## Features

- Horror and thriller recommendations with TMDB filters and random selection.
- Scare level, horror style, era, and TMDB rating-band controls.
- Vintage ticket result with poster, title, year, genres, TMDB rating, synopsis, and a separate Fright Night scare factor.
- Horror-only Top 10 ranked view.
- Friendly no-results, API, offline, missing-data, and invalid-ticket states.
- Responsive layouts and reduced-motion support for falling popcorn.
- A Vercel Function proxy that keeps TMDB credentials out of browser code.

## Deploy on Vercel

1. Import this GitHub repository into Vercel.
2. In **Project Settings → Environment Variables**, add one of these values for Production and Preview:

   ```text
   TMDB_READ_ACCESS_TOKEN=your-tmdb-api-read-access-token
   ```

   The API Read Access Token is preferred. Alternatively, configure:

   ```text
   TMDB_API_KEY=your-tmdb-v3-api-key
   ```

3. Redeploy after saving the variable.
4. Open the deployed app and choose a movie.

The browser only calls the same-origin `/api/tmdb` route. That Vercel Function reads the environment variable and calls TMDB, so the credential is never sent to visitors.

## Run Locally

1. Install [Node.js](https://nodejs.org/) and the Vercel CLI.
2. Copy `.env.example` to `.env.local`.
3. Add your TMDB API Read Access Token or v3 API Key to `.env.local`.
4. Run:

   ```powershell
   npx vercel dev
   ```

5. Open the local URL shown in the terminal, usually `http://localhost:3000`.

Do not add `.env.local` or TMDB credentials to Git.

## Project Structure

```text
fright-night-movie-picker/
├── api/tmdb.mjs            # Vercel Function; private TMDB proxy
├── assets/
├── .env.example
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
├── styles.css
├── top10.html
├── top10.css
├── top10-mobile.css
└── top10.js
```

## Testing Notes

- Test each preference and TMDB rating band.
- Use “Just Scare Me” several times.
- Confirm the ticket and Top 10 pages load movie details.
- Test a restrictive combination for the no-results message.
- Use browser DevTools Network → Offline to test the network message.
- Test invalid server-side TMDB credentials through a Preview deployment.
- Test narrow screens and reduced-motion settings.

## Documentation

- [Scope and MVP plan](scope.md)
- [Prompt log](prompts.md)

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB. Movie data and poster images are provided by TMDB.
