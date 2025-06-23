// Parámetro: id de la opción correcta (e.g. "opt2")
const correctAnswer = "opt2";

window.addEventListener('load', () => {
  // Referencias
  const videoEl = document.querySelector('#judoVid');
  const opts = document.querySelectorAll('.answer');
  const cross = document.querySelector('#cross');
  const correctText = document.querySelector('#correct-text');
  const incorrectText = document.querySelector('#incorrect-text');
  const successBackground = document.querySelector('#success-background');

  // Reproducir vídeo al detectar marcador
  document.querySelector('a-marker').addEventListener('markerFound', () => {
    videoEl.play();
    // Reset estados
    cross.setAttribute('visible', false);
    correctText.setAttribute('visible', false);
    incorrectText.setAttribute('visible', false);
    successBackground.setAttribute('visible', false);
    
    // Resetear colores de todos los botones
    opts.forEach(option => {
      option.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
      option.removeAttribute('animation__error');
    });
  });

  // Manejar clicks/taps en opciones
  opts.forEach(opt => {
    opt.addEventListener('click', () => {
      const selected = opt.getAttribute('id');
      
      if (selected === correctAnswer) {
        // RESPUESTA CORRECTA
        
        // Mostrar texto "CORRECTO" con animación pulsante
        correctText.setAttribute('visible', true);
        
        // Mostrar fondo con degradado animado
        successBackground.setAttribute('visible', true);
        
        // Cambiar color del botón correcto a verde
        opt.setAttribute('material', 'color: #00FF00; transparent: true; opacity: 0.8');
        
        // Ocultar efectos después de 4 segundos
        setTimeout(() => {
          correctText.setAttribute('visible', false);
          successBackground.setAttribute('visible', false);
          opt.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
        }, 4000);
        
      } else {
        // RESPUESTA INCORRECTA
        
        // Mostrar solo texto "INCORRECTO"
        incorrectText.setAttribute('visible', true);
        
        // Cambiar color del botón incorrecto a rojo
        opt.setAttribute('material', 'color: #FF4444; transparent: true; opacity: 0.8');
        
        // Ocultar efectos después de 3 segundos
        setTimeout(() => {
          incorrectText.setAttribute('visible', false);
          opt.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
        }, 3000);
      }
    });
  });
});
