(function(){
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const closeMenu = document.getElementById('close-menu');

  // Cerrar al hacer click en la X
  closeMenu && closeMenu.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('active');
  });

  // Hamburger toggle
  hamburger && hamburger.addEventListener('click', ()=> {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));

    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
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
