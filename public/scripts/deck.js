class Deck {

    constructor() {
        cardNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        suits = ['S', 'H', 'C', 'D'];
        deck = [];
        ``
    }
    getDeck() {
        return deck;
    }
    newDeck(includeJokers) {


        for (let suit of suits) {
            for (let cardNumber of cardNumbers) {
                deck.push(cardNumber + suit);
            }
        }
        if (includeJokers) {
            deck.push("JK");
            deck.push("JK");
        }

    }


    shuffle() {
        var currentIndex = deck.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = deck[currentIndex];
            deck[currentIndex] = deck[randomIndex];
            deck[randomIndex] = temporaryValue;
        }


    }




}
//test code for shuffling and creating a deck
let a = new Deck();
a.newDeck(true);
a.shuffle();
console.log(a.getDeck());