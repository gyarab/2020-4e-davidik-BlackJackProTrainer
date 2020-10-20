const suits = ["H", "D", "C", "S"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
let deck = new Deck(6);
let discardDeck = [];
deck.createDeck(suits, values);
deck.shuffle();
deck.shuffle();
var table = document.getElementById("table");
let player = new Player(1, 500);
let game = new Table();
game.addPlayers(5);
let pp = 0;
for (var p of game.players) {
  p.setPosition(pp+1)
  pp++;
}
game.dealHands();
//game.showPlayersCards();
