let Game = {
    deck: null,
    players: {},
    playersTurn: null,
    turnDirection: 1,
    topCard: null,
    topCardColor: null,
    topCardValue: null
};

function makeNewCards(){
    const cards = [
        'red_0',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_skip', 'red_reverse', 'red_draw_two',
        'red_skip', 'red_reverse', 'red_draw_two',
        
        'green_0',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_skip', 'green_reverse', 'green_draw_two',
        'green_skip', 'green_reverse', 'green_draw_two',
        
        'blue_0',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        
        'yellow_0',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
    ];    
    
    return cards;
}

// create a function that takes an array of cards 
// and returns a new array of shuffled cards
function shuffle( cards ){
    // create an array to hold the shuffled cards
    const deck = [ ];
    // algorithm to shuffle a deck of cards
    // as long as there are cards in the cards array
    while (cards.length > 0) {
        // pick a random number between 0 and the length of the cards array
        let randomNumber = Math.floor(Math.random() * cards.length);
        // then use that number to pick a card
        let card = cards[randomNumber];
        // console.log('card is '+card)
        // push that card onto the new deck
        deck.push(card);
        // remove the card from the original deck
        cards.splice(randomNumber, 1);        
    }
    return deck;
}

function dealCard(deck){
    return deck.shift();
}

//var topCard = dealCard(deck)

function startNewGame () {
    // create new set of crds
    let cards = makeNewCards();
    //Shuffle crds
    let deck = shuffle(cards);
    //and attach em to the 'Game' obj
    Game.deck = deck;
    // showGameObject();
    
    // add up to 4 plyrs to 'Game' obj
    //                      0           1         2        3
    const playerNames = ['Crystal', 'Yanaira', 'Jerry', 'Jose'];
    const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    for (let i = 0; i < playerNames.length; i++) {
        let name = playerNames[i];
        let id = ALPHABET[i];
        let player = createNewPlayer(name, id);
        Game.players[id] = player;
    }
    // flip top card on dck ovr to strt game
    let discard = dealCard(Game.deck);
    Game.topCard = discard;
    let topCard = document.querySelector('#deck');
    topCard.setAttribute('src', 'images/' + discard +'.png');
    
    Game.playersTurn = 'A';
    
    showGameObject();
}

function createNewPlayer(playerName, id) {
 // every plyr has thave a name, points, amt of cards, card type, drawings, 
 let player = {
     id: id,
     name: playerName,
     cards: [ ],
     points: 0
 };
 
 for(let i = 0; i < 7; i++) {
     let card = dealCard(Game.deck);
     player.cards.push(card);
 }
 return player;
}

function showGameObject(){
    var codeSection = document.querySelector('#game-object');
    codeSection.innerHTML = JSON.stringify(Game, null, 2);
}

//ex: 'blue_7', 'green_draw_two', 'yellow_9', etc.
function getCardColor(cardName) {
    //take the string cardName and .split the word at '_'
    const splitCard = cardName.split('_');
    //Then grab the first index of the array
    const color = splitCard[0];
    //Return the color 
    return color;
}
//result 'blue', ' green', 'yellow', 'wild'

//ex: 'blue_7', 'yellow_9', 'blue_reverse', 'green_draw_two',
//'red_skip', ' wild' or 'wild_draw_four'
function getCardValue(cardName) {
    //take the string and .split the word at '_'
    const splitCard = cardName.split('_');
    //Then grab the second index
    let val = splitCard[1];
    //if the length of the splitCard array is 3, then grab the value
    //at index 2 and concatenate it onto the end of the val variable
    if(splitCard.length === 3) {
        val += '_' + splitCard[2];
    }
    //Return the value
    return val;
}
//output:'7', '9', 'reverse', draw_'two','skip', 'undefined' or 'draw_four'

//Things we need to know: whose turn it is currently, direction
//the turn is going
function changePlayersTurn() {
    const ALPHABET = Object.keys(Game.players);
    //first, the the crrnt plyr trn from the Game obj
    const currentPlayerId = Game.playersTurn;
    //Then, get the trnDrctn from the Game obj
    const currentDirection = Game.turnDirection;
    //Then, move the crrnt plyr turn one position in w/e dirctn its
    //supposed to move in
        //1st, get index of player's turn in alph array
    const idx = ALPHABET.indexOf(currentPlayerId);
        //then, chng index by the drctn #
    let newIdx = idx + currentDirection;
        //if index is < 0, set it to index of last player's id
    //const keys = Object.keys(Game.players);//['A', 'B', 'C', 'D']
   // const numPlayers = keys.length;
    if(newIdx < 0) {
        //get the idx of the last player's id
        newIdx = ALPHABET.length - 1;
    }
    if(newIdx >= ALPHABET.length) {
        newIdx = 0;
    }
        //then, get id of new index in alph array
    const newPlayersTurn = ALPHABET[newIdx];
    Game.playersTurn = newPlayersTurn;
}
//output: to change the Game.playersTurn to the next player's turn

function playCard(playerId, cardName){
    let color = getCardColor(cardName);
    let val = getCardValue(cardName);
    let isCardPlayable = cardIsPlayable(color, val);
    //if card is plybl = true and play card
    //else, put as false and inform player
    if(cardIsPlayable){
        if(val === 'skip'){
            //if value is === to skip, then run skip function
            skipTurn(); 
        }if(val === 'draw_two'){
             //if value is === to draw_two, then run draw two function
            playerDrawTwo(); 
        }if(val === 'draw_four'){
             //if value is === to draw_four, then run draw four function
            playerDrawFour(); 
        }if(val === 'reverse'){
             //if value is === to reverse, then run reverse function
            reverseTurn(); 
        }if(val === 'wild'){
             //if value is === to wild, then run wild card function
            playWildCard(); 
        }if(color === Game.topCardColor){
            //
            return true; 
        }else { 
            prompt('Card is not playable. Please play again.');
    }
}
    
}

function playerDrawCard(playerId){
    //it should draw one card off the top of the deck and put in
    //players hand
    let player = Game.players[playerId];
    let card =  dealCard(Game.deck);
    player.cards.push(card);
    
}

function skipTurn(){
    changePlayersTurn();
}

function playerDrawTwo(playerId) {
    //it shld drw two crds off the top of the deck and put 
    //them in the player's hand
    playerDrawCard(playerId);
    playerDrawCard(playerId);
}

function playerDrawFour(playerId) {
    //it shld drw four crds off the top of the deck and put 
    //them in the player's hand
    playerDrawCard(playerId);
    playerDrawCard(playerId);
    playerDrawCard(playerId);
    playerDrawCard(playerId);
}

function reverseTurn() {
    Game.turnDirection = Game.turnDirection * -1;
}

function playWildCard(playerId, topColor){
    var wildCard = prompt("What color would you like to choose?");
    if (wildCard === 'green' || wildCard === 'blue' || 
    wildCard === 'red' || wildCard === 'yellow'){
        Game.topColor = wildCard;
    } else {
        alert("Invalid color. Choose red, blue, yellow, or green.")
        playWildCard();
    }

}

function cardIsPlayable(cardColor, cardValue) {
    //if card in hand is same clr or sm val then play
    if(cardColor === Game.topCardColor){
        return true;
    }
    if(cardValue === Game.topCardValue) {
        return true;
    }
    if(cardColor === 'wild') {
        return true;
    }
    //else cannot play
    return false;
}

function endTurn() {
    changePlayersTurn();
}