class Players{
  constructor(name, symbol, isTurn){
    this.name = name;
    this.symbol = symbol;
    this.isTurn = isTurn;
  }

}

const player1 = new Players('player1', 'img/o.svg', true);
const player2 = new Players('player2', 'img/x.svg', false);

const player1li = document.getElementById('player1');
const player2li = document.getElementById('player2');

if(player1.isTurn){
  removeClass(player2li, 'active')
  addClass(player1li,'active')
  hoverOverEffect(player1)
} else{
  removeClass(player1li, 'active')
  addClass(player2li,'active')
  hoverOverEffect(player2)
}

function hoverOverEffect(player){
  const boxes = document.querySelector('.boxes')


  boxes.addEventListener('mouseover', function addImage(e){

    e.target.style.backgroundImage = `url(${player.symbol})`
  })

  boxes.addEventListener('mouseout', function removeImages(e){
    e.target.style.backgroundImage = ''
  })

  boxes.addEventListener('click', function userClick(e){
    if(player === player1){
    addClass(e.target, 'box-filled-1')
    player1.isTurn = false;
    player2.isTurn = true;
  }else{
    addClass(e.target, 'box-filled-2')
    player1.isTurn = true;
    player2.isTurn = false;
  }
  })
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
