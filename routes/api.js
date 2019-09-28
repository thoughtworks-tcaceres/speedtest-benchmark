const express = require("express");
const router = express.Router();
const { getPlayerRankingsByGameType, getArchivedGames } = require("../bin/helpers/dbHelpers");

router.get("/archivedGames", (req, res) => {
  // getArchivedGames()
  //   .then(results => res.json(results))
  //   .catch(err => res.json({ err: err.message }));
  console.log("hello");
});

module.exports = router;
