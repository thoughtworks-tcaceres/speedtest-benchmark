// jQuery for handling game buttons

$(document).ready(function() {
  kingsCupRockHandler();
  kingsCupPaperHandler();
  kingsCupScissorHandler();
  kingsCupPlayAgainBtnHandler();
  kingsCupQuitGameBtnHandler();
});

const kingsCupRockHandler = function() {
  $('#kingsCupRock').on('click', function() {
    socket.emit('kingsCupSelection', 'rock');
  });
};

const kingsCupPaperHandler = function() {
  $('#kingsCupPaper').on('click', function() {
    socket.emit('kingsCupSelection', 'paper');
  });
};

const kingsCupScissorHandler = function() {
  $('#kingsCupScissor').on('click', function() {
    socket.emit('kingsCupSelection', 'scissor');
  });
};

const kingsCupPlayAgainBtnHandler = function() {
  $('#kingsCupPlayAgainBtn').on('click', function() {
    socket.emit('kingsCupPlayAgain');
  }); 
};

const kingsCupQuitGameBtnHandler = function() {
  $('#kingsCupQuitGameBtn').on('click', function() {
    socket.emit('kingsCupQuitAll')
  });
};

// Socket handlers

let kingsCupStatusElement = document.getElementById('kingsCupUserStatus');
let kingsCupBtnSection = document.getElementById('kingsCupRPSSelection');

socket.on('kingsCupSetUp', (data) => {
  
  kingsCupStatusElement.innerHTML = "";
  for (let user of data[0]) {
    kingsCupStatusElement.innerHTML += `<p>${user}</p>`;
  };
});

socket.on('kingsCupWaitForResponse', (data) => {
  kingsCupStatusElement.innerHTML = "";
  for (let id in data[0]) {
    if (data[0][id]) {
      kingsCupStatusElement.innerHTML += `<p style="color: green;">${id} is ready to battle!</p>`;
    } else {
      kingsCupStatusElement.innerHTML += `<p>${id}</p>`;
    };
  };
});

socket.on('kingsCupHideBtn', (data) => {
  $(`#kingsCupRPSSelection`).css('display', 'none');
  document.getElementById('kingsCupPlayField').innerHTML = `
    <p>You have selected ${data}</p>
    `;
});

socket.on('kingsCupShowResult', (data) => {
  if (data === 'draw') {
    kingsCupStatusElement.innerHTML = `<h1>This is a draw :S</h1>`;
  } else if (data === 'win') {
    kingsCupStatusElement.innerHTML = `<h1>You WON!!! XD</h1>`;
  } else if (data === 'loss') {
    kingsCupStatusElement.innerHTML = `<h1>You lose D:</h1>`;
  }
  $('#kingsCupAfterGameBtn').css('display', 'block');
});

socket.on('kingsCupResetGame', () => {
  $('#kingsCupAfterGameBtn').css('display', 'none');
  $('#kingsCupRPSSelection').css('display', 'block');
  document.getElementById('kingsCupPlayField').innerHTML = `
    <p>What are you gonna play?</p>
    `;
});

socket.on('kingsCupGoBackToLobby', (data) => {
  $('#gameForkingsCup').hide(100);
  $('#lobby').toggle(1000);
  logs.innerHTML = '<h1>Welcome to room ' + data[1] + '<h1>';
  for (let id of data[0]) {
    logs.innerHTML += `<p>${id}</p>`
  }
  $('#waitingMsg').css('display', 'none');
  $('#joinGameBtn').css('display', 'block');
});