
class Hand{
  constructor(){
this.cards = deck.deal();
  }
}
class Player{
  constructor(id, balance){
    this.id = id;
    this.hands= [];
    this.balance = balance;
  }
addHand(){
this.hands.push(new Hand());
return this.hands;
}
removeHands(){
  for (var hand of this.hands) {
discardDeck.push(hand.cards[0]);
discardDeck.push(hand.cards[1]);
  }
var x = this.hands.length;
  for (var i = 0; i <x ; i++) {
    this.hands.pop();
  }
return this.hands;
}
showHands(){
  for (var hand of this.hands) {
    table.innerHTML +=
    "<img src="+hand.cards[0].imgurl+">";
    table.innerHTML +=
    "<img src="+hand.cards[1].imgurl+">";
  }
}
}
const suits = ["H", "D", "C", "S"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
let deck = new Deck(6);
let discardDeck = [];
var i = 0;
deck.createDeck(suits, values);
deck.shuffle();
deck.shuffle();
var table = document.getElementById("table");
let player = new Player(1,500);
player.addHand();
//player.showHands();
//deck.showDeck();
