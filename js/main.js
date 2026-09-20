/**
 * Main Controller, Mobile Navigation & GSAP Timelines
 */

// Initialize Lucide Icons
lucide.createIcons();

// Mobile Drawer Controller
const mobileToggle = document.getElementById('mobile-toggle');
const mobileClose = document.getElementById('mobile-close');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileLinks = document.querySelectorAll('.mobile-link');

function setDrawerState(isOpen) {
  if (isOpen) {
    mobileDrawer.classList.remove('translate-x-full');
  } else {
    mobileDrawer.classList.add('translate-x-full');
  }
}

mobileToggle.addEventListener('click', () => setDrawerState(true));
mobileClose.addEventListener('click', () => setDrawerState(false));
mobileLinks.forEach((link) => link.addEventListener('click', () => setDrawerState(false)));

// Venture Categorization Filter Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const ventureCards = document.querySelectorAll('.venture-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('bg-white/10', 'text-white'));
    btn.classList.add('bg-white/10', 'text-white');

    const filter = btn.getAttribute('data-filter');
    ventureCards.forEach((card) => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Confidential Form Submission Simulation
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Encrypting & Dispatching...</span>';

    setTimeout(() => {
      alert('Inquiry successfully encrypted and dispatched to Executive Secretariat.');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1200);
  });
}