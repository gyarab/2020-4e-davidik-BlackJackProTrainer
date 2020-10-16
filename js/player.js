
class Hand{
  constructor(){
this.cards = deck.deal();
this.count = 2;
  }
draw(){
  this.cards.push(deck.draw());
  this.count++;
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
draw(id){
this.hands[id].draw();
return this.hands;
}
removeHands(){
  for (let hand of this.hands) {
    let i = 0;
    while (hand.count > i) {
discardDeck.push(hand.cards[i]);
i++;
}
  }
let x = this.hands.length;
  for (let i = 0; i <x ; i++) {
    this.hands.pop();
  }
return this.hands;
}
showHands(){
  for (let hand of this.hands) {
    let i = 0;
    while (hand.count > i) {
      table.innerHTML +=
      "<img src="+hand.cards[i].imgurl+">";
      i++;
    }
  }
}
}
