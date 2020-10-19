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
  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2);
  var id = setInterval(frame, 3);
  elem.id = "placed";

  function frame() {
    if (pos <= end) {
      if (pos2 >= Math.floor(end2)) {
        clearInterval(id);
      } else {
        pos2++;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    } else {
      if (pos2 >= Math.floor(end2)) {
        clearInterval(id);
      } else {
        pos2++;
        pos = pos - ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    }
  }
}

function playerDraw(id, num) {
let count = game.players[id].hands[0].count - 1;
  var next = (count-2) * 1.8
  game.players[id].draw(0);
  game.showPlayerCard(id, count, num);
  let elem = document.getElementById("dealerCard");
  let cor = getElementTopLeft("deck");
  let pos = cor.left;
  let pos2 = cor.top;
  let cor2 = document.getElementById("r" + num);
  let clientRect = cor2.getBoundingClientRect();
  let end = clientRect.left + toPx * next;
  let end2 = clientRect.top;
  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2)*3;
  var id = setInterval(frame, 0.5);
  elem.id = "placed";

  function frame() {
    if (pos <= end) {
      if (pos2 >= Math.floor(end2)) {
        clearInterval(id);
      } else {
        pos2+=3;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    } else {
      if (pos2 >= Math.floor(end2)) {
        clearInterval(id);
      } else {
        pos2+=3;
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
