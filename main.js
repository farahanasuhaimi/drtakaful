function sendWhatsApp() {
  // Get form values
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const profession = document.getElementById('profession').value;
  const smoking = document.getElementById('smoking').value;
  const health = document.getElementById('health').value;
  const planChoice = document.getElementById('planChoice').value;

  // Validation
  if (!name || !age || !gender || !profession || !smoking) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = '❌ Sila isi semua maklumat yang diperlukan.';
    formMessage.classList.add('text-red-600', 'font-semibold');
    return;
  }
  
  // Create WhatsApp message
  let message = `Assalamualaikum Hana, saya ingin dapatkan analisis pelan takaful percuma.\n\n`;
  message += `*Butiran Saya:*\n`;
  message += `- Nama: ${name}\n`;
  message += `- Umur: ${age}\n`;
  message += `- Jantina: ${gender}\n`;
  message += `- Pekerjaan: ${profession}\n`;
  message += `- Status Merokok/Vape: ${smoking}\n`;
  if (health) {
    message += `- Sejarah Kesihatan: ${health}\n`;
  }
  if (planChoice) {
    message += `- Pilihan Pelan: ${planChoice}\n`;
  }
  message += `\nBoleh bantu saya dapatkan sebut harga percuma? Terima kasih.`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Your WhatsApp number (60132522587)
  const whatsappURL = `https://wa.me/60132522587?text=${encodedMessage}`;
  
  // Open WhatsApp
  window.open(whatsappURL, '_blank');
  
  // Reset message
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = 'Membuka WhatsApp...';
  formMessage.classList.remove('text-red-600', 'font-semibold');
}

function sendWhatsAppAnalysis() {
  const income = document.getElementById('income').value;
  const age = document.getElementById('age').value;
  const smoking = document.getElementById('smoking').value;

  const formMessage = document.getElementById('formMessage');
  if (!income || !age) {
    formMessage.textContent = 'Sila isi pendapatan dan umur anda.';
    formMessage.classList.add('text-red-600', 'font-semibold');
    return;
  }

  const hibahCoverage = income * 100;
  const ciCoverage = income * 36;

  let message = `Assalamualaikum Hana, saya dah buat Semakan Kesihatan Takaful.\n\n*Butiran Saya:*\n- Pendapatan: RM ${income}\n- Umur: ${age}\n- Status Merokok/Vape: ${smoking}\n\n*Analisis Awal:*\n- Cadangan Hibah (100 bulan gaji): *RM ${hibahCoverage.toLocaleString()}*\n- Cadangan Pampasan CI (36 bulan gaji): *RM ${ciCoverage.toLocaleString()}*\n\nBoleh bantu saya dapatkan quotation percuma berdasarkan maklumat ini? Terima kasih.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/60132522587?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
  formMessage.textContent = 'Membuka WhatsApp...';
  formMessage.classList.remove('text-red-600');
}

// Function to initialize blog filtering (will be called after content loads)
let articles = [];
let tabButtons = [];
let currentCategory = 'all';

function searchArticles() {
  // This function is now globally accessible and will call filterArticles
  filterArticles(currentCategory);
}

function filterArticles(category) {
  currentCategory = category;
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const noResults = document.getElementById('no-results');
  let hasResults = false;

  articles.forEach(article => {
    const articleCategory = article.getAttribute('data-category');
    const articleKeywords = article.getAttribute('data-keywords') || '';
    const articleText = article.innerText.toLowerCase();
    const categoryMatch = (category === 'all' || articleCategory === category);
    // Search in article text OR in keywords
    const searchMatch = articleText.includes(searchInput) || articleKeywords.toLowerCase().includes(searchInput);

    if (categoryMatch && searchMatch) {
      article.style.display = 'block';
      hasResults = true;
    } else {
      article.style.display = 'none';
    }
  });

  if (noResults) {
    noResults.style.display = hasResults ? 'none' : 'block';
  }

  tabButtons.forEach(button => {
    if (button.getAttribute('onclick') === `filterArticles('${category}')`) {
      button.classList.add('active-tab');
    } else {
      button.classList.remove('active-tab');
    }
  });
}

// --- Load Blog Section Dynamically ---
document.addEventListener('DOMContentLoaded', async () => {
  // --- Mobile Menu Script ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu when a link is clicked
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });

  const blogContainer = document.getElementById('blog-section-container');
  const blogLoader = document.getElementById('blog-loader');

  if (blogContainer) {
    try {
      const response = await fetch('/blog-section.html');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      blogLoader.style.display = 'none'; // Hide loader
      const blogHtml = await response.text();
      blogContainer.innerHTML = blogHtml;

      // After content is loaded, initialize blog filtering script
      articles = document.querySelectorAll('.blog-article');
      tabButtons = document.querySelectorAll('.tab-button');

      // The styles are already in blog-section.html, so no need to inject them again.

      // Initial state for filter
      filterArticles('all');

    } catch (error) {
      console.error('Failed to load blog section:', error);
      blogLoader.style.display = 'none'; // Hide loader on error too
      blogContainer.innerHTML = '<p class="text-center text-red-500">Gagal memuatkan bahagian blog. Sila cuba sebentar lagi.</p>';
    }
  }

  // --- Testimonial Carousel Script ---
  const track = document.getElementById('testimonial-track');
  if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('next-testimonial');
    const prevButton = document.getElementById('prev-testimonial');
    
    if (slides.length > 0) {
      let currentIndex = 0;

      const updateCarousel = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
      };

      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      });

      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      });

      // Adjust on window resize
      window.addEventListener('resize', updateCarousel);
      
      // Initial position
      updateCarousel();
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

// --- Exit-Intent Popup Script (for index.html) ---
document.addEventListener('DOMContentLoaded', () => {
  const exitPopup = document.getElementById('exit-popup');
  if (!exitPopup) return; // Only run if the popup exists on the page

  const popupContent = document.getElementById('popup-content');
  const closePopupBtn = document.getElementById('close-popup');
  const popupCta = document.getElementById('popup-cta');

  const showPopup = () => {
    if (sessionStorage.getItem('popupShown')) return;
    exitPopup.classList.remove('hidden');
    setTimeout(() => {
      popupContent.classList.remove('scale-95', 'opacity-0');
      popupContent.classList.add('scale-100', 'opacity-100');
    }, 50);
    sessionStorage.setItem('popupShown', 'true');
  };

  const hidePopup = () => {
    popupContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => exitPopup.classList.add('hidden'), 300);
  };

  document.addEventListener('mouseout', (e) => {
    if (!e.toElement && !e.relatedTarget) showPopup();
  });

  closePopupBtn.addEventListener('click', hidePopup);
  popupCta.addEventListener('click', hidePopup);
});