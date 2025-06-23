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

  // Función para manejar respuesta
  function handleAnswer(selected) {
    console.log('Procesando respuesta:', selected);
    
    if (selected === correctAnswer) {
      // RESPUESTA CORRECTA
      console.log('Respuesta correcta!');
      
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
      const correctBtn = document.querySelector(`#${selected}`);
      correctBtn.setAttribute('material', 'color: #00FF00; transparent: true; opacity: 0.9');
      
      // Ocultar efectos después de 4 segundos
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
      
      // Mostrar texto "INCORRECTO"
      incorrectText.setAttribute('visible', true);
      
      // Cambiar color del botón incorrecto a rojo
      const incorrectBtn = document.querySelector(`#${selected}`);
      incorrectBtn.setAttribute('material', 'color: #FF4444; transparent: true; opacity: 0.9');
      
      // Ocultar efectos después de 3 segundos
      setTimeout(() => {
        incorrectText.setAttribute('visible', false);
        incorrectBtn.setAttribute('material', 'color: #42A5F5; transparent: true; opacity: 0.9');
      }, 3000);
    }
  }

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

  // Configurar eventos táctiles para cada botón
  opts.forEach((opt, index) => {
    console.log(`Configurando botón ${index + 1}:`, opt.getAttribute('id'));
    
    // Eventos táctiles nativos (más confiables en móvil)
    opt.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Touch detectado en:', opt.getAttribute('id'));
      handleAnswer(opt.getAttribute('id'));
    }, { passive: false });
    
    // Eventos de mouse para escritorio
    opt.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Click detectado en:', opt.getAttribute('id'));
      handleAnswer(opt.getAttribute('id'));
    });
    
    // Evento de cursor A-Frame como respaldo
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Cursor A-Frame en:', opt.getAttribute('id'));
      handleAnswer(opt.getAttribute('id'));
    });
  });

  // Agregar evento táctil a toda la escena como respaldo adicional
  const scene = document.querySelector('a-scene');
  scene.addEventListener('touchstart', (e) => {
    console.log('Touch en escena detectado');
    
    // Obtener coordenadas del toque
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    
    // Usar raycasting para detectar el elemento tocado
    const camera = document.querySelector('[camera]');
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera.getObject3D('camera'));
    
    // Verificar intersecciones con botones
    opts.forEach(opt => {
      const object3D = opt.getObject3D('mesh');
      if (object3D) {
        const intersects = raycaster.intersectObject(object3D, true);
        if (intersects.length > 0) {
          console.log('Raycasting detectó:', opt.getAttribute('id'));
          handleAnswer(opt.getAttribute('id'));
        }
      }
    });
  }, { passive: false });
});
