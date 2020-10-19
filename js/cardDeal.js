function dealerDeal() {
  var toVw = 1 / document.documentElement.clientWidth *100;
  var next = game.dealer.count*3.5
  game.dealer.draw();
  var count = game.dealer.count-1;
  game.showDealerCard(count);
  var elem = document.getElementById("dealerCard");
  var cor = getElementTopLeft("deck");
  var pos = cor.left;
  var pos2 = cor.top ;
  var cor2 = getElementTopLeft("pole");
  var end = cor2.left;
  var end2 = cor2.top ;
  var ratio =Math.abs(end2 - pos2) / Math.abs(end - pos);
  var id = setInterval(frame, 5);
  elem.id = "placed";
  function frame() {
    if (pos <= end) {
    if (pos == Math.floor(end)) {
      clearInterval(id);
    } else {
      pos++;
      pos2 = pos2 + ratio;
      elem.style.top = (pos2*toVw) + "vw";
      elem.style.left = (pos*toVw+next) + "vw";
    }} else {
      if (pos == Math.floor(end)) {
        clearInterval(id);
      } else {
        pos--;
        pos2 = pos2 + ratio;
        elem.style.top = (pos2*toVw) + "vw";
        elem.style.left = (pos*toVw+next) + "vw";
      }
    }
  }
}
function playerDraw(id) {
  let toVw = 1 / document.documentElement.clientWidth *100;
// var next = game.dealer.count*3.5
  let count = game.players[id].hands[0].count-1;
  game.showPlayerCard(id,count);
  let elem = document.getElementById("dealerCard");
  let cor = getElementTopLeft("deck");
  let pos = cor.left;
  let pos2 = cor.top ;
  let cor2 = document.getElementById("r7");
let clientRect = cor2.getBoundingClientRect();
let end = clientRect.left;
let end2 = clientRect.top;
  var ratio =Math.abs(end2 - pos2) / Math.abs(end - pos);
  var id = setInterval(frame, 5);
  elem.id = "placed";
  function frame() {
    if (pos <= end) {
    if (pos == Math.floor(end)) {
      clearInterval(id);
      console.log(pos);
    } else {
      pos++;
      pos2 = pos2 + ratio;
      elem.style.top = pos2*toVw + "vw";
      elem.style.left = pos*toVw + "vw";
    }} else {
      if (pos == Math.floor(end)) {
        console.log(pos);
        clearInterval(id);
      } else {
        pos--;
        pos2 = pos2 + ratio;
        elem.style.top = (pos2*toVw) + "vw";
        elem.style.left = (pos*toVw) + "vw";
      }
    }
  }
}
function getElementTopLeft(id) {

    var ele = document.getElementById(id);
    var top = 0;
    var left = 0;

    while(ele.tagName != "BODY") {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
    }

    return { top: top, left: left };

}
