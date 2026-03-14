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

});