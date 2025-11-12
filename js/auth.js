// FitCore Authentication System
// Handles user login, registration, and session management

// Initialize default accounts
function initializeDefaultAccounts() {
    const users = JSON.parse(localStorage.getItem('fitcore_users')) || [];
    
    // Check if default accounts exist
    const adminExists = users.some(u => u.email === 'admin@fitcore.com');
    const userExists = users.some(u => u.email === 'user@fitcore.com');
    
    if (!adminExists) {
        users.push({
            id: 1,
            firstName: 'Admin',
            lastName: 'FitCore',
            email: 'admin@fitcore.com',
            password: 'admin123', // In production, this would be hashed
            role: 'admin',
            createdAt: new Date().toISOString()
        });
    }
    
    if (!userExists) {
        users.push({
            id: 2,
            firstName: 'John',
            lastName: 'Doe',
            email: 'user@fitcore.com',
            password: 'user123', // In production, this would be hashed
            role: 'user',
            userType: null, // Will be set after onboarding
            profile: {
                age: 25,
                gender: 'male',
                height: 175,
                weight: 75,
                goal: 'muscle_gain',
                experience: 'intermediate',
                dietType: 'none',
                equipment: ['dumbbells', 'resistance_bands']
            },
            createdAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem('fitcore_users', JSON.stringify(users));
}

// Initialize accounts on page load
initializeDefaultAccounts();

// Authentication Functions
const Auth = {
    // Register new user
    register: function(userData) {
        const users = JSON.parse(localStorage.getItem('fitcore_users')) || [];
        
        // Check if email already exists
        if (users.some(u => u.email === userData.email)) {
            return {
                success: false,
                message: 'Email already registered'
            };
        }
        
        // Create new user
        const newUser = {
            id: users.length + 1,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password, // In production, hash this
            role: 'user',
            userType: null, // Will be set during workout selection
            allergies: userData.allergies || null, // Store allergies from registration
            profile: null,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('fitcore_users', JSON.stringify(users));
        
        return {
            success: true,
            message: 'Registration successful',
            user: newUser
        };
    },
    
    // Login user
    login: function(email, password) {
        const users = JSON.parse(localStorage.getItem('fitcore_users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
        
        // Store current session
        const session = {
            userId: user.id,
            email: user.email,
            role: user.role,
            userType: user.userType,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('fitcore_session', JSON.stringify(session));
        localStorage.setItem('fitcore_current_user', JSON.stringify(user));
        
        return {
            success: true,
            message: 'Login successful',
            user: user
        };
    },
    
    // Logout user
    logout: function() {
        localStorage.removeItem('fitcore_session');
        localStorage.removeItem('fitcore_current_user');
        window.location.href = '../index.html';
    },
    
    // Check if user is logged in
    isLoggedIn: function() {
        const session = localStorage.getItem('fitcore_session');
        return session !== null;
    },
    
    // Get current user
    getCurrentUser: function() {
        const userStr = localStorage.getItem('fitcore_current_user');
        return userStr ? JSON.parse(userStr) : null;
    },
    
    // Check if user is admin
    isAdmin: function() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },
    
    // Update user profile
    updateProfile: function(userId, profileData) {
        const users = JSON.parse(localStorage.getItem('fitcore_users')) || [];
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }
        
        users[userIndex].profile = { ...users[userIndex].profile, ...profileData };
        localStorage.setItem('fitcore_users', JSON.stringify(users));
        
        // Update current user session
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            currentUser.profile = users[userIndex].profile;
            localStorage.setItem('fitcore_current_user', JSON.stringify(currentUser));
        }
        
        return { success: true, message: 'Profile updated' };
    },
    
    // Set user type (onsite or offline)
    setUserType: function(userId, userType) {
        const users = JSON.parse(localStorage.getItem('fitcore_users')) || [];
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }
        
        users[userIndex].userType = userType;
        localStorage.setItem('fitcore_users', JSON.stringify(users));
        
        // Update session
        const session = JSON.parse(localStorage.getItem('fitcore_session'));
        if (session) {
            session.userType = userType;
            localStorage.setItem('fitcore_session', JSON.stringify(session));
        }
        
        // Update current user
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            currentUser.userType = userType;
            localStorage.setItem('fitcore_current_user', JSON.stringify(currentUser));
        }
        
        return { success: true, message: 'User type updated' };
    },
    
    // Require login (call this on protected pages)
    requireLogin: function() {
        if (!this.isLoggedIn()) {
            window.location.href = '../pages/login.html';
            return false;
        }
        return true;
    },
    
    // Require admin (call this on admin pages)
    requireAdmin: function() {
        if (!this.isLoggedIn()) {
            window.location.href = '../pages/login.html';
            return false;
        }
        if (!this.isAdmin()) {
            window.location.href = '../pages/dashboard.html';
            return false;
        }
        return true;
    }
};

// Display user info in navbar
function displayUserInfo() {
    const user = Auth.getCurrentUser();
    if (user) {
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(el => {
            el.textContent = `${user.firstName} ${user.lastName}`;
        });
    }
}

// Setup logout buttons
function setupLogoutButtons() {
    const logoutButtons = document.querySelectorAll('[data-logout]');
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                Auth.logout();
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayUserInfo();
    setupLogoutButtons();
});

// Export Auth object
window.Auth = Auth;
