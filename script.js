document.addEventListener("DOMContentLoaded", () => {
    
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