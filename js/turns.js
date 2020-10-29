let buttons;
buttons = document.getElementById("buttons");

function nextPlayer(i, pre) {
  i--;
  if (pre == 1) {
    if (i == 2) {
      i = 1
    } else if (i == 4) {
      i = 3
    }
  } else if (pre==2) {
    var hit = document.getElementById("hit");
    hit.remove();
    var stay = document.getElementById("stay");
    stay.remove();
    var double = document.getElementById("double");
    double.remove();
  }else
  {
    var hit = document.getElementById("hit");
    hit.remove();
    var stay = document.getElementById("stay");
    stay.remove();
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
    '<p id="double"><button class="button" onclick="">DOUBLE</button></p>';
  buttons.innerHTML +=
    '<p id="insurance"><button class="button" onclick="">INSURANCE</button></p>';

}

function nextSplit(i, pre,count) {
  buttons.innerHTML = "";
  buttons.innerHTML +=
    '<p id="hit"><button class="button" onclick="playerDrawSplit(' + i + ',' +
    (i + 1) + ',' + count + ')">HIT</button></p>';
  buttons.innerHTML +=
    '<p id="stay"><button class="button" onclick="staySplit(' + (i)+ ',' + (i + 1)+ ','
    +(count) +')">STAY</button></p>';
  buttons.innerHTML +=
    '<p id="double"><button class="button" onclick="">DOUBLE</button></p>';

}

function nextTurn() {

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
    '<p><button id="start" class="button" onclick="StartGame()">Start Game</button></p>';

}
