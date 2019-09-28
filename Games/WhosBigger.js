const Deck = require('./Deck')
const Player = require('./Player')

class WhosBigger{
    constructor(sockets, gameRoomName){
        this.roomName = gameRoomName;
        this.playerPool = {};
        this.playerQueue = [];
    
        this.setupPlayers(sockets);
        this.setupPlayerQueue(this.playerPool)
        this.playerTurnNumber = 0;

        this.deck = new Deck();
        this.deck.newDeck();
        this.deck.shuffle();

        this.bestPlayer = null;

        console.log(this.playerQueue)
    }
    setupPlayers(sockets){
        

        for(let socket in sockets){
            this.playerPool[socket] = new Player(socket)

            }
        }
    setupPlayerQueue(){
        for(let player in this.playerPool){
            this.playerQueue.push(this.playerPool[player].id)
        }
    }
    
    
    //deal a card to a specific player and return value of card
    dealCard(playerID){
        const player = this.playerPool[playerID];
        player.drawCard(this.deck);
        return player.getHand()[player.getHand().length-1];
    }


    getCard(playerID){
        const player = this.playerPool[playerID];
        return player.getHand()[0];

    }
    getPlayers(){
        return this.playerPool;
    }

    evaluateWinner(){
        
        for(let player in playerPool){
            if(this.bestPlayer.getHand()[0] < player.getHand()[0]){
                this.bestPlayer = player;
            }
        }

        return this.bestPlayer;

    }

    iteratePlayer(){
        if(this.playerTurnNumber === this.playerQueue.length -1){
            this.playerTurnNumber = 0;
        }else{
            this.playerTurnNumber ++;
        }
        return this.playerPool[this.playerQueue[this.playerTurnNumber]]
    }


}

module.exports = WhosBigger