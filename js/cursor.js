/**
 * Dual-Ring Elastic Magnetic Cursor Engine
 */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mouseX = -100, mouseY = -100;
let ringX = -100, ringY = -100;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

function renderCursor() {
  // Smooth linear interpolation for outer ring lag
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  requestAnimationFrame(renderCursor);
}
renderCursor();

// Magnetic Targets Interaction
document.querySelectorAll('[data-magnetic], button, a').forEach((target) => {
  target.addEventListener('mouseenter', () => {
    ring.classList.add('scale-150', 'border-brand-accent', 'bg-brand-accent/10');
  });
  target.addEventListener('mouseleave', () => {
    ring.classList.remove('scale-150', 'border-brand-accent', 'bg-brand-accent/10');
  });
});