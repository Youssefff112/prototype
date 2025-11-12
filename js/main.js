// FitCore - Main JavaScript File

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
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

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow');
            } else {
                navbar.classList.remove('shadow');
            }
        });
    }

    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.stat-card, .feature-card, .gym-card, .workout-day').forEach(el => {
        observer.observe(el);
    });

    // Mobile sidebar toggle
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'btn btn-dark d-md-none position-fixed';
    sidebarToggle.style.cssText = 'top: 80px; left: 10px; z-index: 1000;';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && window.innerWidth < 768) {
        document.body.appendChild(sidebarToggle);
        
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
});

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    toast.style.zIndex = '9999';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Local storage helpers
const FitCore = {
    storage: {
        set: function(key, value) {
            localStorage.setItem('fitcore_' + key, JSON.stringify(value));
        },
        get: function(key) {
            const item = localStorage.getItem('fitcore_' + key);
            return item ? JSON.parse(item) : null;
        },
        remove: function(key) {
            localStorage.removeItem('fitcore_' + key);
        }
    },
    
    user: {
        isLoggedIn: function() {
            return this.storage.get('user') !== null;
        },
        login: function(userData) {
            this.storage.set('user', userData);
        },
        logout: function() {
            this.storage.remove('user');
            this.storage.remove('userType');
            window.location.href = 'index.html';
        },
        getData: function() {
            return this.storage.get('user');
        }
    }
};

// Initialize workout timer
function startWorkoutTimer() {
    let seconds = 0;
    const timerDisplay = document.getElementById('workoutTimer');
    
    if (!timerDisplay) return;
    
    const interval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
    
    return interval;
}

// Rep counter
let repCount = 0;
function incrementReps() {
    repCount++;
    const repCounter = document.getElementById('repCounter');
    if (repCounter) {
        repCounter.textContent = repCount;
        
        // Add animation
        repCounter.classList.add('scale-up');
        setTimeout(() => repCounter.classList.remove('scale-up'), 300);
    }
}

function resetReps() {
    repCount = 0;
    const repCounter = document.getElementById('repCounter');
    if (repCounter) {
        repCounter.textContent = '0';
    }
}

// Progress tracking
function updateProgress(exerciseId, completed) {
    const exercises = FitCore.storage.get('exercises') || {};
    exercises[exerciseId] = {
        completed: completed,
        date: new Date().toISOString()
    };
    FitCore.storage.set('exercises', exercises);
}

// Notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showToast('Notifications enabled! You\'ll receive workout reminders.', 'success');
            }
        });
    }
}

// Send notification
function sendNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: '/files/icon.png',
            badge: '/files/badge.png'
        });
    }
}

// Camera access for AI assistant
async function requestCameraAccess() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });
        return stream;
    } catch (error) {
        console.error('Camera access denied:', error);
        showToast('Camera access is required for AI workout assistant', 'danger');
        return null;
    }
}

// Initialize on page load
window.addEventListener('load', function() {
    // Check if user is logged in for protected pages
    const protectedPages = ['dashboard.html', 'workout-plan.html', 'ai-assistant.html', 'gym-finder.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !FitCore.storage.get('user')) {
        // Redirect to login if not authenticated
        // window.location.href = 'login.html';
    }
    
    // Request notification permission after a delay
    setTimeout(requestNotificationPermission, 3000);
});

// Export for use in other scripts
window.FitCore = FitCore;
