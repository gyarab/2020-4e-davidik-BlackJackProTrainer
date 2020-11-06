let buttons;
buttons = document.getElementById("buttons");
let hitButt;
let stayButt;
let splitButt;
let insuranceButt;
let doubleButt;

function nextPlayer(i, pre) {
  i--;
  if (pre == 1) {
    if (i == 2) {
      i = 1
    } else if (i == 4) {
      i = 3
    }
  } else if (pre == 2) {
    var hit = document.getElementById("hit");
    hit.remove();
    var staynf = document.getElementById("stay");
    staynf.remove();
    var double = document.getElementById("double");
    double.remove();
  } else {
    var hit = document.getElementById("hit");
    hit.remove();
    var staynf = document.getElementById("stay");
    staynf.remove();
    var split = document.getElementById("split");
    split.remove();
    var double = document.getElementById("double");
    double.remove();
    var insurance = document.getElementById("insurance");
    insurance.remove();
  }
  buttons.innerHTML +=
    '<p id="hit"><button class="button" onclick="playerDraw(' + i + ',' +
    (i + 1) + ')">HIT</button></p>';
  buttons.innerHTML +=
    '<p id="stay"><button class="button" onclick="stay(' + (i + 1) + ',' +
    (0) + ')">STAY</button></p>';
  buttons.innerHTML +=
    '<p id="split"><button class="button" onclick="split(' + i + ',' +
    (i + 1) + ')">SPLIT</button></p>';
  buttons.innerHTML +=
    '<p id="double"><button class="button" onclick="double(' + i + ')">DOUBLE</button></p>';
  buttons.innerHTML +=
    '<p id="insurance"><button class="button" onclick="">INSURANCE</button></p>';
  hitButt = document.getElementById("hit").querySelector(".button");
  stayButt = document.getElementById("stay").querySelector(".button");
  splitButt = document.getElementById("split").querySelector(".button");
  insuranceButt = document.getElementById("insurance").querySelector(".button");
  doubleButt = document.getElementById("double").querySelector(".button");

  if (game.players[i].hands[0].cards[0].getValue() == game.players[i].hands[0].cards[1].getValue()) {
  splitButt.disabled = false;
  } else {
      splitButt.disabled = true;
  }
  if (pre == -1) {
    splitButt.disabled = true;
    insuranceButt.disabled = true;
    doubleButt.disabled = true;
  }
  if (game.players[i].hands[0].score == 21&& game.players[i].hands[0].count == 2) {
  stayButt.remove();
  splitButt.remove();
  insuranceButt.remove();
  doubleButt.remove();
  hitButt.innerHTML = "BLACKJACK!"
}
}

function nextSplit(i, pre, count) {
  buttons.innerHTML = "";
  buttons.innerHTML +=
    '<p id="hit"><button class="button" onclick="playerDrawSplit(' + i + ',' +
    (i + 1) + ',' + count + ')">HIT</button></p>';
  buttons.innerHTML +=
    '<p id="stay"><button class="button" onclick="staySplit(' + (i) + ',' + (i + 1) + ',' +
    (count) + ')">STAY</button></p>';
  buttons.innerHTML +=
    '<p id="double"><button class="button" onclick="double(' + i + ')">DOUBLE</button></p>';
if (pre==1) {
staySplit(i,(i+1),count);
}
}

function nextTurn(x) {
  if (x == 0) {
    dealerDeal(1);
  } else {
     game.dealer.removeDraw();
     game.removeHands();
     game.dealHands(2);
    buttons.innerHTML = "";
    buttons.innerHTML +=
      '<p><button id="start" class="button" onclick="StartGame(1)">Start Game</button></p>';
  }

}

function win() {
  for (var player of game.players) {
    let ring = document.getElementById("r" + player.position);
    if (player.hands[0].score == 21 && player.hands[0].count == 2) {
      player.balance += player.bet * 1.5;
      ring.innerHTML = "B";
    }
  else if (player.hands[0].score > game.dealer.score && player.hands[0].score < 22) {
      player.balance += player.bet * 2;
      ring.innerHTML = "W";
    }else if (game.dealer.score > 21 && player.hands[0].score < 22) {
      player.balance += player.bet * 2;
      ring.innerHTML = "W";
    } else if (player.hands[0].score == game.dealer.score && player.hands[0].score < 22) {
      player.balance += player.bet;
      ring.innerHTML = "D";
    }else {
      ring.innerHTML = "L";
    }
    let balance = document.getElementById("b" + player.position);
    balance.innerHTML = player.balance;
    player.bet = 0;
  }
}

function players(x) {
  game.addPlayers(x);
  let pp = 0;
  for (var p of game.players) {
    p.setPosition(pp + 1)
    pp++;
    let balance = document.getElementById("b" + p.position);
    balance.innerHTML = p.balance;
  }
  game.dealHands(2);
  buttons.innerHTML = "";
  buttons.innerHTML +=
    '<p><button id="start" class="button" onclick="StartGame(0)">Start Game</button></p>';

}

function double(id) {
  player = game.players[id];
  let balance = document.getElementById("b" + player.position);
  player.balance -= 25;
  player.bet += 25;
  balance.innerHTML = player.balance;
  doubleButt.disabled = true;
  splitButt.disabled = true;
  insuranceButt.disabled = true;
}
