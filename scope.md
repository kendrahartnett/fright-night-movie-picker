# Fright Night Movie Picker Scope and MVP Plan

## Goal

Build a small, understandable Halloween movie-picker web app that uses one public API—TMDB—to recommend horror or thriller movies.

## MVP

### Picker page

- Optional choices for scare level, horror style, and movie era.
- “Pick My Scary Movie” and “Just Scare Me” actions.

### Recommendation flow

- Use TMDB discover and movie-detail requests.
- Apply straightforward filters and randomly select a matching result.
- Open a dedicated movie-ticket page.

### Ticket result

- Poster, title, release year, genres, TMDB rating, synopsis, and a 1–5 Fright Night scare factor.
- Clear label that the scare factor is not a TMDB rating.

### Resilience

- Friendly messages for no results, API failures, offline requests, and missing optional fields.

### Visual direction

- Dark Halloween backdrop with purple and ember-orange accents.
- Vintage cinema-ticket result page.
- Responsive layout and reduced-motion support.

## Out of Scope

- User accounts, saved watchlists, databases, server-side code, additional APIs, frameworks, or a complex recommendation engine.

## Implementation Stages

1. Static picker interface.
2. TMDB API connection.
3. Dedicated movie-ticket result display.
4. Preference filtering and random picks.
5. App-defined scare factor.
6. Error and missing-data handling.
7. UI polish and project documentation.

## Definition of Done

- The app runs locally with a user-provided TMDB API key.
- Preferences influence recommendations and “Just Scare Me” works.
- The ticket displays movie details safely.
- The scare factor is clearly explained.
- Failures show friendly messages instead of breaking the page.
- Setup, scope, testing guidance, and the prompt log are documented.
