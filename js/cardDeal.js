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
  elem.id =  "placed";

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

function stay(num) {
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
  nextPlayer(num, 0);
}

function playerDraw(id, num) {
  let n = num;
  let count = game.players[id].hands[0].count ;
  game.players[id].draw(0);
  game.showPlayerCard(id, count, num);
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
    player.showCard(cardcycle, player.position,true)

    let balance = document.getElementById("b" + player.position);
    balance.innerHTML = player.balance - 25;
    var cardId=player.hands[0].cards[cardcycle].suit + player.hands[0].cards[cardcycle].value;
    console.log(cardId);
    let elem = document.getElementById(cardId);
    let cor = getElementTopLeft("deck");
    let pos = cor.left;
    let pos2 = cor.top;
    let cor2 = document.getElementById("r" + player.position);
    let clientRect = cor2.getBoundingClientRect();
    elem.id = cardId+"placed";
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
function split(id, num){
  player = game.players[id];
player.addHand(0);
player.hands[1].cards[0] = player.hands[0].cards[1];
player.hands[0].cards.pop();

}
