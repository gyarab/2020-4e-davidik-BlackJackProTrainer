let buttons;
buttons = document.getElementById("buttons");
function nextPlayer(i,pre) {
  i--;
  if (pre == 1 ) {
if (i==2) {
  i=1
}else if (i==4) {
  i=3
}
  }else {
    var hit = document.getElementById("hit");
  hit.remove();
  var stay = document.getElementById("stay");
stay.remove();
var split = document.getElementById("split");
split.remove();
var double = document.getElementById("double");
double.remove();
var insurance = document.getElementById("insurance");
insurance.remove();
  }
  buttons.innerHTML +=
    '<p id="hit"><button class="button" onclick="playerDraw(' + i + ','
    + (i + 1) +')">HIT</button></p>';
    buttons.innerHTML +=
      '<p id="stay"><button class="button" onclick="stay('+ (i + 1) +')">STAY</button></p>';
      buttons.innerHTML +=
        '<p id="split"><button class="button" onclick="">SPLIT</button></p>';
        buttons.innerHTML +=
          '<p id="double"><button class="button" onclick="">DOUBLE</button></p>';
          buttons.innerHTML +=
            '<p id="insurance"><button class="button" onclick="">INSURANCE</button></p>';

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
