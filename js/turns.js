let buttons;
buttons = document.getElementById("buttons");
let hitButt;
let stayButt;
let splitButt;
let insuranceButt;
let doubleButt;

function hideBorderScore() {
  document.getElementById("s1").style.border = "";
  document.getElementById("s2").style.border = "";
  document.getElementById("s3").style.border = "";
  document.getElementById("s4").style.border = "";
  document.getElementById("s5").style.border = "";
  document.getElementById("ss1").style.border = "";
  document.getElementById("ss2").style.border = "";
  document.getElementById("ss3").style.border = "";
  document.getElementById("ss4").style.border = "";
  document.getElementById("ss5").style.border = "";
}
function nextPlayer(i, pre) {
  hideBorderScore();
  document.getElementById("s"+(i)).style.border = "0.5vw solid grey";
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
    '<p id="double"><button class="button" onclick="double(' + i+ ',' + 0 + ')">DOUBLE</button></p>';
  buttons.innerHTML +=
    '<p id="insurance"><button class="button" onclick="">INSURANCE</button></p>';
  hitButt = document.getElementById("hit").querySelector(".button");
  stayButt = document.getElementById("stay").querySelector(".button");
  splitButt = document.getElementById("split").querySelector(".button");
  insuranceButt = document.getElementById("insurance").querySelector(".button");
  doubleButt = document.getElementById("double").querySelector(".button");
  //
  let playerHand = game.players[i].hands[0];
    if (playerHand.cards[0].value == "A" || playerHand.cards[1].value == "A") {
  if (playerHand.cards[0].value == playerHand.cards[1].value) {

      perfectBasicStrategy(playerHand.score,true,true,dT,playerHand.count);
  }else {

      perfectBasicStrategy(playerHand.score,true,false,dT,playerHand.count);
  }
  }else if (playerHand.cards[0].value == playerHand.cards[1].value) {

      perfectBasicStrategy(playerHand.score,false,true,dT,playerHand.count);
  }else {

      perfectBasicStrategy(playerHand.score,false,false,dT,playerHand.count);
  }
  if (playerHand.cards[0].value == "J" ||playerHand.cards[0].value == "Q" || playerHand.cards[0].value == "K"|| playerHand.cards[0].value == 10) {
    if (playerHand.cards[1].value == "J" ||playerHand.cards[1].value == "Q" || playerHand.cards[1].value == "K"|| playerHand.cards[1].value == 10) {
      perfectBasicStrategy(playerHand.score,false,true,dT,playerHand.count);
    }
  }

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
  if (pre == 4) {
    buttons.innerHTML +=
      '<p id="hit"><button class="button" onclick="playerDrawSplit(' + i + ',' +
      (i + 1) + ',' + count + ',' + 2 + ')">HIT</button></p>';
    buttons.innerHTML +=
      '<p id="stay"><button class="button" onclick="staySplit(' + (i) + ',' + (i + 1) + ',' +
      (count) + ')">STAY</button></p>';
      hitButt = document.getElementById("hit").querySelector(".button");
      stayButt = document.getElementById("stay").querySelector(".button");
  }else {
    buttons.innerHTML +=
      '<p id="hit"><button class="button" onclick="playerDrawSplit(' + i + ',' +
      (i + 1) + ',' + count + ')">HIT</button></p>';
    buttons.innerHTML +=
      '<p id="stay"><button class="button" onclick="staySplit(' + (i) + ',' + (i + 1) + ',' +
      (count) + ')">STAY</button></p>';
    buttons.innerHTML +=
      '<p id="double"><button class="button" onclick="double(' + i+ ',' + 1+ ',' + count + ')">DOUBLE</button></p>';
      hitButt = document.getElementById("hit").querySelector(".button");
      stayButt = document.getElementById("stay").querySelector(".button");
      doubleButt = document.getElementById("double").querySelector(".button");
  }
    let playerHand = game.players[i].hands[count];

perfectBasicStrategy(playerHand.score,0,0,dT,game.players[i].hands[0].count);
    if (playerHand.count > 3) {
      if (playerHand.cards[1].value == "ACE") {
perfectBasicStrategy(playerHand.score,true,false,dT,game.players[i].hands[count].count);
    }
          }
if (pre==1) {
staySplit(i,(i+1),count);
}
if(pre == 2){
  hideBorderScore();
  document.getElementById("s"+(i+1)).style.border = "0.5vw solid grey";
doubleButt.disabled = false;
}
if (pre == 3) {
staySplit(i,(i+1),count, true);
}
if(pre == 4){
  hideBorderScore();
  document.getElementById("s"+(i+1)).style.border = "0.5vw solid grey";
}
else if(pre == 0){
doubleButt.disabled = true;
}
}
function nextTurn(x) {
  if (x == 0) {
    hideBorderScore();
    dealerDeal(1);
  } else {
     game.dealer.removeDraw();
     game.removeHands();
     game.dealHands(2);
    buttons.innerHTML = "";
    if (deck.length < 40) {

      document.getElementById("cl").innerHTML="Need Shuffle";
      buttons.innerHTML +=
        '<p><button id="start" class="button" onclick="StartGame(1)">Shuffle Cards</button></p>';
    }else {
      buttons.innerHTML +=
        '<p><button id="start" class="button" onclick="StartGame(1)">Start Game</button></p>';
    }

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
    if (player.handCount ==2) {
     if (player.hands[1].score > game.dealer.score && player.hands[1].score < 22) {
      player.balance += player.betSplit * 2;
      ring.innerHTML += "-W";
    }else if (game.dealer.score > 21 && player.hands[1].score < 22) {
      player.balance += player.betSplit * 2;
      ring.innerHTML += "-W";
    } else if (player.hands[1].score == game.dealer.score && player.hands[1].score < 22) {
      player.balance += player.betSplit;
      ring.innerHTML += "-D";
    }else {
      ring.innerHTML += "-L";
    }}

    let balance = document.getElementById("b" + player.position);
    balance.innerHTML = player.balance;
    player.bet = 0;
    player.betSplit = 0;
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
    '<p><button id="start" class="button" onclick="makeBet(0)">Start Game</button></p>';

}

function double(id,pre,handCount) {
  player = game.players[id];
  let balance = document.getElementById("b" + player.position);
  player.balance -= 20;
  if (pre == 0) {
    player.bet += 20;
    playerDraw(id,id+1,1);
  }else {
    player.betSplit += 20;
    playerDrawSplit(id,id+1,handCount,1);
  }
  balance.innerHTML = player.balance;
}
