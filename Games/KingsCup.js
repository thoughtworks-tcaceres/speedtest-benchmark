const Deck = require('./Deck');
const Player = require('./Player');

class KingsCup {
  constructor(sockets, gameRoomName) {
    this.endGame = false;
    this.roomName = gameRoomName;
    this.playerPool = sockets;

    this.playerTurnNumber = 0;
    this.deck = new Deck();
    this.deck.newDeck();
    this.deck.shuffle();

    this.bestPlayer = null;

    console.log(this.playerPool);
  }

  setupPlayers(sockets) {
    this.playerPool = Object.keys(sockets);
  }

  dealCard(playerID) {
    return this.deck.dealCard();
  }
  getPlayers() {
    return this.playerPool;
  }

  setEndGame(bool) {
    this.endGame = bool;
  }
  getEndGame() {
    return this.endGame;
  }
  iteratePlayer() {
    if (this.playerTurnNumber === this.playerPool.length - 1) {
      this.playerTurnNumber = 0;
    } else {
      this.playerTurnNumber++;
    }
    return this.playerPool[this.playerTurnNumber];
  }

  getDeck() {
    return this.deck;
  }
  startGame() {
    while (!this.getEndGame() && this.getDeck().getLength() > 0) {
      //get players turn
      //on player click
      //if they are player get new card
      //display to all
      //rotate player / set player = true in html
      //check deck size != 0
      //if deck size = 0

      //show cards to all players (broadcast to rooms)
      //

      this.iteratePlayer();

      if (this.getDeck().getLength() <= 0) this.setEndGame(true);
    }
  }
}

module.exports = KingsCup;
