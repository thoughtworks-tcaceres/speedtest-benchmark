let socket = io.connect("http://localhost:1000/");

// //socket event listeners
// socket.on("directToGame", data => {
//   $("#lobby").slideUp(100);
//   console.log("MAKI CHAN");
//   console.log(`#gameFor${data.uniqueRoomName}`);
//   $(`#gameFor${data.gameId}`).toggle(1000);
// });

// // functions
// const handleDeleteRoomBtn = function() {
//   $("#deleteRoomBtn").on("click", function() {
//     socket.emit("deleteSpecificRoom");
//   });
// };

// // Loading jquery
// $(document).ready(function() {
//   roomJoiner();
//   dynamicRoom();
//   showRoomsForGame();
//   // userRedirection();
//   loadJoinGameBtn();
//   passcodeInputHandler();
//   handleCancelPasscode();
//   handleDeleteRoomBtn();
// });
