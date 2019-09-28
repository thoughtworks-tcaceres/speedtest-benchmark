class Deck {

    constructor() {
        //cards will be concatenated with the suit. eg: 143 = ace of spades, 42 = 4 of hearts
        this.cardNumbers = ['14', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
        this.suits = ['3', '2', '0', '1'];
        this.deck = [];
        
    }
    
    newDeck(includeJokers, number) {


        for (let suit of this.suits) {
            for (let cardNumber of this.cardNumbers) {
                this.deck.push(cardNumber + suit);
                //console.log(suit);
            }
        }
        if (includeJokers) {
            for(var i = 0; i < number; i++){
                this.deck.push("JK");
            }
            
            
            
        }

    }


    shuffle() {
        var currentIndex = this.deck.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = this.deck[currentIndex];
		this.deck[currentIndex] = this.deck[randomIndex];
		this.deck[randomIndex] = temporaryValue;
	}

	return this.deck;

    }

    dealCard(){
       
        return this.deck.pop();
    }


    getLength(){
        return this.deck.length;
    }

}
//test code for shuffling and creating a deck
// let test = new Deck();
// test.newDeck(false);
// test.shuffle();
// console.log(test);

module.exports = Deck