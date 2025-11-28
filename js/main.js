(function(){
  window.addEventListener('DOMContentLoaded', () => {
    // Navegación hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
      hamburger.onclick = function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
      };
      
      // Cerrar el menú si se hace clic fuera
      document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
          navLinks.classList.remove('active');
        }
      });
    }

    // Smooth scroll para enlaces de navegación con offset
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const navbarHeight = document.querySelector('.nav').offsetHeight;
          const sectionPosition = targetSection.offsetTop;
          const scrollPosition = sectionPosition - navbarHeight - 10;

          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });

          // Cerrar el menú después de hacer clic en un enlace
          navLinks.classList.remove('active');
        }
      });
    });

    // Hacer que el título de la barra de navegación lleve arriba
    const navbarTitle = document.querySelector('.navbar-title');
    if (navbarTitle) {
      navbarTitle.style.cursor = 'pointer';
      navbarTitle.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });

  // Música
  const music = document.getElementById("bg-music");
  const loader = document.querySelector(".loader");

  if (music && loader) {
    loader.addEventListener("click", () => {
      music.play();
    });
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => io.observe(r));

  // Hero mockup parallax
  const hero = document.querySelector('.hero');
  const mockup = document.querySelector('.mockup-card');

  if (hero && mockup) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const dx = (e.clientX - rect.left) - rect.width/2;
      const dy = (e.clientY - rect.top) - rect.height/2;
      mockup.style.transform = `rotate(${-6 + dx * 0.002}deg) translateY(${dy*0.02}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      mockup.style.transform = 'rotate(-6deg)';
    });
  }

  // Animación de entrada al cargar
  window.addEventListener('load', () => {
    const m = document.querySelector('#hero-mockup');
    if(m) m.classList.add('show');
  });

  // Carousel
  const carousel = document.querySelector('.projects-carousel');
  if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => (isDown = false));
    carousel.addEventListener('mouseup', () => (isDown = false));

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }
})();

// Controles para carousel `.container-screen`
document.addEventListener('DOMContentLoaded', function () {
  const cs = document.querySelector('.container-screen');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (!cs || !prevBtn || !nextBtn) return;

  const items = Array.from(cs.children);
  let current = 0;

  function scrollToIndex(i) {
    i = Math.max(0, Math.min(items.length - 1, i));
    const el = items[i];
    const left = el.offsetLeft - (cs.clientWidth - el.clientWidth) / 2;
    cs.scrollTo({ left, behavior: 'smooth' });
    current = i;
  }

  function updateCurrentByScroll() {
    const center = cs.scrollLeft + cs.clientWidth / 2;
    const idx = items.findIndex(item => (item.offsetLeft + item.clientWidth / 2) >= center);
    current = idx === -1 ? items.length - 1 : idx;
  }

  prevBtn.addEventListener('click', () => scrollToIndex(current - 1));
  nextBtn.addEventListener('click', () => scrollToIndex(current + 1));

  let t;
  cs.addEventListener('scroll', () => {
    clearTimeout(t);
    t = setTimeout(updateCurrentByScroll, 80);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });

  cs.tabIndex = 0;
});

// Función para detectar si es dispositivo móvil o táctil
function isMobileOrTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

// Función para crear cursor circular personalizado (solo en desktop)
function initCustomCursor() {
  // No inicializar el cursor en dispositivos móviles o táctiles
  if (isMobileOrTouchDevice()) {
    console.log('Dispositivo móvil detectado: cursor personalizado deshabilitado');
    return;
  }

  // Crear el elemento del cursor
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // Añadir estilos CSS dinámicamente
  const style = document.createElement('style');
  style.textContent = `
    @media (pointer: fine) {
      * {
        cursor: none !important;
      }

      .custom-cursor {
        width: 14px;
        height: 14px;
        background-color: #7b61ff;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
        mix-blend-mode: difference;
      }

      .custom-cursor.hover {
        width: 50px;
        height: 50px;
        background-color: rgba(255, 255, 255, 1);
        mix-blend-mode: difference;
      }

      .custom-cursor.click {
        width: 10px;
        height: 10px;
      }
    }
  `;
  document.head.appendChild(style);

  // Seguir el movimiento del mouse
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Detectar hover en elementos interactivos
  const interactiveElements = 'a, button, input, textarea, select, [role="button"], .clickable';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveElements)) {
      cursor.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveElements)) {
      cursor.classList.remove('hover');
    }
  });

  // Efecto al hacer click
  document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
  });

  // Ocultar cursor cuando sale de la ventana
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}

// Inicializar el cursor cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
  initCustomCursor();
}