# FitCore - Quick Start Guide

## 🚀 Getting Started

### Option 1: Open with Live Server (Recommended)

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Application will open at `http://localhost:5500` (or similar)

### Option 2: Open Directly in Browser

1. Navigate to the prototype folder
2. Double-click `index.html`
3. Application will open in your default browser

## 📝 Test Credentials

### Admin Account

- **Email:** `admin@fitcore.com`
- **Password:** `admin123`
- **Access:** Full admin dashboard + all user features

### Regular User Account

- **Email:** `user@fitcore.com`
- **Password:** `user123`
- **Access:** All user features (dashboard, workout, diet, etc.)

## 🎯 Quick Testing Workflow

### 1. Test Admin Access

```
1. Go to index.html
2. Click "Login"
3. Enter: admin@fitcore.com / admin123
4. ✅ Should redirect to Admin Dashboard
5. Verify admin panel features
6. Click "View as User" to see user dashboard
7. Logout
```

### 2. Test User Registration

```
1. Go to index.html
2. Click "Get Started"
3. Fill in registration form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
4. Check "I agree to Terms"
5. Click "Create Account"
6. ✅ Should redirect to Onboarding
7. Complete 4-step onboarding:
   Step 1: Choose training type (Onsite/Home)
   Step 2: Enter personal info
   Step 3: Select fitness goal
   Step 4: Set diet/equipment preferences
8. ✅ Should redirect to Dashboard
```

### 3. Test Existing User Login

```
1. Go to pages/login.html
2. Enter: user@fitcore.com / user123
3. ✅ Should redirect to Dashboard
4. Explore features:
   - View workout plan
   - Check diet plan
   - See progress tracking
   - Modify settings
```

### 4. Test Training Type Toggle

```
1. Login as user
2. Go to Dashboard
3. Click "Settings" in sidebar
4. Scroll to "Training Preferences"
5. Toggle between "On-Site Training" and "Home Workouts"
6. Click "Save Changes"
7. ✅ Return to Dashboard
8. Verify sidebar shows correct links:
   - Onsite: "Find Gyms" visible
   - Offline: "AI Assistant" visible
```

### 5. Test Page Protection

```
1. Clear browser session (or open incognito)
2. Try to access: http://localhost:5500/pages/dashboard.html
3. ✅ Should redirect to login page
4. Login and try again
5. ✅ Should access dashboard
```

### 6. Test Admin Protection

```
1. Login as regular user (user@fitcore.com)
2. Try to access: http://localhost:5500/pages/admin-dashboard.html
3. ✅ Should redirect to login or show access denied
4. Logout and login as admin
5. ✅ Should access admin dashboard
```

## 📂 Important File Locations

### Landing Page

- `index.html` (in root directory)

### User Pages

- `pages/login.html`
- `pages/register.html`
- `pages/onboarding.html`
- `pages/dashboard.html`
- `pages/workout-plan.html`
- `pages/diet-plan.html`
- `pages/gym-finder.html`
- `pages/ai-assistant.html`
- `pages/progress.html`
- `pages/settings.html`

### Admin Pages

- `pages/admin.html`
- `pages/admin-dashboard.html`

### Core JavaScript

- `js/auth.js` - Authentication system
- `js/main.js` - General utilities
- `js/bootstrap.bundle.min.js` - Bootstrap framework
- `js/all.min.js` - Font Awesome icons

### Styles

- `css/bootstrap.min.css` - Bootstrap styles
- `css/all.min.css` - Font Awesome styles
- `css/style.css` - Custom styles

## 🔧 Troubleshooting

### Issue: Login not working

**Solution:**

1. Open DevTools (F12)
2. Go to Console tab
3. Check for errors
4. Try clearing localStorage:
   - Application tab → Local Storage
   - Delete all `fitcore_*` entries
   - Refresh page

### Issue: Blank page after login

**Solution:**

1. Check browser console for errors
2. Verify all files are in correct locations
3. Check that auth.js is loaded
4. Try hard refresh (Ctrl+Shift+R)

### Issue: "User not found" or "Invalid credentials"

**Solution:**

1. Clear localStorage to reset default accounts
2. Refresh page to reinitialize
3. Use exact credentials (case-sensitive)
4. Check for extra spaces in email/password

### Issue: Admin page accessible by regular user

**Solution:**

1. Verify `Auth.requireAdmin()` is called in admin pages
2. Check console for errors
3. Confirm user role in DevTools:
   ```javascript
   // In console:
   Auth.getCurrentUser();
   // Should show role: 'admin' or 'user'
   ```

### Issue: Sidebar links not changing based on training type

**Solution:**

1. Go to Settings
2. Set training type explicitly
3. Click "Save Changes"
4. Refresh dashboard
5. Check user data in localStorage:
   ```javascript
   // In console:
   JSON.parse(localStorage.getItem("fitcore_session"));
   // Should show trainingType: 'onsite' or 'offline'
   ```

## 🗑️ Reset Application Data

To start fresh:

```javascript
// Open Browser DevTools Console (F12)
// Paste and run:

localStorage.removeItem("fitcore_users");
localStorage.removeItem("fitcore_session");
localStorage.removeItem("fitcore_initialized");
location.reload();

// This will:
// - Delete all user accounts
// - Clear current session
// - Reset to default admin/user accounts
```

## 🎨 Customization Tips

### Change Default Accounts

Edit `js/auth.js`, find `initializeDefaultAccounts()`:

```javascript
const defaultUsers = [
  {
    // Modify email, password, etc.
    email: "youradmin@example.com",
    password: "yourpassword",
    // ...
  },
];
```

### Add New Page

1. Create HTML file in `/pages` directory
2. Use `../` prefix for CSS/JS paths
3. Add auth protection:
   ```javascript
   Auth.requireLogin(); // For user pages
   Auth.requireAdmin(); // For admin pages
   ```
4. Add navigation link in sidebar
5. Test access control

### Modify Onboarding Flow

Edit `pages/onboarding.html`:

- Add/remove steps (update `totalSteps` variable)
- Modify form fields
- Change validation rules
- Adjust data saved to user profile

## 📊 Check Application Status

### View Current Session

```javascript
// In DevTools Console:
const session = Auth.getCurrentUser();
console.log("Current User:", session);
console.log("Role:", session?.role);
console.log("Training Type:", session?.trainingType);
console.log("Has Profile:", !!session?.profile);
```

### View All Users

```javascript
// In DevTools Console:
const users = JSON.parse(localStorage.getItem("fitcore_users") || "[]");
console.table(
  users.map((u) => ({
    name: u.firstName + " " + u.lastName,
    email: u.email,
    role: u.role,
    type: u.trainingType,
  }))
);
```

### Check Initialization

```javascript
// In DevTools Console:
console.log("Initialized:", localStorage.getItem("fitcore_initialized"));
console.log(
  "User Count:",
  JSON.parse(localStorage.getItem("fitcore_users") || "[]").length
);
```

## 🔒 Security Reminders

⚠️ **This is a PROTOTYPE/DEMO** - Not production-ready!

Current limitations:

- ❌ Client-side only authentication
- ❌ localStorage (easily accessible)
- ❌ Simple SHA-256 hashing
- ❌ No server validation
- ❌ No HTTPS enforcement
- ❌ No CSRF protection
- ❌ No rate limiting
- ❌ No session timeout

For production deployment:

- ✅ Implement server-side authentication
- ✅ Use secure password hashing (bcrypt)
- ✅ Implement JWT tokens
- ✅ Use HTTPS only
- ✅ Add CSRF protection
- ✅ Implement rate limiting
- ✅ Add session timeout
- ✅ Use secure, httpOnly cookies
- ✅ Add email verification
- ✅ Implement password reset

## 📞 Support

For issues or questions:

1. Check CHANGELOG.md for recent changes
2. Review code comments in auth.js
3. Check browser console for errors
4. Verify file structure matches documentation

## ✅ Feature Checklist

### Working Features:

- ✅ User registration
- ✅ User login
- ✅ Admin login
- ✅ Role-based access control
- ✅ Onboarding flow (4 steps)
- ✅ Training type selection
- ✅ Dashboard
- ✅ Workout plan view
- ✅ Diet plan view
- ✅ Gym finder (onsite users)
- ✅ AI assistant (offline users)
- ✅ Progress tracking
- ✅ Settings management
- ✅ Password change
- ✅ Account deletion
- ✅ Logout functionality
- ✅ Page protection
- ✅ Admin protection
- ✅ Session persistence

### Demo/Placeholder Features:

- 🔄 Actual workout generation (simulated)
- 🔄 Diet calculations (simulated)
- 🔄 AI pose detection (placeholder)
- 🔄 Gym database (mock data)
- 🔄 Progress charts (static)
- 🔄 Admin CRUD operations (UI only)

---

**Ready to test?** Start at `index.html` and explore! 🎉
