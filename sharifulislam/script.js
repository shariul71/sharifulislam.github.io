/* -----------------------------------------------
   0. EmailJS Integration
----------------------------------------------- */
// Make sure to include EmailJS CDN in HTML:
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
// <script>emailjs.init("VGwzQfR6tSmLMomts");</script>

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page refresh

    emailjs.sendForm('service_a1wgn84', 'template_3sn6s0w', this)
        .then(() => {
            alert("Message sent successfully!");
            contactForm.reset();
        }, (error) => {
            alert("Failed to send message. Please try again.");
            console.error(error);
        });
});

/* -----------------------------------------------
   1. Three.js - 3D Particle Background
----------------------------------------------- */
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000; // Number of particles

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material for particles (Sky Blue)
const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00d2ff,
    transparent: true,
    opacity: 0.8,
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

camera.position.z = 3;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = .1 * elapsedTime;
    particlesMesh.rotation.x += .05 * (targetY - particlesMesh.rotation.x);
    particlesMesh.rotation.y += .05 * (targetX - particlesMesh.rotation.y);

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

/* -----------------------------------------------
   2. GSAP Animations
----------------------------------------------- */
gsap.registerPlugin(ScrollTrigger);

gsap.from(".glitch-text", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    delay: 0.5
});

gsap.from(".subtitle", {
    duration: 1.5,
    opacity: 0,
    delay: 1
});

gsap.from(".cta-btn", {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 1.2
});

gsap.from(".glass-card", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "back.out(1.7)"
});

gsap.from(".gallery-item", {
    scrollTrigger: {
        trigger: "#gallery",
        start: "top 80%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1
});

/* -----------------------------------------------
   3. Interactive Gallery & UI
----------------------------------------------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Tilt effect for cards
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
});
