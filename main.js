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
    const articleCategory = article.getAttribute('data-category');
    const articleKeywords = article.getAttribute('data-keywords') || '';
    const articleText = article.innerText.toLowerCase();
    const categoryMatch = (currentCategory === 'all' || articleCategory === currentCategory);
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

// --- Load Blog Section Dynamically ---
document.addEventListener('DOMContentLoaded', async () => {
  // --- Countdown Timer Script ---
  const countdownElement = document.getElementById('countdown-timer');
  if (countdownElement) {
    // Set the date for the end of the offer to December 31st, 23:59
    const offerEndDate = new Date();
    offerEndDate.setFullYear(offerEndDate.getFullYear(), 11, 31); // Month is 0-indexed, so 11 is December
    offerEndDate.setHours(23, 59, 59, 0); // End of the day

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = offerEndDate - now;

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result
      const elDays = document.getElementById('days');
      const elHours = document.getElementById('hours');
      const elMinutes = document.getElementById('minutes');
      const elSeconds = document.getElementById('seconds');

      if (elDays) elDays.textContent = String(days).padStart(2, '0');
      if (elHours) elHours.textContent = String(hours).padStart(2, '0');
      if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
      if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');

      // If the countdown is over, show some text
      if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "Tawaran Telah Tamat";
      }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
  }

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
});

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
