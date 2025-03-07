// Three.js scene setup
let scene, camera, renderer;
let particles, particleSystem;
const particlesCount = 1000;

// Audio setup
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.querySelector('.music-toggle');
let isMusicPlaying = false;

// Gallery images
const galleryImages = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
    'https://images.unsplash.com/photo-1519741497674-611481863552',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6'
];

// Initialize Three.js scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create particles
    createParticles();
    
    // Position camera
    camera.position.z = 5;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Start animation
    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Remove loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 2000);
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sizes = [];
    
    for (let i = 0; i < particlesCount; i++) {
        vertices.push(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
        );
        sizes.push(Math.random() * 2);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        color: 0xd4af37,
        size: 0.1,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particle system
    if (particleSystem) {
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Load gallery images
function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryImages.forEach(imagePath => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Wedding Moment';
        img.loading = 'lazy';
        
        imgContainer.appendChild(img);
        galleryGrid.appendChild(imgContainer);
    });
}

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Music controls
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.textContent = '♪ Play Music';
    } else {
        backgroundMusic.play();
        musicToggle.textContent = '♪ Pause Music';
    }
    isMusicPlaying = !isMusicPlaying;
});

// RSVP form handling
document.getElementById('rsvp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Here you would typically send this data to a server
    alert('Thank you for your RSVP!');
});

// Initialize everything
init();
loadGallery();
