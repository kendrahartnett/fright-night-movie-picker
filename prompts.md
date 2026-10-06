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

## Prompt 9

- **Goal:** Build Stage 5: add the app-defined 1–5 scare factor to the ticket result.
- **Original prompt:** “Move on to Stage 5”
- **Files changed:** `movie.html`, `movie.css`, `movie.js`, `prompts.md`.
- **What I reviewed:** The movie-detail fields supplied to the ticket page.
- **Problems found:** None.
- **Fixes requested:** None yet.

## Prompt 10

- **Goal:** Make a Terrifying selection produce at least a 4 on the app-defined scare factor.
- **Original prompt:** “Make the experience match expectations, make Terrifying produce at least 4. Make these changes”
- **Files changed:** `script.js`, `movie.js`, `movie.html`, `prompts.md`.
- **What I reviewed:** The existing separate preference-filter and scare-factor logic.
- **Problems found:** The selected scare level was not carried to the ticket, so a Terrifying choice could display a low scare factor.
- **Fixes requested:** None yet.

## Prompt 11

- **Goal:** Build Stage 6: ensure missing data, API errors, and network errors fail gracefully.
- **Original prompt:** “Updated stage 6” with the supplied error-handling checklist.
- **Files changed:** `script.js`, `movie.js`, `prompts.md`.
- **What I reviewed:** Picker and ticket handling for empty, malformed, unavailable, and missing movie data.
- **Problems found:** Malformed saved ticket data and some malformed API response shapes could still cause rendering errors.
- **Fixes requested:** None yet.

## Prompt 12

- **Goal:** Complete final UI polish with a vintage ticket result theme, animated popcorn background, and improved picker actions.
- **Original prompt:** “FINAL STAGE – UI POLISH themes” with the supplied polish checklist.
- **Files changed:** `index.html`, `styles.css`, `movie.css`, `script.js`, `assets/popcorn-kernel.png`, `prompts.md`.
- **What I reviewed:** Supplied vintage cinema-ticket references and the existing Halloween theme.
- **Problems found:** The obsolete default result box remained on the picker, the secondary action lacked visual emphasis, and the ticket did not yet match the requested vintage admission style.
- **Fixes requested:** None yet.

## Prompt 13

- **Goal:** Add more popcorn and make it fall from the top of the picker screen.
- **Original prompt:** “Add more popcorn pieces and make it like they are falling down the screen from the top”
- **Files changed:** `index.html`, `styles.css`, `prompts.md`.
- **What I reviewed:** The initial popcorn background animation.
- **Problems found:** The first version was too sparse and popped in place rather than falling.
- **Fixes requested:** None yet.

## Prompt 14

- **Goal:** Move the falling popcorn in front of the picker card.
- **Original prompt:** “Have the popcorn fall in front of the user card. I cant tell what they are behind there”
- **Files changed:** `styles.css`, `prompts.md`.
- **What I reviewed:** The falling-popcorn layer placement.
- **Problems found:** The popcorn was hidden behind the card and too subtle to read clearly.
- **Fixes requested:** None yet.

## Prompt 15

- **Goal:** Complete final documentation with a professional README, setup guide, testing notes, and scope/MVP plan.
- **Original prompt:** “Updated stage 7” with the supplied final polish and documentation checklist.
- **Files changed:** `README.md`, `scope.md`, `prompts.md`.
- **What I reviewed:** The completed feature set, setup flow, error handling, and prompt history.
- **Problems found:** The README only contained a one-sentence project description, and the scope/MVP plan was not available as a project file.
- **Fixes requested:** None yet.

## Prompt 16

- **Goal:** Standardize the project title as “Fright Night Movie Picker.”
- **Original prompt:** “The title needs to be \"Fright Night Movie Picker\"”
- **Files changed:** `index.html`, `movie.html`, `README.md`, `scope.md`, `prompts.md`.
- **What I reviewed:** Visible titles, page metadata, and project documentation.
- **Problems found:** The existing title omitted the word “Movie.”
- **Fixes requested:** None yet.

## Prompt 17

- **Goal:** Add TMDB rating filters, a compact Top 10 movie page, and smaller picker/ticket layouts.
- **Original prompt:** “Stage 8 - Additional features” with the supplied feature list.
- **Files changed:** `index.html`, `script.js`, `movie.html`, `stage8.css`, `movie-stage8.css`, `top10.html`, `top10.css`, `top10.js`, `README.md`, `scope.md`, `prompts.md`.
- **What I reviewed:** The existing picker filters, ticket page, and TMDB discover filter documentation.
- **Problems found:** The picker did not expose TMDB rating filters, and there was no compact ranked-results view.
- **Fixes requested:** None yet.

## Prompt 18

- **Goal:** Restore the original picker-card width and keep the title on two intentional lines.
- **Original prompt:** “Widen the landing page card back to the original width. Have the header \"Fright\" and \"Night\" on the same line, and \"Movie\" and \"Picker\" on the same line”
- **Files changed:** `index.html`, `stage8.css`, `prompts.md`.
- **What I reviewed:** The compact Stage 8 picker layout.
- **Problems found:** The narrower card made the title layout less dependable.
- **Fixes requested:** None yet.

## Prompt 19

- **Goal:** Restore the movie-ticket width while making its vertical layout about 30% more compact.
- **Original prompt:** “The card on the movie results page can go back to the original width but make the height 30% shorter”
- **Files changed:** `movie-stage8.css`, `prompts.md`.
- **What I reviewed:** The compact Stage 8 ticket layout.
- **Problems found:** The ticket was narrower than desired and needed a shorter vertical rhythm without clipping variable movie content.
- **Fixes requested:** None yet.

## Prompt 20

- **Goal:** Match the Top 10 title colors to the landing page and limit the list to horror films only.
- **Original prompt:** “Have the Title \"Top 10 Scary Movies\" on the 10 top movie page be the same colors as the landing page text. And those movies need to ONLY be HORROR films from TMDB, update the top 10 top rated list to be horror films ONLY”
- **Files changed:** `top10.html`, `top10.css`, `top10.js`, `prompts.md`.
- **What I reviewed:** The Stage 8 Top 10 title treatment and TMDB genre filter.
- **Problems found:** The title did not use the landing-page color treatment and the ranked query included thrillers.
- **Fixes requested:** None yet.

## Prompt 21

- **Goal:** Display result-page back-link text in uppercase.
- **Original prompt:** “Change the page go back buttons text to be uppercase”
- **Files changed:** `movie.html`, `top10.html`, `prompts.md`.
- **What I reviewed:** The ticket and Top 10 navigation links.
- **Problems found:** The link labels used sentence case.
- **Fixes requested:** None yet.

## Prompt 22

- **Goal:** Show full Top 10 movie descriptions on small screens using smaller text.
- **Original prompt:** “On the top rated movie page, when it is on small screen the movie description text needs to be made much smaller instead of truncated”
- **Files changed:** `top10.html`, `top10-mobile.css`, `prompts.md`.
- **What I reviewed:** The mobile Top 10 card description rules.
- **Problems found:** Descriptions were limited to two lines on small screens.
- **Fixes requested:** None yet.

## Prompt 23

- **Goal:** Increase the small-screen Top 10 description text and limit it to three lines.
- **Original prompt:** “Make the text one size bigger and truncate after 3 lines”
- **Files changed:** `top10-mobile.css`, `prompts.md`.
- **What I reviewed:** The first mobile description adjustment.
- **Problems found:** Full descriptions made the compact list too tall.
- **Fixes requested:** None yet.

## Prompt 24

- **Goal:** Update project documentation to reflect the recent Stage 8 feature and responsive-style changes.
- **Original prompt:** “Add any updates or changes to the documentation to reflect these recent changes”
- **Files changed:** `README.md`, `scope.md`, `prompts.md`.
- **What I reviewed:** Rating filters, the horror-only Top 10 list, its mobile description treatment, and the project structure.
- **Problems found:** The documentation did not list every added stylesheet or clarify that Top 10 is horror-only.
- **Fixes requested:** None yet.
