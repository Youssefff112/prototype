# FitCore - Page Classification

## 📋 Page Organization

### 🌐 Public Pages (No Authentication Required)

These pages are accessible to everyone without login.

| Page             | Location     | Purpose                                                           |
| ---------------- | ------------ | ----------------------------------------------------------------- |
| **Landing Page** | `index.html` | Main landing page with features, how-it-works, and call-to-action |

---

### 👤 User Pages (Requires User Login)

These pages require standard user authentication. Accessible by users with `role: 'user'`.

| Page             | Location                  | Purpose                                                                      | Protected By                    |
| ---------------- | ------------------------- | ---------------------------------------------------------------------------- | ------------------------------- |
| **Login**        | `pages/login.html`        | User/Admin login page                                                        | Public (redirects if logged in) |
| **Register**     | `pages/register.html`     | New user registration with allergies                                         | Public (redirects if logged in) |
| **Onboarding**   | `pages/onboarding.html`   | 4-step user onboarding (training type, personal info, goals, diet/equipment) | `Auth.requireLogin()`           |
| **Dashboard**    | `pages/dashboard.html`    | Main user dashboard with stats, today's workout, weekly activity             | `Auth.requireLogin()`           |
| **Workout Plan** | `pages/workout-plan.html` | Weekly workout schedule and exercise details                                 | `Auth.requireLogin()`           |
| **Diet Plan**    | `pages/diet-plan.html`    | Daily meal plans, nutrition tracking, hydration                              | `Auth.requireLogin()`           |
| **Gym Finder**   | `pages/gym-finder.html`   | Search and discover gyms in Cairo & Giza                                     | `Auth.requireLogin()`           |
| **AI Assistant** | `pages/ai-assistant.html` | AI-powered workout form correction (visible to all users)                    | `Auth.requireLogin()`           |
| **Progress**     | `pages/progress.html`     | Track workouts, weight, measurements, achievements                           | `Auth.requireLogin()`           |
| **Settings**     | `pages/settings.html`     | User profile, training type toggle, preferences, password change             | `Auth.requireLogin()`           |

---

### 🛡️ Admin Pages (Requires Admin Role)

These pages require admin authentication. Accessible ONLY by users with `role: 'admin'`.

| Page                | Location                     | Purpose                                              | Protected By          |
| ------------------- | ---------------------------- | ---------------------------------------------------- | --------------------- |
| **Admin Dashboard** | `pages/admin.html`           | Main admin dashboard with system overview            | `Auth.requireAdmin()` |
| **Admin Dashboard** | `pages/admin-dashboard.html` | Complete admin panel (same as above, alternate name) | `Auth.requireAdmin()` |

#### Admin Dashboard Sections:

**1. Dashboard (Default View)**

- System statistics overview
- Total users, active gyms, AI sessions
- Recent activity feed
- User distribution charts (onsite/offline)
- Experience level breakdown

**2. User Management** (`showSection('users')`)

- View all registered users
- Search and filter users
- **Actions:**
  - ✅ View user details (profile, allergies, join date)
  - ✅ Edit user (email, training type)
  - ✅ Delete user (protected for admins)
- Real-time user list from localStorage
- Pagination support

**3. Gym Management** (`showSection('gyms')`)

- Manage gym database
- **Actions:**
  - ✅ View gym details (location, hours, rating, price)
  - ✅ Add new gym
  - ✅ Edit gym information
  - ✅ Delete gym
- Auto-initialized with default gyms

**4. Exercise Library** (`showSection('exercises')`)

- Manage exercise database
- **Actions:**
  - ✅ View exercise details (muscles, equipment, difficulty)
  - ✅ Add new exercise
  - ✅ Edit exercise information
  - ✅ Delete exercise
- Auto-initialized with default exercises

**5. Reports & Analytics** (`showSection('reports')`)

- User growth statistics
- Training type distribution charts
- Active gyms count
- Detailed metrics table
- Real-time calculations from database

**6. System Settings** (`showSection('settings')`)

**Database Management:**

- ✅ Export all data (JSON backup)
- ✅ View storage information
- ✅ Clear cache
- ✅ Reset database (requires "RESET" confirmation)

**Security Settings:**

- Session timeout configuration
- Email verification toggle
- Two-factor authentication toggle
- Save security preferences

**Application Settings:**

- Application name customization
- Default language selection
- Max file upload size
- Support email configuration
- Maintenance mode toggle

---

## 🔒 Access Control Summary

### Authentication Levels:

1. **No Auth** (Public)

   - `index.html`

2. **User Auth** (`Auth.requireLogin()`)

   - All pages in `/pages` directory except admin pages
   - Checks if user is logged in
   - Redirects to `login.html` if not authenticated

3. **Admin Auth** (`Auth.requireAdmin()`)
   - `admin.html`
   - `admin-dashboard.html`
   - Checks if user has `role: 'admin'`
   - Redirects to `login.html` if not admin

---

## 📊 Feature Availability by Role

| Feature               | Public | User | Admin  |
| --------------------- | ------ | ---- | ------ |
| View Landing Page     | ✅     | ✅   | ✅     |
| Register Account      | ✅     | ❌   | ❌     |
| Login                 | ✅     | ❌\* | ❌\*   |
| User Dashboard        | ❌     | ✅   | ✅\*\* |
| Workout Plans         | ❌     | ✅   | ✅\*\* |
| Diet Plans            | ❌     | ✅   | ✅\*\* |
| Gym Finder            | ❌     | ✅   | ✅\*\* |
| AI Assistant          | ❌     | ✅   | ✅\*\* |
| Progress Tracking     | ❌     | ✅   | ✅\*\* |
| User Settings         | ❌     | ✅   | ✅\*\* |
| Admin Dashboard       | ❌     | ❌   | ✅     |
| User Management       | ❌     | ❌   | ✅     |
| Gym Management        | ❌     | ❌   | ✅     |
| Exercise Library Mgmt | ❌     | ❌   | ✅     |
| Reports & Analytics   | ❌     | ❌   | ✅     |
| System Settings       | ❌     | ❌   | ✅     |
| Database Management   | ❌     | ❌   | ✅     |

\*Redirects to dashboard if already logged in  
\*\*Admin can access via "View as User" link

---

## 🚀 Navigation Paths

### User Flow:

```
index.html
  → pages/register.html
  → pages/onboarding.html (4 steps)
  → pages/dashboard.html
  → [workout-plan | diet-plan | gym-finder | ai-assistant | progress | settings]
```

### Admin Flow:

```
index.html
  → pages/login.html (admin credentials)
  → pages/admin-dashboard.html
  → [users | gyms | exercises | reports | settings sections]
  → "View as User" → pages/dashboard.html
```

---

## 🔐 Default Accounts

### Admin Account:

- **Email:** `admin@fitcore.com`
- **Password:** `admin123`
- **Access:** All admin pages + all user pages

### User Account:

- **Email:** `user@fitcore.com`
- **Password:** `user123`
- **Access:** All user pages only

---

## 📱 Page Features

### User Pages Features:

- Dynamic user information display
- Training type based navigation (onsite/offline)
- Allergies support in profile
- Session persistence
- Logout functionality
- Real-time data updates

### Admin Pages Features:

- Full CRUD operations (Create, Read, Update, Delete)
- Real-time statistics
- Data export/import
- Database management
- Security configuration
- System-wide settings
- User activity monitoring
- Multi-section navigation

---

## 📝 Notes

1. **AI Assistant Visibility:** Now visible to ALL users (onsite and offline) as per recent update
2. **Training Type:** Set during onboarding (Step 1), can be changed in settings
3. **Allergies:** Captured during registration, pre-filled in onboarding
4. **Admin Protection:** Admins cannot be deleted via user management
5. **Data Storage:** All data stored in localStorage (browser-specific)
6. **Session Management:** Session persists until explicit logout
7. **Real-time Updates:** Admin changes reflect immediately in user experience

---

**Last Updated:** November 13, 2025  
**Total Pages:** 12 HTML files (1 public landing + 10 user pages + 2 admin pages)
