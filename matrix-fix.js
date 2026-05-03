// Mobile overlay toggle
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (mobileMenuBtn && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileOverlay.style.display === 'flex';
            mobileOverlay.style.display = isOpen ? 'none' : 'flex';
            mobileMenuBtn.children[0].style.transform = isOpen ? 'none' : 'rotate(45deg) translate(5px, 5px)';
            mobileMenuBtn.children[1].style.opacity = isOpen ? '1' : '0';
            mobileMenuBtn.children[2].style.transform = isOpen ? 'none' : 'rotate(-45deg) translate(5px, -5px)';
            document.body.style.overflow = isOpen ? 'auto' : 'hidden';
        });

        // Close overlay when clicking a link
        mobileOverlay.querySelectorAll('a, .connect-btn').forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
                mobileMenuBtn.children[0].style.transform = 'none';
                mobileMenuBtn.children[1].style.opacity = '1';
                mobileMenuBtn.children[2].style.transform = 'none';
            });
        });
    }

    // Matrix rain animation
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const columns = Math.floor(canvas.width / 12);
        const drops = [];
        for (let i = 0; i < columns; i++) drops[i] = Math.random() * canvas.height;
        
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz·*+-=<>';
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const colors = [
                'rgba(110, 236, 216, 0.32)',
                'rgba(110, 236, 216, 0.24)',
                'rgba(110, 236, 216, 0.16)',
            ];
            
            ctx.font = '21px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const x = i * 12;
                const y = drops[i];
                const char = chars.charAt(Math.floor(Math.random() * chars.length));
                const colorIndex = Math.floor((y % 60) / 20);
                ctx.fillStyle = colors[colorIndex];
                ctx.fillText(char, x, y);
                drops[i] += 3.75;
                if (drops[i] > canvas.height && Math.random() > 0.975) drops[i] = 0;
            }
        }
        
        function animate() { draw(); requestAnimationFrame(animate); }
        animate();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});