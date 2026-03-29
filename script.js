// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible', 'animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scrollProgress').style.width = scrollPercent + '%';
});

// Skill Progress Bars Animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Trigger skill animation when skills section is visible
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
});
skillsObserver.observe(skillsSection);

// Download CV Function
function downloadCV() {
    // Replace with your actual CV file path
    const cvLink = 'cv/Einstein-Carl-Del-Valle-CV.pdf'; // Update this path
    window.open(cvLink, '_blank');
    // Or use: 
    // const link = document.createElement('a');
    // link.href = cvLink;
    // link.download = 'Einstein-Carl-Del-Valle-CV.pdf';
    // link.click();
}

// Typing Effect for Hero
const heroText = "Einstein Carl I. Del Valle";
const heroTitle = document.getElementById('heroTitle');
let i = 0;

function typeWriter() {
    if (i < heroText.length) {
        heroTitle.textContent = heroText.slice(0, i + 1) + '|';
        i++;
        setTimeout(typeWriter, 100);
    } else {
        heroTitle.textContent = heroText;
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
    document.body.classList.add('loaded');
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
        if (scrollPos > section.offsetTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    const speed = scrolled * 0.5;
    hero.style.transform = `translateY(${speed * 0.5}px)`;
});

// Hamburger Animation
document.getElementById('hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
});

// Page Preloader (Optional Enhancement)
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    // Scroll-related functions here
}, 10));

// COMPLETE CERTIFICATE DATA - PDF + ALL IMAGES
const certificateData = {
    cisco: {
        image: 'images/certificates/cisco.pdf',           
        title: 'Cisco Networking Academy',
        description: 'Certificates for Introduction to Cybersecurity and Networking Basics courses.',
        date: '2025'
    },
    uplb: {
        image: 'images/certificates/uplb-ai.pdf',         
        title: 'UPLB - Developing AI Policies',
        description: 'Certificate of Completion from University of the Philippines Los Baños.',
        date: '2025'
    },
    lspu: {
        image: 'images/certificates/lspu-cybersecurity.pdf', 
        title: 'LSPU Cybersecurity Awareness',
        description: 'Cybersecurity Awareness Training Certificate.',
        date: '2025'
    },
    'dict-figma': {
        image: 'images/certificates/dict-figma.pdf',      
        title: 'DICT Figma 101 Workshop',
        description: 'Introductory Workshop on UX Design for Students.',
        date: '2024'
    },
    'dict-privacy': {
        image: 'images/certificates/dict-privacy.pdf',    
        title: 'DICT Data Privacy Workshop',
        description: 'Kumusta ang Data Privacy Mo? Certificate.',
        date: '2024'
    },
    zuitt: {
        image: 'images/certificates/zuitt-bootcamp.pdf', 
        title: 'Zuitt Coding Bootcamp',
        description: 'Free Coding Bootcamp: Basic Web Development.',
        date: '2024'
    }
};

function openCertificateModal(certId) {
    const data = certificateData[certId];
    if (!data) return;
    
    const imgElement = document.getElementById('certificateImage');
    const pdfElement = document.getElementById('certificatePdf');
    const imageViewer = document.getElementById('imageViewer');
    const pdfViewer = document.getElementById('pdfViewer');
    const fileTypeBadge = document.getElementById('fileTypeBadge');
    const modal = document.getElementById('certificateModal');
    
    // Set text content
    document.getElementById('certificateTitle').textContent = data.title;
    document.getElementById('certificateDescription').textContent = data.description;
    document.getElementById('certificateDate').textContent = `Issued: ${data.date}`;
    
    const filePath = data.image;
    const fileExtension = filePath.split('.').pop().toLowerCase();
    
    // Reset viewers
    imageViewer.style.display = 'none';
    pdfViewer.style.display = 'none';
    imgElement.src = '';
    pdfElement.src = '';
    
    if (fileExtension === 'pdf') {
        // PDF MODE
        pdfElement.src = filePath + '#view=FitH&toolbar=0&navpanes=0&scrollbar=0';
        pdfViewer.style.display = 'block';
        fileTypeBadge.textContent = 'PDF';
        fileTypeBadge.className = 'file-type-badge pdf';
    } else {
        // IMAGE MODE (JPG, PNG, GIF, WebP, SVG, etc.)
        const img = new Image();
        img.onload = function() {
            imgElement.src = filePath;
            imgElement.alt = data.title;
            imageViewer.style.display = 'block';
            fileTypeBadge.textContent = 'Image';
            fileTypeBadge.className = 'file-type-badge image';
        };
        img.onerror = function() {
            imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmYWZjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+RmlsZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
            imageViewer.style.display = 'block';
            fileTypeBadge.textContent = 'Image';
            fileTypeBadge.className = 'file-type-badge image';
        };
        img.src = filePath;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    document.getElementById('certificateModal').style.display = 'none';
    document.getElementById('imageViewer').style.display = 'none';
    document.getElementById('pdfViewer').style.display = 'none';
    document.getElementById('certificateImage').src = '';
    document.getElementById('certificatePdf').src = '';
    document.body.style.overflow = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.view-cert-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const certId = e.currentTarget.closest('.certificate-card').dataset.certificate;
            openCertificateModal(certId);
        });
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCertificateModal();
    });
});

// Global functions for external access
window.openCertificateModal = openCertificateModal;
window.closeCertificateModal = closeCertificateModal;