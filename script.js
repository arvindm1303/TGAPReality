// script.js

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, .btn, .hover-scale, .prop-img-wrapper');

    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add a slight delay for the follower
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-follower-hover');
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-follower-hover');
            });
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const scrollElements = document.querySelectorAll('.fade-up-scroll');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1), transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)';
        
        // Trigger reflow
        void element.offsetWidth;
        
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.classList.remove('fade-up-scroll'); // Remove class so it doesn't trigger again
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    // Initial check
    handleScrollAnimation();

    // --- Parallax Effect ---
    const parallaxImages = document.querySelectorAll('.prop-img-wrapper img, .hero-right img');

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
        
        // Parallax logic
        requestAnimationFrame(() => {
            parallaxImages.forEach(img => {
                const speed = 0.12;
                const rect = img.parentElement.getBoundingClientRect();
                
                // Only animate if in viewport
                if(rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = (window.innerHeight - rect.top) * speed;
                    // Slightly offset the parallax so it looks natural
                    img.style.transform = `translateY(${yPos - 40}px) scale(1.15)`;
                }
            });
        });
    });
});
