// Parámetro: id de la opción correcta (e.g. "opt2")
const correctAnswer = "opt2";

window.addEventListener('load', () => {
  console.log('Página cargada, iniciando configuración...');

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

  console.log('Elementos encontrados:');
  console.log('- Botones A-Frame:', opts.length);
  console.log('- Botón HTML 1:', htmlOpt1 ? 'Sí' : 'No');
  console.log('- Botón HTML 2:', htmlOpt2 ? 'Sí' : 'No');
  console.log('- Botón HTML 3:', htmlOpt3 ? 'Sí' : 'No');

  // Función para manejar respuesta
  function handleAnswer(selected) {
    console.log('🎯 PROCESANDO RESPUESTA:', selected);
    
    if (selected === correctAnswer) {
      console.log('✅ RESPUESTA CORRECTA!');
      
      correctText.setAttribute('visible', true);
      successBackground.setAttribute('visible', true);
      successBackground.setAttribute('animation', {
        property: 'scale',
        to: '3 3 3',
        dur: 2000,
        easing: 'easeOutQuart'
      });
      
      const correctBtn = document.querySelector(`#${selected}`);
      if (correctBtn) {
        correctBtn.setAttribute('material', 'color: #00FF00; transparent: true; opacity: 0.9');
      }
      
      setTimeout(() => {
        correctText.setAttribute('visible', false);
        successBackground.setAttribute('visible', false);
        successBackground.removeAttribute('animation');
        successBackground.setAttribute('scale', '1 1 1');
        if (correctBtn) {
          correctBtn.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
        }
      }, 4000);
      
    } else {
      console.log('❌ RESPUESTA INCORRECTA!');
      
      incorrectText.setAttribute('visible', true);
      const incorrectBtn = document.querySelector(`#${selected}`);
      if (incorrectBtn) {
        incorrectBtn.setAttribute('material', 'color: #FF4444; transparent: true; opacity: 0.9');
      }
      
      setTimeout(() => {
        incorrectText.setAttribute('visible', false);
        if (incorrectBtn) {
          incorrectBtn.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
        }
      }, 3000);
    }
  }

  // Configurar eventos en botones HTML (método principal)
  if (htmlOpt1) {
    console.log('Configurando eventos para botón HTML 1');
    htmlOpt1.addEventListener('click', (e) => {
      console.log('🖱️ HTML Button 1 CLICK');
      e.preventDefault();
      handleAnswer('opt1');
    });
    htmlOpt1.addEventListener('touchstart', (e) => {
      console.log('👆 HTML Button 1 TOUCH');
      e.preventDefault();
      handleAnswer('opt1');
    });
  }
  
  if (htmlOpt2) {
    console.log('Configurando eventos para botón HTML 2');
    htmlOpt2.addEventListener('click', (e) => {
      console.log('🖱️ HTML Button 2 CLICK');
      e.preventDefault();
      handleAnswer('opt2');
    });
    htmlOpt2.addEventListener('touchstart', (e) => {
      console.log('👆 HTML Button 2 TOUCH');
      e.preventDefault();
      handleAnswer('opt2');
    });
  }
  
  if (htmlOpt3) {
    console.log('Configurando eventos para botón HTML 3');
    htmlOpt3.addEventListener('click', (e) => {
      console.log('🖱️ HTML Button 3 CLICK');
      e.preventDefault();
      handleAnswer('opt3');
    });
    htmlOpt3.addEventListener('touchstart', (e) => {
      console.log('👆 HTML Button 3 TOUCH');
      e.preventDefault();
      handleAnswer('opt3');
    });
  }

  // Test de los botones HTML
  console.log('🧪 Testeando accesibilidad de botones HTML...');
  setTimeout(() => {
    if (htmlOpt1) htmlOpt1.style.border = '3px solid yellow';
    if (htmlOpt2) htmlOpt2.style.border = '3px solid yellow';
    if (htmlOpt3) htmlOpt3.style.border = '3px solid yellow';
  }, 2000);

  // Reproducir vídeo al detectar marcador
  document.querySelector('a-marker').addEventListener('markerFound', () => {
    console.log('🎯 Marcador detectado!');
    videoEl.play();
    correctText.setAttribute('visible', false);
    incorrectText.setAttribute('visible', false);
    successBackground.setAttribute('visible', false);
    successBackground.removeAttribute('animation');
    
    opts.forEach(option => {
      option.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
    });
  });

  console.log('✅ Configuración completada');
});
