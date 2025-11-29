// ============================================
// Main Application JavaScript
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initHeroCarousel();
    initGallery();
    initTestimonials();
    initContactForm();
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
    initAboutVideo();
});

// ============================================
// Hero Carousel Functions
// ============================================

function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    const prevBtn = document.getElementById('prevHeroSlide');
    const nextBtn = document.getElementById('nextHeroSlide');
    
    let currentSlide = 0;
    let carouselInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.style.opacity = '1';
            } else {
                slide.classList.remove('active');
                slide.style.opacity = '0';
            }
        });
        
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
                indicator.classList.remove('bg-white/50');
                indicator.classList.add('bg-white');
            } else {
                indicator.classList.remove('active');
                indicator.classList.add('bg-white/50');
                indicator.classList.remove('bg-white');
            }
        });
        
        currentSlide = index;
    }
    
    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetCarouselInterval();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetCarouselInterval();
        });
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetCarouselInterval();
        });
    });
    
    // Auto-play carousel
    function startCarousel() {
        carouselInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    // Reset carousel interval
    function resetCarouselInterval() {
        clearInterval(carouselInterval);
        startCarousel();
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Start auto-play
    startCarousel();
    
    // Pause on hover
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        heroSection.addEventListener('mouseleave', () => {
            startCarousel();
        });
    }
}

// ============================================
// Navigation Functions
// ============================================

function initNavigation() {
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-purple-600', 'font-semibold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-purple-600', 'font-semibold');
            }
        });
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// Mobile Menu
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
    });
    
    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });
}

// ============================================
// Gallery Functions
// ============================================

function initGallery() {
    // Gallery data - Photos
    const photosData = [
        { src: 'https://i.ibb.co/yFrRtg6s/entry.jpg', category: 'gate', title: 'Entry Gate' },
        { src: 'https://i.ibb.co/VY3t8pPc/mandap-chori.jpg', category: 'mandap', title: 'Traditional Mandap' },
        // { src: 'https://i.ibb.co/yFrRtg6s/entry.jpg', category: 'wedding', title: 'Wedding Stage' },
        { src: 'https://i.ibb.co/xtKqbXjz/stage.jpg', category: 'stage', title: 'Stage Decoration' },
        // { src: 'https://i.ibb.co/V0zCdVpK/reception.jpg', category: 'gate', title: 'Gate Decoration' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'lighting', title: 'Lighting Setup' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'stage', title: 'Stage Decoration' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'reception', title: 'Reception Setup' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'rasgarba', title: 'Rasgarba Event' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'mehndi', title: 'Mehndi Ceremony' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'wedding', title: 'Wedding Decoration' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'sangeet-garba', title: 'Sangeet Night' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'party-plot', title: 'Party Plot Setup' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'flower', title: 'Floral Arrangement' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'lighting', title: 'Ambient Lighting' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'mandap', title: 'Traditional Mandap' },
        // { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'reception', title: 'Reception Hall' },
    ];
    
    // Gallery data - Videos
    const videosData = [
        { src: 'https://youtube.com/shorts/w8VGrPWz3oI?si=6pStnldmzoW2gtue', category: 'wedding', title: 'Wedding Highlights' },
        // { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', category: 'garba', title: 'Garba Night' },
        // { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', category: 'reception', title: 'Reception Ceremony' },
        // { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', category: 'mandap', title: 'Mandap Setup' },
        // { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', category: 'sangeet-garba', title: 'Sangeet Performance' },
        // { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', category: 'wedding', title: 'Wedding Video' },
    ];
    
    // Populate photos gallery
    const photosGallery = document.getElementById('photosGallery');
    photosData.forEach((photo, index) => {
        const item = createGalleryItem(photo, 'photo', index);
        photosGallery.appendChild(item);
    });
    
    // Populate videos gallery
    const videosGallery = document.getElementById('videosGallery');
    videosData.forEach((video, index) => {
        const item = createGalleryItem(video, 'video', index);
        videosGallery.appendChild(item);
    });
    
    // Initialize gallery tabs
    initGalleryTabs();
    
    // Initialize filter buttons
    initGalleryFilters();
    
    // Initialize lightbox
    initLightbox();
    
    // Initialize video modal
    initVideoModal();
}

function createGalleryItem(item, type, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item visible';
    div.setAttribute('data-category', item.category);
    div.setAttribute('data-index', index);
    
    if (type === 'photo') {
        div.innerHTML = `
            <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div class="aspect-[4/3] bg-gray-200 overflow-hidden">
                    <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" loading="lazy">
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div class="text-white">
                        <h4 class="text-lg font-bold mb-1">${item.title}</h4>
                    </div>
                </div>
            </div>
        `;
        div.addEventListener('click', () => openLightbox(item.src, item.title, index, 'photo'));
    } else {
        div.innerHTML = `
            <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div class="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <i class="fas fa-play-circle text-white text-6xl opacity-80 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div class="text-white">
                        <h4 class="text-lg font-bold mb-1">${item.title}</h4>
                    </div>
                </div>
            </div>
        `;
        div.addEventListener('click', () => openVideoModal(item.src, item.title));
    }
    
    return div;
}

function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const photosGallery = document.getElementById('photosGallery');
    const videosGallery = document.getElementById('videosGallery');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabType = tab.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active', 'bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'text-white');
                t.classList.add('bg-gray-200', 'text-gray-700');
            });
            tab.classList.add('active', 'bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'text-white');
            tab.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Show/hide galleries
            if (tabType === 'photos') {
                photosGallery.classList.remove('hidden');
                videosGallery.classList.add('hidden');
            } else {
                photosGallery.classList.add('hidden');
                videosGallery.classList.remove('hidden');
            }
            
            // Reset filter to 'all'
            const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
            if (allFilter) {
                allFilter.click();
            }
        });
    });
}

function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            button.classList.add('active', 'bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'text-white');
            button.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Filter gallery items
            const activeGallery = document.querySelector('.gallery-container:not(.hidden)');
            const items = activeGallery.querySelectorAll('.gallery-item');
            
            items.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.classList.remove('visible');
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// Lightbox Functions
// ============================================

let currentLightboxIndex = 0;
let currentLightboxItems = [];
let currentLightboxType = 'photo';

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

function openLightbox(src, title, index, type) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    // Get all visible items
    const activeGallery = document.querySelector('.gallery-container:not(.hidden)');
    const visibleItems = Array.from(activeGallery.querySelectorAll('.gallery-item:not(.hidden)'));
    
    currentLightboxItems = visibleItems.map(item => {
        const img = item.querySelector('img');
        return img ? img.src : null;
    }).filter(Boolean);
    
    currentLightboxIndex = currentLightboxItems.indexOf(src);
    currentLightboxType = type;
    
    lightboxImage.src = src;
    lightboxImage.alt = title;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (currentLightboxItems.length === 0) return;
    
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = currentLightboxItems.length - 1;
    } else if (currentLightboxIndex >= currentLightboxItems.length) {
        currentLightboxIndex = 0;
    }
    
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = currentLightboxItems[currentLightboxIndex];
}

// ============================================
// Video Modal Functions
// ============================================

function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeVideoModal');
    
    closeBtn.addEventListener('click', closeVideoModal);
    
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!videoModal.classList.contains('hidden') && e.key === 'Escape') {
            closeVideoModal();
        }
    });
}

function openVideoModal(src, title) {
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoError = document.getElementById('videoError');
    const youtubeLink = document.getElementById('youtubeLink');
    
    // Hide error message initially
    if (videoError) {
        videoError.classList.add('hidden');
    }
    
    // Add autoplay parameter to YouTube URL
    let videoSrc = src;
    if (src.includes('youtube.com')) {
        videoSrc = src.includes('?') ? `${src}&autoplay=1` : `${src}?autoplay=1`;
    }
    
    // Extract video ID for YouTube link fallback
    let videoId = '';
    if (src.includes('youtube.com/embed/')) {
        videoId = src.split('youtube.com/embed/')[1].split('?')[0];
    } else if (src.includes('youtube.com/shorts/')) {
        videoId = src.split('youtube.com/shorts/')[1].split('?')[0];
    }
    
    // Set YouTube link
    if (youtubeLink && videoId) {
        youtubeLink.href = `https://www.youtube.com/shorts/${videoId}`;
    }
    
    videoFrame.src = videoSrc;
    videoModal.classList.remove('hidden');
    videoModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Check for iframe load error
    videoFrame.onerror = function() {
        if (videoError) {
            videoError.classList.remove('hidden');
        }
    };
    
    // Also check after a delay if iframe is still loading
    setTimeout(() => {
        try {
            // Try to access iframe content - if it fails, show error
            if (videoFrame.contentWindow === null || videoFrame.contentDocument === null) {
                // This might indicate an error, but it's not always reliable due to CORS
                // We'll rely on the user seeing the error message if embed fails
            }
        } catch (e) {
            // Cross-origin error is expected, ignore
        }
    }, 2000);
}

function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    videoFrame.src = '';
    videoModal.classList.add('hidden');
    videoModal.classList.remove('flex');
    document.body.style.overflow = '';
}

// ============================================
// About Us Video
// ============================================

function initAboutVideo() {
    const aboutVideoThumbnail = document.getElementById('aboutVideoThumbnail');
    
    if (aboutVideoThumbnail) {
        aboutVideoThumbnail.addEventListener('click', () => {
            // YouTube Shorts videos often have embedding restrictions
            // Open directly on YouTube in a new tab for best compatibility
            const videoUrl = 'https://www.youtube.com/shorts/w8VGrPWz3oI';
            window.open(videoUrl, '_blank', 'noopener,noreferrer');
        });
    }
}

// ============================================
// Testimonials Slider
// ============================================

function initTestimonials() {
    const testimonials = [
        {
            name: 'સંધ્યા ગોધસે',
            review: 'મને પ્રેરકભાઈનો ખૂબ આભાર છે. તેમનું કામ શાનદાર, ઉત્કૃષ્ટ, શુદ્ધ અને સંપૂર્ણ હતું. બધું સમયસર પહોંચાડવા માટે કોઈ શબ્દો નથી અને ખાસ કરીને મને તેમનું વ્યવસ્થાપન અને પૂર્વ-વ્યવસ્થા ગમી. ઉત્કૃષ્ટ કામ અને સંકલન. મારા શાનદાર લગ્ન માટે હું ખૂબ ખુશ અને આભારી છું. બધું માટે ખૂબ આભાર.',
            rating: 5
        },
        {
            name: 'અતુલ જે. શાહ',
            review: 'અંબિકા લાઇટિંગ બુક કર્યા પછી અમને બધી ચિંતાઓથી મુક્તિ મળી. તેમણે કાર્યક્રમને પરિવારના સભ્યની જેમ ખૂબ સફળ બનાવ્યો. દિવસભર અમારા મહેમાનોનું સ્વાગત કર્યું અને અમારા કાર્યક્રમોની ઉજવણી કરી. બધું માટે આભાર.',
            rating: 5
        },
        {
            name: 'કંદર્પ એસ. પટેલ',
            review: 'મેં મારી પુત્રીના લગ્ન માટે અંબિકા લાઇટિંગ બુક કર્યું હતું. અમે તેમને કેટરિંગ માટે પૂછ્યું ત્યારે તેમણે અંબિકા લાઇટિંગનો સંદર્ભ આપ્યો. મેં સંપર્ક કર્યો અને મળ્યો. અન્ય વિકલ્પો વિશે વિચાર્યા વગર અમે સીધા અંબિકા લાઇટિંગ બુક કર્યું. તેમણે અમારા સમય પહેલાં જ બધું તૈયાર કર્યું.',
            rating: 5
        },
        {
            name: 'દિલીપ પાઠક',
            review: 'અંબિકા લાઇટિંગ અને સજાવટ પાસેથી સારો અનુભવ, સારી પ્રકૃતિ અને સહકાર મળ્યો. સપ્લાયર્સ અને સ્ટાફ સારી સ્થિતિમાં છે. દરેક સામગ્રી નવી અને સ્વચ્છ છે જે સંતોષની વસ્તુ છે. મારા આગામી પ્રસંગ માટે ફરીથી હાથ જોડવાનો નિષ્કર્ષ. આભાર.',
            rating: 5
        }
    ];
    
    const track = document.getElementById('testimonialTrack');
    
    testimonials.forEach((testimonial, index) => {
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide px-4';
        slide.innerHTML = `
            <div class="bg-white rounded-2xl p-8 shadow-xl max-w-3xl mx-auto">
                <div class="flex items-center justify-center mb-4">
                    ${generateStars(testimonial.rating)}
                </div>
                <p class="text-gray-600 text-lg leading-relaxed mb-6 text-center italic">
                    "${testimonial.review}"
                </p>
                <div class="text-center">
                    <h4 class="text-xl font-bold text-gray-800 font-playfair">${testimonial.name}</h4>
                </div>
            </div>
        `;
        track.appendChild(slide);
    });
    
    let currentSlide = 0;
    const totalSlides = testimonials.length;
    
    // Auto-play slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateTestimonialSlider(currentSlide);
    }, 5000);
    
    // Navigation buttons
    document.getElementById('prevTestimonial').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateTestimonialSlider(currentSlide);
    });
    
    document.getElementById('nextTestimonial').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateTestimonialSlider(currentSlide);
    });
    
    // Initialize first slide
    updateTestimonialSlider(0);
}

function updateTestimonialSlider(index) {
    const track = document.getElementById('testimonialTrack');
    track.style.transform = `translateX(-${index * 100}%)`;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star text-yellow-400"></i>';
        } else {
            stars += '<i class="far fa-star text-gray-300"></i>';
        }
    }
    return stars;
}

// ============================================
// Contact Form
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        
        // Reset form
        form.reset();
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ============================================
// Scroll Animations
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in-on-scroll, .fade-in-left-on-scroll, .fade-in-right-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes to service cards and work items
    document.querySelectorAll('.service-card, .work-item').forEach((el, index) => {
        el.classList.add('fade-in-on-scroll');
        observer.observe(el);
    });
}

