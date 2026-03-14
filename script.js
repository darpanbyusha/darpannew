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

    // 2. The Darpan Experience Interactive Image Swap
    const experienceItems = document.querySelectorAll('.experience-item');
    const displayImg = document.getElementById('experience-image');

    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Remove active class from all items
            experienceItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to hovered item
            item.classList.add('active');

            // Swap the image with a smooth crossfade
            const newSrc = item.getAttribute('data-img');
            displayImg.style.opacity = '0';
            
            setTimeout(() => {
                displayImg.src = newSrc;
                displayImg.style.opacity = '1';
            }, 250); // Matches the CSS transition timing
        });
    });
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
    // --- CUSTOM LUXURY CURSOR LOGIC ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorSquare = document.getElementById('cursor-square');

    // Only run this script if the device has a mouse
    if (window.matchMedia("(pointer: fine)").matches) {
        
        let mouseX = 0, mouseY = 0;
        let squareX = 0, squareY = 0;

        // 1. Track the mouse coordinates
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move the tiny dot instantly
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        // 2. The smooth trailing animation loop
        function animateCursor() {
            // This number controls the "lag". Lower = slower/heavier dragging effect.
            let ease = 0.15; 
            
            squareX += (mouseX - squareX) * ease;
            squareY += (mouseY - squareY) * ease;
            
            // Move the square with the calculated delay
            cursorSquare.style.transform = `translate3d(${squareX}px, ${squareY}px, 0)`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // 3. Trigger the Diamond Hover Effect
        // We select every clickable item on the site
        const interactiveElements = document.querySelectorAll('a, button, .menu-toggle-btn, .wishlist-btn, .experience-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorSquare.classList.add('hovering');
                cursorDot.style.opacity = '0'; // Hide the centre dot for a cleaner look
            });
            
            el.addEventListener('mouseleave', () => {
                cursorSquare.classList.remove('hovering');
                cursorDot.style.opacity = '1'; // Bring the dot back
            });
        });
    }
});