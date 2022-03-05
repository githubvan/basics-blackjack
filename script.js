var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var currentGameMode = GAME_START;

var playerHand = [];
var dealerHand = [];

var gameDeck = "empty at the start";

//-------------make and shuffle-----------------------//

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♠️", "♥️", "♣️", "♦️"];
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      }
      if (cardName == 11) {
        cardName = "jack";
      }
      if (cardName == 12) {
        cardName = "queen";
      }
      if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var currentIndex = 0;
    while (currentIndex < cardDeck.length) {
      var randomIndex = getRandomIndex(cardDeck.length);
      var randomCard = cardDeck[randomIndex];
      var currentCard = cardDeck[currentIndex];
      cardDeck[currentIndex] = randomCard;
      cardDeck[randomIndex] = currentCard;
      currentIndex = currentIndex + 1;
    }
    return cardDeck;
  }
};

var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

//-------------game functions-----------------------//
// check for blackjack
var checkforBlackjack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

// calculate hand value
var calTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }
  return totalHandValue;
};

//--------------------main----------------------//

var main = function (input) {
  if (currentGameMode == GAME_START) {
    gameDeck = createNewDeck();
    console.log(gameDeck);

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log`PLAYER HAND IS`;
    console.log(playerHand);
    console.log`DEALER HAND IS`;
    console.log(dealerHand);

    currentGameMode = GAME_CARDS_DRAWN;

    outputMessage = `Cards has been dealt. Click "submit" buttom to see the player and dealer cards.`;

    return outputMessage;
  }

  // SECOND GAME MODE
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // --------check for blackjack------
    var playerHasBlackjack = checkforBlackjack(playerHand);
    var dealerHasBlackjack = checkforBlackjack(dealerHand);

    // console.log(playerHasBlackjack);
    // console.log(dealerHasBlackjack);
    // playerHasBlackjack = true;
    // dealerHasBlackjack = false;

    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      //tie
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage = `It's a blackjack tie!`;
      }
      //player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage = `Player wins by blackjack.`;
      } else {
        outputMessage = `Dealer wins by blackjack`;
      }
      console.log(outputMessage);
    }

    // --------no blackjack------
    var playerHandTotalValue = calTotalHandValue(playerHand);
    var dealerHandTotalValue = calTotalHandValue(dealerHand);

    // console.log(playerHandTotalValue);
    // console.log(dealerHandTotalValue);
    // playerHandTotalValue = 12;
    // dealerHandTotalValue = 11;

    // compare total hand value
    if (playerHandTotalValue == dealerHandTotalValue) {
      outputMessage = `It's a tie.`;
      console.log(`tie`);
    } else if (playerHandTotalValue > dealerHandTotalValue) {
      outputMessage = `Player wins.`;
      console.log(`player wins`);
    } else {
      outputMessage = `Dealer wins.`;
      console.log(`dealer wins`);
    }
    currentGameMode = GAME_RESULTS_SHOWN;
    return outputMessage;
  }
};
