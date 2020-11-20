class Card {
  constructor(HTMLCardElement, face) {
    this.card = HTMLCardElement;
    this.card.children[0].children[1].innerHTML = face;
    this.face = face;
    this.isOpen = false;
    this.isMatched = false;
  }

  logCard() {
    console.log(this.card, this.cardFace);
  }
}
