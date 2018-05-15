(function startPage(){
	document.querySelector('.board').hidden=true;
	const someHtml =
	`<div class="screen screen-start" id="start">
		<head>
	  	<link rel="stylesheet" href="css/style.css">
	  </head>
	  <header>
	  	<h1>Tic Tac Toe</h1>
	    <a href="#" onClick='startGame()' class="button">Start game</a>
	  </header>
	</div>`
	document.body.insertAdjacentHTML('afterbegin', someHtml);
})();

function startGame(){
	document.querySelector('#start').hidden=true;
	document.querySelector('#finish').hidden=true;
	document.querySelector('.board').hidden=false;
	switchProperties(player2, player1, 1);
	boxList.forEach(box => {
		removeClass(box, 'box-filled-1');
		removeClass(box, 'box-filled-2');
	});
	origBoard = Array.from(Array(9).keys());
	symbol = 'img/o.svg';
}

let turn = 'box-filled-1';
let symbol = 'img/o.svg';
let origBoard = Array.from(Array(9).keys());

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

const boxList = document.querySelectorAll('.box');
const boxes = document.querySelector('.boxes');

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
}

function nextStep(squareId, player) {
	origBoard[squareId] = player;
	//console.log(origBoard);
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
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
		switchProperties(player1, player2, 2)
	} else{
		symbol = 'img/o.svg';
		switchProperties(player2, player1, 1)
	}
};

function switchProperties(pastPlayer, presentPlayer, presentPlayerNum){
	removeClass(pastPlayer, 'active')
	addClass(presentPlayer,'active')
	turn = `box-filled-${presentPlayerNum}`;
}

function gameOver(gameWon) {
	document.querySelector('.board').hidden=true;
	let winner;
	const finishPage = document.querySelector('#finish');
	gameWon.player === 'box-filled-1' ? addClass(finishPage, 'screen-win-one') :
	addClass(finishPage, 'screen-win-two');
	finishPage.hidden = false;
}

(function endPage(){
	const someHtml = `
	<div class="screen screen-win" id="finish">
		<head>
			<link rel="stylesheet" href="css/style.css">
		</head>
		<header>
			<h1>Tic Tac Toe</h1>
			<p class="message"></p>
			<a href="#" onClick='startGame()' class="button">New game</a>
		</header>
	</div>`
	document.body.insertAdjacentHTML('afterbegin', someHtml);
	document.querySelector('#finish').hidden=true;
})()
/* =============================================================================
                            CSS Classes
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
