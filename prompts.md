# Prompt Log

## Prompt 1

- **Goal:** Build Stage 1 of the Fright Night Movie Picker only: a static Halloween-themed interface.
- **Original prompt:** “Title: Fright Night Movie Picker” with the supplied scope and build plan, including “Start with Stage 1 only. Do not begin any later stage until I review and approve Stage 1.”
- **Files changed:** `index.html`, `styles.css`, `assets/favicon.svg`, `prompts.md`.
- **What I reviewed:** The starting repository contained only a short README and license file.
- **Problems found:** No existing application files were present.
- **Fixes requested:** None yet.

## Prompt 8

- **Goal:** Build Stage 4 preference filtering and make the “Just Scare Me” button work.
- **Original prompt:** “Move on to stage 4.”
- **Files changed:** `index.html`, `script.js`, `prompts.md`.
- **What I reviewed:** The existing button handlers and TMDB discover filters.
- **Problems found:** Preferences were not read, the first result was always selected, and “Just Scare Me” had no event handler.
- **Fixes requested:** None yet.

## Prompt 7

- **Goal:** Build Stage 3: show the selected movie on a dedicated ticket-style result page.
- **Original prompt:** “Ready to continue to stage 3, I want the movie result card to be on another page, displayed with a similar ui theme to look like a movie ticket. I will update ui polish at the end.”
- **Files changed:** `script.js`, `movie.html`, `movie.css`, `movie.js`, `prompts.md`.
- **What I reviewed:** TMDB documentation for discover responses and movie detail queries.
- **Problems found:** Discover results expose numeric genre IDs rather than genre names, so the selected movie needs one follow-up detail request.
- **Fixes requested:** None yet.

## Prompt 6

- **Goal:** Update two user-facing lines and shift the cool theme accents from blue to purple.
- **Original prompt:** “Change: Tell us the kind of chill you’re craving—or leave fate to the shadows. to say this instead: \"Tell us the kind of scare you’re craving—or leave fate to the shadows. \". Instead of the text: \"How brave are you feeling?\" change that to say \"**How far into the dark do you want to go?**\". Change the sutle blue colors and tones to a shade of purple”
- **Files changed:** `index.html`, `styles.css`, `prompts.md`.
- **What I reviewed:** The current cinematic theme and supplied visual direction.
- **Problems found:** None.
- **Fixes requested:** None yet.

## Prompt 5

- **Goal:** Increase the translucency of the picker card.
- **Original prompt:** “opacity a little more”
- **Files changed:** `styles.css`, `prompts.md`.
- **What I reviewed:** The adjusted translucent-card theme.
- **Problems found:** None.
- **Fixes requested:** None yet.

## Prompt 4

- **Goal:** Make the title more Halloween-themed and allow more of the cinematic background to show through the panel.
- **Original prompt:** “make the title \"Fright night picker\" Halloween themed font. And add a slight opacity to the card so we can see the background slightly”
- **Files changed:** `styles.css`, `prompts.md`.
- **What I reviewed:** The first cinematic theme pass.
- **Problems found:** The poster title was too editorial and the card was more opaque than desired.
- **Fixes requested:** None yet.

## Prompt 3

- **Goal:** Restyle the interface to draw from supplied Halloween-horror visual references.
- **Original prompt:** “Help me theme the UI more like these images.”
- **Files changed:** `index.html`, `styles.css`, `assets/fright-night-backdrop.png`, `prompts.md`.
- **What I reviewed:** Four user-supplied visual references with cinematic teal fog, ember-orange light, dark horror-poster typography, and restrained crimson accents.
- **Problems found:** The previous warm-purple theme did not capture the references’ cinematic contrast and atmosphere.
- **Fixes requested:** None yet.

## Prompt 2

- **Goal:** Continue to Stage 2: connect TMDB, make one request, and show a basic movie result without adding preference filtering.
- **Original prompt:** “Go on to stage 2.”
- **Files changed:** `.gitignore`, `index.html`, `styles.css`, `script.js`, `config.example.js`, `config.js`, `prompts.md`.
- **What I reviewed:** TMDB’s official documentation for the movie discover endpoint and application authentication.
- **Problems found:** The repository did not contain a TMDB API key, so a live request cannot be verified until one is added locally.
- **Fixes requested:** None yet.
