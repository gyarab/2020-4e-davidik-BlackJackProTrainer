//Variables pro strategie
let cardCounting = 0;
let trueCount = 0;
let betting = 0;
let surrBoolean = true;
let autoBetBoolean = false;
let deviaton = "";
//strategie card counting
function cardCount(value) {
  if (value == "A") {
    cardCounting--;
  } else if (value == "K" || value == "Q" || value == "J") {
    cardCounting--;
  } else if (value < 7) {
    cardCounting++;
  } else if (value == 10) {
    cardCounting--;
  } else {}
  // přepočet na truecount
  trueCount = Math.round(cardCounting / (deck.length / 52));
  betting = trueCount * 20 - 20;
  if (betting < 20) {
    betting = 20;
  }
  document.getElementById("cc").innerHTML = "Card count: " + cardCounting;
  document.getElementById("tr").innerHTML = "True count: " + trueCount;
  document.getElementById("b").innerHTML = "Bet: " + betting;
  return value;
}
//vrátí kolik zbývá karet
function cardLeft() {
  document.getElementById("cl").innerHTML = "Cards left: " + deck.length + "(" + (40 + (game.playersCount * 2) + 1) + ")";
  return deck.length;
}
//tabulka nejlepších tahů
function perfectBasicStrategy(id, playerTotal, aceTrue, splitTrue, dealerTotal, cards, split) {
  let decision;
  if (aceTrue) {
    if (playerTotal < 22) {
      if (splitTrue) {
        playerTotal = 11;
        pairSplitting(playerTotal, dealerTotal);
      } else {
        playerTotal -= 11;
        softTotals(playerTotal, dealerTotal);
      }
    } else {
      playerTotal -= 11;
      hardTotals(playerTotal, dealerTotal);
    }

  } else if (splitTrue) {
    playerTotal /= 2;
    pairSplitting(playerTotal, dealerTotal);

  } else {
    hardTotals(playerTotal, dealerTotal);
  }
  if (surrBoolean == true) {
    lateSurrender(playerTotal, dealerTotal);
  }
  if (dealerTotal == 11) {
    takeInsurance(trueCount);
  }
  //default
  function hardTotals(playerValue, dealerValue) {

    if (playerValue == 4 && split == true) {
      if (dealerValue == 5 || dealerValue == 6) {
        decision = "DOUBLE";
      } else {
        decision = "HIT";
      }
    } else if (playerValue < 9) {
      decision = "HIT";
    }
    if (playerValue == 9) {
      if (dealerValue == 2 || dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "DOUBLE";
        if (cards > 2) {
          decision = "HIT";
        }
      }
    }
    if (playerValue == 10) {
      if (dealerValue > 9) {
        decision = "HIT";
      } else {
        decision = "DOUBLE";
        if (cards > 2) {
          decision = "HIT";
        }
      }
    }
    if (playerValue == 11) {
      if (dealerValue == 11) {
        decision = "HIT";
      } else {
        decision = "DOUBLE";
        if (cards > 2) {
          decision = "HIT";
        }
      }
    }
    if (playerValue == 12) {
      if (dealerValue < 4 || dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "STAND";
      }
    }
    if (playerValue == 13) {
      if (dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "STAND";
      }
    }
    if (playerValue == 14) {
      if (dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "STAND";
      }
    }
    if (playerValue == 15) {
      if (dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "STAND";
      }
    }
    if (playerValue == 16) {
      if (dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "STAND";
      }
    }
    if (playerValue > 16) {
      decision = "STAND";
    }
    if (trueCount >= 1) {
      if (playerValue == 16) {
        if (dealerValue == 10) {
          decision = "STAND";
        }
      }
    }



  }
  //pokud má hráč eso
  function softTotals(playerValue, dealerValue) {
    if (playerValue == 2) {
      if (dealerValue < 5 || dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "DOUBLE";
        if (cards > 2) {
          decision = "HIT";
        }
      }
    }
    if (playerValue == 3) {
      if (dealerValue < 5 || dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "DOUBLE";
        if (cards > 2) {
          decision = "HIT";
        }
      }
    }
    if (playerValue == 4) {
      if (dealerValue < 4 || dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "DOUBLE";
        if (cards > 2) {
          decision = "HIT";
        }
      }
    }
    if (playerValue == 5) {
      if (dealerValue < 4 || dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "DOUBLE";
        if (cards > 2) {
          decision = "HIT";
        }
      }
    }
    if (playerValue == 6) {
      if (dealerValue < 3 || dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "DOUBLE";
        if (cards > 2) {
          decision = "HIT";
        }
      }
    }
    if (playerValue == 7) {
      if (dealerValue < 7) {
        decision = "DOUBLE";
        if (cards > 2) {
          decision = "STAND";
        }
      } else if (dealerValue < 9) {
        decision = "STAND";
      } else {
        decision = "HIT";
      }
    }

    if (playerValue > 7) {
      decision = "STAND";
    }

  }
  //Pokud hráč splituje
  function pairSplitting(playerValue, dealerValue) {
    if (playerValue == 2) {
      if (dealerValue < 4 || dealerValue > 7) {

        decision = "HIT";
      } else {
        decision = "SPLIT";
      }
    }
    if (playerValue == 3) {
      if (dealerValue < 4 || dealerValue > 7) {
        decision = "HIT";
      } else {
        decision = "SPLIT";
      }
    }
    if (playerValue == 4) {
      if (dealerValue < 5 || dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "SPLIT";
      }
    }
    if (playerValue == 5) {
      if (dealerValue > 10) {
        decision = "HIT";
      } else {
        decision = "DOUBLE";
      }
    }
    if (playerValue == 6) {
      if (dealerValue < 3 || dealerValue > 6) {
        decision = "HIT";
      } else {
        decision = "SPLIT";
      }
    }
    if (playerValue == 7) {
      if (dealerValue > 7) {
        decision = "HIT";
      } else {
        decision = "SPLIT";
      }
    }

    if (playerValue == 8) {
      decision = "SPLIT";
    }
    if (playerValue == 9) {
      if (dealerValue == 7 || dealerValue > 9) {
        decision = "STAND";
      } else {
        decision = "SPLIT";
      }
    }

    if (playerValue == 10) {
      decision = "STAND";
    }
    if (playerValue == 11) {
      decision = "SPLIT";
    }


  }

  function lateSurrender(playerValue, dealerValue) {
    if (playerValue == 15) {
      if (dealerValue == 10) {
        decision = "SURR";
      } else {
        //  decision = "DON'T SURR";
      }
    }
    if (playerValue == 16) {
      if (dealerValue < 9) {
        //  decision = "DON'T SURR";
      } else {
        decision = "SURR";
      }
    } else {
      //decision = "DON'T SURR";
    }

  }
  deviaton = "";

  function takeInsurance(tc) {
    if (tc >= 3) {
      deviaton = "+ TAKE INSURANCE";
    }
  }
  document.getElementById("bs").innerHTML = "Basic Strategy: " + decision + deviaton;
  return decision;
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
//funkce pro insurance
function insurance(id) {
  let balance = document.getElementById("b" + player.position);
  player = game.players[id];
  bal = player.bet / 2;
  player.insuranceBet += bal;
  player.balance -= bal;
  balance.innerHTML = (id + 1) + ": " + player.balance;
  //stay((id+1),0);
  player.insurance = true;
  insuranceButt.disabled = true;
}
//funkce pro surrender
function surrender(id) {
  let balance = document.getElementById("b" + player.position);
  player = game.players[id];
  bal = player.bet;
  player.bet = 0;
  player.balance += bal / 2;
  balance.innerHTML = (id + 1) + ": " + player.balance;
  player.surrender = true;
  stay((id + 1), 0);
}
//povolí surrender
function allowSurr() {
  butt = document.getElementById("allowSurr");
  if (butt.innerHTML == "on") {
    surrBoolean = false;
    butt.innerHTML = "off";
  } else {
    surrBoolean = true;
    butt.innerHTML = "on";
  }
}
//povolí autosázku
function autoBet() {
  butt = document.getElementById("autoBet");
  if (butt.innerHTML == "on") {
    autoBetBoolean = false;
    butt.innerHTML = "off";
  } else {
    autoBetBoolean = true;
    butt.innerHTML = "on";
  }
}
// funkce pro double
function double(id, pre, handCount) {
  player = game.players[id];
  let balance = document.getElementById("b" + player.position);
  player.balance -= player.bet;
  if (pre == 0) {
    player.bet += player.bet;
    playerDraw(id, id + 1, 1);
  } else {
    if (handCount == 1) {

      player.betSplit += player.bet;
      playerDrawSplit(id, id + 1, handCount, 1);
    } else {

      player.bet += player.bet;
      playerDrawSplit(id, id + 1, handCount, 1);
    }
  }
  balance.innerHTML = (id + 1) + ": " + player.balance;
}
