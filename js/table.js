
class Table {
  constructor() {
    this.players = [];
    this.dealer = new Dealer();
    this.playersCount = 0;
  }
  addPlayer(id) {
    if (id<7) {
      if (this.playersCount > 6) {
      }
      else {
        var uniq = true;
      for (var player of this.players) {
      if (player.id == i) {
      uniq = false;
      }
      }
      if (uniq) {
        this.players.push(new Player(id, 1000));
        this.playersCount++;
      }}
      return this.players;
    }
    else {
      return "Choose id between 0 to 6";
    }
  }
  addPlayers(count) {
    if (this.playersCount > 6) {
    }
    else {
    for (var i = 0; i < count; i++) {
      var uniq = true;
for (var player of this.players) {
if (player.id == i) {
uniq = false;
}
}
if (uniq) {
  this.players.push(new Player(i, 1000));
  this.playersCount++;

}
    }}
    return this.players;
  }
  removePlayer(id) {
    this.players.splice(id, 1);
    this.playersCount --;
    return this.players;
  }
  removePlayers() {
    this.players.splice(0, 7);
    this.playersCount = 0;
    return this.players;
  }
  dealHands(){
    for (var player of this.players) {
      player.addHand();
    }
    return this.players;
  }
  showPlayersCards(){
    for (var player of this.players) {
player.showHands();
    }
    return this.players;
  }
  showDealerCards(){
    this.dealer.showCards();
    return this.dealer;
  }
  showDealerCard(id){
    this.dealer.showCard(id);
    return this.dealer;
  }
}
