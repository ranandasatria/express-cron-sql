const cron = require('node-cron');
const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const fs = require('fs').promises;
const moment = require('moment-timezone');

const fetchAndSaveWeatherData = async () => {
  try {
    const cronDir = path.join(__dirname, '..', 'home', 'cron');
    await fs.mkdir(cronDir, { recursive: true });

    const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=-6.1818&longitude=106.8223&current=temperature_2m&timezone=Asia%2FBangkok');
    const { time, temperature_2m } = response.data.current;

    const now = moment().tz('Asia/Jakarta').format('DDMMYYYY_HH.mm');
    const csvPath = path.join(cronDir, `cron_${now}.csv`);

    const csvWriter = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: 'time', title: 'Time' },
        { id: 'temperature', title: 'Temperature_2m' },
      ],
      fieldDelimiter: ';',
    });

    const records = [{ time, temperature: temperature_2m }];

    await csvWriter.writeRecords(records);
    console.log(`Data saved to ${csvPath}`);
  } catch (err) {
    console.error('Error fetching/saving data:', err.message);
  }
};

cron.schedule('0 0 8,12,15 * * *', fetchAndSaveWeatherData, {
  timezone: 'Asia/Jakarta'
});
// change to 0 * * * * * for testing every minutes

console.log('Cron job started: Collecting weather data at 08:00, 12:00, 15:00 WIB daily.');