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
  let message = `Assalamualaikum Dr. Takaful (Hana),\n\n`;
  message += `Saya ingin minta anggaran quotation untuk saya.\n\n`;
  message += `📝 *Nama:* ${name}\n`;
  message += `👤 *Umur:* ${age}\n\n`;
  message += `Terima kasih! 🙏`;

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
  message += `📝 *Nama:* ${name}\n`;
  message += `👤 *Umur:* ${age} tahun\n`;
  message += `🚻 *Jantina:* ${gender}\n`;
  message += `💼 *Pekerjaan:* ${profession}\n`;
  message += `🚬 *Status Merokok/Vape:* ${smoking}\n`;
  if (health) {
    message += `🏥 *Rekod Kesihatan:* ${health}\n`;
  }
  if (planChoice) {
    message += `💡 *Pilihan Pelan:* ${planChoice}\n`;
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
const articlesToShow = 3; // <-- Change this number to your desired amount
let visibleArticlesCount = 0;

function searchArticles() {
  // This function is now globally accessible and will call filterArticles
  filterArticles(currentCategory);
}

function filterArticles(category, isInitialLoad = false) {
  if (category) {
    currentCategory = category;
  }
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const noResults = document.getElementById('no-results');
  let hasResults = false;
  let displayedCount = 0;

  articles.forEach(article => {
    const articleCategory = article.getAttribute('data-category');
    const articleKeywords = article.getAttribute('data-keywords') || '';
    const articleText = article.innerText.toLowerCase();
    const categoryMatch = (category === 'all' || articleCategory === category);
    // Search in article text OR in keywords
    const searchMatch = articleText.includes(searchInput) || articleKeywords.toLowerCase().includes(searchInput);

    if (categoryMatch && searchMatch && (!isInitialLoad || displayedCount < articlesToShow)) {
      article.style.display = 'block';
      hasResults = true;
      if (isInitialLoad) {
        displayedCount++;
      }
    } else {
      article.style.display = 'none';
    }
  });

  if (noResults) {
    noResults.style.display = hasResults ? 'none' : 'block';
  }

  if (category) {
    tabButtons.forEach(button => {
      if (button.getAttribute('onclick') === `filterArticles('${category}')`) {
        button.classList.add('active-tab');
      } else {
        button.classList.remove('active-tab');
      }
    });
  }

  if (isInitialLoad) {
    showMoreButton.style.display = articles.length > articlesToShow ? 'inline-block' : 'none';
  } else {
    showMoreButton.style.display = 'none';
  }
}

// --- Load Blog Section Dynamically ---
document.addEventListener('DOMContentLoaded', async () => {
  // --- Countdown Timer Script ---
  const countdownElement = document.getElementById('countdown-timer');
  if (countdownElement) {
    // Set the date for the end of the offer to December 8th, 23:59
    const offerEndDate = new Date();
    offerEndDate.setFullYear(offerEndDate.getFullYear(), 11, 31); // Month is 0-indexed, so 11 is December
    offerEndDate.setHours(23, 59, 59, 0); // End of the day

    // Format the offer end date for display
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('offer-end-date').textContent = offerEndDate.toLocaleDateString('ms-MY', options);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = offerEndDate - now;

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result
      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

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
      showMoreButton = document.getElementById('show-more-button');

      // The styles are already in blog-section.html, so no need to inject them again.

      // Initial state for filter
      filterArticles('all', true);

      showMoreButton.addEventListener('click', () => {
        filterArticles('all', false); // Show all articles
      });

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

  // --- Animated Counter Script ---
  const counterElement = document.getElementById('families-helped-counter');
  if (counterElement) {
    const animateCounter = (element, target) => {
      let current = 0;
      const increment = target / 200; // Control animation speed
      const duration = 2000; // 2 seconds
      const stepTime = Math.abs(Math.floor(duration / target));

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        element.textContent = Math.floor(current).toLocaleString('en-US');
      }, stepTime > 0 ? stepTime : 1);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start animation and unobserve to prevent re-animating
          animateCounter(counterElement, 22); // Target number
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(counterElement);
  }
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
