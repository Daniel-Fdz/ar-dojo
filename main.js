// Parámetro: id de la opción correcta (e.g. "opt2")
const correctAnswer = "opt2";

window.addEventListener('load', () => {
  // Referencias
  const videoEl = document.querySelector('#judoVid');
  const opts = document.querySelectorAll('.answer');
  const correctText = document.querySelector('#correct-text');
  const incorrectText = document.querySelector('#incorrect-text');
  const successBackground = document.querySelector('#success-background');
  
  // Referencias a botones HTML superpuestos
  const htmlOpt1 = document.querySelector('#html-opt1');
  const htmlOpt2 = document.querySelector('#html-opt2');
  const htmlOpt3 = document.querySelector('#html-opt3');

  console.log('Botones encontrados:', opts.length);

  // Función para manejar respuesta
  function handleAnswer(selected) {
    console.log('Procesando respuesta:', selected);
    
    if (selected === correctAnswer) {
      // RESPUESTA CORRECTA
      console.log('Respuesta correcta!');
      
      correctText.setAttribute('visible', true);
      successBackground.setAttribute('visible', true);
      successBackground.setAttribute('animation', {
        property: 'scale',
        to: '3 3 3',
        dur: 2000,
        easing: 'easeOutQuart'
      });
      
      const correctBtn = document.querySelector(`#${selected}`);
      correctBtn.setAttribute('material', 'color: #00FF00; transparent: true; opacity: 0.9');
      
      setTimeout(() => {
        correctText.setAttribute('visible', false);
        successBackground.setAttribute('visible', false);
        successBackground.removeAttribute('animation');
        successBackground.setAttribute('scale', '1 1 1');
        correctBtn.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
      }, 4000);
      
    } else {
      // RESPUESTA INCORRECTA
      console.log('Respuesta incorrecta!');
      
      incorrectText.setAttribute('visible', true);
      const incorrectBtn = document.querySelector(`#${selected}`);
      incorrectBtn.setAttribute('material', 'color: #FF4444; transparent: true; opacity: 0.9');
      
      setTimeout(() => {
        incorrectText.setAttribute('visible', false);
        incorrectBtn.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
      }, 3000);
    }
  }

  // Reproducir vídeo al detectar marcador
  document.querySelector('a-marker').addEventListener('markerFound', () => {
    videoEl.play();
    correctText.setAttribute('visible', false);
    incorrectText.setAttribute('visible', false);
    successBackground.setAttribute('visible', false);
    successBackground.removeAttribute('animation');
    
    opts.forEach(option => {
      option.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
    });
  });

  // Configurar eventos en botones HTML superpuestos (GARANTIZA FUNCIONAMIENTO)
  htmlOpt1.addEventListener('click', () => {
    console.log('HTML Button 1 clicked');
    handleAnswer('opt1');
  });
  
  htmlOpt2.addEventListener('click', () => {
    console.log('HTML Button 2 clicked');
    handleAnswer('opt2');
  });
  
  htmlOpt3.addEventListener('click', () => {
    console.log('HTML Button 3 clicked');
    handleAnswer('opt3');
  });

  // Eventos táctiles en botones HTML
  htmlOpt1.addEventListener('touchend', () => {
    console.log('HTML Button 1 touched');
    handleAnswer('opt1');
  });
  
  htmlOpt2.addEventListener('touchend', () => {
    console.log('HTML Button 2 touched');
    handleAnswer('opt2');
  });
  
  htmlOpt3.addEventListener('touchend', () => {
    console.log('HTML Button 3 touched');
    handleAnswer('opt3');
  });

  // Configurar eventos directos en cada botón A-Frame (como respaldo)
  opts.forEach((opt, index) => {
    console.log(`Configurando botón A-Frame ${index + 1}:`, opt.getAttribute('id'));
    
    opt.addEventListener('touchend', (e) => {
      console.log('A-Frame touch end en:', opt.getAttribute('id'));
      handleAnswer(opt.getAttribute('id'));
    });
    
    opt.addEventListener('mouseup', (e) => {
      console.log('A-Frame mouse up en:', opt.getAttribute('id'));
      handleAnswer(opt.getAttribute('id'));
    });
  });

  // Esperar a que A-Frame esté completamente cargado
  document.querySelector('a-scene').addEventListener('loaded', () => {
    console.log('A-Frame cargado completamente');
    
    opts.forEach(opt => {
      opt.setAttribute('clickable', '');
      opt.flushToDOM();
    });
  });
});
