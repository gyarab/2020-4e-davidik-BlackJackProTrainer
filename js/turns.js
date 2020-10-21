let buttons;
buttons = document.getElementById("buttons");
function nextPlayer(i,pre) {
  i--;
  if (pre == 1 ) {

  }else {
    var hit = document.getElementById("hit");
  hit.remove();
  }
  buttons.innerHTML +=
    '<p id="hit"><button class="button" onclick="playerDraw(' + i + ',' + (i + 1) +')">HIT</button></p>';
}
function nextTurn() {

}
function players(x) {
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
  }
}
