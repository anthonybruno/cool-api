import dotenv from 'dotenv';
dotenv.config();

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
  return token.access_token;
}

async function printRefreshToken() {
  try {
    const refreshToken = await spotifyAccessToken();
    console.log(refreshToken);
    console.log('Your very lovely refresh token is: ');
    console.log('');
    console.log(`===> ${refreshToken}`);
    console.log('');
    console.log(
      "Copy and paste this into the .env file's 'SPOTIFY_REFRESH_TOKEN' section."
    );
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
}

printRefreshToken();
