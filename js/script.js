(function startPage(){
	document.querySelector('.board').hidden=true;
	const someHtml =
	`<div class="screen screen-start" id="start">
		<head>
	  	<link rel="stylesheet" href="css/style.css">
	  </head>
	  <header>
	  	<h1>Tic Tac Toe</h1>
			<div id='ai' class='start-input checkbox-div'>
				<label>
					<input type='checkbox' id='aiinput' onChange='changeHandler()'> Play against AI?
				</label>
			</div>
			<div id='player-names' class='start-input'>
				<input type='text' id='player1name' placeholder='Player #1 Name'>
				<input type='text' id='player2name' placeholder='Player #2 Name'>
			</div>
	    <a href="#" onClick='startGame()' class="button">Start game</a>
	  </header>
	</div>`;
	document.body.insertAdjacentHTML('afterbegin', someHtml);
})();

(function addNameSpan(){
	const someHtml = `<span class ='nameSection' id = 'player-1-name'></span>
										<span class ='nameSection' id = 'player-2-name'></span><br>
										<span class = 'nameSection' id = 'player-1-counter'></span>

										<span class ='nameSection' id = 'player-2-counter'></span>`;
	document.querySelector('#player1').parentElement.insertAdjacentHTML('afterend', someHtml)
})();

class Players{
  constructor(isTurn, symbol, cssStyle, counter){
		this.isTurn = isTurn;
		this.symbol = symbol;
		this.cssStyle = cssStyle;
		this.counter = counter;
  }
}
const player = new Players(false, 'img/o.svg', 'box-filled-1', 0);
const player_2 = new Players(false, 'img/x.svg', 'box-filled-2', 0);

const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');

let origBoard;

//winning combinations
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2]
];

const boxes = document.querySelector('.boxes');

const boxList = document.querySelectorAll('.box');

//add an id that correlates with the index of the boxes
boxList.forEach((box, i) => box.id = i);

// if ai is selected on the start screen, hide the second name input box
function changeHandler(){
	const ifAI = document.querySelector('#aiinput').checked;
	const player2name = document.querySelector('#player2name');
	ifAI ? player2name.hidden=true : player2name.hidden=false;
}

/* checkName set players properties depending on if ai is playing, called everytime
a new game starts*/
function checkName(){
	const player1nameValue = document.querySelector('#player1name').value;
	const player2nameValue = document.querySelector('#player2name').value;
	const player1name = document.querySelector('#player-1-name');
	const player2name = document.querySelector('#player-2-name');
	const player1counter = document.querySelector('#player-1-counter');
	const player2counter = document.querySelector('#player-2-counter');
	const ifAI = document.querySelector('#aiinput').checked;

	/* If play against ai checkbox is checked, set player name, add robot symbol
	for player 2. Add the counters and set the player type of player2 to aiPLayer */
	if(ifAI){
		player1name.innerHTML = player1nameValue;
		player1counter.innerHTML = `score: ${player.counter}`;
		addClass(player2name, 'ai-name');
		addClass(player2name, 'fas');
		addClass(player2name, 'fa-robot')
		player2counter.innerHTML = `score: ${player_2.counter}`;
		player.name = player1nameValue;
		player_2.name= 'AI';
		player_2.type = 'aiPlayer'
	}
	else{
		player1name.innerHTML = player1nameValue;
		player1counter.innerHTML = `score: ${player.counter}`;
		player2name.innerHTML = player2nameValue;
		player2counter.innerHTML = `score: ${player_2.counter}`;
		player.name = player1nameValue;
		player_2.name = player2nameValue;
	}
}

/* startGame called everytime user clicks new game button on the start
screen and game over screen */
function startGame(){
	const finishPage = document.querySelector('#finish');
	checkName();

	//hide start show game board
	document.querySelector('#start').hidden=true;
	document.querySelector('.board').hidden=false;
	//if finishPage div exists, remove the div
	if(finishPage) finishPage.parentElement.removeChild(finishPage);
	//for each square, remove 'box-filled-1' and 'box-filled-2' classes if they exist
	boxList.forEach(box => {
		removeClass(box, 'box-filled-1');
		removeClass(box, 'box-filled-2');
	});
	//set origBoard to an array of 9 keys
	origBoard = Array.from(Array(9).keys());

	//set both player1 and player2 turn to false
	player.isTurn = false;
	player_2.isTurn = false;
	randomStart();
}

function randomStart(){
	//50% chance of randomNumber === 1 or 2
	let randomNumber = Math.floor(Math.random() * 2) + 1;

	//if randomNumber less than 2 player1 goes first, else player2 goes first
	randomNumber <2 ? player.isTurn = true : player_2.isTurn = true;

	//add active player css class
	if(player.isTurn){
		addClass(player1,'active');
	} else{
			addClass(player2,'active');
			//if player2 goes first and player2 is ai, call switchTurns function
			if(player_2.type === 'aiPlayer') switchTurns(playableBox());
	};
};

boxes.addEventListener('mouseover', function addImage(e){
	//if box has not been clicked, add symbol background image, on mouseover
	if(!hasClass(e.target, 'box-filled-1') && !hasClass(e.target, 'box-filled-2'))
		player.isTurn ? e.target.style.backgroundImage = `url(${player.symbol})` :
		e.target.style.backgroundImage = `url(${player_2.symbol})`
});

boxes.addEventListener('mouseout', function removeImages(e){
	//remove background image when user doesn't hover over box
  e.target.style.backgroundImage = '';
});

boxes.addEventListener('click', function nextMove(e){
	//if box has not been clicked
	if(!hasClass(e.target, 'box-filled-1') && !hasClass(e.target, 'box-filled-2')){
		//if playing against ai and player1's turn to play
		if(player.isTurn && player_2.type === 'aiPlayer'){
			 switchTurns(e);
			 switchTurns(playableBox());
		 }//else if not playing against ai
		 else{
			 switchTurns(e)
		 }
	}
});

/* switch isTurn booleans, remove/add active css class, call the processTurn function*/
function switchTurns(e){
	if(player.isTurn){
		player.isTurn = false;
		player_2.isTurn = true;
		removeClass(player1, 'active')
		addClass(player2,'active')
		addClass(e.target, player.cssStyle);
		processTurn(e.target.id, player.cssStyle);
	}
	else if(player_2.type ==='aiPlayer'){
		removeClass(player2, 'active')
		addClass(player1,'active')
		player.isTurn = true;
		player_2.isTurn = false;
		addClass(document.getElementById(e), player_2.cssStyle);
		processTurn(e, player_2.cssStyle);

	} else{
		removeClass(player2, 'active')
		addClass(player1,'active')
		player.isTurn = true;
		player_2.isTurn = false;
		addClass(e.target, player_2.cssStyle);
		processTurn(e.target.id, player_2.cssStyle);
	}
}

//check for a winner or a tie game
function processTurn(squareId, marker) {
	origBoard[squareId] = marker;
	let gameState = checkWin(origBoard, marker)
	gameState ? gameOver(gameState) : checkTie(origBoard);
};

//check if any boxes are empty, if not call the gameOver function with gameDraw object
function checkTie(){
	if(emptySquares().length === 0){
		gameDraw = {winner: NaN};
		gameOver(gameDraw);
	}
}

//return an array of empty boxes
function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

//return a random empty box id number
function playableBox() {
	let randomNumber= Math.floor(Math.random() * emptySquares().length);
	return emptySquares()[randomNumber];
}

//
function checkWin(board, marker) {
	//plays is a board array with the player marker added to each occupied box
	let plays = board.reduce((a, e, i) => (e === marker) ? a.concat(i) : a, []);
	let gameState;

	//for each of the winCombos, if played boxes and the combos match return winner object
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1))
			gameState = {winner: marker}
	}
	return gameState;
}

//hide the board add finish screen
function gameOver(gameState) {
	document.querySelector('.board').hidden=true;
	const someHtml = `
	<div class="screen screen-win" id="finish">
		<head>
			<link rel="stylesheet" href="css/style.css">
		</head>
		<header>
			<h1>Tic Tac Toe</h1>
			<p class="message">Winner!</p>
			<a href="#" onClick='startGame()' class="button">New game</a>
		</header>
	</div>`
	document.body.insertAdjacentHTML('afterbegin', someHtml);

	const finishPage = document.querySelector('#finish');
	let message = document.querySelector('.message');

	//add a css class and alter the innerHTML of the message on screen, depending on winner
	if(gameState.winner === 'box-filled-1'){
		addClass(finishPage, 'screen-win-one');
		message.innerHTML = `${player.name} Wins!`
		player.counter +=1;
	} else if(gameState.winner === 'box-filled-2'){
		addClass(finishPage, 'screen-win-two');
		message.innerHTML = `${player_2.name} Wins!`;
		player_2.counter +=1;
	} else {
		addClass(finishPage, 'screen-win-tie');
		message.innerHTML = "It's a Tie!";
	}
};

/* =============================================================================
                            CSS classes helper functions
============================================================================= */
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
