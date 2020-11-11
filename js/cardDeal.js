let toVw;
let toVh;
let toPx;
let toPx2;

function getSizes() {
  toVw = 1 / document.documentElement.clientWidth * 100;
  toVh = document.documentElement.clientHeight / 100;
  toPx = document.documentElement.clientWidth / 100;
  toPx2 = document.documentElement.clientHeight / 100;
}
function dealerDeal(c) {
  getSizes();
  var next = game.dealer.count * 3.7
  game.dealer.draw();
  var count = game.dealer.count - 1;
  game.showDealerCard(count);
  var elem = document.getElementById("dealerCard");
  var cor = getElementTopLeft("deck");
  var pos = cor.left - toPx * 16;
  var pos2 = cor.top;
  var cor2 = getElementTopLeft("pole");
  var end = cor2.left + toPx * next + toPx / 2 - 14 * toPx;
  var end2 = cor2.top + toPx / 2;
  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2) * 2;
  var id = setInterval(frame, 3);
  elem.id = "placed";

  function frame() {
    if (pos <= end) {
      if (pos2 >= end2) {
        if (c == 1) {
          game.dealer.getScore();
          if (game.dealer.score < 17) {
            dealerDeal(1);
            clearInterval(id);
          } else {
            win();
            game.dealer.score = 0;
            game.dealer.ace = 0;
            nextTurn(1);
            clearInterval(id);
          }

        } else {
          if (game.playersCount == 5) {
            if (game.players[4].hands[0].score == 21) {
              nextPlayer(2, 1);
            } else {
              nextPlayer(4, 1);
            }
          } else if (game.playersCount == 3) {
            if (game.players[2].hands[0].score == 21) {
              nextPlayer(1, 1);
            } else {
              nextPlayer(2, 1);
            }
          } else if (game.playersCount == 4) {
            if (game.players[3].hands[0].score == 21) {
              nextPlayer(2, 1);
            } else {
              nextPlayer(4, 1);
            }
          } else if (game.playersCount == 2) {
            if (game.players[1].hands[0].score == 21) {
              nextPlayer(1, 1);
            } else {
              nextPlayer(2, 1);
            }
          } else {
            if (game.players[0].hands[0].score == 21) {
              nextTurn(0);
            } else {
              nextPlayer(1, 1);
            }
          }
          console.log(game.playersCount);
          console.log(game.players[game.playersCount-1]);
          game.dealer.getScore();
          clearInterval(id);
        }

      } else {
        pos2 += 2;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    } else {
      if (pos2 >= end2) {
        if (c == 1) {
          game.dealer.getScore();
          if (game.dealer.score < 17) {
            dealerDeal(1);
            clearInterval(id);
          } else {
            win();
            game.dealer.score = 0;
            game.dealer.ace = 0;
            nextTurn(1);
            clearInterval(id);
          }

        } else {
          if (game.playersCount == 5) {
            nextPlayer(4, 1);
          } else if (game.playersCount == 3) {
            nextPlayer(3, 1);
          } else {
            nextPlayer(game.playersCount, 1);
          }
          game.dealer.getScore();
          clearInterval(id);
        }
      } else {
        pos2 += 2;
        pos = pos - ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    }
  }
}


function playerDraw(id, num,double) {
  getSizes();
  if (game.players[id].hands[0].score == 21&& game.players[id].hands[0].count == 2) {
    stay((id + 1), (0));
  }else {
  hitButt.disabled = true;
  stayButt.disabled = true;
  splitButt.disabled = true;
  insuranceButt.disabled = true;
  doubleButt.disabled = true;
  let n = num;
  let count = game.players[id].hands[0].count;
  game.players[id].draw(0);
  game.showPlayerCard(id, count, 0, num);
  count += 1;
  let elem = document.getElementById("dealerCard");
  let cor = getElementTopLeft("deck");
  let pos = cor.left - toPx * 16;
  let pos2 = cor.top;
  let cor2 = document.getElementById("r" + num);
  let clientRect = cor2.getBoundingClientRect();
  elem.id = "placed";
  var next = (count - 2) * 2;
  end = clientRect.left - toPx * 18;
  end2 = clientRect.top + next * toPx - toPx * 6;
  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2) * 3;
  var int = setInterval(frame, 0.5);

  function frame() {
    if (pos <= end) {
      if (pos2 >= end2) {
        game.players[id].hands[0].getScore((id + 1), 0, (game.players[id].hands[0].count - 1));
        if (game.players[id].hands[0].score > 20) {
          stay((id + 1), (0));
          clearInterval(int);
        } else {
          if (double == 1) {
            stay((id + 1), (0));
            clearInterval(int);
          }else {
            nextPlayer(n, -1);
            clearInterval(int);
          }

        }
      } else {
        pos2 += 3;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    } else {
      if (pos2 >= end2) {
        game.players[id].hands[0].getScore((id + 1), 0, (game.players[id].hands[0].count - 1));
        if (game.players[id].hands[0].score > 20) {
          stay((id + 1), (0))
          clearInterval(int);
        } else {
          if (double == 1) {
            stay((id + 1), (0));
            clearInterval(int);
          }else {
            nextPlayer(n, -1);
            clearInterval(int);
          }
        }
      } else {
        pos2 += 3;
        pos = pos - ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    }
  }
}  }

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

function StartGame(nt) {
  getSizes();
  if (nt == 1) {
    document.getElementById("deck").innerHTML = '<img src="PNG/gray_back.png" alt="">';
    for (var i = 1; i < 7; i++) {
      document.getElementById('s' + i).innerHTML = "";
      if (i < 6) {
        document.getElementById('ss' + i).innerHTML = "";
        document.getElementById('ss' + i).style.visibility = "hidden";
        document.getElementById('r' + i).innerHTML = "";
      }

    }
  }
  buttons.innerHTML = "";
  if (cycle == game.playersCount) {
    cycle = 0;
    cardcycle++;
  }
  countcycle = cardcycle - 1;
  if (cardcycle == 2) {
    var cardIdTest = game.players[0].hands[0].cards[0].suit + game.players[0].hands[0].cards[0].value;
var element = document.getElementById( cardIdTest + "placed");

if(typeof(element) != 'undefined' && element != null){
  dealerDeal();
  cycle = 0;
  cardcycle = 0;
  countcycle = 0;
} else{
  cycle = 0;
  cardcycle = 0;
  countcycle = 0;
  game.removeHands();
  game.dealHands(2);
 buttons.innerHTML = "";
 StartGame(1);
}

  } else {
    player = game.players[cycle]
    player.showCard(cardcycle, player.position, 0, true)
    if (cardcycle == 1) {
      let balance = document.getElementById("b" + player.position);
      player.balance -= 20;
      player.bet += 20;
      balance.innerHTML = player.balance;
    }
    var cardId = player.hands[0].cards[cardcycle].suit + player.hands[0].cards[cardcycle].value;
    let elem = document.getElementById(cardId);
    let cor = getElementTopLeft("deck");
    let pos = cor.left - toPx * 16;
    let pos2 = cor.top;
    let cor2 = document.getElementById("r" + player.position);
    let clientRect = cor2.getBoundingClientRect();
    elem.id = cardId + "placed";
    var next = (countcycle) * 2;
    end = clientRect.left - toPx * 18;
    end2 = clientRect.top + next * toPx - toPx * 6;
    var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2) * 3;
    var id = setInterval(frame, 0.5);
    countcycle++;

    function frame() {
      if (pos <= end) {
        if (pos2 >= end2) {
          cycle++;
          player.hands[0].getScore(cycle, 0, cardcycle);
          StartGame(0)
          clearInterval(id);
        } else {
          pos2 += 3;
          pos = pos + ratio;
          elem.style.top = (pos2 * toVw) + "vw";
          elem.style.left = (pos * toVw) + "vw";
        }
      } else {
        if (pos2 >= end2) {
          cycle++;
          player.hands[0].getScore(cycle, 0, cardcycle);
          StartGame(0)
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
  hideBorderScore();
  document.getElementById("ss"+num).style.visibility = 'visible';
  document.getElementById("ss"+num).style.border = "0.5vw solid grey";
  hitButt = document.getElementById("hit").querySelector(".button");
  stayButt = document.getElementById("stay").querySelector(".button");
  doubleButt = document.getElementById("double").querySelector(".button");
  hitButt.disabled = true;
  stayButt.disabled = true;
  doubleButt.disabled = true;
  getSizes();
  player = game.players[id];
  player.addHand(0);
  player.hands[1].cards[0] = player.hands[0].cards[1];
  player.hands[0].cards.pop();
  let balance = document.getElementById("b" + player.position);
  //player.bet = 0;
  player.balance -= 20;
  player.betSplit += 20;
  balance.innerHTML = player.balance;
  var cardId = player.hands[1].cards[0].suit + player.hands[1].cards[0].value;
  var cardId2 = player.hands[0].cards[0].suit + player.hands[0].cards[0].value;
  let elem = document.getElementById(cardId + "placed");
  let cor = elem.getBoundingClientRect();
  let pos = cor.left - toPx * 18;
  let pos2 = cor.top;
  let cor2 = document.getElementById(cardId2 + "placed");
  let clientRect = cor2.getBoundingClientRect();
  end = clientRect.left - toPx * 10;;
  end2 = clientRect.top;
  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2);
  var int = setInterval(frame, 0.5);
  countcycle++;

  function frame() {
    if (pos >= end) {
      console.log("end: pos= "+pos+ "; end= "+end);
      console.log("end: pos2= "+pos2+ "; end2= "+end2);
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
        '<p id="double"><button class="button" onclick="double(' + id + ',' + 1 + ',' + 1 + ')">DOUBLE</button></p>';
        player.hands[0].score = 0;
        player.hands[1].score = 0;
        player.hands[0].getScore(num, 0, 0);
        player.hands[1].getSplitScore(num, 0, 0);
      clearInterval(int);
    } else {

        console.log("fr: pos= "+pos+ "; end= "+end);
        console.log("fr: pos2= "+pos2+ "; end2= "+end2);
      pos2 -= 1;
      pos = pos + ratio;
      elem.style.top = (pos2 * toVw) + "vw";
      elem.style.left = (pos * toVw) + "vw";
    }
  }
}

function playerDrawSplit(id, num, handCount,double) {
  hitButt = document.getElementById("hit").querySelector(".button");
  stayButt = document.getElementById("stay").querySelector(".button");
  doubleButt = document.getElementById("double").querySelector(".button");
  hitButt.disabled = true;
  stayButt.disabled = true;
  doubleButt.disabled = true;
  getSizes();
  let n = num;
  let player = game.players[id];
  let count = player.hands[handCount].count - 1;
  var cardId2 = player.hands[1].cards[0].suit + player.hands[1].cards[0].value;
  var cardId = player.hands[0].cards[0].suit + player.hands[0].cards[0].value;
  player.draw(handCount);
  game.showPlayerCard(id, count, handCount, num);
  let elem = document.getElementById("dealerCard");
  let cor = getElementTopLeft("deck");
  let pos = cor.left - toPx * 16;
  let pos2 = cor.top;
  let cor2;
  if (handCount == 1) {
    cor2 = document.getElementById(cardId2 + "placed");
  } else {
    cor2 = document.getElementById(cardId + "placed");
  }
  let clientRect = cor2.getBoundingClientRect();
  elem.id = "placed";
  var next = 6 + count * 2;
  end = clientRect.left - 15 * toPx;
  end2 = clientRect.top + next * toPx - toPx * 6;

  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2) * 3;
  var int = setInterval(frame, 0.5);

  function frame() {
    if (pos <= end) {
      if (pos2 >= end2) {
        if (handCount==1) {
          player.hands[1].getSplitScore((id + 1), 0, (player.hands[1].count - 2));
          if (game.players[id].hands[1].score > 20) {
            nextSplit(id, 1, handCount);
            clearInterval(int);
          }else {
            if (double == 1) {
              nextSplit(id, 1, handCount);
              clearInterval(int);
            }else {
              nextSplit(id, 0, handCount);
              clearInterval(int);
            }
          }
        }else {
          player.hands[0].getScore((id + 1), 0, (player.hands[0].count - 2));
          if (player.hands[0].score > 20) {
            nextSplit(id, 1, handCount);
            clearInterval(int);
          }else {
            if (double == 1) {
              nextSplit(id, 1, handCount);
              clearInterval(int);
            }else {
              nextSplit(id, 0, handCount);
              clearInterval(int);
            }
          }
        }

      } else {
        pos2 += 3;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    } else {
      if (pos2 >= end2) {
        if (handCount==1) {
          player.hands[1].getSplitScore((id + 1), 0, (player.hands[1].count - 2));
          if (game.players[id].hands[1].score > 20) {
            nextSplit(id, 1, handCount);
            clearInterval(int);
          }else {
            if (double == 1) {
              nextSplit(id, 1, handCount);
              clearInterval(int);
            }else {
              nextSplit(id, 0, handCount);
              clearInterval(int);
            }
          }
        }else {
          player.hands[0].getScore((id + 1), 0, (player.hands[0].count - 2));
          if (player.hands[0].score > 20) {
            nextSplit(id, 1, handCount);
            clearInterval(int);
          }else {
            if (double == 1) {
              nextSplit(id, 1, handCount);
              clearInterval(int);
            }else {
              nextSplit(id, 0, handCount);
              clearInterval(int);
            }
          }
        }
      } else {
        pos2 += 3;
        pos = pos - ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    }
  }
}

function stay(num, pre) {
  if (num == 1) {
    if (game.playersCount == 1) {
      num = 1
      return nextTurn(0);
    } else if (game.playersCount == 2) {
      num = 2
      return nextTurn(0);
    } else {
      num = 3;
    }
  } else if (num == 3) {
    if (game.playersCount == 4) {
      num = 4
      return nextTurn(0);
    } else if (game.playersCount == 3) {
      num = 2
      return nextTurn(0);
    } else {
      num = 5;
    }
  } else if (num == 5) {
    num = 4;
    return nextTurn(0);
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
    stay(num, 2);
  } else {
    nextSplit(id, 2, count)
  }
}
