//updateSessionFlexibleDB
//updateRecordDB(50)

const {updateSessionFlexibleDB, updateRecordDB} = require('../../../bin/helpers/dbHelpers');

const kingsCup2 = function(io, socket, kingsCup2Data, userCurrentRoom) {
  socket.on('whatever', (data) => {
    const myRoom = userCurrentRoom[socket.id];
    const game = kingsCup2Data[myRoom].game;

    //console.log(game.getPlayers() );
    io.to(myRoom).emit('kcdraw', `${game.dealCard(socket.id)}`);

    //io.sockets.to(myRoom).emit('someName', [])
    // let game = new Game()
  });

  socket.on('draw card button clicked', (data) => {
    const myRoom = userCurrentRoom[socket.id];
    const game = kingsCup2Data[myRoom].game;
    console.log('hererererere');
    //console.log(kingsCup2Data[myRoom].record);
    console.log(myRoom);

    console.log('hererererere');

    if (game.getDeck().getLength() > 0) {
      console.log('first branch about to happen');
      io.to(myRoom).emit('kcdrawcard', `${game.dealCard(socket.id)}`);
      console.log('event 2 about to happen');
      game.iteratePlayer();
      console.log('event 3 about to happen');
      io.to(game.playerPool[game.playerTurnNumber]).emit('kcdealbutton');
      console.log('event 4 about to happen');
    } else {
      io.to(myRoom).emit('initEndGame');
      kingsCup2Data[myRoom].record;
      //get record id from game object
      //get socket id's from sockets object
      //endgame redirect to game rooms
    }
  });
};

module.exports = {kingsCup2};
