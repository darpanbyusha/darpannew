document.addEventListener("DOMContentLoaded", () => {
    
    // --- SLIDE-OUT MENU LOGIC ---
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

    menuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    
    // Close menu if a link inside it is clicked
    const menuLinks = document.querySelectorAll('.side-menu-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    // 1. Transparent to White Header Scroll Effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. The Darpan Experience: Calm Click Interaction
    const experienceItems = document.querySelectorAll('.experience-item');
    const displayImg = document.getElementById('experience-image');

    if (experienceItems && displayImg) {
        experienceItems.forEach(item => {
            item.addEventListener('click', () => {
                // 1. Remove active from all
                experienceItems.forEach(i => i.classList.remove('active'));
                
                // 2. Add active to clicked
                item.classList.add('active');

                // 3. Smooth fade swap
                const newSrc = item.getAttribute('data-img');
                displayImg.style.opacity = '0';
                
                setTimeout(() => {
                    displayImg.src = newSrc;
                    displayImg.style.opacity = '1';
                }, 400); 
            });
        });
    }
    // --- FAVOURITES LOGIC & TOAST NOTIFICATION ---
    const favBtns = document.querySelectorAll('.wishlist-btn');
    const favCountDisplay = document.getElementById('fav-count');
    const toast = document.getElementById('toast-container');

    // 1. Load saved designs
    let savedDesigns = JSON.parse(localStorage.getItem('darpanFavourites')) || [];

    // 2. Update the header counter
    function updateFavCount() {
        if(favCountDisplay) {
            favCountDisplay.innerText = savedDesigns.length;
        }
    }
    updateFavCount();

// --- TOAST NOTIFICATION LOGIC ---
    let toastTimer; // Creates an empty variable to hold our timer

    function showToast(message) {
        toast.innerText = message;
        toast.classList.add('show');
        
        // 1. Instantly cancel any old countdowns
        clearTimeout(toastTimer);
        
        // 2. Start a fresh 3-second countdown
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    favBtns.forEach(btn => {
        const designId = btn.getAttribute('data-design-id');

        // Check if already saved on load
        if (savedDesigns.includes(designId)) {
            btn.classList.add('active');
        }

        // Handle the Click
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            
            if (btn.classList.contains('active')) {
                // Add to memory and show toast
                savedDesigns.push(designId);
                showToast("Added to your favourites");
            } else {
                // Remove from memory and show toast
                savedDesigns = savedDesigns.filter(id => id !== designId);
                showToast("Removed from favourites");
            }
            
            // Save and update counter
            localStorage.setItem('darpanFavourites', JSON.stringify(savedDesigns));
            updateFavCount();
        });
    });
   // --- TESTIMONIAL SLIDER LOGIC ---
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        function nextSlide() {
            // Fade out the current slide
            slides[currentSlide].classList.remove('active');
            
            // Move to the next slide, or loop back to the start
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Fade in the new slide
            slides[currentSlide].classList.add('active');
        }
        
        // Changes the slide every 4 seconds (4000ms)
        // Change to 3000 if you want it faster, but 4000 is usually best for reading!
        setInterval(nextSlide, 6000);
    }
    // --- CONTACT MODAL LOGIC ---
    const contactModal = document.getElementById('contact-modal');
    const openModalBtn = document.getElementById('open-contact-popup');
    const closeModalBtn = document.getElementById('close-modal');

    if (openModalBtn && contactModal && closeModalBtn) {
        
        // 1. Open the Modal
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Stops the page from jumping
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Freezes background scrolling
        });

        // 2. Close the Modal (Clicking the 'X')
        closeModalBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
            document.body.style.overflow = ''; // Unfreezes scrolling
        });

        // 3. Close the Modal (Clicking the dark background outside the box)
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    // --- NAVIGATION MODAL LOGIC (3-Button Version) ---
    const navModal = document.getElementById('nav-contact-modal');
    // Finds all links in the header/menu with this class
    const openNavBtns = document.querySelectorAll('.open-nav-popup'); 

    if (navModal) {
        const closeNavBtn = navModal.querySelector('.close-nav-btn');

        // 1. Open the Nav Modal
        openNavBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); 
                navModal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        // 2. Close the Nav Modal (Clicking the 'X')
        if (closeNavBtn) {
            closeNavBtn.addEventListener('click', () => {
                navModal.classList.remove('active');
                document.body.style.overflow = ''; 
            });
        }

        // 3. Close the Nav Modal (Clicking the dark background)
        navModal.addEventListener('click', (e) => {
            if (e.target === navModal) {
                navModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});