const { getRoomGameId }= require('../../../bin/helpers/functionHelpers');

const socketForKingsCup = function(io, socket, kingsCupData, userCurrentRoom, game_data) {
  
  // Handle user's response. This is the main part of the game, in which win/loss is determined.
  // If not everyone has submitted their response, it will wait

  socket.on('kingsCupSelection', (data) => {
    io.to(socket.id).emit('kingsCupHideBtn', data);
    kingsCupData[userCurrentRoom[socket.id]][socket.id] = data;
    if (kingsCupReadyStatus(kingsCupData, userCurrentRoom[socket.id])) {
      let userResponses = [];
      for (let id in kingsCupData[userCurrentRoom[socket.id]]) {
        userResponses.push(kingsCupData[userCurrentRoom[socket.id]][id]);
      }
      const winningChoice = determineWhoWinsRPS(userResponses);
      for (let id in kingsCupData[userCurrentRoom[socket.id]]) {
        if (winningChoice === 'draw') {
          io.sockets.to([userCurrentRoom[socket.id]]).emit('kingsCupShowResult', 'draw');
        } else {
          for (let id in kingsCupData[userCurrentRoom[socket.id]]) {
            if (kingsCupData[userCurrentRoom[socket.id]][id] === winningChoice) {
              io.to(id).emit('kingsCupShowResult', 'win');
            } else {
              io.to(id).emit('kingsCupShowResult', 'loss');
            }
          };
        };
      };
      for (let id in kingsCupData[userCurrentRoom[socket.id]]) {
        kingsCupData[userCurrentRoom[socket.id]][id] = false;
      };
    } else {
      io.sockets.to([userCurrentRoom[socket.id]]).emit('kingsCupWaitForResponse', [
        kingsCupData[userCurrentRoom[socket.id]]
      ]);
    };
  });

  // This resets the entire game and forces entire room to play again

  socket.on('kingsCupPlayAgain', () => {
    const myRoom = userCurrentRoom[socket.id];
    io.sockets.to(myRoom).emit('kingsCupResetGame');
    io.sockets.to(myRoom).emit('kingsCupSetUp', [
      Object.keys(kingsCupData[myRoom])
    ]);
  });

  // Force all users out of the room

  socket.on('kingsCupQuitAll', () => {
    const myRoom = userCurrentRoom[socket.id];
    io.sockets.to(myRoom).emit('kingsCupResetGame');
    const roomGameId = getRoomGameId(myRoom);
    game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers = [];
    io.sockets.to(myRoom).emit('kingsCupGoBackToLobby',[
      Object.keys(io.sockets.adapter.rooms[myRoom].sockets),
      myRoom
    ]);
    delete kingsCupData[myRoom];
  });
};

module.exports = { socketForKingsCup };

// -------------------- Helper functions --------------------------------------

// Check if all players have submitted their response

const kingsCupReadyStatus = function(kingsCupData, currentRoom) {
  for (let key in kingsCupData[currentRoom]) {
    if (kingsCupData[currentRoom][key] === false) {
      return false;
    };
  };
  return true;
};

// Game logic for Rock-Paper-Scissor

const determineWhoWinsRPS = function(responses) {
  if (responses.includes('rock') && responses.includes('paper') && responses.includes('scissor')) {
    return 'draw';
  }
  if (responses.includes('rock')) {
    if (responses.includes('paper')) {
      return 'paper';
    } else if (responses.includes('scissor')) {
      return 'rock';
    } else {
      return 'draw';
    }
  } else if (responses.includes('paper')) {
    if (responses.includes('scissor')) {
      return 'scissor';
    } else {
      return 'draw';
    }
  } else if (responses.includes('scissor')) {
    return 'draw';
  };
};