// Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        function updateThemeIcon(theme) {
            themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navItems = document.querySelectorAll('.nav-links a');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.querySelector('i').classList.toggle('fa-bars');
            mobileToggle.querySelector('i').classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking on nav items
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                mobileToggle.querySelector('i').classList.remove('fa-times');
            });
        });
        
        // Header scroll effect
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Animation on scroll for sections
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Animation on scroll for elements
        const animateElements = document.querySelectorAll('.animate');
        
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('battery-progress')) {
                        const width = entry.target.getAttribute('data-width');
                        entry.target.style.width = width;
                    }
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => {
            elementObserver.observe(element);
        });
        
        // Form submission
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Here you would normally send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            });
        }
        
        // Initialize skill bars animation
        document.querySelectorAll('.battery-progress').forEach(bar => {
            bar.style.width = '0%';
        });

        // 3D drag to explore functionality
        const scene = document.getElementById('scene');
        const sceneContainer = document.getElementById('sceneContainer');
        
        let isDragging = false;
        let previousX, previousY;
        let rotateX = -10;
        let rotateY = -15;
        
        sceneContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousX = e.clientX;
            previousY = e.clientY;
            sceneContainer.style.cursor = 'grabbing';
        });
        
        sceneContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - previousX;
            const deltaY = e.clientY - previousY;
            
            rotateY += deltaX * 0.5;
            rotateX -= deltaY * 0.5;
            
            // Limit vertical rotation to avoid flipping
            rotateX = Math.max(-60, Math.min(60, rotateX));
            
            scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            previousX = e.clientX;
            previousY = e.clientY;
        });
        
        sceneContainer.addEventListener('mouseup', () => {
            isDragging = false;
            sceneContainer.style.cursor = 'grab';
        });
        
        sceneContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            sceneContainer.style.cursor = 'grab';
        });
        
        // Touch events for mobile
        sceneContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            previousX = e.touches[0].clientX;
            previousY = e.touches[0].clientY;
            e.preventDefault();
        });
        
        sceneContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.touches[0].clientX - previousX;
            const deltaY = e.touches[0].clientY - previousY;
            
            rotateY += deltaX * 0.5;
            rotateX -= deltaY * 0.5;
            
            // Limit vertical rotation to avoid flipping
            rotateX = Math.max(-60, Math.min(60, rotateX));
            
            scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            previousX = e.touches[0].clientX;
            previousY = e.touches[0].clientY;
            e.preventDefault();
        });
        
        sceneContainer.addEventListener('touchend', () => {
            isDragging = false;
        });
        document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('tesseractCanvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('canvasContainer');
  const welcomeMessage = document.getElementById('welcomeMessage');
  const startButton = document.getElementById('startButton');
  const colorPicker = document.getElementById('colorPicker');
  const colorBtn = document.getElementById('colorBtn');

  let autoRotate = true;
  let currentMode = 'standard';
  let mainColor = '#6e7bff';
  let particlesEnabled = true;
  let isDragging = false, lastX = 0, lastY = 0;
  let animationFrameId = null;

  // Resize canvas
  function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Vertices + edges
  const vertices = [];
  const edges = [];
  for (let i = 0; i < 16; i++) {
    const x = (i & 1) ? 1 : -1;
    const y = (i & 2) ? 1 : -1;
    const z = (i & 4) ? 1 : -1;
    const w = (i & 8) ? 1 : -1;
    vertices.push([x, y, z, w]);
  }
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      let diff = 0;
      for (let d = 0; d < 4; d++) if (vertices[i][d] !== vertices[j][d]) diff++;
      if (diff === 1) edges.push([i, j]);
    }
  }

  // Projection + rotation
  function project4DTo3D(v) {
    const [x, y, z, w] = v;
    const distance = 2.5;
    const factor = distance / (distance - w);
    return [x * factor * 100, y * factor * 100, z * factor * 100];
  }
  function project3DTo2D(x, y, z) {
    const focalLength = 500;
    const scale = focalLength / (focalLength + z);
    return [x * scale + canvas.width / 2, y * scale + canvas.height / 2];
  }
  function rotate4D_XW(v, a) {
    const [x, y, z, w] = v;
    return [x * Math.cos(a) - w * Math.sin(a), y, z, x * Math.sin(a) + w * Math.cos(a)];
  }
  function rotate4D_YW(v, a) {
    const [x, y, z, w] = v;
    return [x, y * Math.cos(a) - w * Math.sin(a), z, y * Math.sin(a) + w * Math.cos(a)];
  }
  function rotate4D_ZW(v, a) {
    const [x, y, z, w] = v;
    return [x, y, z * Math.cos(a) - w * Math.sin(a), z * Math.sin(a) + w * Math.cos(a)];
  }

  // Animation loop
  let rotationX = 0, rotationY = 0, rotationZ = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   if (autoRotate && !isDragging) {
  rotationX += 0.0015;  // slower
  rotationY += 0.002;   // slower
  rotationZ += 0.001;   // slower
}


    const projectedVertices = [];
    for (const v of vertices) {
      let r = rotate4D_XW(v, rotationX);
      r = rotate4D_YW(r, rotationY);
      r = rotate4D_ZW(r, rotationZ);
      const p3d = project4DTo3D(r);
      const [x2D, y2D] = project3DTo2D(...p3d);
      projectedVertices.push([x2D, y2D]);
    }

    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 2;
    edges.forEach(([a, b]) => {
      const [x1, y1] = projectedVertices[a];
      const [x2, y2] = projectedVertices[b];
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });

    ctx.fillStyle = "#fff";
    projectedVertices.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(draw);
  }

  // Controls
  document.getElementById('resetBtn').addEventListener('click', () => {
    rotationX = rotationY = rotationZ = 0;
  });
  document.getElementById('changeMode').addEventListener('click', function () {
    const modes = ['standard', 'wireframe', 'pulse'];
    currentMode = modes[(modes.indexOf(currentMode) + 1) % modes.length];
    this.innerHTML = `<i class="fas fa-cube"></i> ${currentMode} Mode`;
  });
  document.getElementById('toggleParticles').addEventListener('click', function () {
    particlesEnabled = !particlesEnabled;
    this.innerHTML = `<i class="fas fa-sparkles"></i> Particles: ${particlesEnabled ? 'On' : 'Off'}`;
  });

  // Color picker
  colorBtn.addEventListener('click', () => colorPicker.click());
  colorPicker.addEventListener('input', (e) => {
    mainColor = e.target.value;
  });

  // Drag rotation
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });
  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      rotationY += dx * 0.01;
      rotationX += dy * 0.01;
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });
  window.addEventListener('mouseup', () => { isDragging = false; });

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    isDragging = true;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  });
  canvas.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const dx = e.touches[0].clientX - lastX;
      const dy = e.touches[0].clientY - lastY;
      rotationY += dx * 0.01;
      rotationX += dy * 0.01;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    }
  });
  canvas.addEventListener('touchend', () => { isDragging = false; });

// Start button
startButton.addEventListener('click', () => {
  welcomeMessage.style.display = "none"; // fully hide box
  animationFrameId = requestAnimationFrame(draw);
});
});
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".circle-skill");

  const animatePercent = (percentText, target) => {
    let current = 0;
    clearInterval(percentText._timer); // clear previous animation if running
    percentText._timer = setInterval(() => {
      if (current >= target) {
        clearInterval(percentText._timer);
      } else {
        current++;
        percentText.textContent = current + "%";
      }
    }, 15);
  };

  const animateCircle = (circle, percent) => {
    const total = 283;
    let progress = 0;
    clearInterval(circle._timer); // clear previous animation if running
    circle.style.stroke = "#a63bf2"; // make sure purple is applied
    circle._timer = setInterval(() => {
      if (progress >= percent) {
        clearInterval(circle._timer);
      } else {
        progress++;
        const offset = total - (total * progress) / 100;
        circle.style.strokeDashoffset = offset;
      }
    }, 15);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target.querySelector(".progress");
        const percent = parseInt(entry.target.getAttribute("data-percent"), 10);

        // animate circle + percent together
        animateCircle(circle, percent);

        const percentText = entry.target.querySelector(".percent");
        animatePercent(percentText, percent);

        // skill name pop-in
        const skillName = entry.target.querySelector(".skill-name");
        skillName.style.transform = "translateX(-50%) scale(1)";
        skillName.style.opacity = "1";
      }
    });
  }, { threshold: 0.5 });

  skills.forEach(skill => {
    observer.observe(skill);

    // Hover re-animation
    skill.addEventListener("mouseenter", () => {
      const circle = skill.querySelector(".progress");
      const percent = parseInt(skill.getAttribute("data-percent"), 10);

      // reset first then re-animate
      circle.style.strokeDashoffset = 283;
      animateCircle(circle, percent);

      const percentText = skill.querySelector(".percent");
      animatePercent(percentText, percent);

      // skill name hover effect
      const skillName = skill.querySelector(".skill-name");
      skillName.style.transform = "translateX(-50%) scale(1.1)";
      skillName.style.color = "#a63bf2";
    });

    skill.addEventListener("mouseleave", () => {
      const skillName = skill.querySelector(".skill-name");
      skillName.style.transform = "translateX(-50%) scale(1)";
      skillName.style.color = "#333";
    });
  });
});
  document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.2 } // trigger when 20% visible
    );

    items.forEach((item) => observer.observe(item));
  });
  // Animation for achievement cards when they come into view
  document.addEventListener('DOMContentLoaded', function() {
      const achievementCards = document.querySelectorAll('.achievement-card');

      function isInViewport(element) {
          const rect = element.getBoundingClientRect();
          return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 1.2 &&
              rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
      }

      function checkVisibility() {
          achievementCards.forEach(card => {
              if (isInViewport(card)) {
                  card.classList.add('visible');
              }
          });
      }

      checkVisibility();
      window.addEventListener('scroll', checkVisibility);
  });
  document.querySelectorAll('.nav a, .footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });