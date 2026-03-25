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
        setInterval(nextSlide, 4000); 
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

    function createDesignCardHTML(design, hiddenClass = '') {
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

    const API_URL = "https://script.google.com/macros/s/AKfycbwRbNf7A0eLD3CcOs0W6iE7ZFbkhhQYcIITdXbQ8a8al50bFl55mlL_FQiTsnoc91LwMw/exec";

    function renderWebsiteData(data) {
        darpanDesigns = data; 

        const homepageGrid = document.getElementById('homepage-designs-grid');
        if (homepageGrid) {
            homepageGrid.innerHTML = darpanDesigns
                .filter(design => design.topRated === true)
                .slice(0, 8) 
                .map(design => createDesignCardHTML(design))
                .join('');
        }

        const allDesignsGrid = document.getElementById('all-designs-grid');
        if (allDesignsGrid) {
            const urlParams = new URLSearchParams(window.location.search);
            const activeFilter = urlParams.get('filter') || 'all';

            allDesignsGrid.innerHTML = darpanDesigns.map(design => {
                const shouldHide = (activeFilter !== 'all' && design.category !== activeFilter) ? 'hidden' : '';
                return createDesignCardHTML(design, shouldHide);
            }).join('');
        }

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

        initFavourites();
        initFilters();
        initQuickView();
        initSearch();
    }

    const cachedData = sessionStorage.getItem('darpanCatalogue');

    if (cachedData) {
        renderWebsiteData(JSON.parse(cachedData));
    } else {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('darpanCatalogue', JSON.stringify(data)); 
                renderWebsiteData(data); 
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
            const favCountDisplays = document.querySelectorAll('.fav-count');
            favCountDisplays.forEach(display => {
                display.innerText = savedDesigns.length;
            });
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
    // 9. DESIGNS PAGE FILTERING
    // ==========================================
    function initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (filterBtns.length > 0 && galleryItems.length > 0) {
            const urlParams = new URLSearchParams(window.location.search);
            const activeFilter = urlParams.get('filter') || 'all';

            function applyFilter(filterValue) {
                filterBtns.forEach(b => {
                    if(b.getAttribute('data-filter') === filterValue) {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });

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

            applyFilter(activeFilter);

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

    // ==========================================
    // 11. LIVE SEARCH LOGIC (SLIDE FROM BEHIND)
    // ==========================================
    function initSearch() {
        const mainHeader = document.getElementById('main-header');
        const openSearchBtn = document.getElementById('open-search-btn');
        const closeSearchBtn = document.getElementById('close-search-btn');
        const closeSearchBottom = document.getElementById('close-search-bottom');
        const headerLogoLink = document.getElementById('header-logo-link');
        
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        const searchResultsGrid = document.getElementById('search-results-grid');
        const searchEmptyState = document.getElementById('search-empty-state');

        if (openSearchBtn && searchOverlay && searchInput) {
            
            // 1. OPEN SEARCH
            openSearchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.paddingRight = `${scrollbarWidth}px`;
                mainHeader.style.paddingRight = `calc(var(--pad-x) + ${scrollbarWidth}px)`;
                document.body.style.overflow = 'hidden';
                
                mainHeader.classList.add('header-search-mode');
                searchOverlay.classList.add('active');
                
                setTimeout(() => searchInput.focus(), 100); 
            });

            // 2. CLOSE SEARCH
            function closeSearch() {
                searchOverlay.classList.remove('active');
                mainHeader.classList.remove('header-search-mode');
                
                setTimeout(() => {
                    document.body.style.overflow = '';
                    document.body.style.paddingRight = ''; 
                    mainHeader.style.paddingRight = '';
                }, 400);
                
                searchInput.value = ''; 
                if (searchResultsGrid) searchResultsGrid.innerHTML = ''; 
                if (searchEmptyState) searchEmptyState.classList.add('d-none');
            }

            // Bind Top 'X' button
            if (closeSearchBtn) {
                closeSearchBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    closeSearch();
                });
            }

            // Bind Bottom Close Button (Mobile)
            if (closeSearchBottom) {
                closeSearchBottom.addEventListener('click', (e) => {
                    e.preventDefault();
                    closeSearch();
                });
            }

            // Bind Logo
            if (headerLogoLink) {
                headerLogoLink.addEventListener('click', (e) => {
                    if (mainHeader.classList.contains('header-search-mode')) {
                        e.preventDefault();
                        closeSearch();
                    }
                });
            }

            // 3. REAL-TIME TYPING ENGINE
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();

                if (searchTerm === '') {
                    searchResultsGrid.innerHTML = '';
                    searchEmptyState.classList.add('d-none');
                    return;
                }

                const filteredDesigns = darpanDesigns.filter(design => 
                    design.name.toLowerCase().includes(searchTerm) ||
                    design.category.toLowerCase().includes(searchTerm) ||
                    design.id.toLowerCase().includes(searchTerm)
                );

                if (filteredDesigns.length > 0) {
                    searchResultsGrid.innerHTML = filteredDesigns.map(design => createDesignCardHTML(design)).join('');
                    searchEmptyState.classList.add('d-none');
                } else {
                    searchResultsGrid.innerHTML = '';
                    searchEmptyState.classList.remove('d-none');
                }
            });

            // 4. CLICKING A RESULT
            searchResultsGrid.addEventListener('click', (e) => {
                const card = e.target.closest('.design-card');
                if (!card) return;

                if (e.target.closest('.wishlist-btn')) {
                    const btn = e.target.closest('.wishlist-btn');
                    const designId = btn.getAttribute('data-design-id');
                    btn.classList.toggle('active');
                    
                    let savedDesigns = JSON.parse(localStorage.getItem('darpanFavourites')) || [];
                    if (btn.classList.contains('active')) {
                        if (!savedDesigns.includes(designId)) savedDesigns.push(designId);
                    } else {
                        savedDesigns = savedDesigns.filter(id => id !== designId);
                    }
                    localStorage.setItem('darpanFavourites', JSON.stringify(savedDesigns));
                    
                    const favCountDisplays = document.querySelectorAll('.fav-count');
                    favCountDisplays.forEach(display => display.innerText = savedDesigns.length);
                    return; 
                }

                const wishlistBtn = card.querySelector('.wishlist-btn');
                if (!wishlistBtn) return;
                
                const designId = wishlistBtn.getAttribute('data-design-id');
                const designData = darpanDesigns.find(d => d.id === designId);
                
                if (designData) {
                    document.getElementById('qv-img').src = designData.image;
                    document.getElementById('qv-title').innerText = designData.name;
                    document.getElementById('qv-collection').innerText = designData.category;
                    document.getElementById('qv-ref').innerText = designData.id;
                    
                    const interactionPanel = document.getElementById('qv-interaction-panel');
                    if(interactionPanel) interactionPanel.classList.remove('show-contact');

                    closeSearch();
                    document.getElementById('quick-view-modal').classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    }

}); // END OF DOMContentLoaded