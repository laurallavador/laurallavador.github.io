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

    // Botón scroll to top
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
          scrollToTopBtn.style.display = 'block';
        } else {
          scrollToTopBtn.style.display = 'none';
        }
      });
      
      scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

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

  // Cursor personalizado
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = e.clientY + "px";
      cursor.style.left = e.clientX + "px";
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

// Card-sorting: drag & drop + selectable state
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.cardsort-grid');
  if (!grid) return;

  const storageKey = 'cardsort-order';
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
  
  if (saved && Array.isArray(saved) && saved.length) {
    const map = Array.from(grid.children).reduce((m, el) => (m.set(el.textContent.trim(), el), m), new Map());
    saved.forEach(key => {
      const el = map.get(key);
      if (el) grid.appendChild(el);
    });
  }

  function saveOrder() {
    const order = Array.from(grid.children).map(el => el.textContent.trim());
    localStorage.setItem(storageKey, JSON.stringify(order));
  }

  function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll('.cardsort-item:not(.dragging)')];
    if (!draggableElements.length) return null;
    
    let closest = {offset: Infinity, element: null};
    draggableElements.forEach(child => {
      const box = child.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const offset = Math.hypot(x - cx, y - cy);
      if (offset < closest.offset) closest = {offset, element: child};
    });
    return closest.element;
  }

  const items = Array.from(grid.querySelectorAll('.cardsort-item'));
  items.forEach(item => {
    item.setAttribute('draggable', 'true');
    item.setAttribute('aria-pressed', 'false');

    item.addEventListener('click', (e) => {
      item.classList.toggle('selected');
      item.setAttribute('aria-pressed', item.classList.contains('selected'));
    });
    
    item.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        item.click();
      }
    });

    item.addEventListener('dragstart', (e) => {
      item.classList.add('dragging');
      try { 
        e.dataTransfer.setData('text/plain', item.textContent.trim()); 
      } catch (err) {}
      e.dataTransfer.effectAllowed = 'move';
    });
    
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      saveOrder();
    });
  });

  grid.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = grid.querySelector('.dragging');
    if (!dragging) return;
    const after = getDragAfterElement(grid, e.clientX, e.clientY);
    if (!after) grid.appendChild(dragging);
    else grid.insertBefore(dragging, after);
  });
});

// Función para crear cursor circular personalizado
function initCustomCursor() {
  // Crear el elemento del cursor
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // Añadir estilos CSS dinámicamente
  const style = document.createElement('style');
  style.textContent = `
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
      width: 15px;
      height: 15px;
      background-color: rgba(51, 51, 51, 0.3);
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

