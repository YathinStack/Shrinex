// Number counter animation logic
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('[data-target]');
    const duration = 1500; // ms

    const easeOutQuad = t => t * (2 - t);

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        let startTime = null;
        
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentVal = Math.floor(easeOutQuad(progress) * target);
            
            el.textContent = currentVal;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = target; // Ensure exact final value
            }
        };
        
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    counters.forEach(counter => observer.observe(counter));
});
