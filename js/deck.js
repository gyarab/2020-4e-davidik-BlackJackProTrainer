class Card {
  constructor(suit, value, imgurl) {
    this.suit = suit;
    this.value = value;
    this.imgurl = imgurl;
  }
  getValue(){
    let cardValue;
    if ( this.value == "A") {
      cardValue = 11;
    }
    else if (this.value == "K" || this.value == "Q" || this.value == "J") {
      cardValue = 10;
    }else {
      cardValue = this.value
    }
    return cardValue;
  }
}
class Deck {
  constructor(size) {
    this.size = size
    this.deck = [];
  }
  createDeck(suits, values) {
    for (var i = 0; i < this.size; i++) {
      for (let suit of suits) {
        for (let value of values) {
          let imgurl = "PNG/" + value + suit + ".png"
          this.deck.push(new Card(suit, value, imgurl));
        }
      }
    }
    return this.deck;
  }
  shuffle() {
    let counter = this.deck.length,
      temp, i;
    while (counter) {
      i = Math.floor(Math.random() * counter--);
      temp = this.deck[counter];
      this.deck[counter] = this.deck[i];
      this.deck[i] = temp;
    }
    return this.deck;
  }
  deal(x) {
    let hand = [];
    while (hand.length < x) {
      hand.push(this.deck.pop());
    }
    return hand;
  }
  draw() {
    let draw = this.deck.pop();
    return draw;
  }
  showDeck() {
    for (var card of this.deck) {
      table.innerHTML +=
        "<img src=" + card.imgurl + ">";
    }
  }

}
