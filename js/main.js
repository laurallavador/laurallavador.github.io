(function(){
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');


 window.addEventListener('DOMContentLoaded', () => {
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

    // Smooth scroll for navigation links with offset
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.nav').offsetHeight; // Altura de la barra de navegación
                const sectionPosition = targetSection.offsetTop; // Posición de la sección
                const scrollPosition = sectionPosition - navbarHeight - 10; // Ajuste con margen de 10px

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth',
                });

  // Cerrar el menú después de hacer clic en un enlace
                navLinks.classList.remove('active');
            }
        });
    });

    // Button scroll to top
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
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

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  reveals.forEach(r=>io.observe(r));

  // Hero mockup parallax
  const hero = document.querySelector('.hero');
  const mockup = document.querySelector('.mockup-card');

  hero && hero.addEventListener('mousemove', (e)=>{
    const rect = hero.getBoundingClientRect();
    const dx = (e.clientX - rect.left) - rect.width/2;
    const dy = (e.clientY - rect.top) - rect.height/2;
    if(mockup){
      mockup.style.transform = `rotate(${ -6 + dx * 0.002 }deg) translateY(${dy*0.02}px)`;
    }
  });

  hero && hero.addEventListener('mouseleave', ()=>{
    if(mockup) mockup.style.transform = 'rotate(-6deg)';
  });

  // Entrance animation on load
  window.addEventListener('load', ()=>{
    const m = document.querySelector('#hero-mockup');
    if(m) m.classList.add('show');
  });

})();

  

// Carousel (con seguridad)
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


