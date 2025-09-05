
document.addEventListener('DOMContentLoaded', () => {
  // Selecciones
  const mensualCards = document.querySelectorAll('.tarjetas.mensual');
  const anualCards   = document.querySelectorAll('.tarjetas.anual');

  // Botones (en tu html los IDs están dentro de un div, por eso tomamos parentElement)
  const mensualDiv = document.getElementById('mensual');
  const anualDiv   = document.getElementById('anual');

  const mensualBtn = mensualDiv ? mensualDiv.closest('button') : null;
  const anualBtn   = anualDiv   ? anualDiv.closest('button')   : null;

  // Helper para mostrar/ocultar sets
  function showMonthly() {
    mensualCards.forEach(c => c.style.display = 'inline-block');
    anualCards.forEach(c => c.style.display = 'none');
    setActive(mensualDiv, anualDiv);
  }

  function showAnnual() {
    mensualCards.forEach(c => c.style.display = 'none');
    anualCards.forEach(c => c.style.display = 'inline-block');
    setActive(anualDiv, mensualDiv);
  }

  // Marca visual "active" en el div interno (clase 'option active' en tu HTML)
  function setActive(activeDiv, inactiveDiv) {
    if (activeDiv)  activeDiv.classList.add('active');
    if (inactiveDiv) inactiveDiv.classList.remove('active');
  }

  // Inicial: mostrar mensual, ocultar anual
  showMonthly();

  // Conservar compatibilidad con tus onclick inline
  // En tu HTML usaste onclick="ocultar()" y onclick="mostrar()"
  // Mapear esas funciones globales a las que definimos arriba:
  window.ocultar = showAnnual;  // si llaman a ocultar() -> mostrar anual
  window.mostrar = showMonthly; // si llaman a mostrar() -> mostrar mensual

  // También ligar a los botones si se prefieren eventos modernos
  if (mensualBtn) mensualBtn.addEventListener('click', showMonthly);
  if (anualBtn)   anualBtn.addEventListener('click', showAnnual);

  // ----- Detalles: animar summary cuando se abre/cierra -----
  // Esto añade una pequeña rotación al <summary> (no cambia texto ni imagenes)
  document.querySelectorAll('details').forEach(detail => {
    const summary = detail.querySelector('summary');
    if (!summary) return;
    // estilo base para transición (se aplica inline sin tocar CSS)
    summary.style.transition = 'transform 0.2s ease';
    // toggle por evento 'toggle'
    detail.addEventListener('toggle', () => {
      if (detail.open) summary.style.transform = 'rotate(180deg)';
      else summary.style.transform = 'rotate(0deg)';
    });
  });

  // ----- Mejora: focus visible y accesibilidad simple para botones -----
  [mensualBtn, anualBtn].forEach(btn=>{
    if(!btn) return;
    btn.setAttribute('type','button');
    btn.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

});


