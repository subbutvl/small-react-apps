const CLIENT_ID = "495eb9c593e640a98676546131d7a330";
const CLIENT_SECRET = "b0e27ee3adca4ba9a7f12b6df77ec88b";
const ENCODED_CLIENT = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
const AUTHORIZE_URL = "https://accounts.spotify.com/api/token";
const ARTISTS_URL = "https://api.spotify.com/v1/search";
const TRACKS_URL = "https://api.spotify.com/v1/artists/";

let token: any;

const requestToken = async () => {
  try {
    const myHeaders = new Headers();
    const urlencoded = new URLSearchParams();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${ENCODED_CLIENT}`);
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    const res = await (
      await fetch(AUTHORIZE_URL, requestOptions as any)
    ).json();

    token = res.access_token;

    setTimeout(requestToken, res.expires_in);
  } catch (err) {
    console.log("requestToken -> err", err);
  }
};

const getArtists = (() => {
  const url = new URL(ARTISTS_URL);
  const headers = new Headers();

  url.searchParams.append("type", "artist");
  url.searchParams.append("limit", "10");

  const options = {
    method: "GET",
    headers,
  };

  return async (query: string) => {
    if (!token) await requestToken();

    headers.set("Authorization", `Bearer ${token}`);
    url.searchParams.set("q", query);

    const artists = await fetch(url.toString(), options);

    return artists.json();
  };
})();

const getTracks = (() => {
  const options = {
    method: "GET",
    headers: new Headers(),
  };

  return async (artistID: string) => {
    if (!token) {
      await requestToken();
    }

    options.headers.set("Authorization", `Bearer ${token}`);

    const url = `${TRACKS_URL}${artistID}/top-tracks?country=US`;
    const tracks = await fetch(url, options);

    return tracks.json();
  };
})();

export { getArtists, getTracks };
