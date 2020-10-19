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
  var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2)*2;
  var id = setInterval(frame, 3);
  elem.id = "placed";

  function frame() {
    if (pos <= end) {
      if (pos2 >= Math.floor(end2)) {
        clearInterval(id);
      } else {
        pos2+=2;
        pos = pos + ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    } else {
      if (pos2 >= Math.floor(end2)) {
        clearInterval(id);
      } else {
        pos2+=2;
        pos = pos - ratio;
        elem.style.top = (pos2 * toVw) + "vw";
        elem.style.left = (pos * toVw) + "vw";
      }
    }
  }
}

function playerDraw(id, num) {
let count = game.players[id].hands[0].count - 1;
  game.players[id].draw(0);
  game.showPlayerCard(id, count, num);
  let elem = document.getElementById("dealerCard");
  let cor = getElementTopLeft("deck");
  let pos = cor.left;
  let pos2 = cor.top;
  let cor2 = document.getElementById("r" + num);
  let clientRect = cor2.getBoundingClientRect();
  elem.id = "placed";
if (num == 1) {
  var next = (count-2) * 2;
   end = clientRect.left + toPx * next-toPx*2.5;
   end2 = clientRect.top + toPx -toPx*2.5;
}
else if (num ==3) {
  var next = (count-2) * 1.847;
  var next2 = (count-2) * 0.625;
   end = clientRect.left + toPx * next-toPx*2.5;
   end2 = clientRect.top + toPx * next2-toPx*2.5;
}else if(num==5){
var next = (count-2) * 1.414;
 end = clientRect.left + toPx * next-toPx*2.8;
 end2 = clientRect.top + toPx * next-toPx*2.8;
}else if(num==2){
var next = -(count-2) * 1.847;
var next2 = -(count-2) * 0.625;
 end = clientRect.left - toPx * next-toPx*1;
 end2 = clientRect.top + toPx * next2-toPx*1;
}else if(num==4){
var next = -(count-2) * 1.414;
 end = clientRect.left - toPx * next-toPx*0.65;
 end2 = clientRect.top + toPx * next-toPx*0.65;
}
console.log(end2);
console.log(end);
var ratio = Math.abs(end - pos) / Math.abs(end2 - pos2)*3;
var id = setInterval(frame, 0.5);
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
