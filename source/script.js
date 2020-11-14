(function () {
  const grid = document.querySelector('.grid');
  const cards = Array.from(document.querySelectorAll('.card'));
  const cardFaces = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  cards.forEach((card, index) => {
    const temp = new Card(card, cardFaces[index]);
    cardRefferencesArray.push(temp);
  });

  grid.addEventListener('click', (event) => {
    if (event.target.parentNode.classList.contains('card-rotate')) {
      event.target.parentNode.classList.remove('card-rotate');
    } else if (event.target.parentNode.classList.contains('card-inner')) {
      event.target.parentNode.classList.add('card-rotate');
    }
  });
})();
