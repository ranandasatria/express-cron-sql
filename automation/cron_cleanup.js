const cron = require('node-cron');
const fs = require('fs').promises;
const path = require('path');
const moment = require('moment-timezone');

const cleanOldFiles = async () => {
  try {
    const dataDir = path.join(__dirname, '..', 'home', 'cron');
    await fs.mkdir(dataDir, { recursive: true });

    const files = await fs.readdir(dataDir);
    const oneMonthAgo = moment().tz('Asia/Bangkok').subtract(1, 'month'); // change substract to (1, 'minute') for testing

    for (const file of files) {
      if (file.startsWith('cron_') && file.endsWith('.csv')) {
        const filePath = path.join(dataDir, file);
        const stats = await fs.stat(filePath);
        const fileDate = moment(stats.mtime).tz('Asia/Bangkok');

        if (fileDate.isBefore(oneMonthAgo)) {
          await fs.unlink(filePath);
          console.log(`Deleted old file: ${file}`);
        }
      }
    }
  } catch (err) {
    console.error('Error cleaning files:', err.message);
  }
};

cron.schedule('0 0 * * *', cleanOldFiles);
// change to * * * * * for testing every minutes

console.log('Cron job started: Cleaning old CSV files daily.');