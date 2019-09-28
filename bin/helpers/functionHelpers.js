const bcrypt = require('bcrypt');
const {getUserByEmailDB, getUserByUsernameDB, addUserDB} = require('./dbHelpers.js');

//generate hashed password
const generateHashedPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

//check if email already exists
const emailExists = (email) => {
  return getUserByEmailDB(email).then((result) => {
    if (result) {
      return result.email;
    }
    return false;
  });
};

//check if username already exists
const usernameExists = (username) => {
  return getUserByUsernameDB(username).then((result) => {
    if (result) {
      return result.username;
    }
    return false;
  });
};

//verify if password entered is correct
const validatePassword = (email, password) => {
  return getUserByEmailDB(email).then((user) => {
    return bcrypt.compare(password, user.password);
  });
};

//add user to DB
const addUser = (username, email, password) => {
  addUserDB(username, email, generateHashedPassword(password)).then((newUser) => {
    if (newUser) {
      return newUser;
    }
    throw new Error();
  });
};

// *********************

//==================================================================================
//==================================================================================
//==================================================================================
//=============== HELPER FUNCTIONS =================================================
//==================================================================================
//==================================================================================
//==================================================================================

//

// This helps to determine whether the player should

// Break down room name to obtain gameId and roomId

const getRoomGameId = function(room) {
  for (let i = 0; i < room.length; i++) {
    if (room[i] === '-') {
      return {gameId: room.slice(0, i), roomId: room.slice(i + 1)};
    }
  }
};

// Get current number of users in the room

const getNumberOfUsers = function(gameId, roomId, io) {
  const room_data = io.sockets.adapter.rooms[`${gameId}-${roomId}`];
  if (room_data) {
    return Object.keys(room_data.sockets).length;
  } else {
    return 0;
  }
};

// This function obtains all the rooms the user is joined.
// Note that it may return more than 1 room

const getJoinedRooms = function(game_data, io, userID) {
  output = [];
  for (let gameName in game_data) {
    for (let roomName in game_data[gameName].room_data) {
      let room_data = io.sockets.adapter.rooms[`${gameName}-${roomName}`];
      if (room_data) {
        if (room_data.sockets[userID]) {
          output.push(`${gameName}-${roomName}`);
        }
      }
    }
  }
  return output;
};

// This goes to check if the name for room already exists for specific game
// and whether the name is acceptable

const validateNewRoom = function(roomName, gameName, game_data) {
  if (roomName === '') {
    return false;
  }
  if (game_data[gameName].room_data[roomName]) {
    return false;
  }
  return true;
};

// This adds new room to the data

const insertNewRoom = function(roomId, gameId, passcode, game_data) {
  let newPasscode = nameRefine(passcode);
  if (newPasscode === '') {
    newPasscode = null;
  };
  game_data[gameId].room_data[roomId] = {
    passcode: newPasscode,
    joinedPlayers: []
  };
};

// This removes the spaces at the end for the new room's name

const nameRefine = function(name) {
  let output = name;
  if (output === '') {
    return output;
  }
  for (let i = 0; i < output.length; i++) {
    if (output[i] !== ' ') {
      output = output.slice(i);
      break;
    }
  }
  for (let i = output.length - 1; i >= 0; i--) {
    if (output[i] !== ' ') {
      return output.slice(0, i + 1);
    }
  }
  return '';
};

module.exports = {
  getRoomGameId,
  getNumberOfUsers,
  getJoinedRooms,
  validateNewRoom,
  insertNewRoom,
  nameRefine,
  generateHashedPassword,
  usernameExists,
  emailExists,
  validatePassword,
  addUser
};
