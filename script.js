const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rocketImage = new Image();
rocketImage.src = 'rocket.png';
const krakenEmoji = "🦑";
const bulletEmoji = "💥";

let kills = 0;
let killCounter;
const rocket = { x: canvas.width / 2, y: canvas.height / 2, width: 50, height: 50, angle: 0 };
const bullets = [];
const krakens = [];

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

// Track cursor position
const cursor = { x: canvas.width / 2, y: canvas.height / 2 };
document.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});

function spawnKraken() {
    if (krakens.length < 3) {
        const speed = 1; 
        krakens.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: 50,
            height: 50,
            health: 1,
            dx: (Math.random() - 0.5) * speed * 2, 
            dy: (Math.random() - 0.5) * speed * 2, 
        });
    }
}

// Update krakens' positions
function updateKrakens() {
    krakens.forEach((kraken) => {
        kraken.x += kraken.dx;
        kraken.y += kraken.dy;
        if (kraken.x <= 0 || kraken.x + kraken.width >= canvas.width) {
            kraken.dx = -kraken.dx; // Reverse horizontal direction
        }
        if (kraken.y <= 0 || kraken.y + kraken.height >= canvas.height) {
            kraken.dy = -kraken.dy; // Reverse vertical direction
        }
    });
}

// Check and maintain the kraken count every 1 second
setInterval(() => {
    while (krakens.length < 3) {
        spawnKraken();
    }
}, 500);

// Create bullets every 300ms
setInterval(() => {
    const angle = rocket.angle;
    bullets.push({
        x: rocket.x + rocket.width / 5,
        y: rocket.y + rocket.height / 5,
        speed: 5,
        dx: Math.cos(angle) * 5,
        dy: Math.sin(angle) * 5,
    });
}, 750);

// Update game state
function update() {
    const dx = cursor.x - rocket.x - rocket.width / 2;
    const dy = cursor.y - rocket.y - rocket.height / 2;

    const speed = 2; 
    const distance = Math.sqrt(dx * dx + dy * dy); 

    if (distance > speed) {
        rocket.x += (dx / distance) * speed;
        rocket.y += (dy / distance) * speed;
    } else {
        rocket.x = cursor.x - rocket.width / 2; 
        rocket.y = cursor.y - rocket.height / 2;
    }

    rocket.angle = Math.atan2(dy, dx);

    // Move bullets
    bullets.forEach((bullet, i) => {
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(i, 1); // Remove off-screen bullets
        }
    });

    // Check collisions
    krakens.forEach((kraken, i) => {
        bullets.forEach((bullet, j) => {
            if (
                bullet.x > kraken.x &&
                bullet.x < kraken.x + kraken.width &&
                bullet.y > kraken.y &&
                bullet.y < kraken.y + kraken.height
            ) {
                kraken.health--;
                bullets.splice(j, 1); // Remove bullet
                if (kraken.health <= 0) {
                    krakens.splice(i, 1); // Remove kraken
                    kills++;
                    killCounter.textContent = `Kills: ${kills}`;
                    spawnKraken(); 
                }
            }
        });
    });

    // Update krakens' movement
    updateKrakens();
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(rocket.x + rocket.width / 2, rocket.y + rocket.height / 2);
    ctx.rotate(rocket.angle); 
    ctx.drawImage(
        rocketImage,
        -rocket.width / 2,
        -rocket.height / 2,
        rocket.width,
        rocket.height
    );
    ctx.restore();

    ctx.font = "20px Arial";
    bullets.forEach((bullet) => {
        ctx.fillText(bulletEmoji, bullet.x, bullet.y);
    });

    ctx.font = "25px Arial";
    krakens.forEach((kraken) => {
        ctx.fillText(krakenEmoji, kraken.x + kraken.width / 2, kraken.y + kraken.height / 2);
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function checkMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

while (krakens.length < 3) {
    spawnKraken();
}

if(!checkMobile()) {
    killCounter = document.getElementById('killCounter');
    gameLoop();
}

shootingStarInterval();