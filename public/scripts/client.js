let socket = io.connect('https://lhl-card-games.herokuapp.com/');
// let socket = io.connect('http://localhost:8080/');
// let socket = io.connect('http://172.46.3.6:8080/')

// console.log('ipAddress')

let gameRoomIdUserIsTryingToJoinWithPasscode;

// Handle socket response

// --------------------------

socket.on('directToGame', (data) => {
  $('#lobby').slideUp(100);
  console.log('MAKI CHAN');
  console.log(`#gameFor${data.uniqueRoomName}`);
  $(`#gameFor${data.gameId}`).toggle(1000);
});

// --------------------------
// --------------------------
// --------------------------

socket.on('updateRoomStatus', (data) => {
  logs.innerHTML = '<h1>Welcome to room ' + data[1] + '<h1>';
  for (let key of data[0]) {
    if (data[2].includes(key)) {
      logs.innerHTML += `<p style="color: blue">${key} I'm ready!</p>`;
    } else {
      logs.innerHTML += `<p>${key}</p>`;
    }
  }
  if (data[2].includes(socket.id)) {
    $('#joinGameBtn').css('display', 'none');
    $('#waitingMsg').css('display', 'block');
  } else {
    if (data[0].length >= data[4]) {
      $('#joinGameBtn').css('display', 'block');
    } else {
      $('#joinGameBtn').css('display', 'none');
    }
    $('#waitingMsg').css('display', 'none');
  }
  if (data[0].length === 1) {
    $('#deleteRoomBtn').css('display', 'block');
  } else {
    $('#deleteRoomBtn').css('display', 'none');
  }
});

socket.on('askForPasscode', (data) => {
  if (data[1]) {
    gameRoomIdUserIsTryingToJoinWithPasscode = data[0];
    $('#lobby').hide();
    $('#passcodeForRoom').toggle(500);
  } else {
    socket.emit('joinARoom', data[0]);
  }
});

socket.on('joinAfterPasscode', (data) => {
  $('#passcodeForRoom').hide();
  $('#lobby').toggle();
  if (data[1]) {
    socket.emit('joinARoom', data[0]);
  } else {
    $('#wrongPasscodeEntered').toggle(500, function() {
      $('#wrongPasscodeEntered').hide(2000);
    });
  }
});

socket.on('showSomeErrorMessageInLobby', (msg) => {
  document.getElementById('stopUserFromJoiningRoom').innerHTML = `<p>${msg}</p>`;
  $('#stopUserFromJoiningRoom').toggle(500, function() {
    $('#stopUserFromJoiningRoom').hide(2000);
  });
});

socket.on('removeSpecificRoom', (data) => {
  console.log('removing', data);
  $(`#specificRoomBtnIdFor${data}`).remove();
  logs.innerHTML = '<br><br>';
  // $('#joinGameBtn').css('display', 'none');
  $('#deleteRoomBtn').css('display', 'none');
});

// --------------------------
// --------------------------
// --------------------------

socket.on('createNewRoom', (data) => {
  const newBtn = document.createElement('button');
  newBtn.addEventListener('click', () => {
    socket.emit('checkPasscode', data);
  });
  newBtn.innerHTML = data.roomId;
  newBtn.id = `specificRoomBtnIdFor${data.gameId}-${data.roomId}`;
  newBtn.setAttribute('class', 'room');
  document.getElementById('availableRoomsFor' + data.gameId).appendChild(newBtn);
});

// Loading jquery

$(document).ready(function() {
  roomJoiner();
  dynamicRoom();
  showRoomsForGame();
  // userRedirection();
  loadJoinGameBtn();
  passcodeInputHandler();
  handleCancelPasscode();
  handleDeleteRoomBtn();
});

// To be loaded on jquery when DOM is ready

const handleDeleteRoomBtn = function() {
  $('#deleteRoomBtn').on('click', function() {
    socket.emit('deleteSpecificRoom');
  });
};

const handleCancelPasscode = function() {
  $('#passcodeCancel').on('click', function() {
    $('#passcodeForRoom').hide();
    $('#lobby').toggle(500);
  });
};

const loadJoinGameBtn = function() {
  $('#joinGameBtn').on('click', function() {
    socket.emit('handleJoinGameEvent');
  });
};

const roomJoiner = function() {
  $('.room').on('click', function() {
    // IMPORTANT //
    // const enteredPasscode = prompt('This room is locked. Enter passcode here')
    // console.log(enteredPasscode)
    // console.log('ENDING MAS')
    // return;
    //////////////////////

    socket.emit('checkPasscode', {
      roomId: $(this).attr('data-roomid'),
      gameId: $(this).attr('data-gameid')
    });
  });
};

const passcodeInputHandler = function() {
  $('#passcodeForm').on('submit', function(event) {
    event.preventDefault();
    $.ajax('/games/insertPasscode', {
      type: 'POST',
      data: $(this).serialize(),
      dataType: 'text'
    })
      .done(function(data) {
        // console.log('successful passcode Insert!', data)

        socket.emit('validatePasscode', [gameRoomIdUserIsTryingToJoinWithPasscode, data]);
        // console.log(gameRoomIdUserIsTryingToJoinWithPasscode);
      })
      .fail(function(error) {
        console.log('Error at passcode submission: ', error);
      });
  });
};

const dynamicRoom = function() {
  $('.roomCreator').on('submit', function(event) {
    event.preventDefault();
    const gameId = $(this).attr('data-gamename');
    $.ajax('/games/createRoom', {
      type: 'POST',
      data: $(this).serialize(),
      dataType: 'text'
    })
      .done(function(data) {
        console.log('successful creation');
        socket.emit('createNewRoom', {
          roomId: data,
          gameId: gameId,
          passcode: $(`#chosenPasscodeFor${gameId}`).val()
        });
      })
      .fail(function(error) {
        console.log('Ajax failed: ', error);
      });
  });
};

const showRoomsForGame = function() {
  $('.game').on('click', function(event) {
    $('.roomList').hide();
    $(`#${$(this).attr('data-gamename')}`).toggle(500);
  });
};
