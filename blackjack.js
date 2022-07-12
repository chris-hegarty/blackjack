// put "HIT" in a function, then add that to the event listener.
console.log("May the odds be ever in your favor.");
// Store suits and faces in their own arrays
let suits = ["Hearts","Clubs","Spades","Diamonds"];
let faces = ["Ace","King","Queen","Jack",2,3,4,5,6,7,8,9,10];
//need to create these arrays outside of their functions to be able to access and change them.
let computerHand = [];
let playerHand = [];
let computerScore = 0;
let playerScore = 0;
let playerCard = document.getElementById("player-card");
let whoWins = document.getElementById("who-wins");
let newCard = [];
// Combine these with nested for loops
//pretend Ace is 11 starting off, change to one later.
//wrap it all in a function.
function getDeck(){
    // Initialize an empty array for the deck 
    let deck = new Array();
        // loop through the arrays... :
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < faces.length; j++) {
            // ...to make a card object
            let card = {
                suit: suits[i],  
                face: faces[j],
            }; 
            //  use .value and if statements to assign point values
            // === compares the values
            // = assigns the value
            if (faces[j] === "Ace"){
                card.value = 11;
            } else if( faces[j] === "King" || faces[j] === "Queen" || faces[j] === "Jack"){
                card.value = 10;
            } else {
                card.value = faces[j];
            }
            deck.push(card);
        }
    } 
    return deck; 
}
// store the return value of the function in variable so you can use it later.
let cardDeck = getDeck();
// console.log(cardDeck);

//shuffle the array. Found this on StackOverflow.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// 1) Get today's date
// 2) Get birthdate
// 3) Compare if difference is greater than 16.
// Also found this pattern on StackOverflow and tweaked it:
function getAge(dateString) {
    const now = new Date();
    const birthday = new Date(dateString);
    const age = now.getFullYear() - birthday.getFullYear();
    var m = now.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthday.getDate())) {
        age--;
    }
    return age;
}

let ageSubmit = document.getElementById("age-button");

ageSubmit.addEventListener("click", (e) => {
    let birthdayInput = document.getElementById("player-dob").value;
    //Validate birth date input
    let playerName = document.getElementById("player-name").value;
    let ageValue = getAge(birthdayInput);
    let ageCheck = document.querySelectorAll(".age-check");
    let message = document.getElementById("welcome-message");

    if(ageValue > 16){
        for (let i = 0; i < ageCheck.length; i++) {
            ageCheck[i].classList.add("display-none");
        }
        message.innerHTML = `Welcome ${playerName}!`;
        document.getElementById("table").classList.remove("hidden");
        } else if(ageValue < 16){
            message.innerHTML = `You are not old enough to enter`;
        } else {
            message.innerHTML = `Please enter a valid birth date.`;
    }
});

//----------SHUFFLE AND DEAL BUTTONS:-------------------------
let userShuffle = document.getElementById("shuffle");
let initialDeal = document.getElementById("deal-initial");
userShuffle.addEventListener("click", (e) => {
    shuffleArray(cardDeck);
    userShuffle.classList.add("display-none");
    initialDeal.classList.remove("display-none")
    console.log(cardDeck);
});

//---------DEAL - Deal two cards----------------------
//-Add event listener for deal button.
//-remove first two cards from card deck

initialDeal.addEventListener("click", (e) => {
//remove first two value indices from card array and store them in a new array for the computer and the player:
computerHand = cardDeck.splice(0,2);
playerHand = cardDeck.splice(0,2);
// store the value of each pair of cards:
computerScore = computerHand[0].value + computerHand[1].value;
playerScore = playerHand[0].value + playerHand[1].value;
// console.log(computerHand);
console.log(playerHand);
// console.log( computerScore );    
console.log( playerScore );
//output the player's face, suit and value to the page.
// playerCard = document.getElementById("player-card");
playerCard.innerHTML = 
`<div>
    <span>
        ${playerHand[0].face} of 
    </span>
    <span>
        ${playerHand[0].suit}
    </span>
</div>
<div>
    <span>
        ${playerHand[1].face} of
    </span> 
    <span>
        ${playerHand[1].suit}
    </span>
</div>
<div>Total = ${playerScore}</div>`;
// hide initial deal button...
initialDeal.classList.add("display-none");

//check the sum of the values. 
//If === 21: show cards, print "HOUSE WINS!" message, add 1 to wins box, add 1 to player's loss box, end game, display "NEW GAME" button.
});

//    Create and append player's HIT and STAND buttons.
const playerChoices = document.getElementById("player-choices");
hitButton = document.createElement("button");
hitButton.setAttribute("id","hit-button");
standButton = document.createElement ("button");
standButton.setAttribute("id","stand-button")
hitButton.innerHTML = `HIT`;
standButton.innerHTML = `STAND`;
playerChoices.append(hitButton);
playerChoices.append(standButton);

//---------HIT - Deal one card-----------------

function hit(){
    newCard = cardDeck.shift();
    console.log(newCard.value);
    playerScore += newCard.value;
    let createNewCard = document.createElement("div");
    createNewCard.innerHTML = 
    `<div>
            <span>${playerHand[0].face} of    
            ${playerHand[0].suit} </span>
            <div> Total = ${playerScore}</div>
        </div>
    `;
    playerCard.append(createNewCard);
    if(playerScore > 21){
        whoWins.innerHTML = `<h3>HOUSE WINS</h3>`;
        document.getElementById("computer-wins-num").innerHTML++;
        document.getElementById("player-losses-num").innerHTML++;
    }
    console.log(playerScore);
}

let playerHit = document.getElementById("hit-button");
playerHit.addEventListener("click", hit);


//If === 21: print "PLAYER WINS!". Add 1 to wins box, add 1 to computer's loss box, end game, display NEW GAME button.
//NEW GANE button should hide DEAL button and show SHUFFLE button.

//---------STAND --------------
// Code to deal cards to House goes here.


