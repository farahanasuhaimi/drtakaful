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
  let message = `Assalamualaikum,\n\n`;
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
  message += `Assalamualaikum Dr. Takaful (Hana),\n\n`;
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


function trackWhatsAppCtaClicksForAdsTraffic() {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source') || '';
  const utmCampaign = params.get('utm_campaign') || '';
  const utmMedium = params.get('utm_medium') || '';
  const gclid = params.get('gclid') || '';

  const isAdsTraffic = Boolean(gclid || utmSource.toLowerCase() === 'google' || utmMedium.toLowerCase() === 'cpc');
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

// --- Load Blog Section Dynamically ---
document.addEventListener('DOMContentLoaded', async () => {
  trackWhatsAppCtaClicksForAdsTraffic();
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
const heroSection = document.querySelector('header + section'); // Selects the hero section right after the header

window.addEventListener('scroll', () => {
  if (!heroSection || !stickyCta) return;

  // Show button if user has scrolled past the bottom of the hero section
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  if (window.scrollY > heroBottom) {
    stickyCta.classList.remove('hidden');
  } else {
    stickyCta.classList.add('hidden');
  }
});
