class Player{
    constructor(socketID){
        this.hand = [];
        this.id = socketID;
        this.isWinner = false;
    }
    drawCard(deck){
        const cardDrawn = deck.dealCard();
       this.hand.push(cardDrawn);
       return cardDrawn;
       
    }

    getHand(){
        return this.hand;
    }
    setWinner(isWinner){
        this.isWinner = isWinner;
    }
    getIsWinner(){
        return this.isWinner;
    }
    

}

module.exports = Player;