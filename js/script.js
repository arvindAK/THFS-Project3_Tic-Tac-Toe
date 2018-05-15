class Players{
  constructor(symbol, isTurn){
    this.symbol = symbol;
    this.isTurn = isTurn;
  }
}

const player1 = new Players('img/o.svg', true);
const player2 = new Players('img/x.svg', false);

let playCounter = 0;

const boxList = document.querySelectorAll('.box');

//add an id that correlates with the index of the boxes
boxList.forEach((box, i) => box.id = i);

const virtBoxes = Array.from(Array(9).keys());
let oMovesPlayed=[];
let xMovesPlayed=[];
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2]
]



function startGame(){

};

function switchTurn(){

};


function checkTurn(){
  oMovesPlayed = []
  xMovesPlayed = []
  const player1li = document.getElementById('player1');
  const player2li = document.getElementById('player2');
  playCounter +=1;
  whoWon()
  if(player1.isTurn){
    removeClass(player2li, 'active')
    addClass(player1li,'active')
  } else{
    removeClass(player1li, 'active')
    addClass(player2li,'active')
}}

checkTurn()

const boxes = document.querySelector('.boxes')

boxes.addEventListener('mouseover', function addImage(e){
  if(e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')){
    return;
  }else{
    player1.isTurn ? e.target.style.backgroundImage = `url(${player1.symbol})` :
    e.target.style.backgroundImage = `url(${player2.symbol})`
  }
})

boxes.addEventListener('mouseout', function removeImages(e){
  e.target.style.backgroundImage = ''
})

boxes.addEventListener('click', function userClick(e){
  if(e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')){
    return;
  } else{
    if(player1.isTurn){
      addClass(e.target, 'box-filled-1')
      player1.isTurn = false;
      player2.isTurn = true;
      checkTurn()
    }else if(player2.isTurn){
      addClass(e.target, 'box-filled-2')
      player1.isTurn = true;
      player2.isTurn = false;
      checkTurn()
      }
    }
});

function whoWon(){
  if(playCounter>4){
      boxList.forEach(box=>{
        if(hasClass(box, 'box-filled-1')) oMovesPlayed.push(box.id);
        if(hasClass(box, 'box-filled-2')) xMovesPlayed.push(box.id);
      })
  }
}


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
