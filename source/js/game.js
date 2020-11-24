class Game {
  constructor(HTMLGameElement) {
    this.game = HTMLGameElement;
    this.cards = [];
    this.initCards();
    this.flipCard();
    this.pairs = 6;
    this.firstOpened = undefined;
    this.secondOpened = undefined;
  }

  initCards = () => {
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

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
      '🐼',
    ];

    const cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach((card, index) => {
      this.cards.push(new Card(card));
    });

    const tempCards = [...this.cards];

    while (tempCards.length > 0) {
      const faceIndex = getRandomArbitrary(0, faces.length);
      const pairIndex = getRandomArbitrary(1, tempCards.length);

      tempCards[0].setFace(faces[faceIndex]);
      tempCards[pairIndex].setFace(faces[faceIndex]);
      tempCards[0].setPair(tempCards[pairIndex].getId());
      tempCards[pairIndex].setPair(tempCards[0].getId());
      tempCards.splice(pairIndex, 1);
      tempCards.shift();

      faces.splice(faceIndex, 1);
    }
  };

  flipCard = () => {
    this.game.addEventListener('click', (event) => {
      if (
        event.target.parentNode.parentNode.id === this.firstOpened ||
        event.target.parentNode.parentNode.id === this.secondOpened
      ) {
        return;
      } else if (
        event.target.parentNode.classList.contains('card-rotate') &&
        !event.target.parentNode.classList.contains('card-right') &&
        event.target.parentNode.parentNode.id !== this.firstOpened &&
        event.target.parentNode.parentNode.id !== this.secondOpened
      ) {
        event.target.parentNode.classList.remove('card-rotate');
      } else if (event.target.parentNode.classList.contains('card-inner')) {
        event.target.parentNode.classList.add('card-rotate');
        if (this.firstOpened === undefined) {
          this.firstOpened = event.target.parentNode.parentNode.id;
          console.log(this.firstOpened);
        } else if (
          this.firstOpened !== undefined &&
          this.secondOpened === undefined
        ) {
          this.secondOpened = event.target.parentNode.parentNode.id;
          if (this.compareCards()) {
            this.cards[this.firstOpened].setAsRight();
            this.cards[this.secondOpened].setAsRight();
            this.pairs--;
            if (this.pairs === 0) {
              alert('YOU WON!');
            }
          } else {
            this.cards[this.firstOpened].setAsWrong();
            this.cards[this.secondOpened].setAsWrong();
          }
        } else {
          this.cards[this.firstOpened].rotate();
          this.cards[this.secondOpened].rotate();
          this.cards[this.firstOpened].setAsDefault();
          this.cards[this.secondOpened].setAsDefault();

          this.firstOpened = event.target.parentNode.parentNode.id;
          this.secondOpened = undefined;
        }
      }
    });
  };

  compareCards = () => {
    if (this.cards[this.firstOpened].pairId === this.secondOpened) {
      console.log(
        this.cards[this.firstOpened].pairId,
        this.cards[this.secondOpened]
      );
      console.log('YES');
      return true;
    } else {
      console.log(
        this.cards[this.firstOpened].pairId,
        this.cards[this.secondOpened]
      );
      console.log('NO');
      return false;
    }
  };
}
