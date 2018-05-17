(function startPage(){
	document.querySelector('.board').hidden=true;
	const someHtml =
	`<div class="screen screen-start" id="start">
		<head>
	  	<link rel="stylesheet" href="css/style.css">
	  </head>
	  <header>
	  	<h1>Tic Tac Toe</h1>
			<div id='ai' class='start-input'>
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
										<span class ='nameSection' id = 'player-2-name'></span>`;
document.querySelector('#player1').parentElement.insertAdjacentHTML('afterend', someHtml)

})();
function startGame(){
	const player1nameValue = document.querySelector('#player1name').value;
	const player2nameValue = document.querySelector('#player2name').value;
	const ifAI = document.querySelector('#aiinput').checked;
	if(ifAI){
		document.querySelector('#player-1-name').innerHTML = player1nameValue;
		document.querySelector('#player-2-name').innerHTML = 'AI';

	} else{
		document.querySelector('#player-1-name').innerHTML = player1nameValue;
		document.querySelector('#player-2-name').innerHTML = player2nameValue;
	}
	document.querySelector('#start').hidden=true;
	document.querySelector('.board').hidden=false;
	const finishPage = document.querySelector('#finish');
	if(finishPage) finishPage.parentElement.removeChild(finishPage);

	boxList.forEach(box => {
		removeClass(box, 'box-filled-1');
		removeClass(box, 'box-filled-2');
	});
	origBoard = Array.from(Array(9).keys());
	randomStart();
}

function changeHandler(){
	const ifAI = document.querySelector('#aiinput').checked;
	const player2name = document.querySelector('#player2name');
	ifAI ? player2name.hidden=true : player2name.hidden=false;
}

function randomStart(){
	let randomNumber = Math.floor(Math.random() * 2) + 1;
	switchProperties(randomNumber);
	turn === 'box-filled-1' ? symbol = 'img/o.svg' : symbol = 'img/x.svg';
}

let symbol;
let turn;
let origBoard;
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');


const boxList = document.querySelectorAll('.box');

//add an id that correlates with the index of the boxes
boxList.forEach((box, i) => box.id = i);

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

boxes.addEventListener('mouseover', function addImage(e){
	if(!hasClass(e.target, 'box-filled-1') && !hasClass(e.target, 'box-filled-2'))
		e.target.style.backgroundImage = `url(${symbol})`;
});

boxes.addEventListener('mouseout', function removeImages(e){
  e.target.style.backgroundImage = '';
});

boxes.addEventListener('click', function nextMove(e){
	if(!hasClass(e.target, 'box-filled-1') && !hasClass(e.target, 'box-filled-2')){
		addClass(e.target, turn);
		turnClick(e);
		switchTurn();
	}
});

function turnClick(e){
	nextStep(e.target.id, turn)
	if(turn ===)
}

function nextStep(squareId, player) {
	origBoard[squareId] = player;
	let gameWon = checkWin(origBoard, player)
	gameWon ? gameOver(gameWon) : checkTie(origBoard);
};

function checkTie(board){
	const freeBoardPositions = board.filter(i=> typeof i === 'number');
	if(freeBoardPositions==0){
		gameDraw = {player: NaN};
		console.log('calling gameOverFunction')
		gameOver(gameDraw);
	}
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
	let gameWon = null;

	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1))
			gameWon = {index: index, player: player}
	}
	return gameWon;
}

function switchTurn(){
	if(turn === 'box-filled-1'){
		symbol = 'img/x.svg';
		switchProperties(2)
	} else{
		symbol = 'img/o.svg';
		switchProperties(1)
	}
};

function switchProperties(presentPlayerNum){

	turn = `box-filled-${presentPlayerNum}`;
	if(presentPlayerNum === 1){
		document.querySelector('#player-1-name').style.color = '';
		document.querySelector('#player-2-name').style.color = 'grey';
		removeClass(player2, 'active')
		addClass(player1,'active')
	} else{
		document.querySelector('#player-1-name').style.color = 'grey';
		document.querySelector('#player-2-name').style.color = '';
		removeClass(player1, 'active')
		addClass(player2,'active')
	}
}

function gameOver(gameWon) {
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
	if(gameWon.player === 'box-filled-1'){
		addClass(finishPage, 'screen-win-one');
		message.innerHTML = `${document.querySelector('#player1name').value} Wins!`
	} else if(gameWon.player === 'box-filled-2'){
		addClass(finishPage, 'screen-win-two');
		message.innerHTML = `${document.querySelector('#player2name').value} Wins!`;
	} else {
		addClass(finishPage, 'screen-win-tie');
		messageHTML.innerHTML = "It's a Tie!";
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
