(function () {
  const grid = document.querySelector('.grid');

  grid.addEventListener('click', (event) => {
    if (event.target.parentNode.classList.contains('card-rotate')) {
      event.target.parentNode.classList.remove('card-rotate');
    } else if (event.target.parentNode.classList.contains('card-inner')) {
      event.target.parentNode.classList.add('card-rotate');
    }
  });
})();
