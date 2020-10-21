function nextPlayer() {

}
function nextTurn() {

}
function players(x) {
  var buttons;
  buttons = document.getElementById("buttons");
  if (isNaN(x) || x < 1 || x > 5) {} else {
    game.addPlayers(x);
    let pp = 0;
    for (var p of game.players) {
      p.setPosition(pp + 1)
      pp++;
    }
    game.dealHands();
    buttons.innerHTML = "";
    buttons.innerHTML +=
      '<p><button class="button" onclick="dealerDeal()">Dealer Deal</button></p>';
    buttons.innerHTML +=
      '<p><button class="button" onclick="StartGame()">Start Game</button></p>';
    for (var i = 0; i < x; i++) {
      buttons.innerHTML +=
        '<p><button class="button" onclick="playerDraw(' + i + ',' + (i + 1) + ')">Player' + (i + 1) + ' Draw</button></p>';
    }
  }
}
