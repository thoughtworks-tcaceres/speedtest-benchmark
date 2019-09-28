const express = require("express");
const router = express.Router();
const { getAllUsersDB } = require("../bin/helpers/dbHelpers");

router.get("/archivedGames", async (req, res) => {
  try {
    const data = await getArchivedGames;
    return res.json(data);
  } catch (error) {
    console.log("error :", error);
  }
});

module.exports = router;
