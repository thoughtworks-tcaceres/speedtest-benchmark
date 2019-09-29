const express = require("express");
const router = express.Router();
const { getUsersDB } = require("../bin/helpers/dbHelpers");

router.get("/query", async (req, res) => {
  try {
    const data = await getUsersDB(req.query.id);
    return res.json(data);
  } catch (error) {
    console.log("error :", error);
  }
});

module.exports = router;
