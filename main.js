function sendWhatsApp() {
  // Get form values
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const profession = document.getElementById('profession').value;
  const smoking = document.getElementById('smoking').value;
  const health = document.getElementById('health').value;

  // Validation
  if (!name || !age || !gender || !profession || !smoking) {
    document.getElementById('formMessage').textContent = '❌ Sila isi semua maklumat wajib';
    document.getElementById('formMessage').className = 'text-center text-sm mt-3 text-red-600';
    return;
  }
  
  // Create WhatsApp message
  let message = `*SEMAKAN PELAN TAKAFUL*\n\n`;
  message += `📝 *Nama:* ${name}\n`;
  message += `👤 *Umur:* ${age} tahun\n`;
  message += `🚻 *Jantina:* ${gender}\n`;
  message += `💼 *Pekerjaan:* ${profession}\n`;
  message += `🚬 *Status Merokok:* ${smoking}\n`;
  if (health) {
    message += `🏥 *Rekod Kesihatan:* ${health}\n`;
  }
  message += `\nSaya ingin semak pelan takaful yang sesuai untuk saya. Terima kasih! 🙏`;
  
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