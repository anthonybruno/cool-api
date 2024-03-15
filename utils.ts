import fs from 'fs';
import Schedule from 'node-schedule';
import { formatDistanceToNow } from 'date-fns';
import { getNewSong } from './controllers/spotify';
import { getNewWeather } from './controllers/weather';

const everyFewSeconds = '*/15 * * * * *';
const workHours = '*/10 9-17 * * 1-5'; // 10mins 9am-5pm * * M-F
const everyTenMinutes = '*/10 * * * *';

export function getSavedData() {
  const savedSong = JSON.parse(fs.readFileSync('savedSong.json', 'utf8'));
  const savedTemp = JSON.parse(fs.readFileSync('savedTemp.json', 'utf8'));
  const { lastUpdated } = savedSong;
  return {
    ...savedSong,
    ...savedTemp,
    lastUpdatedDistance: formatDistanceToNow(new Date(lastUpdated), {
      addSuffix: true,
    }),
  };
}

export function runScheduler() {
  Schedule.scheduleJob(workHours, () => {
    getNewSong();
  });

  Schedule.scheduleJob(everyTenMinutes, () => {
    getNewWeather();
  });
}

export function evalColdStart() {
  if (fs.existsSync('savedTemp.json') === false) {
    getNewSong();
    getNewWeather();
  }
}
