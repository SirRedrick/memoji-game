class Game {
  constructor(HTMLGameElement) {
    this.game = HTMLGameElement;
    this.initCards();
    this.flipCard();
  }

  initCards = () => {
    const faces = [
      '🐶',
      '🐱',
      '🐭',
      '🐹',
      '🐰',
      '🐻',
      '🐼',
      '🐨',
      '🐯',
      '🦁',
      '🐮',
      '🐷',
      '🐸',
      '🐙',
      '🐵',
      '🦄',
      '🐞',
      '🦀',
      '🐟',
      '🐊',
      '🐓',
      '🦃',
      '🐿',
      '🐼',
    ];

    const cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach((card, index) => {
      new Card(card, faces[index]);
    });
  };

  flipCard = () => {
    this.game.addEventListener('click', (event) => {
      if (event.target.parentNode.classList.contains('card-rotate')) {
        event.target.parentNode.classList.remove('card-rotate');
      } else if (event.target.parentNode.classList.contains('card-inner')) {
        event.target.parentNode.classList.add('card-rotate');
      }
    });
  };
}

// const cards = Array.from(document.querySelectorAll('.card'));
// const cardFaces = [
//   '1',
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
//   '7',
//   '8',
//   '9',
//   '10',
//   '11',
//   '12',
// ];

// cards.forEach((card, index) => {
//   const temp = new Card(card, cardFaces[index]);
//   cardRefferencesArray.push(temp);
// });
