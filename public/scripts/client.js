$(document).ready(function() {
  let socket = io.connect("http://localhost:80");

  const test = {
    test1: {},
    test2: {},
    test3: {}
  };

  let i = 1;
  let j = 1;
  let k = 1;

  // socket event
  socket.on("test 1 data", data => {
    test.test1[i].end = new Date().getTime();
    test.test1[i].total = test.test1[i].end - test.test1[i].start;
    i++;
    console.log("test 1 data: ", data);
  });

  socket.on("test 2 data", data => {
    test.test2[j].end = new Date().getTime();
    test.test2[j].total = test.test2[j].end - test.test2[j].start;
    j++;
    console.log("test 2 data: ", data);
  });

  // click event
  $("#test1").on("click", () => {
    test.test1[i] = {};
    test.test1[i].start = new Date().getTime();
    socket.emit("test 1 click", i);
  });

  $("#test2").on("click", () => {
    test.test2[j] = {};
    test.test2[j].start = new Date().getTime();
    socket.emit("test 2 click", j);
  });

  $("#test3").on("click", () => {
    test.test3[k] = {};
    test.test3[k].start = new Date().getTime();
    $.ajax({
      url: "/api/query",
      method: "GET",
      data: {
        id: k
      }
    })
      .done(data => {
        test.test3[k].end = new Date().getTime();
        test.test3[k].total = test.test3[k].end - test.test3[k].start;
        console.log(data);
      })
      .fail(err => console.log(err))
      .always(() => k++);
  });

  $("#results").on("click", () => {
    console.table(test);
  });
});
