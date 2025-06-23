// Parámetro: id de la opción correcta (e.g. "opt2")
const correctAnswer = "opt2";

window.addEventListener('load', () => {
  // Referencias
  const videoEl = document.querySelector('#judoVid');
  const opts = document.querySelectorAll('.answer');
  const correctText = document.querySelector('#correct-text');
  const incorrectText = document.querySelector('#incorrect-text');
  const successBackground = document.querySelector('#success-background');

  console.log('Botones encontrados:', opts.length); // Debug

  // Reproducir vídeo al detectar marcador
  document.querySelector('a-marker').addEventListener('markerFound', () => {
    videoEl.play();
    // Reset estados
    correctText.setAttribute('visible', false);
    incorrectText.setAttribute('visible', false);
    successBackground.setAttribute('visible', false);
    successBackground.removeAttribute('animation');
    
    // Resetear colores de todos los botones
    opts.forEach(option => {
      option.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
    });
  });

  // Manejar clicks/taps en opciones
  opts.forEach((opt, index) => {
    console.log(`Configurando botón ${index + 1}:`, opt.getAttribute('id')); // Debug
    
    // Usar múltiples eventos para mayor compatibilidad
    ['click', 'mousedown', 'touchstart'].forEach(eventType => {
      opt.addEventListener(eventType, (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const selected = opt.getAttribute('id');
        console.log('Botón seleccionado:', selected); // Debug
        
        if (selected === correctAnswer) {
          // RESPUESTA CORRECTA
          console.log('Respuesta correcta!'); // Debug
          
          // Mostrar texto "CORRECTO" 
          correctText.setAttribute('visible', true);
          
          // Mostrar fondo que crece una vez
          successBackground.setAttribute('visible', true);
          successBackground.setAttribute('animation', {
            property: 'scale',
            to: '3 3 3',
            dur: 2000,
            easing: 'easeOutQuart'
          });
          
          // Cambiar color del botón correcto a verde
          opt.setAttribute('material', 'color: #00FF00; transparent: true; opacity: 0.9');
          
          // Ocultar efectos después de 4 segundos
          setTimeout(() => {
            correctText.setAttribute('visible', false);
            successBackground.setAttribute('visible', false);
            successBackground.removeAttribute('animation');
            successBackground.setAttribute('scale', '1 1 1'); // Reset escala
            opt.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
          }, 4000);
          
        } else {
          // RESPUESTA INCORRECTA
          console.log('Respuesta incorrecta!'); // Debug
          
          // Mostrar texto "INCORRECTO"
          incorrectText.setAttribute('visible', true);
          
          // Cambiar color del botón incorrecto a rojo
          opt.setAttribute('material', 'color: #FF4444; transparent: true; opacity: 0.9');
          
          // Ocultar efectos después de 3 segundos
          setTimeout(() => {
            incorrectText.setAttribute('visible', false);
            opt.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
          }, 3000);
        }
      });
    });
  });
});
