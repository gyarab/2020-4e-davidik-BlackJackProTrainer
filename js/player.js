//Třída ruka
class Hand {
  constructor(x) {
    // ruka má svoje karty
    this.cards = deck.deal(x);
    this.count = 2;
    this.score = 0;
    this.ace = 0;
  }
  draw() {
    this.cards.push(deck.draw());
    this.count++;
  }
  //funkce pro získání momentálního skóre hráče
  getScore(idP, idH, idC) {
    let len = this.cards.length;
    let toScore = this.cards[idC].value;
    if (toScore == "A") {
      toScore = 11;
      this.ace++;
    } else if (toScore == "K" || toScore == "Q" || toScore == "J") {
      toScore = 10;
    }
    this.score += toScore;
    if (this.score > 21 && this.ace > 0) {
      this.ace--;
      this.score -= 10;
    }
    document.getElementById('s' + idP).innerHTML = this.score;
    return this.score;
  }
  //funkce pro získání momentálního skóre hráče po splitu
  getSplitScore(idP, idH, idC) {
    let len = this.cards.length;
    let toScore = this.cards[idC].value;
    if (toScore == "A") {
      toScore = 11;
      this.ace++;
    } else if (toScore == "K" || toScore == "Q" || toScore == "J") {
      toScore = 10;
    }
    this.score += toScore;
    if (this.score > 21 && this.ace > 0) {
      this.ace--;
      this.score -= 10;
    }
    document.getElementById('ss' + idP).innerHTML = this.score;
    return this.score;
  }
}
//třída hráč
class Player {
  constructor(id, balance) {
    this.id = id;
    //hráč má svoje ruce
    this.hands = [];
    this.handCount = 0;
    this.balance = balance;
    this.bet = 0;
    this.betSplit = 0;
    this.position = -1;
    this.insuranceBet = 0;
    this.insurance = false;
    this.surrender = false;
  }
  setPosition(id) {
    this.position = id;
    return this.position;
  }
  addHand(x) {
    this.hands.push(new Hand(x));
    this.handCount++;
    return this.hands;
  }
  draw(id) {
    this.hands[id].draw();
    return this.hands;
  }
  //funkce pro odstranění ruk
  removeHands() {
    this.handCount = 0;
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
  //ukaže kartu
  showCard(id, idR, idH, first) {
    var deck = document.getElementById("deck");
    if (first) {
      var cardId = this.hands[idH].cards[id].suit + this.hands[idH].cards[id].value + idR + id;
      deck.innerHTML +=
        "<img id='" + cardId + "' class ='cards r" + idR + "' src=" + this.hands[idH].cards[id].imgurl + ">";
    } else {
      deck.innerHTML +=
        "<img id='dealerCard' class ='cards r" + idR + "' src=" + this.hands[idH].cards[id].imgurl + ">";
    }

    return this.cards;
  }
}
// třída dealer
class Dealer {
  constructor() {
    //dealer nemá ruce, pouze karty(v podstatě má jednu ruku, ale tu není třeba definovat)
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
      this.ace++;
    } else if (toScore == "K" || toScore == "Q" || toScore == "J") {
      toScore = 10;
    }
    this.score += toScore;
    if (this.score > 21 && this.ace > 0) {
      this.ace--;
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
  //obecná funkce pro odstranění karet
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
  //ukáže kartu
  showCard(id) {
    var deck = document.getElementById("deck");
    deck.innerHTML +=
      "<img id='dealerCard' class ='cards' src=" + this.cards[id].imgurl + ">";
    //  var elem = document.getElementById("dealerCard");
    return this.cards;
  }
}
