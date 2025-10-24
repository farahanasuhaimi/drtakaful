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
let articles;
let tabButtons;

function filterArticles(category) { // This function needs to be globally accessible
  // Update active tab style
  tabButtons.forEach(button => {
    if (button.getAttribute('onclick') === `filterArticles('${category}')`) {
      button.classList.add('active-tab');
      button.setAttribute('aria-selected', 'true');
    } else {
      button.classList.remove('active-tab');
      button.setAttribute('aria-selected', 'false');
    }
  });

  // Filter articles
  articles.forEach(article => {
    if (category === 'all' || article.dataset.category === category) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
  document.getElementById('article-grid').style.display = 'grid'; // Ensure grid layout is reapplied
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

      // Add some base styles for the new elements (moved here to ensure it's applied after content)
      const style = document.createElement('style');
      style.innerHTML = `
        .blog-article { border: 1px solid #fecdd3; border-radius: 1rem; padding: 1.5rem; transition: all 0.3s; }
        .dark .blog-article { border-color: #831843; }
        .blog-article:hover { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); transform: translateY(-2px); }
        .tab-button { padding: 0.5rem 1rem; border-radius: 9999px; border: 1px solid #fecdd3; color: #be123c; font-weight: 500; transition: all 0.3s; }
        .dark .tab-button { border-color: #831843; color: #fda4af; }
        .tab-button:hover { background-color: #fff1f2; }
        .dark .tab-button:hover { background-color: #9f1239; }
        .active-tab { background-color: #be123c; color: white; border-color: #be123c; }
        .dark .active-tab { background-color: #fda4af; color: #831843; border-color: #fda4af; }
      `;
      document.head.appendChild(style);

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
const formSection = document.getElementById('health-form');

window.addEventListener('scroll', () => {
  if (!formSection || !stickyCta) return;

  const formRect = formSection.getBoundingClientRect();
  
  // Show button if user has scrolled past the top of the form
  if (window.scrollY > formSection.offsetTop) {
    stickyCta.classList.remove('hidden');
  } else {
    stickyCta.classList.add('hidden');
  }
});