import fs from 'fs';

function formatWeather(data: any) {
  if (typeof data === 'object' && data.main.temp) {
    return JSON.stringify({
      temp: Math.round(data.main.temp),
    });
  }
  return null;
}

function saveWeather(formattedWeather: string | null) {
  if (formattedWeather) {
    fs.writeFile('savedTemp.json', formattedWeather, 'utf8', (err) => {
      if (err) console.log(err);
    });
  }
}

async function weatherCurrently() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=39.73922938590436&lon=-104.98480221780002&units=imperial&appid=${process.env.WEATHER_KEY}`
  );
  const data = await response.json();
  return data;
}

export async function getNewWeather() {
  weatherCurrently().then((res) => {
    saveWeather(formatWeather(res));
  });
}
