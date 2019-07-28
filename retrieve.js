const fetch = require('node-fetch');
const schedule = require('node-schedule');

const usd = require('debug')('drh:usd');
const euro = require('debug')('drh:euro');
const xau = require('debug')('drh:xau');
const btc = require('debug')('drh:btc');

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

/**
 * Schedule XAU/TRY exchange rate.
 */
schedule.scheduleJob('0 8 * * *', () => {
  fetch('https://www.bloomberght.com/piyasa/refdata/gram-altin')
    .then((res) => res.json())
    .then((body) => {
      const data = body.SeriesData;
      redisClient.set('xau', data[data.length - 1][1]);
      xau(data[data.length - 1][1]);
    });
});

/**
 * Schedule BTC/TRY exchange rate.
 */
schedule.scheduleJob('* * * * *', () => {
  fetch('https://www.paribu.com/ticker')
    .then((res) => res.json())
    .then((body) => {
      const data = body.BTC_TL;
      redisClient.set('btc', data.lowestAsk);
      btc(data.lowestAsk);
    });
});
