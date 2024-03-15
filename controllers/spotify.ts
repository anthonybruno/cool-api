import fs from 'fs';

let spotifyBearerToken: string;

async function spotifyAccessToken() {
  const params = new URLSearchParams();
  const clientId = process.env.SPOTIFY_CLIENT_ID || '';
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN || '';

  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    body: params,
  });
  const token = await response.json();
  spotifyBearerToken = token.access_token;
}

async function spotifyCurrentlyPlaying() {
  const response = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        Authorization: `Bearer ${spotifyBearerToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

function formatSpotifyData(data: any) {
  const i = data.item;
  return {
    track: i.name,
    album: i.album.name,
    artist: i.artists[0].name,
    artwork: i.album.images[0].url,
    link: i.external_urls.spotify,
    trackArtist: `${i.name} by ${i.artists[0].name}`,
    lastUpdated: new Date(),
  };
}

function saveSong(formattedSong: any) {
  const jsonData = JSON.stringify(formattedSong);
  fs.writeFile('savedSong.json', jsonData, 'utf8', (err) => {
    if (err) console.log(err);
  });
}

export async function getNewSong() {
  if (spotifyBearerToken === undefined) await spotifyAccessToken();

  spotifyCurrentlyPlaying().then((res) => {
    saveSong(formatSpotifyData(res));
  });
}
