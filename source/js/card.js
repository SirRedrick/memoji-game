class Card {
  constructor(HTMLCardElement) {
    this.card = HTMLCardElement;
    this.face;
    this.pairId;
    this.isOpen = false;
    this.isMatched = false;
  }

  setFace = (face) => {
    this.face = face;
    this.card.children[0].children[1].innerHTML = face;
  };

  setPair = (_pairId) => {
    this.pairId = _pairId;
  };

  setAsRight = () => {
    this.card.children[0].classList.add('card-right');
  };

  setAsWrong = () => {
    this.card.children[0].classList.add('card-wrong');
  };

  setAsDefault = () => {
    if (this.card.children[0].classList.contains('card-wrong')) {
      this.card.children[0].classList.remove('card-wrong');
    }
  };

  rotate = () => {
    if (
      this.card.children[0].classList.contains('card-rotate') &&
      !this.card.children[0].classList.contains('card-right')
    ) {
      this.card.children[0].classList.remove('card-rotate');
    } else if (this.card.children[0].classList.contains('card-inner')) {
      this.card.children[0].classList.add('card-rotate');
    }
  };

  getId = () => this.card.id;

  logCard = () => {
    console.log(this.card, this.cardFace);
  };
}
