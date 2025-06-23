// Parámetro: id de la opción correcta (e.g. "opt2")
const correctAnswer = "opt2";

window.addEventListener('load', () => {
  console.log('Página cargada, iniciando configuración...');

  // Referencias
  const videoEl = document.querySelector('#judoVid');
  const overlayButtons = document.querySelector('#overlay-buttons');
  const htmlFeedback = document.querySelector('#html-feedback');
  
  // Referencias a botones HTML
  const htmlOpt1 = document.querySelector('#html-opt1');
  const htmlOpt2 = document.querySelector('#html-opt2');
  const htmlOpt3 = document.querySelector('#html-opt3');

  console.log('Elementos encontrados:');
  console.log('- Overlay de botones:', overlayButtons ? 'Sí' : 'No');
  console.log('- Botón HTML 1:', htmlOpt1 ? 'Sí' : 'No');
  console.log('- Botón HTML 2:', htmlOpt2 ? 'Sí' : 'No');
  console.log('- Botón HTML 3:', htmlOpt3 ? 'Sí' : 'No');

  // Función para manejar respuesta
  function handleAnswer(selected) {
    console.log('🎯 PROCESANDO RESPUESTA:', selected);
    
    if (selected === correctAnswer) {
      console.log('✅ RESPUESTA CORRECTA!');
      
      // Mostrar feedback HTML
      htmlFeedback.textContent = '¡CORRECTO!';
      htmlFeedback.style.color = '#00FF00';
      htmlFeedback.style.display = 'block';
      
      // Cambiar color del botón correcto
      const correctBtn = selected === 'opt1' ? htmlOpt1 : selected === 'opt2' ? htmlOpt2 : htmlOpt3;
      if (correctBtn) {
        correctBtn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
        correctBtn.style.transform = 'scale(1.1)';
      }
      
      // Ocultar efectos después de 4 segundos
      setTimeout(() => {
        htmlFeedback.style.display = 'none';
        if (correctBtn) {
          correctBtn.style.background = 'linear-gradient(135deg, #42A5F5, #1976D2)';
          correctBtn.style.transform = 'scale(1)';
        }
      }, 4000);
      
    } else {
      console.log('❌ RESPUESTA INCORRECTA!');
      
      // Mostrar feedback HTML
      htmlFeedback.textContent = 'INCORRECTO';
      htmlFeedback.style.color = '#FF0000';
      htmlFeedback.style.display = 'block';
      
      // Cambiar color del botón incorrecto
      const incorrectBtn = selected === 'opt1' ? htmlOpt1 : selected === 'opt2' ? htmlOpt2 : htmlOpt3;
      if (incorrectBtn) {
        incorrectBtn.style.background = 'linear-gradient(135deg, #F44336, #C62828)';
        incorrectBtn.style.transform = 'scale(0.95)';
      }
      
      // Ocultar efectos después de 3 segundos
      setTimeout(() => {
        htmlFeedback.style.display = 'none';
        if (incorrectBtn) {
          incorrectBtn.style.background = 'linear-gradient(135deg, #42A5F5, #1976D2)';
          incorrectBtn.style.transform = 'scale(1)';
        }
      }, 3000);
    }
  }

  // Configurar eventos en botones HTML
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
    
    // Efectos hover
    htmlOpt1.addEventListener('mouseenter', () => {
      htmlOpt1.style.transform = 'scale(1.05)';
    });
    htmlOpt1.addEventListener('mouseleave', () => {
      htmlOpt1.style.transform = 'scale(1)';
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
    
    // Efectos hover
    htmlOpt2.addEventListener('mouseenter', () => {
      htmlOpt2.style.transform = 'scale(1.05)';
    });
    htmlOpt2.addEventListener('mouseleave', () => {
      htmlOpt2.style.transform = 'scale(1)';
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
    
    // Efectos hover
    htmlOpt3.addEventListener('mouseenter', () => {
      htmlOpt3.style.transform = 'scale(1.05)';
    });
    htmlOpt3.addEventListener('mouseleave', () => {
      htmlOpt3.style.transform = 'scale(1)';
    });
  }

  // Marcador detectado - MOSTRAR interfaz HTML
  document.querySelector('a-marker').addEventListener('markerFound', () => {
    console.log('🎯 Marcador detectado - Mostrando interfaz HTML');
    videoEl.play();
    
    // Mostrar botones HTML con animación
    if (overlayButtons) {
      overlayButtons.style.display = 'block';
      overlayButtons.style.opacity = '0';
      setTimeout(() => {
        overlayButtons.style.transition = 'opacity 0.5s ease';
        overlayButtons.style.opacity = '1';
      }, 100);
    }
    
    // Reset feedback
    if (htmlFeedback) {
      htmlFeedback.style.display = 'none';
    }
    
    // Reset botones
    [htmlOpt1, htmlOpt2, htmlOpt3].forEach(btn => {
      if (btn) {
        btn.style.background = 'linear-gradient(135deg, #42A5F5, #1976D2)';
        btn.style.transform = 'scale(1)';
      }
    });
  });

  // Marcador perdido - OCULTAR interfaz HTML
  document.querySelector('a-marker').addEventListener('markerLost', () => {
    console.log('❌ Marcador perdido - Ocultando interfaz HTML');
    
    // Ocultar botones HTML con animación
    if (overlayButtons) {
      overlayButtons.style.transition = 'opacity 0.3s ease';
      overlayButtons.style.opacity = '0';
      setTimeout(() => {
        overlayButtons.style.display = 'none';
      }, 300);
    }
    
    // Ocultar feedback
    if (htmlFeedback) {
      htmlFeedback.style.display = 'none';
    }
  });

  console.log('✅ Configuración completada');
});
