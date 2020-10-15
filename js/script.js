import Deck from './js/deck.js';
const suits = ["H", "D", "C", "S"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
let deck = new Deck(2);
deck.createDeck(suits, values);
deck.shuffle();
deck.shuffle();
console.log(deck.deck);
