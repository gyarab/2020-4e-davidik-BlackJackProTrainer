class Dealer {
  constructor() {
this.cards = [];
  }
  draw(){
    this.cards.push(deck.draw());
    return this.cards;
  }
  removeDraw(){
    let x = this.cards.length;
    for (var i = 0; i < x; i++) {
      discardDeck.push(this.cards[this.cards.length-1])
      this.cards.pop();
    }
    return this.cards;
  }
}
class Table{
  constructor(){
this.players = [];
this.dealer = new Dealer();
this.playersCount = 0 ;
  }
addPlayer(){
  if (this.playersCount < 7) {
this.players.push(new Player(this.playersCount, 1000));
this.playersCount ++;
}
return this.players;
}
}
