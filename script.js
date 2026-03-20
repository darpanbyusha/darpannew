document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SLIDE-OUT MENU LOGIC
    // ==========================================
    const menuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    function toggleMenu() {
        if(sideMenu && menuOverlay) {
            sideMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
        }
    }

    if(menuBtn && closeMenuBtn && sideMenu && menuOverlay) {
        menuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);
        
        const menuLinks = document.querySelectorAll('.side-menu-links a');
        menuLinks.forEach(link => link.addEventListener('click', toggleMenu));
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
                experienceItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

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
        setInterval(nextSlide, 6000); 
    }

    // ==========================================
    // 5. CONTACT MODALS
    // ==========================================
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
    // 6. SCROLL TO TOP BUTTON
    // ==========================================
    const scrollTopBtn = document.getElementById('scroll-to-top');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 7. DYNAMIC GRID RENDERER (LIVE API)
    // ==========================================
    let darpanDesigns = []; // Global variable to hold live data

    function getIsActive(designId) {
        const savedDesigns = JSON.parse(localStorage.getItem('darpanFavourites')) || [];
        return savedDesigns.includes(designId) ? 'active' : '';
    }

// Builds the HTML, but now accepts a "hidden" command
    function createDesignCardHTML(design, hiddenClass = '') {
        // If hiddenClass is passed, it forces opacity to 0 instantly
        const style = hiddenClass ? 'style="opacity: 0;"' : ''; 
        
        return `
        <div class="design-card gallery-item ${hiddenClass}" data-category="${design.category}" ${style}>
            <div class="img-4x5 bg-cream">
                <img src="${design.image}" alt="${design.name}">
                <button class="wishlist-btn ${getIsActive(design.id)}" aria-label="Save to favourites" data-design-id="${design.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="design-info">
                <h3 class="design-name text-brown">${design.name}</h3>
                <p class="archive-ref">${design.id}</p>
            </div>
        </div>
        `;
    }

    // THE MAGIC BRIDGE: Fetching your live data from Google Drive
    const API_URL = "https://script.google.com/macros/s/AKfycbwRbNf7A0eLD3CcOs0W6iE7ZFbkhhQYcIITdXbQ8a8al50bFl55mlL_FQiTsnoc91LwMw/exec";

// We wrap the building process in a function so we can trigger it instantly from memory
    function renderWebsiteData(data) {
        darpanDesigns = data; 

        // Inject into Homepage
        const homepageGrid = document.getElementById('homepage-designs-grid');
        if (homepageGrid) {
            homepageGrid.innerHTML = darpanDesigns
                .filter(design => design.topRated === true)
                .slice(0, 8) 
                .map(design => createDesignCardHTML(design))
                .join('');
        }

        // Inject into Designs Archive Page (PRE-FILTERED)
        const allDesignsGrid = document.getElementById('all-designs-grid');
        if (allDesignsGrid) {
            const urlParams = new URLSearchParams(window.location.search);
            const activeFilter = urlParams.get('filter') || 'all';

            allDesignsGrid.innerHTML = darpanDesigns.map(design => {
                const shouldHide = (activeFilter !== 'all' && design.category !== activeFilter) ? 'hidden' : '';
                return createDesignCardHTML(design, shouldHide);
            }).join('');
        }

        // Inject into Favourites Page
        const favouritesGrid = document.getElementById('favourites-grid');
        if (favouritesGrid) {
            const savedIds = JSON.parse(localStorage.getItem('darpanFavourites')) || [];
            const favouriteDesigns = darpanDesigns.filter(design => savedIds.includes(design.id));

            if (favouriteDesigns.length === 0) {
                favouritesGrid.innerHTML = `
                    <div class="text-center" style="grid-column: 1 / -1; padding: 60px 20px;">
                        <h3 class="text-brown italic mb-small" style="font-size: 2rem;">Your archive is empty</h3>
                        <p class="mb-medium" style="opacity: 0.7;">You haven't added any bespoke pieces to your favourites yet.</p>
                        <a href="designs.html" class="btn-outline-gold">Explore Designs</a>
                    </div>
                `;
                favouritesGrid.classList.remove('grid-4-col', 'gallery-grid'); 
            } else {
                favouritesGrid.innerHTML = favouriteDesigns.map(design => createDesignCardHTML(design)).join('');
            }
        }

        // Attach all the interactive buttons
        initFavourites();
        initFilters();
        initQuickView();
    }

    // THE SPEED FIX: Check if we already downloaded the catalogue this session
    const cachedData = sessionStorage.getItem('darpanCatalogue');

    if (cachedData) {
        // INSTANT LOAD: The user has been here already, use the saved memory instantly
        renderWebsiteData(JSON.parse(cachedData));
    } else {
        // FIRST LOAD: Fetch from Google Drive, then save it to memory for the next page click
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('darpanCatalogue', JSON.stringify(data)); // Save to memory
                renderWebsiteData(data); // Build the site
            })
            .catch(error => console.error("Error loading designs:", error));
    }

    // ==========================================
    // 8. FAVOURITES LOGIC & TOAST 
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
                e.stopPropagation(); 
                
                const designId = btn.getAttribute('data-design-id');
                btn.classList.toggle('active');
                
                if (btn.classList.contains('active')) {
                    if (!savedDesigns.includes(designId)) savedDesigns.push(designId);
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
    // 9. DESIGNS PAGE FILTERING (WITH URL PARSING)
    // ==========================================
    function initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (filterBtns.length > 0 && galleryItems.length > 0) {
            
            // 1. Check the web address for a specific filter request
            const urlParams = new URLSearchParams(window.location.search);
            const activeFilter = urlParams.get('filter') || 'all';

            // 2. The master function to visually swap the grid and buttons
            function applyFilter(filterValue) {
                // Highlight the correct button
                filterBtns.forEach(b => {
                    if(b.getAttribute('data-filter') === filterValue) {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });

                // Show/Hide the correct garments
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.classList.add('hidden');
                        item.style.opacity = '0';
                    }
                });
            }

            // 3. Apply the filter instantly on load
            applyFilter(activeFilter);

            // 4. Listen for manual clicks going forward
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    applyFilter(btn.getAttribute('data-filter'));
                });
            });
        }
    }

    // ==========================================
    // 10. QUICK VIEW LOGIC
    // ==========================================
    function initQuickView() {
        const qvModal = document.getElementById('quick-view-modal');
        const closeQvBtn = document.getElementById('close-qv');
        const qvImg = document.getElementById('qv-img');
        const qvTitle = document.getElementById('qv-title');
        const qvCollection = document.getElementById('qv-collection');
        const qvRef = document.getElementById('qv-ref');
        
        const interactionPanel = document.getElementById('qv-interaction-panel');
        const showContactBtn = document.getElementById('show-qv-contact');
        const backToDetailsBtn = document.getElementById('back-to-details');
        
        const designCards = document.querySelectorAll('.design-card');
        
        if(qvModal && designCards.length > 0) {
            designCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    if(e.target.closest('.wishlist-btn')) return;
                    
                    const wishlistBtn = card.querySelector('.wishlist-btn');
                    if (!wishlistBtn) return;
                    
                    const designId = wishlistBtn.getAttribute('data-design-id');
                    const designData = darpanDesigns.find(d => d.id === designId);
                    
                    if(designData) {
                        if(qvImg) qvImg.src = designData.image;
                        if(qvTitle) qvTitle.innerText = designData.name;
                        if(qvCollection) qvCollection.innerText = designData.collectionName || designData.category; 
                        if(qvRef) qvRef.innerText = designData.id;
                        
                        if(interactionPanel) interactionPanel.classList.remove('show-contact');
                        
                        qvModal.classList.add('active');
                        document.body.style.overflow = 'hidden'; 
                    }
                });
            });
            
            if(showContactBtn && backToDetailsBtn && interactionPanel) {
                showContactBtn.addEventListener('click', () => {
                    interactionPanel.classList.add('show-contact');
                });
                backToDetailsBtn.addEventListener('click', () => {
                    interactionPanel.classList.remove('show-contact');
                });
            }
            
            function closeQuickView() {
                qvModal.classList.remove('active');
                document.body.style.overflow = '';
                setTimeout(() => {
                    if(interactionPanel) interactionPanel.classList.remove('show-contact');
                }, 400); 
            }

            if (closeQvBtn) closeQvBtn.addEventListener('click', closeQuickView);
            
            qvModal.addEventListener('click', (e) => {
                if (e.target === qvModal) closeQuickView();
            });
        }
    }

}); // END OF DOMContentLoaded