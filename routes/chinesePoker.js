/*
This game doesn't use jokers; Usually three players;
Each player draw three cards and compare

From largest to smallest:
Three of a num：99999999999999
Flash three of a kind：999999999999
Three of a kind：9999999999
Flash：99999999
Pair：999999
High cards：9999
*/

const arrShape = ["D", "C", "H", "S"];
// D=diamond, C=club, H=heart, S=spade;
const arrNum = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14"
];

// construct a set of random 52 cards;
function pokerSet() {
  //random sorting function;
  function randomSort() {
    return Math.random() > 0.5 ? -1 : 1;
  }

  // making a set of cards;
  let pokerUnsort = [];
  let poker = [];
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
      pokerUnsort.push(arrNum[i] + arrShape[j]);
    }
  }

  // shuffle cards;
  return (poker = pokerUnsort.sort(randomSort));
}

// function to deal cards to players;
function deal(poker) {
  let threePokers = [];
  for (let i = 0; i < 3; i++) {
    let pokerEach = [];
    pokerEach.push(poker[i], poker[i + 14], poker[i + 28]);
    threePokers.push(
      pokerEach.sort(function(a, b) {
        return b - a;
      })
    );
  }
  return threePokers;
}

function getNum(str) {
  return str.slice(0, 2);
}

function getShape(str) {
  return str.slice(-1);
}

function countPoints(eachPlayer) {
  let card1 = eachPlayer[0];
  let card2 = eachPlayer[1];
  let card3 = eachPlayer[2];

  //Three of a num;
  if (getNum(card1) === getNum(card2) && getNum(card2) === getNum(card3)) {
    return 99999999999999 * getNum(card1);
  }
  //flash;
  else if (
    getNum(card1) - getNum(card2) === 1 &&
    getNum(card2) - getNum(card3) === 1
  ) {
    //with three of a kind;
    if (
      getShape(card1) === getShape(card2) &&
      getShape(card2) === getShape(card3)
    ) {
      return 999999999999 * getNum(card1);
    }
    //just a flash;
    else {
      return 99999999 * getNum(card1);
    }
  }
  //three of a kind;
  else if (
    getShape(card1) === getShape(card2) &&
    getShape(card2) === getShape(card3)
  ) {
    return (
      9999999999 * getNum(card1) +
      99999999 * getNum(card2) +
      999999 * getNum(card3)
    );
  }
  //pair;
  else if (getNum(card1) === getNum(card2) || getNum(card2) === getNum(card3)) {
    if (getNum(card1) === getNum(card2)) {
      return 999999 * getNum(card1) + 9999 * getNum(card3);
    } else {
      return 999999 * getNum(card3) + 9999 * getNum(card1);
    }
  }
  //high cards;
  else {
    return 9999 * getNumb(card1) + 99 * getNum(card2) + 9 * getNum(card3);
  }
}

function chickenDinner(threePokers) {
  let arr = [];
  let winner;
  arr.push(countPoints(threePokers[0]));
  arr.push(countPoints(threePokers[1]));
  arr.push(countPoints(threePokers[2]));

  arr.sort(function(a, b) {
    return b - a;
  });

  winner = arr[0];
  return winner;
}
