class Hand {
  constructor(x) {
    this.cards = deck.deal(x);
    this.count = 2;
    this.score = 0;
    this.ace = 0;
  }
  draw() {
    this.cards.push(deck.draw());
    this.count++;
  }
  getScore(idP,idH,idC) {
    let len = this.cards.length;
    let toScore = this.cards[idC].value;
    if (toScore == "A") {
      toScore = 11;
      this.ace ++;
    } else if (toScore == "K" || toScore == "Q" || toScore == "J") {
      toScore = 10;
    }
    this.score += toScore;
    if (this.score > 21 && this.ace >0) {
    this.ace --;
    this.score -= 10;
    }
document.getElementById('s'+idP).innerHTML = this.score;
return this.score;
  }
}
class Player {
  constructor(id, balance) {
    this.id = id;
    this.hands = [];
    this.balance = balance;
    this.position = -1;
  }
  setPosition(id) {
    this.position = id;
    return this.position;
  }
  addHand(x) {
    this.hands.push(new Hand(x));
    return this.hands;
  }
  draw(id) {
    this.hands[id].draw();
    return this.hands;
  }
  removeHands() {
    for (let hand of this.hands) {
      let i = 0;
      while (hand.count > i) {
        discardDeck.push(hand.cards[i]);
        i++;
      }
    }
    let x = this.hands.length;
    for (let i = 0; i < x; i++) {
      this.hands.pop();
    }
    return this.hands;
  }
  showHands() {
    for (let hand of this.hands) {
      let i = 0;
      while (hand.count > i) {
        table.innerHTML +=
          "<img src=" + hand.cards[i].imgurl + ">";
        i++;
      }
    }
  }
  showCard(id, idR, idH, first) {
    var deck = document.getElementById("deck");
    if (first) {
      var cardId = this.hands[idH].cards[id].suit + this.hands[idH].cards[id].value;
      deck.innerHTML +=
        "<img id='" + cardId + "' class ='cards r" + idR + "' src=" + this.hands[idH].cards[id].imgurl + ">";
    } else {
      deck.innerHTML +=
        "<img id='dealerCard' class ='cards r" + idR + "' src=" + this.hands[idH].cards[id].imgurl + ">";
    }

    return this.cards;
  }
}
class Dealer {
  constructor() {
    this.cards = [];
    this.count = 0;
    this.score = 0;
    this.ace = 0;
  }
  getScore() {
    let len = this.cards.length;
    let toScore = this.cards[len - 1].value;
    if (toScore == "A") {
      toScore = 11;
      this.ace ++;
    } else if (toScore == "K" || toScore == "Q" || toScore == "J") {
      toScore = 10;
    }
    this.score += toScore;
    if (this.score > 21 && this.ace >0) {
    this.ace --;
    this.score -= 10;
    }
    document.getElementById("s6").innerHTML = this.score;
return this.score;
  }
  draw() {
    this.cards.push(deck.draw());
    this.count++;

    return this.cards;
  }
  removeDraw() {
    let x = this.cards.length;
    for (var i = 0; i < x; i++) {
      discardDeck.push(this.cards[this.cards.length - 1])
      this.cards.pop();
    }
    this.count = 0;
    return this.cards;
  }
  showCards() {
    for (var i = 0; i < this.cards.length; i++) {
      table.innerHTML +=
        "<img id='dealerCard' class ='cards' src=" + this.cards[i].imgurl + ">";
    }
    return this.cards;
  }
  showCard(id) {
    var deck = document.getElementById("deck");
    deck.innerHTML +=
      "<img id='dealerCard' class ='cards' src=" + this.cards[id].imgurl + ">";
    //  var elem = document.getElementById("dealerCard");
    return this.cards;
  }
}
