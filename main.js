// Parámetro: id de la opción correcta (e.g. "opt2")
const correctAnswer = "opt2";

window.addEventListener('load', () => {
  // Referencias
  const videoEl    = document.querySelector('#judoVid');
  const opts       = document.querySelectorAll('.answer');
  const cross      = document.querySelector('#cross');
  const confetti   = document.querySelector('#confetti');
  const correctText = document.querySelector('#correct-text');
  const incorrectText = document.querySelector('#incorrect-text');

  // Reproducir vídeo al detectar marcador
  document.querySelector('a-marker').addEventListener('markerFound', () => {
    videoEl.play();
    // Reset estados
    cross.setAttribute('visible', false);
    confetti.setAttribute('visible', false);
    confetti.setAttribute('epic-confetti', 'enabled: false');
    correctText.setAttribute('visible', false);
    incorrectText.setAttribute('visible', false);
  });

  // Manejar clicks/taps en opciones
  opts.forEach(opt => {
    opt.addEventListener('click', () => {
      const selected = opt.getAttribute('id');
      if (selected === correctAnswer) {
        // RESPUESTA CORRECTA - Celebración épica
        
        // Mostrar texto "CORRECTO" con animación pulsante
        correctText.setAttribute('visible', true);
        
        // Activar confeti épico
        confetti.setAttribute('visible', true);
        confetti.setAttribute('epic-confetti', 'enabled: true');
        
        // Cambiar color de fondo del botón correcto
        opt.setAttribute('material', 'color: #00FF00; transparent: true; opacity: 0.8');
        
        // Sonido de celebración (si tienes un archivo de audio)
        // audioCorrect.play();
        
        // Ocultar efectos después de 6 segundos
        setTimeout(() => {
          confetti.setAttribute('epic-confetti', 'enabled: false');
          confetti.setAttribute('visible', false);
          correctText.setAttribute('visible', false);
          opt.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
        }, 6000);
        
      } else {
        // RESPUESTA INCORRECTA - Efectos de error
        
        // Mostrar texto "INCORRECTO" con animación de vibración
        incorrectText.setAttribute('visible', true);
        
        // Mostrar cruz de error
        cross.setAttribute('visible', true);
        
        // Cambiar color del botón incorrecto
        opt.setAttribute('material', 'color: #FF4444; transparent: true; opacity: 0.8');
        
        // Efecto de vibración en el botón
        opt.setAttribute('animation__error', {
          property: 'rotation',
          to: '-90 0 5',
          dur: 100,
          direction: 'alternate',
          loop: 6,
          easing: 'easeInOutSine'
        });
        
        // Sonido de error (si tienes un archivo de audio)
        // audioError.play();
        
        // Ocultar efectos después de 4 segundos
        setTimeout(() => {
          cross.setAttribute('visible', false);
          incorrectText.setAttribute('visible', false);
          opt.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
          opt.removeAttribute('animation__error');
        }, 4000);
      }
    });
  });
});
