// ======================================================== //
// DEEPAK & SHILPI ROYAL WEDDING CARD CONTROLLER           //
// ======================================================== //

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  initCardMorphEngine();
  initPetalCanvas();
  initBackgroundMusic();
});

/* --------------------------------------------------------- */
/* 1. CARD MORPH ENGINE (PAGE FLIP & ARCH MORPHING)         */
/* --------------------------------------------------------- */
let currentPage = 1;
const TOTAL_PAGES = 5;

const pageMetadata = {
  1: { theme: 'theme-vivah', title: 'Shubh Vivah', next: 'Haldi' },
  2: { theme: 'theme-haldi', title: 'Rang Haldi Ka', next: 'Mehendi' },
  3: { theme: 'theme-mehendi', title: 'Mehendi Ki Shaam', next: 'Sangeet' },
  4: { theme: 'theme-sangeet', title: 'Sangeet & Cocktails', next: 'The Wedding' },
  5: { theme: 'theme-vivah', title: 'Vivah & Pheras', next: 'Finish' }
};

function initCardMorphEngine() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot-btn');

  // Next Button Click
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < TOTAL_PAGES) {
        goToPage(currentPage + 1, 'forward');
      } else {
        goToPage(1, 'forward'); // Loop back to main card
      }
    });
  }

  // Prev Button Click
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        goToPage(currentPage - 1, 'backward');
      }
    });
  }

  // Dot Clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetPage = parseInt(dot.getAttribute('data-page'));
      if (targetPage !== currentPage) {
        goToPage(targetPage, targetPage > currentPage ? 'forward' : 'backward');
      }
    });
  });

  // Touch Swipe on Mobile Devices
  let touchStartX = 0;
  let touchEndX = 0;
  const cardDeck = document.getElementById('cardDeck');

  if (cardDeck) {
    cardDeck.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    cardDeck.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 45;
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swiped Left -> Go Next
      if (currentPage < TOTAL_PAGES) goToPage(currentPage + 1, 'forward');
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swiped Right -> Go Prev
      if (currentPage > 1) goToPage(currentPage - 1, 'backward');
    }
  }

  // Keyboard Left / Right navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPage < TOTAL_PAGES) {
      goToPage(currentPage + 1, 'forward');
    } else if (e.key === 'ArrowLeft' && currentPage > 1) {
      goToPage(currentPage - 1, 'backward');
    }
  });

  // Blessings form submit
  const blessingForm = document.getElementById('cardBlessingForm');
  if (blessingForm) {
    blessingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('blessingInput');
      const status = document.getElementById('blessingStatus');
      if (input && input.value.trim()) {
        status.classList.remove('hidden');
        input.value = '';
        setTimeout(() => {
          status.classList.add('hidden');
        }, 4000);
      }
    });
  }
}

function goToPage(targetPage, direction = 'forward') {
  if (targetPage < 1 || targetPage > TOTAL_PAGES) return;

  const slides = document.querySelectorAll('.card-slide');
  const currentSlide = document.querySelector(`.card-slide[data-page="${currentPage}"]`);
  const nextSlide = document.querySelector(`.card-slide[data-page="${targetPage}"]`);

  if (!currentSlide || !nextSlide) return;

  // 1. Morph out current slide
  currentSlide.classList.remove('active-slide');
  currentSlide.classList.add('hidden-slide');
  if (direction === 'backward') {
    currentSlide.classList.add('slide-back');
  } else {
    currentSlide.classList.remove('slide-back');
  }

  // 2. Morph in target slide
  nextSlide.classList.remove('hidden-slide', 'slide-back');
  nextSlide.classList.add('active-slide');

  // 3. Update body theme for arch color transition
  document.body.className = pageMetadata[targetPage].theme;

  // 4. Update indicators and navigation labels
  currentPage = targetPage;
  updateNavigationUI();

  // 5. Update petal particles color theme
  updateParticleTheme(pageMetadata[targetPage].theme);
}

function updateNavigationUI() {
  const meta = pageMetadata[currentPage];

  // Update top counter indicator
  const indicatorText = document.getElementById('pageIndicatorText');
  if (indicatorText) {
    indicatorText.textContent = `Card ${currentPage} of ${TOTAL_PAGES} • ${meta.title}`;
  }

  // Update Dots
  const dots = document.querySelectorAll('.dot-btn');
  dots.forEach(dot => {
    const page = parseInt(dot.getAttribute('data-page'));
    if (page === currentPage) {
      dot.classList.add('active-dot');
    } else {
      dot.classList.remove('active-dot');
    }
  });

  // Update Next / Prev buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const nextBtnLabel = document.getElementById('nextBtnLabel');

  if (prevBtn) {
    prevBtn.disabled = currentPage === 1;
  }
  if (nextBtnLabel) {
    nextBtnLabel.textContent = meta.next;
  }
}

/* --------------------------------------------------------- */
/* 2. AMBIENT FALLING PETALS CANVAS (THEME ADAPTIVE)         */
/* --------------------------------------------------------- */
let canvas, ctx, petals = [];
let currentParticleType = 'rose'; // 'rose', 'marigold', 'leaves', 'purple'

function initPetalCanvas() {
  canvas = document.getElementById('ambientPetals');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const TOTAL = window.innerWidth < 640 ? 25 : 45;
  petals = [];

  for (let i = 0; i < TOTAL; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 9 + 7,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      swing: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petals.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.swing) * 0.8 + p.speedX;
      p.swing += 0.02;
      p.rotation += p.rotSpeed;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.sin(p.swing), 1);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
      ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);

      // Color based on active theme
      if (currentParticleType === 'marigold') {
        ctx.fillStyle = '#f59e0b';
      } else if (currentParticleType === 'leaves') {
        ctx.fillStyle = '#22c55e';
      } else if (currentParticleType === 'purple') {
        ctx.fillStyle = '#a855f7';
      } else {
        ctx.fillStyle = '#c53045'; // Rose red
      }

      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

function updateParticleTheme(theme) {
  if (theme === 'theme-haldi') {
    currentParticleType = 'marigold';
  } else if (theme === 'theme-mehendi') {
    currentParticleType = 'leaves';
  } else if (theme === 'theme-sangeet') {
    currentParticleType = 'purple';
  } else {
    currentParticleType = 'rose';
  }
}

/* --------------------------------------------------------- */
/* 3. BACKGROUND MUSIC (SOFT SHEHNAI & FLUTE)                */
/* --------------------------------------------------------- */
let isMusicPlaying = false;

function initBackgroundMusic() {
  const bgm = document.getElementById('shehnaiBgm');
  const toggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');

  function toggle() {
    if (!bgm) return;
    if (isMusicPlaying) {
      bgm.pause();
      isMusicPlaying = false;
      if (musicIcon) musicIcon.setAttribute('data-lucide', 'volume-x');
    } else {
      bgm.volume = 0.5;
      bgm.play().then(() => {
        isMusicPlaying = true;
        if (musicIcon) musicIcon.setAttribute('data-lucide', 'volume-2');
      }).catch(() => {});
    }
    if (window.lucide) lucide.createIcons();
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggle);
  }

  // Play automatically on first interaction anywhere
  const startAudioOnFirstClick = () => {
    if (!isMusicPlaying && bgm) {
      bgm.volume = 0.5;
      bgm.play().then(() => {
        isMusicPlaying = true;
        if (musicIcon) musicIcon.setAttribute('data-lucide', 'volume-2');
        if (window.lucide) lucide.createIcons();
      }).catch(() => {});
    }
    document.removeEventListener('click', startAudioOnFirstClick);
    document.removeEventListener('touchstart', startAudioOnFirstClick);
  };

  document.addEventListener('click', startAudioOnFirstClick, { once: true });
  document.addEventListener('touchstart', startAudioOnFirstClick, { once: true });
}

/* --------------------------------------------------------- */
/* 4. UTILITY ACTIONS: MAPS & CALENDAR                       */
/* --------------------------------------------------------- */
function openMaps(venue) {
  const query = encodeURIComponent(`${venue}, Delhi NCR`);
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
}

function addToCalendar(title, startISO, endISO) {
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startISO}/${endISO}&details=Deepak+Jain+and+Shilpi+Garg+Wedding&location=Royal+Heritage+Palace`;
  window.open(url, '_blank');
}
