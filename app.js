const doors = document.querySelectorAll('.door');
const text = document.querySelector('.text');

const items = [
  { emoji: '🥦', price: true, open: false },
  { emoji: '💩', price: false, open: false },
  { emoji: '💩', price: false, open: false },
];

let game = 0;
let wins = 0;
let round, choice;
let winRatio = 0;

doors.forEach((door, idx) => door.addEventListener('click', () => {
  if (!items[idx].open) {
    choice = idx;
    door.classList.add('selected');
    round++;
  }

  if (round == 2) {
    checkWin();
    revealAll();

  } else if (round == 1) {
    text.innerText = 'Zostajesz czy zmieniasz?'
    revealOne()
  }
}))

const newGame = () => {
  round = 0;
  choice = -1;
  closeAll();
  shufflePrice();
  addPriceToDoors();
}

const closeAll = () => {
  doors.forEach((door, idx) => {
    door.classList.remove('selected'); 
    door.children[0].classList.remove('open');
    items[idx].open = false;
  })
}

const shufflePrice = () => {
  for (let i = 0; i < items.length; i++) {
    const idx = Math.floor(Math.random() * items.length);
    const temp = items[i];
    items[i] = items[idx];
    items[idx] = temp;
  }
}

const addPriceToDoors = () => {
  doors.forEach((door, idx) => {
    door.children[1].innerHTML = '';
    const content = document.createElement('div');
    content.classList.add('content');
    content.innerText = items[idx].emoji;

    door.children[1].appendChild(content);
  })
}

const revealOne = () => {
  for (let i = 0; i < items.length; i++) {
    if (i != choice && !items[i].price) {
      doors[i].children[0].classList.add('open');
      items[i].open = true;
      break;
    }
  }
}

const checkWin = () => {
  const win = items[choice].price;
  game++;
  if (win) wins++;
  winRatio=(wins / game * 100)
  text.textContent = (win ? 'Wygrałeś' : 'Przegrałeś') + `, win ratio: ${winRatio.toFixed()}%`;
}

const revealAll = () => {
  doors.forEach((door, idx) => {
    door.children[0].classList.add('open')
    items[idx].open = true;
  })
}


newGame();