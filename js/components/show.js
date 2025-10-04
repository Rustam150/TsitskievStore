// js/components/snow.js
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('snowCanvas');
    const ctx = canvas.getContext('2d');
    
    let snowflakes = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createSnowflakes() {
        const count = Math.min(150, window.innerWidth / 8);
        snowflakes = [];
        
        for (let i = 0; i < count; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 4 + 1,
                speed: Math.random() * 3 + 1,
                wind: Math.random() * 1 - 0.5,
                opacity: Math.random() * 0.6 + 0.3,
                swing: Math.random() * Math.PI * 2,
                swingSpeed: Math.random() * 0.05 + 0.02
            });
        }
    }
    
    function animateSnow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        snowflakes.forEach(flake => {
            // Анимация качания
            flake.swing += flake.swingSpeed;
            const swingOffset = Math.sin(flake.swing) * 2;
            
            ctx.beginPath();
            ctx.arc(flake.x + swingOffset, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            
            // Движение снежинки
            flake.y += flake.speed;
            flake.x += flake.wind + swingOffset * 0.1;
            
            // Если снежинка упала за экран - создаем новую сверху
            if (flake.y > canvas.height) {
                flake.y = -10;
                flake.x = Math.random() * canvas.width;
            }
            
            if (flake.x > canvas.width + 10) flake.x = -10;
            if (flake.x < -10) flake.x = canvas.width + 10;
        });
        
        requestAnimationFrame(animateSnow);
    }
    
    // Инициализация
    resizeCanvas();
    createSnowflakes();
    animateSnow();
    
    window.addEventListener('resize', function() {
        resizeCanvas();
        createSnowflakes();
    });
});