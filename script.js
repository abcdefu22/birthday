document.addEventListener("DOMContentLoaded", () => {
    // Elegant Sparkle and Confetti System
    const confettiContainer = document.getElementById("confetti-container");

    // Red, White, Black, and Pink celebratory colors
    const colors = ["#ff0000", "#ffffff", "#000000", "#ff69b4", "#ff4b68", "#111111", "#ff1493"];

    /**
     * Creates a single smooth confetti/sparkle particle
     */
    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("confetti");

        // Random properties for natural variation
        const startLeft = Math.random() * 100; // 0 to 100vw
        const size = Math.random() * 6 + 4; // 4px to 10px
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 4 + 3; // 3s to 7s fall duration

        // 50% circle (sparkle), 50% slight rectangle (confetti)
        const isCircle = Math.random() > 0.5;

        particle.style.left = `${startLeft}vw`;
        particle.style.top = `-20px`; // Start just above screen
        particle.style.width = `${size}px`;
        particle.style.height = isCircle ? `${size}px` : `${size * (Math.random() * 1.5 + 1)}px`;
        particle.style.backgroundColor = color;
        particle.style.opacity = '0';

        if (isCircle) {
            particle.style.borderRadius = "50%";
            particle.style.boxShadow = `0 0 ${size}px ${color}`; // Soft glow
        } else {
            particle.style.borderRadius = "2px";
        }

        // Natural physics movement setup
        const rotationEnd = Math.random() * 360 + 360; // Spin between 1 to 2 times
        const swayEnd = Math.random() * 100 - 50; // Sway left or right by up to 50px

        // Use Web Animations API for extremely smooth, GPU-accelerated motion
        const animation = particle.animate([
            {
                transform: `translate3d(0, 0, 0) rotate(0deg)`,
                opacity: 0
            },
            {
                opacity: 0.8,
                offset: 0.1 // Fade in quickly 10% of the way down
            },
            {
                opacity: 0.8,
                offset: 0.8 // Keep visible until 80% down
            },
            {
                transform: `translate3d(${swayEnd}px, 105vh, 0) rotate(${rotationEnd}deg)`,
                opacity: 0 // Fade out gracefully at bottom
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(.37, 0, .63, 1)', // Smooth organic falling
            fill: 'forwards'
        });

        confettiContainer.appendChild(particle);

        // Cleanup element once animation completes to save memory
        animation.onfinish = () => {
            particle.remove();
        };
    }

    // -----------------------------
    // Initial Party Popper Burst
    // -----------------------------
    function createBurstParticle() {
        const particle = document.createElement("div");
        particle.classList.add("confetti");

        const size = Math.random() * 8 + 6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isCircle = Math.random() > 0.5;

        particle.style.width = `${size}px`;
        particle.style.height = isCircle ? `${size}px` : `${size * 1.5}px`;
        particle.style.backgroundColor = color;

        if (isCircle) particle.style.borderRadius = "50%";

        // Start from bottom-center
        particle.style.left = `50vw`;
        particle.style.top = `100vh`;

        const angle = (Math.random() * Math.PI) - (Math.PI / 2); // Spread from -90 to 90 degrees (upwards cone)
        const velocity = Math.random() * 80 + 70; // Explosion force
        const duration = Math.random() * 3 + 4; // 4 to 7 seconds fall

        // Target explosion physics
        const tX = Math.sin(angle) * velocity;
        const tY = -Math.cos(angle) * velocity - (Math.random() * 100);

        const rotation = Math.random() * 720;

        // Web Animations API for parabolic arc
        const animation = particle.animate([
            { transform: 'translate3d(0, 0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate3d(${tX}vw, ${tY}vh, 0) rotate(${rotation}deg)`, opacity: 1, offset: 0.3 }, // Peak of explosion
            { transform: `translate3d(${tX + (Math.random() * 20 - 10)}vw, 110vh, 0) rotate(${rotation * 2}deg)`, opacity: 0 } // Fall off screen
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(.17,.67,.67,1)', // Fast start, slow peak, accelerate down
            fill: 'forwards'
        });

        confettiContainer.appendChild(particle);
        animation.onfinish = () => particle.remove();
    }

    function triggerPartyPopper() {
        for (let i = 0; i < 360; i++) {
            setTimeout(createBurstParticle, Math.random() * 450); // 450ms explosion shotgun effect
        }
    }

    // Trigger explosive burst on load
    setTimeout(triggerPartyPopper, 500);

    // Generate initial ambient batch gradually
    let initialCount = 0;
    const initialBurst = setInterval(() => {
        createParticle();
        initialCount++;
        if (initialCount >= 30) clearInterval(initialBurst);
    }, 100);

    // Continuous soft generation loop
    // Tied to requestAnimationFrame loosely to ensure it runs well on the main thread
    setInterval(() => {
        // Only generate if user is actively viewing the tab to save resources
        if (document.hasFocus()) {
            createParticle();
            // Occasional double particle for dynamic density
            if (Math.random() > 0.7) createParticle();
        }
    }, 400);

    // -----------------------------
    // Live Age Counter Logic
    // -----------------------------
    const birthDate = new Date("2007-02-22T00:00:00");
    const yearsEl = document.getElementById("years");
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateAge() {
        const now = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();
        let monthDiff = now.getMonth() - birthDate.getMonth();
        let dayDiff = now.getDate() - birthDate.getDate();

        // Adjust years if we haven't reached the birthday this year yet
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            years--;
        }

        // Calculate the most recent birthday exactly
        const lastBirthday = new Date(birthDate);
        lastBirthday.setFullYear(now.getFullYear());
        if (now < lastBirthday) {
            lastBirthday.setFullYear(now.getFullYear() - 1);
        }

        // Calculate the difference from the last birthday to now
        const diffMs = now - lastBirthday;

        // Convert the difference MS to days, hours, minutes, seconds
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const remMs1 = diffMs % (1000 * 60 * 60 * 24);

        const hours = Math.floor(remMs1 / (1000 * 60 * 60));
        const remMs2 = remMs1 % (1000 * 60 * 60);

        const minutes = Math.floor(remMs2 / (1000 * 60));
        const remMs3 = remMs2 % (1000 * 60);

        const seconds = Math.floor(remMs3 / 1000);

        // Update HTML
        if (yearsEl) yearsEl.textContent = years;
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }

    // Run immediately then tick every second
    updateAge();
    setInterval(updateAge, 1000);

});
