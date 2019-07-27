const fetch = require('node-fetch');
const schedule = require('node-schedule');
const usd = require('debug')('drh:usd');
const euro = require('debug')('drh:euro');
const redisClient = require('./redis-client');

/**
 * Schedule USD/TRY exchange rate.
 */
schedule.scheduleJob('* * * * *', () => {
  fetch('https://www.bloomberght.com/piyasa/intradaydata/dolar')
    .then((res) => res.json())
    .then((body) => {
      const data = body.SeriesData;
      redisClient.set('usd', data[data.length - 1][1]);
      usd(data[data.length - 1][1]);
    });
});

/**
 * Schedule EUR/TRY exchange rate.
 */
schedule.scheduleJob('* * * * *', () => {
  fetch('https://www.bloomberght.com/piyasa/intradaydata/euro')
    .then((res) => res.json())
    .then((body) => {
      const data = body.SeriesData;
      redisClient.set('euro', data[data.length - 1][1]);
      euro(data[data.length - 1][1]);
    });
});
