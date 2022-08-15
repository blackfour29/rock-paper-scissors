function turnOffIconHighlights()
{ 
  clearTimeout(highlightTimer);
  choiceIcons.forEach ( icon => icon.classList.remove("icon-border-red"));
  choiceIcons.forEach ( icon => icon.classList.remove("icon-border-green"));
  computerIcons.forEach( icon => icon.style.transform = "scale(1.0)");
}

function freezeUI()
{
    toggleIconsHoverEffect("off");
    toggleUserInteraction("off");
}

function updateScoresUI(roundResult, resetScores=false)
{
    if(roundResult === 1)
    {
        playerScore++;
        playerScoreEl.textContent = playerScore; 
    }
    else if(roundResult === -1)
    {
        computerScore++;
        computerScoreEl.textContent = computerScore; 
    }
    
    if(resetScores)
    {
      playerScoreEl.textContent = 0;
      computerScoreEl.textContent = 0;
    }
}

function switchToGameUI()
{
  closeModal();
  introTitle.classList.add("hidden");
  introPage.classList.add("hidden");
  gameUI.classList.remove("hidden");
}

function closeModal()
{
  modalContainer.classList.add("hidden");
  overlay.classList.add("hidden");    
}

function switchToHomePage(){
  gameUI.classList.add("hidden");
  introPage.classList.remove("hidden");
  introTitle.classList.remove("hidden");
  gameBtns.classList.add("hidden");
  modalContainer.classList.add("hidden");
  toggleUserInteraction("on");
  overlay.classList.add("hidden");
}

function configureModal(result)
{
  if(result === "win")
  {
    modalTitle.textContent = "You Won!";
    modalCustomText.textContent = "Doesn't seem like you need it, but it may help you become even better.";
  }
  else if(result === "lose")
  {
    modalTitle.textContent = "You lost..."
    modalCustomText.textContent = "Seems the research may actually be right.";
  }
}

function highlightWinnerAndLoser(result, playerChoice, computerChoice)
{
  clearTimeout(highlightTimer);

  if(result === 1)
  {
    if(playerChoice === "rock")
      playerRock.classList.add("icon-border-green");
    else if(playerChoice === "paper")
      playerPaper.classList.add("icon-border-green");
    else if(playerChoice === "scissors")
      playerScissors.classList.add("icon-border-green")

    if(computerChoice === "rock")
      computerRock.classList.add("icon-border-red");
    else if(computerChoice === "paper")
      computerPaper.classList.add("icon-border-red");
    else if(computerChoice === "scissors")
      computerScissors.classList.add("icon-border-red");
  }
  else if(result === 0)
  {
    if(playerChoice === "rock")
      playerRock.classList.add("icon-border-red");
    else if(playerChoice === "paper")
      playerPaper.classList.add("icon-border-red");
    else if(playerChoice === "scissors")
      playerScissors.classList.add("icon-border-red")

    if(computerChoice === "rock")
      computerRock.classList.add("icon-border-red");
    else if(computerChoice === "paper")
      computerPaper.classList.add("icon-border-red");
    else if(computerChoice === "scissors")
      computerScissors.classList.add("icon-border-red");
  }
  else if(result === -1)
  {
    if(playerChoice === "rock")
      playerRock.classList.add("icon-border-red");
    else if(playerChoice === "paper")
      playerPaper.classList.add("icon-border-red");
    else if(playerChoice === "scissors")
      playerScissors.classList.add("icon-border-red")

    if(computerChoice === "rock")
      computerRock.classList.add("icon-border-green");
    else if(computerChoice === "paper")
      computerPaper.classList.add("icon-border-green");
    else if(computerChoice === "scissors")
      computerScissors.classList.add("icon-border-green");
  }
}

function removeOverlayAndGameBtns()
{
  overlay.classList.add("hidden");
  gameBtns.classList.add("hidden");
}

function toggleIconsHoverEffect(option)
{
  if( option === "on")
  {  
    playerIcons.forEach( icon => {
    icon.classList.add("scale-hover");
    });
  }

  else if( option === "off")
  {
    playerIcons.forEach( icon => {
    icon.classList.remove("scale-hover");
  });
  }
}


function toggleUserInteraction(option)
{
  if(option === "on")
  {
    mainContainer.style.cursor = "auto";
    body.style.backgroundColor = "var(--background-color)";
    gameUI.style.pointerEvents = "all";
    body.style.cursor = "auto";
  }
  else if(option === "off")
  {
    mainContainer.style.cursor = "not-allowed";
    body.style.backgroundColor = "var(--background-color)";
    body.style.cursor = "not-allowed";
    gameUI.style.pointerEvents = "none";
  } 
}


function highlightComputerChoice(computerChoice)
{
  if(computerChoice === "rock")
        computerRock.style.transform = "scale(1.1)";
  else if(computerChoice === "paper")
      computerPaper.style.transform = "scale(1.1)";
  else if(computerChoice === "scissors")
      computerScissors.style.transform = "scale(1.1)";
}

function startHighlightTimer()
{
  highlightTimer = setTimeout(turnOffIconHighlights, 2500);
}

function showModal()
{
  modalContainer.classList.remove("hidden");
  overlay.classList.remove("hidden");
  gameBtns.classList.remove("hidden");
}