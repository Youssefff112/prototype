# FitCore - File Organization & Authentication System

## Recent Changes

### File Structure Reorganization

All HTML pages (except `index.html`) have been moved to `/pages` directory:

**Root Directory:**

- `index.html` - Landing page (stays in root)

**Pages Directory** (`/pages`):

- `login.html` - User login page
- `register.html` - User registration (user type removed, moved to settings)
- `onboarding.html` - New user onboarding flow
- `dashboard.html` - Main user dashboard
- `workout-plan.html` - Workout planning and tracking
- `diet-plan.html` - Daily meal plans and nutrition
- `gym-finder.html` - Gym search and discovery
- `ai-assistant.html` - AI-powered workout assistant
- `progress.html` - Progress tracking and analytics
- `settings.html` - User settings and preferences
- `admin.html` - Admin dashboard (protected)

### Path Updates

All pages in `/pages` directory now use:

- `../css/` for stylesheets
- `../js/` for scripts
- Relative links between pages (no `../` prefix needed)

### Authentication System

#### New File: `/js/auth.js`

Complete authentication system with:

- User registration and login
- Session management (localStorage)
- Password hashing (SHA-256)
- Role-based access control (user/admin)
- Page protection middleware
- Training type selection (onsite/offline)

#### Default Accounts

Two test accounts are pre-initialized:

**Admin Account:**

- Email: `admin@fitcore.com`
- Password: `admin123`
- Role: admin
- Access: All pages including admin dashboard

**User Account:**

- Email: `user@fitcore.com`
- Password: `user123`
- Role: user
- Access: All user pages (dashboard, workout, diet, etc.)

### Key Features

#### 1. User Registration (register.html)

- Removed user type selection from registration
- User type (onsite/offline) now selected during onboarding
- Can be changed later in settings
- Validates password strength (min 6 characters)
- Auto-login after successful registration

#### 2. Login System (login.html)

- Email/password authentication
- Role-based redirection:
  - Admin → admin-dashboard.html
  - User (no profile) → onboarding.html
  - User (with profile) → dashboard.html
- Demo credentials shown on page

#### 3. Onboarding Flow (onboarding.html)

**Step 1:** Training Type Selection

- Onsite (Gym) or Offline (Home)
- Updates user profile immediately
- Affects Step 4 questions

**Step 2:** Personal Information

- Age, gender, height, weight

**Step 3:** Fitness Goals

- Primary goal (weight loss, muscle gain, maintenance)
- Experience level

**Step 4:** Diet & Equipment/Gym Preferences

- Dietary preferences and allergies
- For Offline: Equipment selection
- For Onsite: Preferred location

#### 4. Settings Page (settings.html)

Complete user settings management:

- Profile information
- **Training type toggle** (onsite/offline)
- Fitness goals
- Diet preferences
- Notification settings
- Password change
- Account deletion

#### 5. Protected Pages

All user pages require login via `Auth.requireLogin()`:

- dashboard.html
- workout-plan.html
- diet-plan.html
- gym-finder.html
- ai-assistant.html
- progress.html
- settings.html
- onboarding.html

Admin page requires admin role via `Auth.requireAdmin()`:

- admin.html

### Authentication Methods

```javascript
// Initialize default accounts (called automatically)
initializeDefaultAccounts()

// Register new user
Auth.register({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'user'
})

// Login
Auth.login('user@fitcore.com', 'user123')

// Check if logged in
Auth.isLoggedIn() // returns boolean

// Get current user
Auth.getCurrentUser() // returns user object or null

// Logout
Auth.logout()

// Set training type
Auth.setUserType(userId, 'onsite' or 'offline')

// Page protection (place in script)
Auth.requireLogin()      // Requires any logged-in user
Auth.requireAdmin()      // Requires admin role
```

### User Data Structure

```javascript
{
  id: 'unique-id',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'hashed-password',
  role: 'user' or 'admin',
  trainingType: 'onsite' or 'offline' or null,
  profile: {
    // Onboarding data
    age: 25,
    gender: 'male',
    height: 175,
    weight: 70,
    goal: 'muscle_gain',
    experience: 'intermediate',
    dietType: 'none',
    allergies: '',
    equipment: [] or preferredLocation: ''
  },
  createdAt: timestamp
}
```

### Storage Keys (localStorage)

- `fitcore_users` - Array of all registered users
- `fitcore_session` - Current logged-in user session
- `fitcore_initialized` - Flag to prevent re-initializing default accounts

### Navigation Updates

#### Landing Page (index.html)

- Login button → `/pages/login.html`
- Get Started button → `/pages/register.html`

#### User Navigation

- Dashboard → `dashboard.html`
- Workout Plan → `workout-plan.html`
- Diet Plan → `diet-plan.html`
- Find Gyms → `gym-finder.html` (hidden for offline users)
- AI Assistant → `ai-assistant.html` (hidden for onsite users)
- Progress → `progress.html`
- Settings → `settings.html`

#### Conditional Navigation

The sidebar dynamically shows/hides links based on training type:

- **Onsite users:** See "Find Gyms" link
- **Offline users:** See "AI Assistant" link

### Testing the Application

1. **Start with fresh localStorage:**

   - Open DevTools → Application → Local Storage
   - Clear all `fitcore_*` keys
   - Refresh page to initialize defaults

2. **Test Admin Flow:**

   - Login with `admin@fitcore.com` / `admin123`
   - Should redirect to admin dashboard
   - Verify admin panel access

3. **Test New User Flow:**

   - Register new account
   - Complete onboarding (4 steps)
   - Verify training type selection
   - Check settings page for type toggle

4. **Test Existing User Flow:**

   - Login with `user@fitcore.com` / `user123`
   - Should skip onboarding (no profile set initially)
   - Will go through onboarding on first login

5. **Test Protected Pages:**

   - Try accessing `/pages/dashboard.html` without login
   - Should redirect to login page

6. **Test Training Type:**
   - Set training type to "offline" in settings
   - Verify "AI Assistant" appears in sidebar
   - Verify "Find Gyms" is hidden

### Browser Compatibility

- Requires modern browser with:
  - localStorage support
  - ES6+ JavaScript
  - Crypto API (for SHA-256 hashing)

### Security Notes

**Current Implementation (Demo/Prototype):**

- Passwords hashed with SHA-256 (client-side only)
- Data stored in localStorage (not secure for production)
- No server-side validation
- No HTTPS enforcement

**For Production, implement:**

- Server-side authentication
- Secure password hashing (bcrypt)
- JWT tokens or secure sessions
- HTTPS only
- CSRF protection
- Rate limiting
- Password reset functionality
- Email verification

### Next Steps

**Completed:**
✅ File reorganization
✅ Authentication system
✅ Default accounts
✅ User registration (without type)
✅ Login with role-based routing
✅ Onboarding flow (4 steps with type selection)
✅ Settings page (with type toggle)
✅ Progress page
✅ Diet plan page
✅ Page protection
✅ Admin protection

**To Implement (Future):**

- [ ] Admin dashboard enhancements
- [ ] User management (CRUD) for admin
- [ ] Gym management for admin
- [ ] Exercise library management
- [ ] Reports and analytics
- [ ] Profile picture upload
- [ ] Password reset via email
- [ ] Remember me functionality
- [ ] Session timeout
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)
- [ ] Real AI integration
- [ ] Real gym database integration
- [ ] Actual workout tracking
- [ ] Actual diet calculations

### File Cleanup

**Old Files (in root - can be archived/deleted):**

- `login.html` (replaced by `/pages/login.html`)
- `register.html` (replaced by `/pages/register.html`)
- `dashboard.html` (replaced by `/pages/dashboard.html`)
- `onboarding.html` (replaced by `/pages/onboarding.html`)
- `workout-plan.html` (replaced by `/pages/workout-plan.html`)
- `gym-finder.html` (replaced by `/pages/gym-finder.html`)
- `ai-assistant.html` (replaced by `/pages/ai-assistant.html`)
- `admin.html` (replaced by `/pages/admin.html`)

**Keep in Root:**

- `index.html` - Landing page
- `/css/` - Stylesheets
- `/js/` - JavaScript files
- `/files/` - Assets
- `/webfonts/` - Font files
- `/pages/` - All application pages

---

**Version:** 2.0  
**Last Updated:** 2025  
**Status:** File reorganization and authentication complete
