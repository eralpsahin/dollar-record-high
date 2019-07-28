/* Index Route */
const express = require('express');
const { getAsync } = require('../redis-client');

const router = express.Router();

/* GET USD/TRY Exchange. */
router.get('/usd', async (req, res) => {
  const rate = await getAsync('usd');
  res.json({ rate });
});

router.get('/btc', async (req, res) => {
  const rate = await getAsync('btc');
  res.json({ rate });
});

router.get('/euro', async (req, res) => {
  const rate = await getAsync('euro');
  res.json({ rate });
});

router.get('/xau', async (req, res) => {
  const rate = await getAsync('xau');
  res.json({ rate });
});

module.exports = router;
