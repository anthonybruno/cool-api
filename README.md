## 🌀 Cool API

Cool API is my special little friend that fetches current weather information and what I listen to on Spotify throughout the day. It's got some fun features like:

- It stores all of my information on the server to reduce latency.
- It pulls Spotify info every 10 minutes from 9 am to 5 pm, Monday through Friday.
- It pulls Weather info every 10 minutes 24/7.
- Formats the data in a nice way to display on [my site](https://abruno.net).

## 📍 Built with

- [Express.js](https://expressjs.com)
- [date-fns](https://date-fns.org)
- [node-schedule](https://www.npmjs.com/package/node-schedule)
- [pm2](https://www.npmjs.com/package/pm2)

## 🔥 Up and running

### Running the app

- `npm install`
- Create an `.env` file that includes:
  - `SPOTIFY_CLIENT_ID`
  - `SPOTIFY_CLIENT_SECRET`
  - `SPOTIFY_REDIRECT_URL`
  - `SPOTIFY_REFRESH_TOKEN`
  - `WEATHER_KEY`

### Spotify developers account

- Go to the [Spotify Developers Dashboard](https://developer.spotify.com/dashboard/login) and sign up for an account.
- When you're all signed up, you'll get to the Spotify Developers Dashboard that shows your applications. Click "Create An App".
- Follow the prompts and select Non-Commercial
- When you log in, you should be able to see your Client ID. Underneath it, you can click to see your Client Secret. Store these in the `.env` file using the config below.

### Spotify application setup

- Now we need to configure the application with the website and redirect URL.
- On the dashboard page, click "Edit Settings", and a modal should appear.
- For website, you don't need to have a website up and running yet, so just put in the name of a website that you own. If you don't own a website, you can use whatever.

### Configuring the Redirect URL

- This is where Spotify sends us after we've logged in. They send us to the URL that we supply, but also give us back an authorization code. We use that authorization code to get an access and refresh token.
- If you have a website, you can put any URL from your domain here, and Spotify will redirect us there after logging in.
- If you don't have a website, again- that's OK, we can use `http://google.com/callback` or something, but do understand that the domain that owns the website that we redirect to is fully capable of reading the authorization code we receive.
- Whatever you've provided as the Redirect URL, make sure to update the `.env` with this as well.

### Getting the initial Authorization Code

- `https://accounts.spotify.com/authorize?client_id=PASTE_HERE&
response_type=code&redirect_uri=PASTE_HERE&
scope=user-read-private%20user-read-currently-playing`
- When you paste the link in your browser, you'll be asked to log in using your Facebook or email. Do that.
- Successfully logging in will bring you to this page that asks you to confirm the type of data that we're asking for. The authorization scope that we're interested in is being able to see the user's currently playing song. Click "agree" here.
- After clicking "agree", we'll get sent to the redirect URL that we passed in earlier, but with our authorization code as a code parameter in the resulting URL (check the URL bar).
- We're going to want whatever comes after `?code=` in the URL, so copy that.

### Using the Authorization Code to get an Access Token and the Refresh Token

- In the root of the repository, run the following script with the code you copied from the URL.
- `npx tsx refreshToken.ts`
- This will ask for a permanent refresh token that we can use to make subsequent requests to the API and never have to worry about logging in again.
- Copy the refresh token that was emitted to the console into the `.env` file.

### Get a weather key

- Obtain an api key with `appid` from [openweathermap.org](openweathermap.org)
- Configure your lat/long within `controllers/weather.ts`

### Start the app

- `npm run dev`
- 🌭
- `https://localhost:3000`

## Big thanks

The bulk of this project is building on top of what [Khalil](https://khalilstemmler.com/) came up with years ago. Thank you 🙌
