// load .env data into process.env
require('dotenv').config();
//JJ stuff==========JJ stuff===============
const Game = require('./Games/KingsCup');

//JJ stuff ===========JJstuff ==============

// Web server config
const PORT = process.env.PORT || 1000;
const ENV = process.env.ENV || 'development';
const express = require('express');
const sass = require('node-sass-middleware');
const app = express();
const morgan = require('morgan');
const socket = require('socket.io');
const session = require('express-session')({
  secret: 'my-secret',
  resave: true,
  saveUninitialized: true
});
const sharedsession = require('express-socket.io-session');

const game_data = require('./db/tempDB.js');

const {
  getAllUsersDB,
  getUserByUsernameDB,
  getUserByEmailDB,
  addUserDB,
  getAllGameInfoDB,
  getAllGameSessionsDB,
  getAllActiveGameSessionsDB,
  getAllGameRecordsDB,
  getUserGameRecordsDB,
  addRecordDB,
  addSessionDB,
  updateRecordDB,
  updateSessionDB,
  addSessionFlexibleDB,
  updateSessionFlexibleDB
} = require('./bin/helpers/dbHelpers.js');

const {
  getRoomGameId,
  getNumberOfUsers,
  getJoinedRooms,
  validateNewRoom,
  insertNewRoom,
  nameRefine
} = require('./bin/helpers/functionHelpers');
//additional setups
const flash = require('connect-flash');

// PG database client/connection setup
const db = require('./db/db');
db.connect();

//dev tool
app.use(morgan('dev'));

app.use(session);

app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.session.email;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(
  '/styles',
  sass({
    src: __dirname + '/styles',
    dest: __dirname + '/public/styles',
    debug: true,
    outputStyle: 'expanded'
  })
);
app.use(express.static(__dirname + '/public'));

// ***** routes *****
const apiRoutes = require('./routes/api');
const gamesRoutes = require('./routes/games');
const usersRoutes = require('./routes/users');
const rankingsRoutes = require('./routes/rankings');
const defaultRoutes = require('./routes/default');

app.use('/api', apiRoutes);
app.use('/games', gamesRoutes);
app.use('/users', usersRoutes);
app.use('/rankings', rankingsRoutes);
app.use('/', defaultRoutes);

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const io = socket(server);

io.use(
  sharedsession(session, {
    autoSave: true
  })
);

// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE
// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE
// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE
// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE
// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE
// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE

const {socketForKingsCup} = require('./public/scripts/kingsCup/serverSide');

const {handleSocketDisconnect} = require('./public/scripts/handleSocketDisconnectServer');
const {kingsCup2} = require('./public/scripts/kingsCup2/server');

const socketIdToEmail = {};

const sockeIdDetails = {};

const kingsCupData = {};
const kingsCup2Data = {};

const userCurrentRoom = {};

// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE
// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE
// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE
// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE
// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE
// MY NEW STUFFS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE

io.on('connection', (socket) => {
  if (socket.handshake.session.email) {
    socketIdToEmail[socket.id] = socket.handshake.session.email;
  }
  // console.log('user email cookie:', socket.handshake.session.email);
  // // console.log('USER INFORMATION: ', socket.handshake.headers);

  // //on game start up - add record and session
  // addRecordDB(3) //(game_id)
  //   .then(
  //     (data) =>
  //       addSessionFlexibleDB(
  //         ['t@gmail.com', 'a@gmail.com', 'tyler@gmail.com', 'jj@gmail.com', 'joe@gmail.com', 'viet@gmail.com'],
  //         data.id
  //       )
  //     /*
  //     get list of userNames in the room, create a record in the sessions
  //     database for each user
  //     */
  //   ) //(user_id,record_id) -- need to find all the users --> uses(email_arr,record_id)
  //   .catch((err) => console.log(err));

  // //on game completion - update record and session
  // updateRecordDB(50) //(record_id)
  //   .then((data) => updateSessionFlexibleDB(['t@gmail.com'], data.id))
  //   //array of object that updates each rank for a single --> same thing as regularupdate session?
  //   .catch((err) => console.log(err));

  // if (socket.handshake.session.email) {
  //   socketIdToEmail[socket.id] = socket.handshake.session.email;
  // }
  // console.log(socketIdToEmail);

  // //on game start up - add record and session
  // addRecordDB(3) //(game_id)
  //   .then(
  //     (data) =>
  //       addSessionFlexibleDB(
  //         ['t@gmail.com', 'a@gmail.com', 'tyler@gmail.com', 'jj@gmail.com', 'joe@gmail.com', 'viet@gmail.com'],
  //         data.id
  //       )
  //     /*
  //     get list of userNames in the room, create a record in the sessions
  //     database for each user
  //     */
  //   ) //(user_id,record_id) -- need to find all the users --> uses(email_arr,record_id)
  //   .catch((err) => console.log(err));

  // //on game completion - update record and session
  // updateRecordDB(50) //(record_id)
  //   .then((data) => updateSessionFlexibleDB(['t@gmail.com'], data.id))
  //   //array of object that updates each rank for a single --> same thing as regularupdate session?
  //   .catch((err) => console.log(err));

  let currentRoom;

  //00000000000000000000000000000000000
  userCurrentRoom[socket.id] = null;
  sockeIdDetails[socket.id] = {
    inProgress: null
  };

  //000000000000000000000000000

  // Handle the event when the user is disconnected

  handleSocketDisconnect(io, socket, userCurrentRoom, game_data, sockeIdDetails);

  // socket.on('disconnect', () => {
  // //0000000000000000000000000000
  // delete userCurrentRoom[socket.id];
  // //0000000000000000000000000000000

  // if (!currentRoom) {
  //   return;
  // }
  // let room_info = io.sockets.adapter.rooms[currentRoom];
  // let roomGameId = getRoomGameId(currentRoom);
  // if (room_info) {
  //   if (
  //     Object.keys(room_info.sockets).length < game_data[roomGameId.gameId].min_players ||
  //     Object.keys(room_info.sockets).length ===
  //       game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers.length
  //   ) {
  //     game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers = [];
  //   }
  //   io.sockets
  //     .to(currentRoom)
  //     .emit('updateRoomStatus', [
  //       Object.keys(room_info.sockets),
  //       currentRoom,
  //       game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers,
  //       socket.id,
  //       game_data[roomGameId.gameId].min_players
  //     ]);
  // } else {
  //   game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers = [];
  // }
  // });

  // Create new room

  socket.on('createNewRoom', (data) => {
    insertNewRoom(data.roomId, data.gameId, data.passcode, game_data);
    io.sockets.emit('createNewRoom', data);
  });

  // Delete the room

  socket.on('deleteSpecificRoom', () => {
    io.sockets.emit('removeSpecificRoom', currentRoom);
    const roomGameId = getRoomGameId(currentRoom);
    delete game_data[roomGameId.gameId].room_data[roomGameId.roomId];
    currentRoom = null;
    userCurrentRoom[socket.id] = null;
  });

  // Join a room

  socket.on('joinARoom', (data) => {
    // Check to see if user is trying to join the room he/she has already joined

    const uniqueRoomName = `${data.gameId}-${data.roomId}`;
    const joinedRooms = getJoinedRooms(game_data, io, socket.id);
    if (joinedRooms.includes(uniqueRoomName)) {
      return;
    }

    // Check number of users

    const numberOfExistingUsers = getNumberOfUsers(data.gameId, data.roomId, io);
    if (numberOfExistingUsers >= game_data[data.gameId].max_players) {
      socket.emit('showSomeErrorMessageInLobby', 'This room is full!');
      return;
    }

    // Check if the game is in progress

    if (game_data[data.gameId].room_data[data.roomId].joinedPlayers.length > 0) {
      socket.emit('showSomeErrorMessageInLobby', 'The game is in progress!');
      return;
    }

    // Leave all the rooms

    for (let joinedRoom of joinedRooms) {
      socket.leave(joinedRoom);
      let room_info = io.sockets.adapter.rooms[joinedRoom];
      let roomGameId = getRoomGameId(joinedRoom);
      if (room_info) {
        if (
          Object.keys(room_info.sockets).length < game_data[roomGameId.gameId].min_players ||
          Object.keys(room_info.sockets).length ===
            game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers.length
        ) {
          game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers = [];
        }
        io.sockets
          .to(joinedRoom)
          .emit('updateRoomStatus', [
            Object.keys(room_info.sockets),
            joinedRoom,
            game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers,
            socket.id,
            game_data[roomGameId.gameId].min_players
          ]);
      } else {
        game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers = [];
      }
    }

    // Join the room

    currentRoom = uniqueRoomName;

    ///000000000000000000000000000000000000000
    userCurrentRoom[socket.id] = currentRoom;
    //0000000000000000000000000000000000000

    socket.join(uniqueRoomName);
    const clients = io.sockets.adapter.rooms[uniqueRoomName].sockets;
    io.sockets
      .to(uniqueRoomName)
      .emit('updateRoomStatus', [
        Object.keys(clients),
        currentRoom,
        game_data[data.gameId].room_data[data.roomId].joinedPlayers,
        socket.id,
        game_data[data.gameId].min_players
      ]);
  });

  // Trigger user joining event

  socket.on('handleJoinGameEvent', (data) => {
    const clients = io.sockets.adapter.rooms[currentRoom].sockets;
    const roomGameId = getRoomGameId(currentRoom);
    game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers.push(socket.id);
    if (Object.keys(clients).length > game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers.length) {
      io.sockets
        .to(currentRoom)
        .emit('updateRoomStatus', [
          Object.keys(clients),
          currentRoom,
          game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers,
          socket.id,
          game_data[roomGameId.gameId].min_players
        ]);
    } else if (
      Object.keys(clients).length === game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers.length
    ) {
      io.sockets.to(currentRoom).emit('directToGame', {uniqueRoomName: currentRoom, gameId: roomGameId.gameId});

      // sockeIdDetails = {}

      for (let id of game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers) {
        sockeIdDetails[id] = {
          inProgress: roomGameId.gameId
        };
      }

      // Setup for the start of the game

      if (roomGameId.gameId === 'whosbigger') {
        console.log('We are joining this: ', roomGameId.gameId);
      } else if (roomGameId.gameId === 'kingsCup') {
        console.log('We are joining this: ', roomGameId.gameId);
        io.sockets
          .to(currentRoom)
          .emit('kingsCupSetUp', [game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers]);
        kingsCupData[currentRoom] = {};
        for (let id of game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers) {
          kingsCupData[currentRoom][id] = false;
        }
        console.log('status here', kingsCupData);
      } else if (roomGameId.gameId === 'blackjack') {
        console.log('We are joining this: ', roomGameId.gameId);
      } else if (roomGameId.gameId === 'goofy') {
        console.log('We are joining this: ', roomGameId.gameId);
      } else if (roomGameId.gameId === 'kingsCup2') {
        console.log('We are joining this: ', roomGameId.gameId);

        kingsCup2Data[currentRoom] = {};
        kingsCup2Data[currentRoom].players = {};
        for (let id of game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers) {
          kingsCup2Data[currentRoom].players[id] = {};
        }
        console.log(kingsCup2[currentRoom]);
        kingsCup2Data[currentRoom].game = new Game(Object.keys(kingsCup2Data[currentRoom].players), currentRoom);
        io.to(kingsCup2Data[currentRoom].game.getPlayers()[0]).emit(
          'kc player 1 on init',
          kingsCup2Data[currentRoom].game.getPlayers()
        );
        io.to(currentRoom).emit('init game', {
          playerArr: kingsCup2Data[currentRoom].game.getPlayers(),
          idToEmail: socketIdToEmail
        });
      }
      let DB_game_id = roomGameId.gameId === `kingsCup` ? 1 : 2;
      let DB_players_arr = game_data[roomGameId.gameId].room_data[roomGameId.roomId].joinedPlayers.map((player) => {
        return socketIdToEmail[player];
      });
      /**** include initial push to DB here */
      //************************************** */
      addRecordDB(DB_game_id) //(game_id)
        .then((new_record) => {
          // not adding in for game id 1 because of data structure issues
          if (DB_game_id === 2) {
            kingsCup2Data[currentRoom].record = new_record.id;
          }
          return addSessionFlexibleDB(DB_players_arr, new_record.id);
        })
        .catch((err) => console.log(err));
    }
  });

  socket.on('checkPasscode', (data) => {
    if (!game_data[data.gameId].room_data[data.roomId]) {
      socket.emit('forceRefreshGamesPage');
      return;
    }
    if (game_data[data.gameId].room_data[data.roomId].passcode) {
      socket.emit('askForPasscode', [data, true]);
    } else {
      socket.emit('askForPasscode', [data, false]);
    }
  });

  socket.on('validatePasscode', (data) => {
    if (data[1] === game_data[data[0].gameId].room_data[data[0].roomId].passcode) {
      socket.emit('joinAfterPasscode', [data[0], true]);
    } else {
      socket.emit('joinAfterPasscode', [data[0], false]);
    }
  });

  socketForKingsCup(io, socket, kingsCupData, userCurrentRoom, game_data);
  kingsCup2(io, socket, kingsCup2Data, userCurrentRoom);
});
