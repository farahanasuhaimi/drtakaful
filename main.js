function sendWhatsApp() {
  // Get form values
  const name = document.getElementById('name')?.value;
  const age = document.getElementById('age')?.value;

  // Validation
  if (!name || !age) {
    document.getElementById('formMessage').textContent = '❌ Sila isi nama dan umur anda.';
    document.getElementById('formMessage').className = 'text-center text-sm mt-3 text-red-600';
    return;
  }

  // Create WhatsApp message
  let message = `Hi Hana,\n\n`;
  message += `Saya ingin minta anggaran quotation untuk saya.\n\n`;
  message += `*Nama:* ${name}\n`;
  message += `*Umur:* ${age}\n\n`;
  message += `Terima kasih!`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // Your WhatsApp number (60132522587)
  const whatsappURL = `https://wa.me/60132522587?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappURL, '_blank');

  // Show success message
  document.getElementById('formMessage').textContent = '✅ Membuka WhatsApp...';
  document.getElementById('formMessage').className = 'text-center text-sm mt-3 text-green-600 font-semibold';
}

function sendDetailedWhatsApp() {
  // Get form values
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const profession = document.getElementById('profession').value;
  const smoking = document.getElementById('smoking').value;
  const health = document.getElementById('health').value;
  const planChoice = document.getElementById('planChoice').value;

  // Validation
  if (!name || !age || !gender || !profession) {
    document.getElementById('formMessage').textContent = '❌ Sila isi semua maklumat wajib (Nama, Umur, Jantina, Pekerjaan).';
    document.getElementById('formMessage').className = 'text-center text-sm mt-4 text-red-600';
    return;
  }

  // Create WhatsApp message
  let message = `*ANALISIS KEPERLUAN TAKAFUL*\n\n`;
  message += `Hi Hana,\n\n`;
  message += `Berikut adalah butiran saya untuk analisis percuma:\n\n`;
  message += `*Nama:* ${name}\n`;
  message += `*Umur:* ${age} tahun\n`;
  message += `*Jantina:* ${gender}\n`;
  message += `*Pekerjaan:* ${profession}\n`;
  message += `*Status Merokok/Vape:* ${smoking}\n`;
  if (health) {
    message += `*Rekod Kesihatan:* ${health}\n`;
  }
  if (planChoice) {
    message += `*Pilihan Pelan:* ${planChoice}\n`;
  }
  message += `\nSaya ingin dapatkan analisis & sebut harga percuma berdasarkan maklumat ini. Terima kasih! 🙏`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/60132522587?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
  document.getElementById('formMessage').textContent = '✅ Berjaya! Membuka WhatsApp...';
  document.getElementById('formMessage').className = 'text-center text-sm mt-4 text-green-600 font-semibold';
}

// Function to initialize blog filtering (will be called after content loads)
let articles = [];
let tabButtons = [];
let showMoreButton;
let currentCategory = 'all';
const articlesToShow = 6;
let visibleArticlesCount = 0;

function searchArticles() {
  filterArticles(currentCategory, true); // Reset to show limited on search
}

function filterArticles(category, isInitialLoad = false) {
  if (category) {
    currentCategory = category;
  }
  const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const noResults = document.getElementById('no-results');
  let hasResults = false;
  let matchesCount = 0;
  let displayedCount = 0;

  articles.forEach(article => {
    const articleCategories = article.getAttribute('data-category')?.split(',').map(c => c.trim()) || [];
    const articleKeywords = article.getAttribute('data-keywords') || '';
    const articleText = article.innerText.toLowerCase();
    const categoryMatch = (currentCategory === 'all' || articleCategories.includes(currentCategory));
    const searchMatch = articleText.includes(searchInput) || articleKeywords.toLowerCase().includes(searchInput);

    if (categoryMatch && searchMatch) {
      matchesCount++;
      if (!isInitialLoad || displayedCount < articlesToShow) {
        article.style.display = 'block';
        hasResults = true;
        displayedCount++;
      } else {
        article.style.display = 'none';
      }
    } else {
      article.style.display = 'none';
    }
  });

  if (noResults) {
    noResults.style.display = hasResults ? 'none' : 'block';
  }

  // Update tabs
  tabButtons.forEach(button => {
    if (button.getAttribute('onclick')?.includes(`'${currentCategory}'`)) {
      button.classList.add('active-tab');
    } else {
      button.classList.remove('active-tab');
    }
  });

  // Handle Show More visibility
  if (showMoreButton) {
    showMoreButton.style.display = (isInitialLoad && matchesCount > articlesToShow) ? 'inline-block' : 'none';
  }
}


function getAdsTrafficContext() {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source') || '';
  const utmCampaign = params.get('utm_campaign') || '';
  const utmMedium = params.get('utm_medium') || '';
  const gclid = params.get('gclid') || '';
  const isAdsTraffic = Boolean(gclid || utmSource.toLowerCase() === 'google' || utmMedium.toLowerCase() === 'cpc');

  return { isAdsTraffic, utmSource, utmCampaign, utmMedium, gclid };
}

function trackWhatsAppCtaClicksForAdsTraffic() {
  const { isAdsTraffic, utmSource, utmCampaign, utmMedium, gclid } = getAdsTrafficContext();
  const trafficLabel = isAdsTraffic ? 'google_ads' : 'organic_or_direct';

  document.querySelectorAll('.wa-cta').forEach(link => {
    link.addEventListener('click', () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'whatsapp_cta_click',
        traffic_source: trafficLabel,
        cta_source: link.getAttribute('data-wa-source') || 'unknown',
        cta_intent: link.getAttribute('data-wa-intent') || 'General',
        utm_source: utmSource || '(not set)',
        utm_campaign: utmCampaign || '(not set)',
        utm_medium: utmMedium || '(not set)',
        has_gclid: Boolean(gclid)
      });
    });
  });
}

// Cold ad traffic expects a fast answer, not a blog read — hide the
// "Blog" breadcrumb + reading-time badge on landing pages when the visit
// came from a Google Ads click (gclid / utm_source=google / utm_medium=cpc).
function hideBlogFramingForAdsTraffic() {
  if (!getAdsTrafficContext().isAdsTraffic) return;

  document.getElementById('page-breadcrumb')?.classList.add('hidden');
  document.getElementById('read-time-separator')?.classList.add('hidden');
  document.getElementById('read-time-badge')?.classList.add('hidden');
}

// --- Interactive "Adakah Sesuai Untuk Anda?" Checklist (medical-card-lengkap-2026.html) ---
// Turns the static checklist into a live plan recommendation: each button
// toggles on/off, and the result (and its pre-filled WhatsApp message)
// recomputes after every click. No active family plan (item 1) routes to
// the standalone product page instead of a WhatsApp CTA for the rider.
function initMedicalCardChecklist() {
  const wrapper = document.getElementById('mc-checklist');
  if (!wrapper) return;

  const buttons = wrapper.querySelectorAll('.mc-checklist-btn');
  const resultBox = document.getElementById('mc-checklist-result');
  const resultHeading = document.getElementById('mc-checklist-result-heading');
  const resultBody = document.getElementById('mc-checklist-result-body');
  const waCta = document.getElementById('mc-checklist-cta-wa');
  const standaloneCta = document.getElementById('mc-checklist-cta-standalone');

  // Fallback labels for pages that don't mark up a per-button .checklist-question
  // span (e.g. medical-card-lengkap-2026.html) — pages that do (the ads landing
  // page) get their recap built straight from the button's own visible text,
  // so the WhatsApp message always matches whatever question is actually shown.
  const itemLabels = {
    1: 'Ada pelan takaful keluarga aktif',
    2: 'Nak had tahunan RM1.5 juta+ tanpa had seumur hidup',
    3: 'Nak NCB Health Wallet (credit back tahunan)',
    4: 'Nak mental health, pemulihan & evakuasi dalam satu pelan',
    5: 'Merancang keluarga / nak perlindungan sepanjang hayat lebih tinggi'
  };
  const skipActivePlanGate = wrapper.getAttribute('data-skip-active-plan-gate') === 'true';

  const checked = new Set();

  function getItemLabel(btn) {
    const question = btn.querySelector('.checklist-question');
    if (question) return question.textContent.trim();
    return itemLabels[btn.getAttribute('data-checklist-item')] || '';
  }

  function setButtonState(btn, isChecked) {
    const badge = btn.querySelector('.checklist-badge');
    btn.setAttribute('aria-pressed', String(isChecked));
    badge.classList.toggle('bg-gray-900', isChecked);
    badge.classList.toggle('text-white', isChecked);
    badge.textContent = isChecked ? '✓' : btn.getAttribute('data-checklist-item');
  }

  function updateResult() {
    resultBox.classList.remove('hidden');

    if (!skipActivePlanGate && !checked.has('1')) {
      resultHeading.textContent = 'Rider Ini Mungkin Belum Sesuai';
      resultBody.innerHTML = 'Medical Card Lengkap ini adalah <strong>rider</strong> — perlu ada pelan takaful keluarga aktif dahulu. Tanpa itu, produk standalone (tiada syarat pelan sedia ada) mungkin lebih sesuai untuk anda.';
      waCta.classList.add('hidden');
      standaloneCta?.classList.remove('hidden');
      return;
    }

    standaloneCta?.classList.add('hidden');
    waCta.classList.remove('hidden');

    const wantsPlan300 = checked.has('5');
    const plan = wantsPlan300 ? 'Plan 300' : 'Plan 200';
    const limit = wantsPlan300 ? 'RM3 juta' : 'RM1.5 juta';
    const selectedLabels = Array.from(buttons)
      .filter(btn => checked.has(btn.getAttribute('data-checklist-item')))
      .map(btn => `- ${getItemLabel(btn)}`)
      .join('\n');

    resultHeading.textContent = `Cadangan Dr. Hana: ${plan}`;
    resultBody.innerHTML = `Berdasarkan jawapan anda, <strong>${plan}</strong> (had tahunan ${limit}) nampak paling sesuai. WhatsApp Dr. Hana untuk sahkan caruman sebenar ikut umur &amp; profil kesihatan anda.`;

    const message = `Hi Hana,\n\nSaya dah jawab checklist Medical Card Lengkap di website:\n${selectedLabels}\n\nCadangan sistem: ${plan}. Boleh sahkan caruman sebenar untuk saya?\n\nTerima kasih!`;
    waCta.href = `https://wa.me/60132522587?text=${encodeURIComponent(message)}`;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.getAttribute('data-checklist-item');
      const isChecked = !checked.has(item);
      isChecked ? checked.add(item) : checked.delete(item);
      setButtonState(btn, isChecked);
      updateResult();
    });
  });
}

// --- Two-step quote quiz (medical-card-sebut-harga.html) ---
// Step 1 picks an age band, step 2 picks the ONE main worry. The result shows
// a short answer to that worry and a WhatsApp CTA whose pre-filled message is
// short and human — never lists health conditions, only "ada soalan pasal
// sejarah kesihatan", so nothing sensitive sits in the visitor's own chat.
function initQuoteQuiz() {
  const quiz = document.getElementById('mc-quiz');
  if (!quiz) return;

  const ageChips = quiz.querySelectorAll('[data-quiz-age]');
  const concernChips = quiz.querySelectorAll('[data-quiz-concern]');
  const resultBox = document.getElementById('mc-quiz-result');
  const resultBody = document.getElementById('mc-quiz-result-body');
  const waCta = document.getElementById('mc-quiz-cta');
  let age = '';
  let concern = null;

  function select(chips, chosen) {
    chips.forEach(chip => {
      const isOn = chip === chosen;
      chip.setAttribute('aria-pressed', String(isOn));
      chip.classList.toggle('bg-gray-900', isOn);
      chip.classList.toggle('text-white', isOn);
      chip.classList.toggle('bg-white', !isOn);
    });
  }

  function update() {
    if (!concern) return;
    resultBody.innerHTML = concern.getAttribute('data-answer');
    const ageText = age ? `saya umur ${age}. ` : '';
    const message = `Hi Dr. Hana, ${ageText}Paling risau: ${concern.getAttribute('data-message')}. Boleh bagi anggaran caruman medical card?`;
    waCta.href = `https://wa.me/60132522587?text=${encodeURIComponent(message)}`;
    const wasHidden = resultBox.classList.contains('hidden');
    resultBox.classList.remove('hidden');
    if (wasHidden) resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  ageChips.forEach(chip => chip.addEventListener('click', () => {
    age = chip.getAttribute('data-quiz-age');
    select(ageChips, chip);
    update();
  }));
  concernChips.forEach(chip => chip.addEventListener('click', () => {
    concern = chip;
    select(concernChips, chip);
    update();
  }));
}

// --- Floating round WhatsApp button (#wa-float) ---
// Appears only while no other WhatsApp CTA is on screen (so it never stacks on
// top of the hero / quiz / final CTA and invites accidental taps), and shows a
// "Tanya Dr. Hana" label for its first 5 seconds on screen, then icon only.
function initFloatingWhatsApp() {
  const float = document.getElementById('wa-float');
  if (!float) return;

  const label = document.getElementById('wa-float-label');
  const inlineCtas = Array.from(document.querySelectorAll('.wa-cta')).filter(el => el !== float);
  let labelTimerStarted = false;
  let scheduled = false;

  // Plain rect check on scroll (100ms-throttled) rather than IntersectionObserver
  // or rAF, which both depend on rendered frames. Hidden CTAs
  // (display:none, e.g. closed mobile menu / popup) have a zero-size rect.
  function anyCtaOnScreen() {
    const vh = window.innerHeight;
    return inlineCtas.some(el => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vh;
    });
  }

  function render() {
    scheduled = false;
    const show = !anyCtaOnScreen();
    float.classList.toggle('hidden', !show);
    if (show && label && !labelTimerStarted) {
      labelTimerStarted = true;
      setTimeout(() => label.classList.add('hidden'), 5000);
    }
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(render, 100);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  render();
}

// --- Load Blog Section Dynamically ---
document.addEventListener('DOMContentLoaded', async () => {
  trackWhatsAppCtaClicksForAdsTraffic();
  hideBlogFramingForAdsTraffic();
  initMedicalCardChecklist();
  initQuoteQuiz();
  initFloatingWhatsApp();
  // --- Mobile Menu Script ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // --- Blog Filtering Logic (Now for Static Content) ---
  const blogContainer = document.getElementById('blog-section-container');

  if (blogContainer) {
    // Initialize blog filtering script for static content
    articles = document.querySelectorAll('.blog-article');
    tabButtons = document.querySelectorAll('.tab-button');
    showMoreButton = document.getElementById('show-more-button');

    // Initial state for filter
    filterArticles('all', true);

    if (showMoreButton) {
      showMoreButton.addEventListener('click', () => {
        filterArticles(currentCategory, false); // Show all articles in current category
      });
    }
  }

  // --- Fade-in on Scroll Script ---
  const style = document.createElement('style');
  style.innerHTML = `
    .fade-in-section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-section.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
  });

  // --- Year Update Script ---
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// --- Exit-Intent Popup ---
(function () {
  const exitPopup = document.getElementById('exit-popup');
  const popupContent = document.getElementById('popup-content');
  const closePopupBtn = document.getElementById('close-popup');
  if (!exitPopup || !popupContent || !closePopupBtn) return;

  let shown = false;

  function showPopup() {
    if (shown || sessionStorage.getItem('exitPopupShown')) return;
    shown = true;
    sessionStorage.setItem('exitPopupShown', '1');
    exitPopup.classList.remove('hidden');
    requestAnimationFrame(() => {
      popupContent.classList.remove('scale-95', 'opacity-0');
      popupContent.classList.add('scale-100', 'opacity-100');
    });
  }

  function hidePopup() {
    popupContent.classList.remove('scale-100', 'opacity-100');
    popupContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => exitPopup.classList.add('hidden'), 300);
  }

  // Desktop: mouse moves toward browser chrome (exit intent)
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 5) showPopup();
  });

  // Mobile: show after 30 seconds on page
  const mobileTimer = setTimeout(showPopup, 30000);

  closePopupBtn.addEventListener('click', hidePopup);
  exitPopup.addEventListener('click', (e) => {
    if (e.target === exitPopup) hidePopup();
  });
  document.getElementById('popup-cta')?.addEventListener('click', hidePopup);
})();

// --- Sticky CTA Script ---
const stickyCta = document.getElementById('sticky-cta');
const heroSection = document.querySelector('header + section');

// On mobile (95% of traffic): show sticky CTA after 2 seconds — don't make them scroll to find it
if (stickyCta && window.innerWidth < 768) {
  setTimeout(() => stickyCta.classList.remove('hidden'), 2000);
}

// On desktop: show after scrolling past the hero section
window.addEventListener('scroll', () => {
  if (!heroSection || !stickyCta || window.innerWidth < 768) return;
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  if (window.scrollY > heroBottom) {
    stickyCta.classList.remove('hidden');
  } else {
    stickyCta.classList.add('hidden');
  }
});
