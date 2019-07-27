/* Index Route */
const express = require('express');
const { getAsync } = require('../redis-client');

const router = express.Router();

/* GET USD/TRY Exchange. */
router.get('/', async (req, res) => {
  const usd = await getAsync('usd');
  res.json({ usd });
});

module.exports = router;
