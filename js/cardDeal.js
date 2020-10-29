let toVw = 1 / document.documentElement.clientWidth * 100;
let toPx = document.documentElement.clientWidth / 100;

function dealerDeal() {
  var next = game.dealer.count * 3.7
  game.dealer.draw();
  var count = game.dealer.count - 1;
  game.showDealerCard(count);
  var elem = document.getElementById("dealerCard");
  var cor = getElementTopLeft("deck");
  var pos = cor.left;
  var pos2 = cor.top;
  var cor2 = getElementTopLeft("pole");
  var end = cor2.left + toPx * next + toPx / 2;
  var end2 = cor2.top + toPx / 2;
  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2) * 2;
  var id = setInterval(frame, 3);
  elem.id = "placed";

  function frame() {
    if (pos <= end) {
      if (pos2 >= Math.floor(end2)) {
        if (game.playersCount == 5) {
          nextPlayer(4, 1);
        } else if (game.playersCount == 3) {
          nextPlayer(3, 1);
        } else {
          nextPlayer(game.playersCount, 1);
        }
        clearInterval(id);
      } else {
        pos2 += 2;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    } else {
      if (pos2 >= Math.floor(end2)) {
        if (game.playersCount == 5) {
          nextPlayer(4, 1);
        } else if (game.playersCount == 3) {
          nextPlayer(3, 1);
        } else {
          nextPlayer(game.playersCount, 1);
        }
        clearInterval(id);
      } else {
        pos2 += 2;
        pos = pos - ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    }
  }
}


function playerDraw(id, num) {
  let n = num;
  let count = game.players[id].hands[0].count;
  game.players[id].draw(0);
  game.showPlayerCard(id, count, 0, num);
  count += 1;
  let elem = document.getElementById("dealerCard");
  let cor = getElementTopLeft("deck");
  let pos = cor.left;
  let pos2 = cor.top;
  let cor2 = document.getElementById("r" + num);
  let clientRect = cor2.getBoundingClientRect();
  elem.id = "placed";
  if (num == 1) {
    var next = (count - 2) * 2;
    end = clientRect.left - toPx * 3;
    end2 = clientRect.top + next * toPx - toPx * 6;
  } else if (num == 3) {
    var next = -(count - 2) * 0.55;
    var next2 = (count - 2) * 2;
    end = clientRect.left + toPx * next - toPx * 0.5;
    end2 = clientRect.top + toPx * next2 - toPx * 6;
  } else if (num == 5) {
    var next = -(count - 2) * 1.5;
    var next2 = (count - 2) * 1.5;
    end = clientRect.left + toPx * next - toPx * -2;
    end2 = clientRect.top + toPx * next2 - toPx * 6;
  } else if (num == 2) {
    var next = (count - 2) * 0.57;
    var next2 = (count - 2) * 2;
    end = clientRect.left + toPx * next - toPx * 4;
    end2 = clientRect.top + toPx * next2 - toPx * 6;
  } else if (num == 4) {
    var next = (count - 2) * 1.5;
    var next2 = (count - 2) * 1.5;
    end = clientRect.left + toPx * next - toPx * 6;
    end2 = clientRect.top + toPx * next2 - toPx * 3;
  }
  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2) * 3;
  var id = setInterval(frame, 0.5);

  function frame() {
    if (pos <= end) {
      if (pos2 >= Math.floor(end2)) {
        nextPlayer(n, 0);
        clearInterval(id);
      } else {
        pos2 += 3;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    } else {
      if (pos2 >= Math.floor(end2)) {
        nextPlayer(n, 0);
        clearInterval(id);
      } else {
        pos2 += 3;
        pos = pos - ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    }
  }
}

function getElementTopLeft(id) {

  var ele = document.getElementById(id);
  var top = 0;
  var left = 0;

  while (ele.tagName != "BODY") {
    top += ele.offsetTop;
    left += ele.offsetLeft;
    ele = ele.offsetParent;
  }

  return {
    top: top,
    left: left
  };

}
let cycle = 0;
let cardcycle = 0;
let countcycle = 0;

function StartGame() {
  buttons.innerHTML = "";
  if (cycle == game.playersCount) {
    cycle = 0;
    cardcycle++;
  }
  countcycle = cardcycle - 1;
  if (cardcycle == 2) {
    dealerDeal();
  } else {
    player = game.players[cycle]
    player.showCard(cardcycle, player.position, 0, true)

    let balance = document.getElementById("b" + player.position);
    balance.innerHTML = player.balance - 25;
    var cardId = player.hands[0].cards[cardcycle].suit + player.hands[0].cards[cardcycle].value;
    let elem = document.getElementById(cardId);
    let cor = getElementTopLeft("deck");
    let pos = cor.left;
    let pos2 = cor.top;
    let cor2 = document.getElementById("r" + player.position);
    let clientRect = cor2.getBoundingClientRect();
    elem.id = cardId + "placed";
    if (player.position == 1) {
      var next = (countcycle) * 2;
      //end = clientRect.left + toPx * next - toPx * 2.5;
      end = clientRect.left - toPx * 3;
      end2 = clientRect.top + next * toPx - toPx * 6;
    } else if (player.position == 3) {
      var next = -(countcycle) * 0.55;
      var next2 = (countcycle) * 2;
      end = clientRect.left + toPx * next - toPx * 0.5;
      end2 = clientRect.top + toPx * next2 - toPx * 6;
    } else if (player.position == 5) {
      var next = -(countcycle) * 1.5;
      var next2 = (countcycle) * 1.5;
      end = clientRect.left + toPx * next - toPx * -2;
      end2 = clientRect.top + toPx * next2 - toPx * 6;
    } else if (player.position == 2) {
      var next = (countcycle) * 0.55;
      var next2 = (countcycle) * 2;
      end = clientRect.left + toPx * next - toPx * 4;
      end2 = clientRect.top + toPx * next2 - toPx * 6;
    } else if (player.position == 4) {
      var next = (countcycle) * 1.5;
      var next2 = (countcycle) * 1.5;
      end = clientRect.left + toPx * next - toPx * 6;
      end2 = clientRect.top + toPx * next2 - toPx * 3;
    }
    var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2) * 3;
    var id = setInterval(frame, 0.5);
    countcycle++;

    function frame() {
      if (pos <= end) {
        if (pos2 >= Math.floor(end2)) {
          cycle++;
          StartGame()
          clearInterval(id);
        } else {
          pos2 += 3;
          pos = pos + ratio;
          elem.style.top = (pos2 * toVw) + "vw";
          elem.style.left = (pos * toVw) + "vw";
        }
      } else {
        if (pos2 >= Math.floor(end2)) {
          cycle++;
          StartGame()
          clearInterval(id);
        } else {
          pos2 += 3;
          pos = pos - ratio;
          elem.style.top = (pos2 * toVw) + "vw";
          elem.style.left = (pos * toVw) + "vw";
        }
      }
    }
  }
}

function split(id, num) {
  player = game.players[id];
  player.addHand(0);
  player.hands[1].cards[0] = player.hands[0].cards[1];
  player.hands[0].cards.pop();
  var cardId = player.hands[1].cards[0].suit + player.hands[1].cards[0].value;
  var cardId2 = player.hands[0].cards[0].suit + player.hands[0].cards[0].value;
  let elem = document.getElementById(cardId + "placed");
  let cor = elem.getBoundingClientRect();
  let pos = cor.left;
  let pos2 = cor.top;
  let cor2 = document.getElementById(cardId2 + "placed");
  let clientRect = cor2.getBoundingClientRect();
  if (player.position == 1) {
    end = clientRect.left + toPx * 5;
    end2 = clientRect.top;
  } else if (player.position == 3) {
    end = clientRect.left + toPx * 4.5;
    end2 = clientRect.top + toPx * 1.4;
  } else if (player.position == 5) {
    end = clientRect.left + toPx * 5;
    end2 = clientRect.top + toPx * 4;
  } else if (player.position == 2) {
    end = clientRect.left + toPx * 5;
    end2 = clientRect.top - toPx * 0.8;
  } else if (player.position == 4) {
    end = clientRect.left + toPx * 5;
    end2 = clientRect.top - toPx * 3;
  }
  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2);
  var int = setInterval(frame, 0.5);
  countcycle++;

  function frame() {
    if (player.position == 5) {
      if (pos2 >= Math.floor(end2)) {
        cycle++;
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
        buttons.innerHTML +=
          '<p id="hit"><button class="button" onclick="playerDrawSplit(' + id + ',' +
          (num) + ',' + 1 + ')">HIT</button></p>';
        buttons.innerHTML +=
        '<p id="stay"><button class="button" onclick="staySplit(' + id + ',' +
        (num) + ',' + 1 + ')">STAY</button></p>';
        buttons.innerHTML +=
          '<p id="double"><button class="button" onclick="">DOUBLE</button></p>';
        clearInterval(int);
      } else {
        pos2 += 1;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";

      }
    } else {
      if (pos2 <= Math.floor(end2)) {
        cycle++;
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
        buttons.innerHTML +=
          '<p id="hit"><button class="button" onclick="playerDrawSplit(' + id + ',' +
          (num) + ',' + 1 + ')">HIT</button></p>';
        buttons.innerHTML +=
          '<p id="stay"><button class="button" onclick="staySplit(' + id + ',' +
          (num) + ',' + 1 + ')">STAY</button></p>';
        buttons.innerHTML +=
          '<p id="double"><button class="button" onclick="">DOUBLE</button></p>';
        clearInterval(int);
      } else {
        pos2 -= 1;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";

      }
    }

  }
}

function playerDrawSplit(id, num, handCount) {
  let n = num;
  console.log(game.players[id]);
  let count = game.players[id].hands[handCount].count - 1;
  game.players[id].draw(handCount);
  game.showPlayerCard(id, count, handCount, num);
  count += 1 + handCount;
  let elem = document.getElementById("dealerCard");
  let cor = getElementTopLeft("deck");
  let pos = cor.left;
  let pos2 = cor.top;
  let cor2 = document.getElementById("r" + num);
  let clientRect = cor2.getBoundingClientRect();
  elem.id = "placed";
  if (handCount == 1) {
    if (num == 1) {
      var next = (count - 1) * 2;
      end = clientRect.left - toPx * 3;
      end2 = clientRect.top + next * toPx - toPx * 6;
    } else if (num == 3) {
      var next = -(count - 2) * 0.55;
      var next2 = (count - 1) * 2;
      end = clientRect.left + toPx * next - toPx * 0.5;
      end2 = clientRect.top + toPx * next2 - toPx * 6;
    } else if (num == 5) {
      var next = -(count - 2) * 1.5;
      var next2 = (count - 2) * 1.5;
      end = clientRect.left + toPx * next - toPx * -2;
      end2 = clientRect.top + toPx * next2 - toPx * 6;
    } else if (num == 2) {
      var next = (count - 3) * 0.57;
      var next2 = (count - 3) * 2;
      end = clientRect.left + toPx * next - toPx * 4 + toPx * 5;
      end2 = clientRect.top + toPx * next2 - toPx * 6 - toPx * 0.8;
    } else if (num == 4) {
      var next = (count - 2) * 1.5;
      var next2 = (count - 2) * 1.5;
      end = clientRect.left + toPx * next - toPx * 6;
      end2 = clientRect.top + toPx * next2 - toPx * 3;
    }
  } else {
    if (num == 1) {
      var next = (count - 1) * 2;
      end = clientRect.left - toPx * 3;
      end2 = clientRect.top + next * toPx - toPx * 6;
    } else if (num == 3) {
      var next = -(count - 2) * 0.55;
      var next2 = (count - 1) * 2;
      end = clientRect.left + toPx * next - toPx * 0.5;
      end2 = clientRect.top + toPx * next2 - toPx * 6;
    } else if (num == 5) {
      var next = -(count - 2) * 1.5;
      var next2 = (count - 2) * 1.5;
      end = clientRect.left + toPx * next - toPx * -2;
      end2 = clientRect.top + toPx * next2 - toPx * 6;
    } else if (num == 2) {
      var next = (count - 3) * 0.57;
      var next2 = (count - 3) * 2;
      end = clientRect.left + toPx * next - toPx * 4;
      end2 = clientRect.top + toPx * next2 - toPx * 6;
    } else if (num == 4) {
      var next = (count - 2) * 1.5;
      var next2 = (count - 2) * 1.5;
      end = clientRect.left + toPx * next - toPx * 6;
      end2 = clientRect.top + toPx * next2 - toPx * 3;
    }
  }
  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2) * 3;
  var int = setInterval(frame, 0.5);

  function frame() {
    if (pos <= end) {
      if (pos2 >= Math.floor(end2)) {
        nextSplit(id, 0,handCount);
        clearInterval(int);
      } else {
        pos2 += 3;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    } else {
      if (pos2 >= Math.floor(end2)) {
        nextSplit(id, 0,handCount);
        clearInterval(int);
      } else {
        pos2 += 3;
        pos = pos - ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    }
  }
}

function stay(num,pre) {
  if (num == 1) {
    if (game.playersCount == 1) {
      num = 1
    } else if (game.playersCount == 2) {
      num = 2
    } else {
      num = 3;
    }
  } else if (num == 3) {
    if (game.playersCount == 4) {
      num = 4
    } else if (game.playersCount == 3) {
      num = 2
    } else {
      num = 5;
    }
  } else if (num == 5) {
    num = 4;
  } else if (num == 2) {
    num = 1;
  } else if (num == 4) {
    num = 2;
  }
  nextPlayer(num, pre);
}

function staySplit(id, num, count) {
  count--;
  if (count == -1) {
    stay(num,2);
  } else {
    playerDrawSplit(id, num, count)
  }
}
