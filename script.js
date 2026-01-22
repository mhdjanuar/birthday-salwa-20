document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('birthdayCard');
    const decorationsContainer = document.getElementById('decorations');
    
    // Create floating background elements
    const emojis = ['🎈', '✨', '💖', '🎂', '🌸', '🎁', '⭐'];
    const createDecoration = () => {
        const decoration = document.createElement('div');
        decoration.className = 'floating-element';
        decoration.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        decoration.style.left = Math.random() * 100 + 'vw';
        decoration.style.animationDuration = (Math.random() * 5 + 5) + 's';
        decoration.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        decorationsContainer.appendChild(decoration);
        
        // Remove decoration after animation
        setTimeout(() => {
            decoration.remove();
        }, 10000);
    };

    // Initial decorations
    for(let i = 0; i < 15; i++) {
        setTimeout(createDecoration, Math.random() * 5000);
    }
    
    // Continue creating decorations
    setInterval(createDecoration, 2000);

    // Card click event
    card.addEventListener('click', () => {
        if (!card.classList.contains('open')) {
            card.classList.add('open');
            
            // Confetti explosion
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
              return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
              const timeLeft = animationEnd - Date.now();

              if (timeLeft <= 0) {
                return clearInterval(interval);
              }

              const particleCount = 50 * (timeLeft / duration);
              // since particles fall down, start a bit higher than random
              confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
              confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        } else {
            card.classList.remove('open');
        }
    });
});
