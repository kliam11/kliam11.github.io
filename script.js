function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    document.body.appendChild(star);

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const endX = Math.random() * 600 - 300;
    const endY = Math.random() * 600 - 300;
    const duration = Math.random() * 3 + 2;
    const brightness = Math.random() * 0.5 + 0.5;

    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    star.style.setProperty('--dx', endX);
    star.style.setProperty('--dy', endY);
    star.style.backgroundColor = `rgba(232, 230, 227, ${brightness})`;
    star.style.animationDuration = `${duration}s`;

    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

function shootingStarInterval() {
    setInterval(() => {
        const starCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < starCount; i++) {
            createShootingStar();
        }
    }, 1000);
}

shootingStarInterval();