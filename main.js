// Parámetro: id de la opción correcta (e.g. "opt2")
const correctAnswer = "opt2";

window.addEventListener('load', () => {
  // Referencias
  const videoEl    = document.querySelector('#judoVid');
  const opts       = document.querySelectorAll('.answer');
  const cross      = document.querySelector('#cross');
  const confetti   = document.querySelector('#confetti');

  // Reproducir vídeo al detectar marcador
  document.querySelector('a-marker').addEventListener('markerFound', () => {
    videoEl.play();
    // Reset estados
    cross.setAttribute('visible', false);
    confetti.setAttribute('visible', false);
  });

  // Manejar clicks/taps en opciones
  opts.forEach(opt => {
    opt.addEventListener('click', () => {
      const selected = opt.getAttribute('id');
      if (selected === correctAnswer) {
        confetti.setAttribute('visible', true);
      } else {
        cross.setAttribute('visible', true);
      }
    });
  });
});
