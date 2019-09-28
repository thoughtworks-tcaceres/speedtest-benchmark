// NOTE: Game name MUST NOT contain "-", or server will crash

let game_data = {
  
  whosbigger: {
    max_players: 3,
    min_players: 2,
    room_data: {
      woodpecker: {
        passcode: null,
        joinedPlayers: []
      },
      dragon: {
        passcode: null,
        joinedPlayers: []
      },
      hippo: {
        passcode: 'aaa',
        joinedPlayers: []
      }
    }
  },
  kingsCup: {
    max_players: 10,
    min_players: 2,
    room_data: {
      woofpecker: {
        passcode: null,
        joinedPlayers: []
      }
    }
  },
  goofy: {
    max_players: 8,
    min_players: 2,
    room_data: {}
  },
  blackjack: {
    max_players: 8,
    min_players: 2,
    room_data: {}
  },
  kingsCup2: {
    max_players: 10,
    min_players: 2,
    room_data: {
      woodpecker: {
        passcode: null,
        joinedPlayers: []
      }
    }
  }
};

module.exports = game_data;
