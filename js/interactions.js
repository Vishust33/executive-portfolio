/**
 * 3D Hologram Tilt, Numerical Counter Interpolation, & Cmd+K Palette
 */

// 1. 3D Card Tilt Physics
document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});

// 2. Metrics Counter Interpolation via Intersection Observer
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseFloat(counter.getAttribute('data-target')) || 0;
      let count = 0;
      const speed = target / 40;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
      observer.unobserve(counter);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.counter-value').forEach((counter) => {
  counterObserver.observe(counter);
});

// 3. Command Palette (Cmd + K) Management
const cmdModal = document.getElementById('cmd-modal');
const cmdBtn = document.getElementById('cmd-btn');
const cmdInput = document.getElementById('cmd-input');

function toggleCmdModal(open) {
  if (open) {
    cmdModal.classList.remove('hidden');
    cmdInput.focus();
  } else {
    cmdModal.classList.add('hidden');
    cmdInput.value = '';
  }
}

if (cmdBtn) cmdBtn.addEventListener('click', () => toggleCmdModal(true));

window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    toggleCmdModal(cmdModal.classList.contains('hidden'));
  }
  if (e.key === 'Escape' && !cmdModal.classList.contains('hidden')) {
    toggleCmdModal(false);
  }
});

cmdModal.addEventListener('click', (e) => {
  if (e.target === cmdModal) toggleCmdModal(false);
});

document.querySelectorAll('.cmd-item').forEach((item) => {
  item.addEventListener('click', () => {
    const action = item.getAttribute('data-action');
    toggleCmdModal(false);
    if (action === 'about') document.getElementById('metrics').scrollIntoView({ behavior: 'smooth' });
    if (action === 'ventures') document.getElementById('ventures').scrollIntoView({ behavior: 'smooth' });
    if (action === 'email') {
      navigator.clipboard.writeText('office@[CLIENT_DOMAIN].com');
      alert('Executive Secretariat email copied to clipboard.');
    }
    if (action === 'theme') {
      document.body.classList.toggle('grayscale');
    }
  });
});