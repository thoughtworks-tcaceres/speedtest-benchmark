const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../bin/helpers/middleware');
const {getPlayerRankingsByGameType, getArchivedGames} = require('../bin/helpers/dbHelpers');

router.get('/archivedGames', isLoggedIn, (req, res) => {
  getArchivedGames()
    .then((results) => res.json(results))
    .catch((err) => res.json({err: err.message}));
});

router.get('/rankingsByGame', isLoggedIn, (req, res) => {
  getPlayerRankingsByGameType()
    .then((results) => res.json(results))
    .catch((err) => res.json({err: err.message}));
});

module.exports = router;
