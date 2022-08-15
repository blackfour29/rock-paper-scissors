// buttons
const playButton = document.querySelector(".btn-play");
const closeBtn = document.querySelector(".close-button");
const gameBtns = document.querySelector(".game-buttons");
const homeBtns = document.querySelectorAll(".home-button");
const playAgainBtns = document.querySelectorAll(".play-again-button");

// choices
const playerIcons = document.querySelectorAll(".player-icon");
const computerIcons = document.querySelectorAll(".computer-icon");
const choiceIcons = document.querySelectorAll(".choice-icon");
const playerRock = document.querySelector(".player-choice-rock");
const playerPaper = document.querySelector(".player-choice-paper");
const playerScissors = document.querySelector(".player-choice-scissors");
const computerRock = document.querySelector(".computer-choice-rock");
const computerPaper = document.querySelector(".computer-choice-paper");
const computerScissors = document.querySelector(".computer-choice-scissors");

// UI
const gameUI = document.querySelector(".game-UI");
const introPage = document.querySelector(".intro");
const introTitle = document.querySelector(".title");
const playerScoreEl = document.querySelector(".player-score");
const computerScoreEl = document.querySelector(".cpu-score");
const modalContainer = document.querySelector(".modal-container");
const modalTitle = document.querySelector(".modal--title");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const mainContainer = document.querySelector(".container");
const modalCustomText = document.querySelector(".modal--custom-text");

let playerChoice;
let firstRound;
let playerScore, computerScore;
let lastRoundPlayerPick, lastRoundComputerPick, lastRoundWinner;
let roundResult;
let highlightTimer;


/////////// Event listeners

playButton.addEventListener("click", function(){
  switchToGameUI();
  startGame();
});

playerIcons.forEach( playerIcon => {
    playerIcon.addEventListener("click" , function ()
    {
      turnOffIconHighlights();

      let playerChoice = getPlayerChoice(playerIcon);
      let computerChoice = getComputerChoice();

      highlightComputerChoice(computerChoice);
      
      roundResult = playRound(playerChoice, computerChoice);

      highlightWinnerAndLoser(roundResult, playerChoice, computerChoice);
      updateScoresUI(roundResult, false);
      checkWinner();
      startHighlightTimer();
    })
})

playAgainBtns.forEach( btn => btn.addEventListener("click", function(){
  switchToGameUI();
  startGame();
}));

homeBtns.forEach( btn => btn.addEventListener("click", function(){
  switchToHomePage();
}));

body.addEventListener("keyup", function(event){
  if(event.key === "Escape" && (!modalContainer.classList.contains("hidden")))
      closeModal();
})

overlay.addEventListener("click", closeModal);

closeBtn.addEventListener("click", closeModal);

const mainImage = document.querySelector(".game-rules-image");
const imageWrapper = document.querySelector(".image-wrapper");

imageWrapper.addEventListener("mouseover", function(){
  mainImage.classList.remove("rotate-back");
  mainImage.classList.add("rotate-animation");
});

imageWrapper.addEventListener("mouseleave", function(){
  mainImage.classList.remove("rotate-animation");
  mainImage.classList.add("rotate-back");
})

/////////// Game logic

function startGame()
{
  firstRound = true;
  playerScore = 0;
  computerScore = 0;

  updateScoresUI( null, true);
  removeOverlayAndGameBtns();
  toggleIconsHoverEffect("on");
  toggleUserInteraction("on");
}

function playRound(playerChoice, computerChoice)
{        
    roundResult = checkRoundResult(playerChoice, computerChoice);

    lastRoundPlayerPick = playerChoice;
    lastRoundComputerPick = computerChoice;

    // 1 player , 0 tie , -1 computer
    if(roundResult === 1)
        lastRoundWinner = "player";
    else if(roundResult === -1)
        lastRoundWinner = "computer";
    else if(roundResult === 0)
        lastRoundWinner = "none";
      
    return roundResult;
}

function getComputerChoice()
{
    let computerChoice;

    if(firstRound)
    {
        computerChoice = "paper";
        firstRound = false;
    }
    else
    {
        if(lastRoundWinner === "player")
        {
            if(lastRoundPlayerPick === "rock")
                computerChoice = "paper";
            else if(lastRoundPlayerPick === "paper")
                computerChoice = "scissors";
            else if(lastRoundPlayerPick === "scissors")
                computerChoice = "rock";
        }

        else if(lastRoundWinner === "computer")
        {
            if(lastRoundPlayerPick === "rock")
                computerChoice = "rock";
            else if(lastRoundPlayerPick === "paper")
                computerChoice = "paper";
            else if(lastRoundPlayerPick === "scissors")
                computerChoice = "scissors";
        }
        
        // else if(lastRoundWinner === "none")
        // {
        //     if(lastRoundPlayerPick === "rock")
        //         computerChoice = "paper";
        //     else if(lastRoundPlayerPick === "paper")
        //         computerChoice = "scissors";
        //     else if(lastRoundPlayerPick === "scissors")
        //         computerChoice = "rock";
        // }
        
        else
        {
            // random choice
            let optionsArray = ["rock", "paper", "scissors"];
            const randomNumber = Math.floor(Math.random() * 3);
            return optionsArray[randomNumber];
        }
    }
    return computerChoice;
}

function checkWinner()
{
  if(playerScore === 10 || computerScore === 10)
  {
    turnOffIconHighlights();
    showModal();
    freezeUI();
  }

  if(playerScore === 10)
    configureModal("win");
  else if(computerScore === 10)
    configureModal("lose");
}

function checkRoundResult(playerChoice, computerChoice)
{
    switch(playerChoice)
    {
        case("rock"): 
            if(computerChoice === "rock")
                return 0;
            else if(computerChoice === "paper")
                return -1;
            else if(computerChoice === "scissors")
                return 1;
            break;
        
        case("paper"):
        {
            if(computerChoice === "rock")
                return 1;
            else if(computerChoice === "paper")
                return 0;
            else if(computerChoice === "scissors")
                return -1;
            break;
        }

        case("scissors"):
        {
            if(computerChoice === "rock")
                return -1;
            else if(computerChoice === "paper")
                return 1;
            else if(computerChoice === "scissors")
                return 0;
            break;
        }
    }
}

// gets the user's choice based on the class of the element he clicked on
function getPlayerChoice(DOMelement)
{
  //first class in the DOMelement is player-choice-rock / player-choice-paper / player-choice-scissors
  let elementClass = (DOMelement.classList).toString().split(" ")[0].split("-");
  let choice = elementClass[elementClass.length-1];
  return choice;
}