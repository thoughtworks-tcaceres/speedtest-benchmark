let gameRules = {
  '02': 'YOU: Choose someone to drink',
  '03': 'ME: You drink',
  '04': 'FLOOR: The last person to touch the floor drinks',
  '05': 'GUYS: Guys drink',
  '06': 'CHICKS: Girls drink',
  '07': 'HEAVEN: Raise your hand to heaven. The last person to do so drinks.',
  '08': 'MATE: Choose someone to be your mate. Any time you drink they drink',
  '09': 'RHYME: Say a word. The person to your right says a word that rhymes. The first person to fail drinks',
  '10': 'TEN: Choose a category of th ings. The person to your irght names something in that category. The first person to fail drinks.',
  '11': 'NEVER HAVE I EVER: Play never have I ever',
  '12': 'QUESTIONS: Ask someone A question. That person then asks someone else a question. The first person to fail drinks',
  '13': 'MAKE A RULE: Obey the new rule for the duration of the game',
  '14': "WATERFALL: Start drinking at the same time as the person to your left. Don't stop until they do."
};

function renderListOfPlayers(insertElement, playerNumber) {
  for (let i = 0; i < playerNumber; i++) {
    insertElement.innerHTML += `<div class = "player"> player${i}</div>`;
  }
}

function getRules(insertCardRule, insertCardImg, card) {
  insertCardImg.innerHTML = `<img class = "jpg" src = "${'__card___url'}">`;
  insertCardRule.innerHTML = `<div class = "cards">${gameRules[card.substring(0, 2)]}</div>`;
}

$(document).ready(function() {
  // theHandler();
});

// function theHandler() {
//   $('#kc2drawButton').on('click', function() {
//     console.log('this is clicked');
//     socket.emit('draw card button clicked', null);
//   });
// }

socket.on('kcdrawcard', (data) => {
  console.log('response recieved');
  $('.card-shown').html(`<img class="img-fluid my-0 mx-auto slit-in-vertical" src="/PNG/${data}.png"/>`);
  console.log("LOOK HERE",data.substr(0,2));
  console.log("LOOK HERE")
  $('#description').html(`${gameRules[data.substr(0,2)]}`)
});

socket.on('kcdealbutton', (data) => {
  $('#drawdeckarea').append(`<button id="kc2drawButton">Draw Card</button>`);
  $('#kc2drawButton').on('click', function() {
    console.log('this is clicked');
    socket.emit('draw card button clicked', null);
    $(this).remove();
  });
});

socket.on('initEndGame', ()=>{
  $('#drawdeckarea').append(`<button id = "initEndGame">End Game</button>`);

})

socket.on('kc player 1 on init', (numPlayers) => {
  // console.log(numPlayers);
  // let newHtml = ``;
  // for (let i = 0; i < numPlayers.length; i++) {
  //   newHtml += `<div class="col">
  //   <div class="card">
  //     <h2 class="my-0 mx-auto">p${i + 1}</h2>
  //     <h3 class="my-0 mx-auto" style="min-height:3em; max-height:3em">
  //       Your Turn: <strong><span id="p1-turn"></span></strong>
  //     </h3>
  //   </div>
  // </div>`;
  // }
  // console.log(newHtml);
  // console.log('creating html');
  // $('#list-of-players').html(newHtml);
  console.log('something html');
  $('#drawdeckarea').append(`<button id="kc2drawButton">Draw Card</button>`);
  $('#kc2drawButton').on('click', function() {
    console.log('this is clicked');
    socket.emit('draw card button clicked', null);
    $(this).remove();
  });
});

socket.on('init game', (data) => {
  console.log(data.playerArr.length);
  let newHtml = ``;
  for (let i = 0; i < data.playerArr.length; i++) {
    newHtml += `<div class="col">
    <div class="card">
      <h2 class="my-0 emailDisplay mx-auto">${data.idToEmail[data.playerArr[i]]}</h2>
      
    </div>
  </div>`;
  }
  console.log(newHtml);
  $('#list-of-players').html(newHtml);
});
