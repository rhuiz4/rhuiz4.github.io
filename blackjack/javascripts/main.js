
function main () {
    const play = document.querySelector('.playBtn');
    const startValues = document.querySelector('#startValues');
    play.addEventListener('click', function (event) {
        // Prevent default action
        event.preventDefault();
        // Make form disappear
        document.querySelector('form').style.display = 'none';
        // Start game
        playGame();
    });
}

document.addEventListener('DOMContentLoaded', main);

// Blackjack Game
function playGame () {
    // const start = startValues.value.split(',');
    const start = 0;

    // Create deck
    const deck = generateDeck(start);

    // Create player and dealer hands
    const playerHand = [];
    const dealerHand = [];

    // Draw cards
    draw(dealerHand, deck);
    draw(playerHand, deck);
    draw(dealerHand, deck);
    draw(playerHand, deck);

    // Show cards
    document.querySelector('.game').innerHTML = `<div class="dealer"></div><div class="player"></div>`;
    showCards(playerHand, dealerHand, true);

    // If player gets blackjack right away, dealer plays
    if (total(playerHand) === '21') {
        dealerPlays(dealerHand, deck);
        showWinner(playerHand, dealerHand);
    } else {
        // Play game

        // Hit and stand buttons
        const hit = document.createElement('button');
        hit.innerHTML = "Hit";
        hit.addEventListener('click', function (event) {
            event.preventDefault();
            draw(playerHand, deck);
            const playerTotal = parseInt(total(playerHand));
            if (playerTotal > 21) {
                showWinner(playerHand, dealerHand);
            } else if (playerTotal === 21) {
                dealerPlays(dealerHand, deck);
                showWinner(playerHand, dealerHand);
            } else {
                showCards(playerHand, dealerHand, true);
            }
        });

        const stand = document.createElement('button');
        stand.innerHTML = "Stand";
        stand.addEventListener('click', function (event) {
            event.preventDefault();
            dealerPlays(dealerHand, deck);
            showWinner(playerHand, dealerHand);
        });
        document.querySelector('.game').appendChild(hit);
        document.querySelector('.game').appendChild(stand);
    }
}

function generateDeck (startVals) {
    const deck = [];
    // Fill deck with cards
    for (let i = 0; i <= 52; i++) {
        const card = (i % 13) + 1;
        if (card === 1) {
            deck.push("A");
        } else if (card === 11) {
            deck.push("J");
        } else if (card === 12) {
            deck.push("Q");
        } else if (card === 13) {
            deck.push("K");
        } else {
            deck.push(card.toString());
        }
    }

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // Put start values on top of deck
    
    // for (let i = startVals.length-1; i >= 0; i--) {
    //     if (startVals[i] !== "") {
    //         deck.splice(deck.indexOf(startVals[i]), 1);
    //         deck.push(startVals[i]);
    //     }
    // }

    return deck;
}

function draw(hand, deck) {
    return hand.push(deck.pop());
}

function showCards(playerHand, dealerHand, hidden) {
    const dealerElement = document.querySelector('.dealer');
    const playerElement = document.querySelector('.player');

    let dealerTotal = "?";
    if (!hidden) dealerTotal = total(dealerHand);
    const playerTotal = total(playerHand);

    dealerElement.innerHTML = "Dealer Hand - Total:" + dealerTotal + "<br>";
    for (let i = 0; i < dealerHand.length; i++) {
        if (i === 0 && hidden) {
            dealerElement.innerHTML += "<card class=\"hidden\"> ? </card>";
        } else {
            dealerElement.innerHTML += "<card>" + dealerHand[i] + "</card>";
        }
    }

    playerElement.innerHTML = "<br> Player Hand - Total: " + playerTotal + "<br>";
    for (let i = 0; i < playerHand.length; i++) {
        playerElement.innerHTML += "<card >" + playerHand[i] + "</card>";
    }

}

function total(hand){
    let total = 0;
    let hasAce = false;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i] === "A") {
            hasAce = true;
            total += 1;
        } else if (hand[i] === "J" || hand[i] === "Q" || hand[i] === "K") {
            total += 10;
        } else {
            total += parseInt(hand[i]);
        }
    }
    if (hasAce && total <= 11) {
        total += 10;
    }
    return total.toString();
}

function dealerPlays(dealerHand, deck) {
    let dealerTotal = total(dealerHand);
    while (dealerTotal < 17) {
        draw(dealerHand, deck);
        dealerTotal = total(dealerHand);
    }
}

function showWinner(playerHand, dealerHand) {
    // Remove buttons
    document.querySelector('.game').innerHTML = "";
    document.querySelector('.game').innerHTML = `<div class="dealer"></div><div class="player"></div>`;
    showCards(playerHand, dealerHand, false);

    // Determine winner
    let dealerTotal = total(dealerHand);
    let playerTotal = total(playerHand);
    if (playerTotal > 21) {
        document.querySelector('.game').innerHTML += "<h1>Player Busted! Dealer Wins!</h1>";
    } else if (dealerTotal > 21) {
        document.querySelector('.game').innerHTML += "<h1>Dealer Busted! Player Wins!</h1>";
    } else if (playerTotal > dealerTotal) {
        document.querySelector('.game').innerHTML += "<h1>Player Wins!</h1>";
    } else if (dealerTotal > playerTotal) {
        document.querySelector('.game').innerHTML += "<h1>Dealer Wins!</h1>";
    } else {
        document.querySelector('.game').innerHTML += "<h1>Tie!</h1>";
    }

    // Show new game button
    const newGame = document.createElement('button');
    newGame.innerHTML = "Restart";
    newGame.addEventListener('click', function (event) {
        // Prevent default action
        event.preventDefault();
        // Reset game
        document.querySelector('.game').innerHTML = "";

        // Start dealing new hands
        playGame();

        // Make form appear (makes startVals visible again)
        // document.querySelector('form').style.display = 'flex';
    });
    document.querySelector('.game').appendChild(newGame);
}