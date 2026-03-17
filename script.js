document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SLIDE-OUT MENU LOGIC
    // ==========================================
    const menuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    function toggleMenu() {
        sideMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        // Prevent background scrolling when menu is open
        document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
    }

    if(menuBtn && closeMenuBtn && sideMenu && menuOverlay) {
        menuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);
        
        // Close menu if a link inside it is clicked
        const menuLinks = document.querySelectorAll('.side-menu-links a');
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // ==========================================
    // 2. HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('main-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ==========================================
    // 3. THE DARPAN EXPERIENCE: CALM CLICK
    // ==========================================
    const experienceItems = document.querySelectorAll('.experience-item');
    const displayImg = document.getElementById('experience-image');

    if (experienceItems.length > 0 && displayImg) {
        experienceItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active from all
                experienceItems.forEach(i => i.classList.remove('active'));
                
                // Add active to clicked
                item.classList.add('active');

                // Smooth fade swap
                const newSrc = item.getAttribute('data-img');
                displayImg.style.opacity = '0';
                
                setTimeout(() => {
                    displayImg.src = newSrc;
                    displayImg.style.opacity = '1';
                }, 400); 
            });
        });
    }

    // ==========================================
    // 4. TESTIMONIAL SLIDER LOGIC
    // ==========================================
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, 6000); // Changes every 6 seconds
    }

    // ==========================================
    // 5. CONTACT MODALS (BOTH VERSIONS)
    // ==========================================
    // Main CTA Modal
    const contactModal = document.getElementById('contact-modal');
    const openModalBtn = document.getElementById('open-contact-popup');
    const closeModalBtn = document.getElementById('close-modal');

    if (openModalBtn && contactModal && closeModalBtn) {
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });

        closeModalBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
            document.body.style.overflow = ''; 
        });

        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Header/Navigation Modal (3 Buttons)
    const navModal = document.getElementById('nav-contact-modal');
    const openNavBtns = document.querySelectorAll('.open-nav-popup'); 

    if (navModal) {
        const closeNavBtn = navModal.querySelector('.close-nav-btn');

        openNavBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); 
                navModal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        if (closeNavBtn) {
            closeNavBtn.addEventListener('click', () => {
                navModal.classList.remove('active');
                document.body.style.overflow = ''; 
            });
        }

        navModal.addEventListener('click', (e) => {
            if (e.target === navModal) {
                navModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================
    // 6. DYNAMIC GRID RENDERER (THE FACTORY)
    // ==========================================
    
    // Checks if a design is already in favourites to keep the heart gold
    function getIsActive(designId) {
        const savedDesigns = JSON.parse(localStorage.getItem('darpanFavourites')) || [];
        return savedDesigns.includes(designId) ? 'active' : '';
    }

    // Builds the exact HTML for a single garment
    function createDesignCardHTML(design) {
        return `
        <div class="design-card gallery-item" data-category="${design.category}">
            <div class="img-4x5 bg-cream">
                <img src="${design.image}" alt="${design.name}">
                <button class="wishlist-btn ${getIsActive(design.id)}" aria-label="Save to favourites" data-design-id="${design.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="design-info">
                <p class="archive-ref">${design.id}</p>
            </div>
        </div>
        `;
    }

    // Inject into Homepage (Top Rated Only, Max 8)
    const homepageGrid = document.getElementById('homepage-designs-grid');
    if (homepageGrid && typeof darpanDesigns !== 'undefined') {
        const topDesignsHTML = darpanDesigns
            .filter(design => design.topRated === true)
            .slice(0, 8) 
            .map(createDesignCardHTML)
            .join('');
        homepageGrid.innerHTML = topDesignsHTML;
    }

    // Inject into Designs Archive Page (All Items)
    const allDesignsGrid = document.getElementById('all-designs-grid');
    if (allDesignsGrid && typeof darpanDesigns !== 'undefined') {
        const allDesignsHTML = darpanDesigns.map(createDesignCardHTML).join('');
        allDesignsGrid.innerHTML = allDesignsHTML;
    }


    // ==========================================
    // 7. FAVOURITES LOGIC & TOAST (POST-RENDER)
    // ==========================================
    function initFavourites() {
        const favBtns = document.querySelectorAll('.wishlist-btn');
        const favCountDisplay = document.getElementById('fav-count');
        const toast = document.getElementById('toast-container');
        let toastTimer;

        let savedDesigns = JSON.parse(localStorage.getItem('darpanFavourites')) || [];

        function updateFavCount() {
            if(favCountDisplay) {
                favCountDisplay.innerText = savedDesigns.length;
            }
        }
        
        // Initial load count update
        updateFavCount();

        function showToast(message) {
            if(!toast) return;
            toast.innerText = message;
            toast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
        }

        favBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Prevents clicking the heart from triggering the Quick View later
                e.stopPropagation(); 
                
                const designId = btn.getAttribute('data-design-id');
                btn.classList.toggle('active');
                
                if (btn.classList.contains('active')) {
                    savedDesigns.push(designId);
                    showToast("Added to your favourites");
                } else {
                    savedDesigns = savedDesigns.filter(id => id !== designId);
                    showToast("Removed from favourites");
                }
                
                localStorage.setItem('darpanFavourites', JSON.stringify(savedDesigns));
                updateFavCount();
            });
        });
    }

    // ==========================================
    // 8. DESIGNS PAGE FILTERING (POST-RENDER)
    // ==========================================
    function initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (filterBtns.length > 0 && galleryItems.length > 0) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');

                    galleryItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('hidden');
                            setTimeout(() => item.style.opacity = '1', 50);
                        } else {
                            item.classList.add('hidden');
                            item.style.opacity = '0';
                        }
                    });
                });
            });
        }
    }
    // ==========================================
    // 10. QUICK VIEW LOGIC (POST-RENDER)
    // ==========================================
    function initQuickView() {
        const qvModal = document.getElementById('quick-view-modal');
        const closeQvBtn = document.getElementById('close-qv');
        
        // The elements inside the modal we need to update
        const qvImg = document.getElementById('qv-img');
        const qvTitle = document.getElementById('qv-title');
        const qvCollection = document.getElementById('qv-collection');
        const qvRef = document.getElementById('qv-ref');
        
        // Grab all the freshly generated design cards
        const designCards = document.querySelectorAll('.design-card');
        
        if(qvModal && designCards.length > 0) {
            designCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    // STOP: If they clicked the heart button, do not open the Quick View!
                    if(e.target.closest('.wishlist-btn')) return;
                    
                    // 1. Find the ID of the clicked garment
                    const wishlistBtn = card.querySelector('.wishlist-btn');
                    if (!wishlistBtn) return;
                    
                    const designId = wishlistBtn.getAttribute('data-design-id');
                    
                    // 2. Search your database for the matching dress
                    const designData = darpanDesigns.find(d => d.id === designId);
                    
                    // 3. If found, inject the details into the modal
                    if(designData) {
                        qvImg.src = designData.image;
                        qvTitle.innerText = designData.name;
                        // Uses the collection name if it exists, otherwise falls back to the category
                        qvCollection.innerText = designData.collectionName || designData.category; 
                        qvRef.innerText = `Edition No. ${designData.id}`;
                        
                        // 4. Show the modal
                        qvModal.classList.add('active');
                        document.body.style.overflow = 'hidden'; // Freeze background
                    }
                });
            });
            
            // Close logic for the 'X' button
            if (closeQvBtn) {
                closeQvBtn.addEventListener('click', () => {
                    qvModal.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }
            
            // Close logic for clicking the dark overlay
            qvModal.addEventListener('click', (e) => {
                if (e.target === qvModal) {
                    qvModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }
    // --- INITIALISE DYNAMIC FUNCTIONS ---
    // We run these last so they attach to the freshly built HTML
    initFavourites();
    initFilters();
    // --- INITIALISE DYNAMIC FUNCTIONS ---
    initFavourites();
    initFilters();
    initQuickView(); // ADD THIS NEW LINE HERE!
// ==========================================
    // 9. SCROLL TO TOP BUTTON LOGIC
    // ==========================================
    const scrollTopBtn = document.getElementById('scroll-to-top');

    if (scrollTopBtn) {
        // 1. Listen to the window scroll
        window.addEventListener('scroll', () => {
            // If the user scrolls down more than 400 pixels, show the button
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                // Otherwise, hide it again
                scrollTopBtn.classList.remove('show');
            }
        });

        // 2. Click action to glide back to the top
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        });
    }



});