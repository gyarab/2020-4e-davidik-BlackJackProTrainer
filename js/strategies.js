let  cardCounting = 0;
function cardCount(value) {
if ( value == "A") {
  cardCounting ++;
}
else if (value == "K" || value == "Q" || value == "J") {
  cardCounting ++;
}else if (value < 7) {
  cardCounting --;
}else if (value == 10) {
cardCounting ++;
}else {
}
document.getElementById("cc").innerHTML="Card count: "+cardCounting;
return value;
}
function cardLeft() {
console.log(deck.length);
document.getElementById("cl").innerHTML="Cards left: "+deck.length;
return deck.length;
}
function perfectBasicStrategy() {

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
