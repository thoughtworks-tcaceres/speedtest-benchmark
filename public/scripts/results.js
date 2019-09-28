$(document).ready(function() {
  $('#player-game-toolbar').hide();
  $('#player-game-type-toolbar').hide();
  clickPlayerGameTypeBtn();
  clickPlayerGameBtn();
});

const clickPlayerGameBtn = () => {
  $('#player-game').on('click', function() {
    $('#player-game-table').bootstrapTable('refresh');
    $('#player-game-toolbar').show();
    $('#player-game-type-toolbar').hide();
  });
};

const clickPlayerGameTypeBtn = () => {
  $('#player-game-type').on('click', function() {
    $('#player-game-type-table').bootstrapTable('refresh');
    $('#player-game-toolbar').hide();
    $('#player-game-type-toolbar').show();
  });
};
