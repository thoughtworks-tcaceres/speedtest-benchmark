const express = require('express');
const router = express.Router();
const db = require('../db/db');
const {isLoggedIn} = require('../bin/helpers/middleware');
const {
  getRoomGameId,
  getNumberOfUsers,
  getJoinedRooms,
  validateNewRoom,
  insertNewRoom,
  nameRefine
} = require('../bin/helpers/functionHelpers');

const game_data = require('../db/tempDB');

router.get('/', isLoggedIn, (req, res) => {
  console.log(game_data);
  res.render('lobby', {game_data});
});

router.post('/createRoom', function(req, res) {
  console.log('trying to add newroom');
  const refinedName = nameRefine(req.body.selectedName);
  if (validateNewRoom(refinedName, req.body.gameName, game_data)) {
    res.send(refinedName);
  } else {
    console.log('This name is invalid');
  }
});

router.post('/insertPasscode', function(req, res) {
  res.send(nameRefine(req.body.insertedPasscode));
});

module.exports = router;
