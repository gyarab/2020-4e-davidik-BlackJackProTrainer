const suits = ["H", "D", "C", "S"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
let deck = new Deck(6);
let discardDeck = [];
var i = 0;
deck.createDeck(suits, values);
deck.shuffle();
deck.shuffle();
var table = document.getElementById("table");
let player = new Player(1, 500);
let game = new Table();
game.addPlayers(7);
game.dealHands();
//game.showPlayersCards();
function myMove() {
  var toVw = 1 / document.documentElement.clientWidth *100;
  console.log(toVw);
  var next = game.dealer.count*3.5
  game.dealer.draw();
  var count = game.dealer.count-1;
  game.showDealerCard(count);
  var elem = document.getElementById("dealerCard");
  var cor = getElementTopLeft("deck");
  var pos = cor.left;
  var pos2 = cor.top ;
  var cor2 = getElementTopLeft("pole");
  var end = cor2.left;
  var end2 = cor2.top ;
  var ratio =Math.abs(end2 - pos2) / Math.abs(end - pos);
  var id = setInterval(frame, 5);
  elem.id = "placed";
  function frame() {
    if (pos <= end) {
    if (pos == end) {
      clearInterval(id);
    } else {
      pos++;
      pos2 = pos2 + ratio;
      elem.style.top = pos2*toVw + "vw";
      elem.style.left = pos*toVw + "vw";
    }} else {
      if (pos == end) {
        clearInterval(id);
      } else {
        pos--;
        pos2 = pos2 + ratio;
        elem.style.top = (pos2*toVw) + "vw";
        elem.style.left = (pos*toVw+next) + "vw";
      }
    }
  }
}
function getElementTopLeft(id) {

    var ele = document.getElementById(id);
    var top = 0;
    var left = 0;

    while(ele.tagName != "BODY") {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
    }

    return { top: top, left: left };

}
