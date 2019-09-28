console.log('USER INFORMATION: ', socket.handshake.headers);

socket.on('creatingRoom', (data) => {
  if (room_data[data.roomName]) {
  } else {
    room_data[data.roomName] = {};
    io.sockets.emit('creatingRoom', data);
  }
});

socket.on('joiningRoom', (data) => {
  socket.join(data);
  let clients = io.sockets.adapter.rooms[data].sockets;
  io.sockets.to(data).emit('addingNewUser', clients);
});

socket.on('leavingRoom', () => {
  console.log('LOOK HERER SDLFKJSD : ', socket.rooms);
  const roomsLeft = socket.rooms;
  socket.leaveAll();
  console.log('leave all');
  for (let room in roomsLeft) {
    console.log(room);
  }
});
