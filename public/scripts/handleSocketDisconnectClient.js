socket.on('forceDisplayReset', (data) => {
  $(`#gameFor${data}`).hide(500);
  $('#lobby').css('display', 'block');
  logs.innerHTML = '<h1><br><br><h1>';
  $('#waitingMsg').css('display', 'none');
  $('#joinGameBtn').css('display', 'none');
});

socket.on('forceRefreshGamesPage', () => {
  window.location.href = '/games';
});