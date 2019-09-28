let socket = io.connect("http://localhost:8080/");
let gameRoomIdUserIsTryingToJoinWithPasscode;

//socket event listeners
socket.on("directToGame", data => {
  $("#lobby").slideUp(100);
  console.log("MAKI CHAN");
  console.log(`#gameFor${data.uniqueRoomName}`);
  $(`#gameFor${data.gameId}`).toggle(1000);
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
  $("#deleteRoomBtn").on("click", function() {
    socket.emit("deleteSpecificRoom");
  });
};

const handleCancelPasscode = function() {
  $("#passcodeCancel").on("click", function() {
    $("#passcodeForRoom").hide();
    $("#lobby").toggle(500);
  });
};

const loadJoinGameBtn = function() {
  $("#joinGameBtn").on("click", function() {
    socket.emit("handleJoinGameEvent");
  });
};

const roomJoiner = function() {
  $(".room").on("click", function() {
    // IMPORTANT //
    // const enteredPasscode = prompt('This room is locked. Enter passcode here')
    // console.log(enteredPasscode)
    // console.log('ENDING MAS')
    // return;
    //////////////////////

    socket.emit("checkPasscode", {
      roomId: $(this).attr("data-roomid"),
      gameId: $(this).attr("data-gameid")
    });
  });
};

const passcodeInputHandler = function() {
  $("#passcodeForm").on("submit", function(event) {
    event.preventDefault();
    $.ajax("/games/insertPasscode", {
      type: "POST",
      data: $(this).serialize(),
      dataType: "text"
    })
      .done(function(data) {
        // console.log('successful passcode Insert!', data)

        socket.emit("validatePasscode", [gameRoomIdUserIsTryingToJoinWithPasscode, data]);
        // console.log(gameRoomIdUserIsTryingToJoinWithPasscode);
      })
      .fail(function(error) {
        console.log("Error at passcode submission: ", error);
      });
  });
};

const dynamicRoom = function() {
  $(".roomCreator").on("submit", function(event) {
    event.preventDefault();
    const gameId = $(this).attr("data-gamename");
    $.ajax("/games/createRoom", {
      type: "POST",
      data: $(this).serialize(),
      dataType: "text"
    })
      .done(function(data) {
        console.log("successful creation");
        socket.emit("createNewRoom", {
          roomId: data,
          gameId: gameId,
          passcode: $(`#chosenPasscodeFor${gameId}`).val()
        });
      })
      .fail(function(error) {
        console.log("Ajax failed: ", error);
      });
  });
};

const showRoomsForGame = function() {
  $(".game").on("click", function(event) {
    $(".roomList").hide();
    $(`#${$(this).attr("data-gamename")}`).toggle(500);
  });
};
