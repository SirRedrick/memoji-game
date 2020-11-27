class Game {
  constructor(HTMLGameElement, HTMLTimerElement, HTMLButtonElement) {
    this.game = HTMLGameElement;
    this.timer = HTMLTimerElement;
    this.button = HTMLButtonElement;

    this.cards = [];
    this.initButton();
    this.initCards();
    this.flipCard();
    this.pairs = 6;
    this.firstOpened = undefined;
    this.secondOpened = undefined;
    this.intervalId;
    this.time = 60;
  }

  initButton() {
    this.button.addEventListener('click', () => {
      this.button.parentNode.parentNode.style.display = 'none';
      this.restart();
    });
  }

  endgame(isWin) {
    this.button.parentNode.parentNode.style.display = 'block';
    if (isWin)
      this.button.parentNode.children[0].innerHTML = `
        <span style="animation-delay: 0.2s">W</span>
        <span style="animation-delay: 0.4s">i</span>
        <span style="animation-delay: 0.6s">n</span>
    `;
    else
      this.button.parentNode.children[0].innerHTML = `
      <span style="animation-delay: 0.2s">L</span>
      <span style="animation-delay: 0.4s">o</span>
      <span style="animation-delay: 0.6s">s</span>
      <span style="animation-delay: 0.8s">e</span>
  `;
  }

  restart() {
    this.cards = [];
    this.pairs = 6;
    this.firstOpened = undefined;
    this.secondOpened = undefined;
    this.time = 60;
    this.timer.innerHTML = '01:00';

    const cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach((card) => {
      card.children[0].classList.remove('card-rotate');
      card.children[0].classList.remove('card-right');
      card.children[0].classList.remove('card-wrong');
    });

    this.initCards();
  }

  initCards() {
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

    this.intervalId = setInterval(this.count, 1000);
  }

  count = () => {
    if (this.time !== 0 && this.pairs !== 0) {
      this.time -= 1;
      if (this.time >= 9) this.timer.innerHTML = `00:${this.time}`;
      else this.timer.innerHTML = `00:0${this.time}`;
    } else if (this.time === 0 && this.pairs !== 0) {
      console.log(this.intervalId);
      clearInterval(this.intervalId);
      this.endgame(false);
      console.log('count');
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
              clearInterval(this.intervalId);
              this.endgame(true);
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
