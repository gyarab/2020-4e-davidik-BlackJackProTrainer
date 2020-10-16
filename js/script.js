let deck = new Deck(2);
deck.createDeck(suits, values);
deck.shuffle();
deck.shuffle()
class Hand{
  constructor(){
this.cards = deck.deal();
  }
}
class Player{
  constructor(id){
    this.id = id;
  }
}
var table = document.getElementById("table");
table.innerHTML +=
"<img src="+deck.deck[0].imgurl+">";
