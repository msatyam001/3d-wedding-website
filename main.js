// Three.js scene setup
let scene, camera, renderer;
let particles, particleSystem;
const particlesCount = 1500;

// GSAP ScrollTrigger registration
gsap.registerPlugin(ScrollTrigger);

// Audio setup
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.querySelector('.music-toggle');
const musicText = musicToggle?.querySelector('.music-text');
let isMusicPlaying = false;

// Gallery images
const galleryImages = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=750&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=750&fit=crop',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=750&fit=crop',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&h=750&fit=crop',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=750&fit=crop',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=750&fit=crop'
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Add point lights for sparkle effect
    const pointLight1 = new THREE.PointLight(0xd4af37, 1, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf4d467, 1, 10);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    // Start animation
    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Remove loading screen with fade effect
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Trigger hero animations after loading
        triggerHeroAnimations();
    }, 2500);

    // Setup scroll animations
    setupScrollAnimations();

    // Setup navigation scroll effect
    setupNavScroll();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sizes = [];
    const colors = [];
    
    const colorPalette = [
        new THREE.Color(0xd4af37),
        new THREE.Color(0xf4d467),
        new THREE.Color(0xffe4b5),
        new THREE.Color(0xfff8dc)
    ];
    
    for (let i = 0; i < particlesCount; i++) {
        vertices.push(
            Math.random() * 25 - 12.5,
            Math.random() * 25 - 12.5,
            Math.random() * 25 - 12.5
        );
        sizes.push(Math.random() * 2.5);
        
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
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
        particleSystem.rotation.y += 0.0008;
        particleSystem.rotation.x += 0.0003;
    }

    // Gentle wave motion
    const time = Date.now() * 0.0005;
    if (particleSystem) {
        particleSystem.position.y = Math.sin(time) * 0.3;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Hero section animations
function triggerHeroAnimations() {
    gsap.to('.pre-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.to('h1', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.to('.date-wrapper', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.to('.location', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });

    gsap.to('.music-toggle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });

    gsap.to('.scroll-indicator', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: 'power3.out'
    });
}

// Setup scroll-triggered animations
function setupScrollAnimations() {
    // Section headings fade in
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section.querySelectorAll('h2'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Timeline items stagger animation
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.story-timeline',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Gallery items stagger animation
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });

    // Detail cards animation
    gsap.from('.detail-card', {
        scrollTrigger: {
            trigger: '.details-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // RSVP form animation
    gsap.from('#rsvp-form', {
        scrollTrigger: {
            trigger: '#rsvp-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
    });
}

// Navigation scroll effect
function setupNavScroll() {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Load gallery images
function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryImages.forEach((imagePath, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Wedding Moment';
        img.loading = 'lazy';
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        
        imgContainer.appendChild(img);
        imgContainer.appendChild(overlay);
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
if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            if (musicText) musicText.textContent = 'Play Music';
        } else {
            backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
            if (musicText) musicText.textContent = 'Pause Music';
        }
        isMusicPlaying = !isMusicPlaying;
    });
}

// RSVP form handling
document.getElementById('rsvp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Animate button on submit
    const button = e.target.querySelector('button');
    button.innerHTML = '<span>Sent!</span><span class="btn-arrow">✓</span>';
    button.style.background = 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)';
    
    // Here you would typically send this data to a server
    setTimeout(() => {
        alert('Thank you for your RSVP! We look forward to celebrating with you.');
        e.target.reset();
        button.innerHTML = '<span>Send RSVP</span><span class="btn-arrow">→</span>';
        button.style.background = '';
    }, 500);
});

// Add parallax effect to sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        const speed = 0.1;
        const offset = scrolled * speed;
        if (index > 0) {
            section.style.transform = `translateY(${offset * 0.3}px)`;
        }
    });
});

// Initialize everything
init();
loadGallery();
