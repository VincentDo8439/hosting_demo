const overlay = document.getElementById('colorOverlay');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY + window.scrollY;  // account for page scroll
    
    overlay.style.left = `${x}px`;
    overlay.style.top = `${y}px`;
});


