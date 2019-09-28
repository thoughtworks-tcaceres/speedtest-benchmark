const {getRoomGameId} = require('../../bin/helpers/functionHelpers');

const handleSocketDisconnect = function(io, socket, userCurrentRoom, game_data, sockeIdDetails) {
  socket.on('disconnect', () => {

    console.log('disconnecting USER', socket.id)

    const currentRoom = userCurrentRoom[socket.id];
    delete userCurrentRoom[socket.id];

    if (!currentRoom) {
      delete sockeIdDetails[socket.id];
      return;
    }
    let room_info = io.sockets.adapter.rooms[currentRoom];
    let roomGameId = getRoomGameId(currentRoom);
    if (room_info) {


      //==================================================================================

      // Handle the case when user is still in a game

      if (sockeIdDetails[socket.id].inProgress) {
        console.log('A user just left an active game!');
        console.log(sockeIdDetails);
        console.log('------------');

        console.log(game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers);
        console.log(sockeIdDetails)
        for (let id of game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers) {
          sockeIdDetails[id].inProgress = null;
          userCurrentRoom[id] = null;
        };
        io.sockets.to(currentRoom).emit('forceDisplayReset', roomGameId.gameId);
        delete game_data[roomGameId.gameId].room_data[roomGameId.roomId];
        console.log('have forced reset');
        io.sockets.emit('removeSpecificRoom', currentRoom);
        io.sockets.to(currentRoom).emit('showSomeErrorMessageInLobby', 'A user got disconnected!')
        delete sockeIdDetails[socket.id];
        return;
        
      };
      
      

      //====================================================================================


      if (
        Object.keys(room_info.sockets).length < game_data[roomGameId.gameId].min_players ||
        Object.keys(room_info.sockets).length ===
          game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers.length
      ) {
        game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers = [];
      }
      io.sockets
        .to(currentRoom)
        .emit('updateRoomStatus', [
          Object.keys(room_info.sockets),
          currentRoom,
          game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers,
          socket.id,
          game_data[roomGameId.gameId].min_players
        ]);
    } else {
      game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers = [];
    }

    delete sockeIdDetails[socket.id];

  });
};

module.exports = {handleSocketDisconnect};