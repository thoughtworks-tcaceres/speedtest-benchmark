$(document).ready(function() {
  let socket = io.connect("http://localhost:80");

  // socket event
  socket.on("test 1 data", data => {
    console.log("test 1 data: ", data);
  });

  socket.on("test 2 data", data => {
    console.log("test 2 data: ", data);
  });

  // click event
  $("#test1").on("click", () => {
    for (let i = 1; i <= 1000; i++) {
      socket.emit("test 1 click", i);
    }
  });

  $("#test2").on("click", () => {
    for (let i = 1; i <= 1; i++) {
      socket.emit("test 2 click", i);
    }
  });
});
