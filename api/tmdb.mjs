const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const DISCOVER_PARAMETERS = new Set([
  "include_adult",
  "include_video",
  "language",
  "sort_by",
  "with_genres",
  "with_keywords",
  "certification",
  "certification_country",
  "certification.lte",
  "vote_count.gte",
  "primary_release_date.gte",
  "primary_release_date.lte",
  "vote_average.gte",
  "vote_average.lte",
]);

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const action = requestUrl.searchParams.get("action");
  const credentials = getCredentials();

  if (!credentials) {
    return Response.json({ error: "TMDB service is not configured." }, { status: 500 });
  }

  const tmdbRequest = buildTmdbRequest(action, requestUrl.searchParams, credentials);
  if (!tmdbRequest) {
    return Response.json({ error: "Invalid movie request." }, { status: 400 });
  }

  try {
    const response = await fetch(tmdbRequest);
    const data = await response.json();

    if (!response.ok) {
      return Response.json({ error: "TMDB could not complete this request." }, { status: response.status });
    }

    return Response.json(data, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("TMDB proxy request failed:", error);
    return Response.json({ error: "TMDB is temporarily unavailable." }, { status: 502 });
  }
}

function getCredentials() {
  if (process.env.TMDB_READ_ACCESS_TOKEN) {
    return { type: "token", value: process.env.TMDB_READ_ACCESS_TOKEN };
  }

  if (process.env.TMDB_API_KEY) {
    return { type: "key", value: process.env.TMDB_API_KEY };
  }

  return null;
}

function buildTmdbRequest(action, searchParams, credentials) {
  const parameters = new URLSearchParams();
  let path;

  if (action === "discover") {
    path = "/discover/movie";
    for (const [key, value] of searchParams) {
      if (DISCOVER_PARAMETERS.has(key)) {
        parameters.set(key, value);
      }
    }
  } else if (action === "movie") {
    const movieId = searchParams.get("id");
    if (!/^\d+$/.test(movieId || "")) return null;
    path = `/movie/${movieId}`;
    parameters.set("language", searchParams.get("language") || "en-US");
  } else if (action === "keyword") {
    const keyword = searchParams.get("query")?.trim();
    if (!keyword || keyword.length > 100) return null;
    path = "/search/keyword";
    parameters.set("query", keyword);
  } else {
    return null;
  }

  if (credentials.type === "key") {
    parameters.set("api_key", credentials.value);
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.search = parameters.toString();

  if (credentials.type === "token") {
    return new Request(url, {
      headers: { Authorization: `Bearer ${credentials.value}`, accept: "application/json" },
    });
  }

  return new Request(url, { headers: { accept: "application/json" } });
}
