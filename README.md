# FitCore - Fitness Platform Prototype

## Overview

FitCore is a comprehensive web-based fitness platform designed for both gym-goers and home workout enthusiasts. This prototype demonstrates the core features and user interface of the system with a fully functional authentication system, role-based access control, and localStorage-based data management.

## Project Information

- **Version**: 2.0
- **Date**: November 2025
- **Type**: Fully Functional Frontend Prototype
- **Authentication**: localStorage-based session management
- **Data Storage**: Browser localStorage (users, gyms, exercises, settings)
- **Target Users**: On-site gym users and offline (home) workout users

## Features

### For All Users

- ✅ **Secure Authentication**: Full registration and login system with session management
- ✅ **Role-Based Access**: User and admin roles with protected routes
- ✅ **One-Time Onboarding**: 4-step setup process that runs once after registration
- ✅ **Profile Management**: Complete profile with goals, allergies, and preferences
- ✅ **Training Type Selection**: Choose between on-site (gym) or offline (home) training
- ✅ **Personalized Dashboard**: Role-specific dashboards with relevant features
- ✅ **AI Assistant**: Always accessible AI-powered workout guidance
- ✅ **Settings Page**: Modify preferences including training type after onboarding
- ✅ **Workout Plans**: View personalized weekly workout schedules
- ✅ **Diet Planning**: Custom meal plans with allergy considerations
- ✅ **Progress Tracking**: Track weight, measurements, and workout history

### For On-Site Users

- 🏢 Gym database search and filtering
- 📍 Location-based gym finder (Cairo & Giza)
- 🏋️ Equipment availability checking
- 🕐 Operating hours display
- 🗺️ Interactive maps (prototype)

### For Offline Users

- 🤖 AI-powered workout assistant
- 📹 Real-time posture detection
- 🎯 Form correction feedback
- 🔊 Audio and visual guidance
- 📊 Performance metrics tracking
- ⚠️ Injury prevention alerts

### Admin Features

- 👥 **User Management**: Full CRUD operations (view, edit, delete users)
- 🏢 **Gym Database**: Add, edit, delete, and view gym information
- 💪 **Exercise Library**: Complete exercise management with difficulty levels
- 📈 **Reports & Analytics**: User growth statistics, training type distribution
- ⚙️ **System Settings**: Security settings, app configuration, database management
- 💾 **Data Export**: Export all data to JSON for backup
- 📊 **Dashboard Overview**: Real-time statistics on users, gyms, and activities
- 🔐 **Admin-Only Access**: Protected admin routes requiring admin role

## Pages Included

### Public Pages (No Login Required)

1. **index.html** - Landing page with features and call-to-action

### Authentication Pages

2. **pages/login.html** - User authentication with role-based redirect
3. **pages/register.html** - New user registration with allergies field

### User Pages (Login Required)

4. **pages/onboarding.html** - 4-step user profile setup (one-time only)
5. **pages/dashboard.html** - Main user dashboard with quick stats
6. **pages/workout-plan.html** - Weekly workout schedule
7. **pages/diet-plan.html** - Meal planning with allergy considerations
8. **pages/gym-finder.html** - Search and filter gyms (on-site users)
9. **pages/ai-assistant.html** - AI-powered live workout session
10. **pages/progress.html** - Track measurements and workout history
11. **pages/settings.html** - User preferences and profile management

### Admin Pages (Admin Role Required)

12. **pages/admin-dashboard.html** - Complete admin control panel with 6 sections:
    - Dashboard (statistics overview)
    - Users (CRUD operations)
    - Gyms (CRUD operations)
    - Exercise Library (CRUD operations)
    - Reports (analytics and statistics)
    - Settings (system configuration)

## Technology Stack

### Frontend

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom styles with Bootstrap 5 framework
- **JavaScript (ES6+)**: Modular vanilla JS with no framework dependencies
- **Font Awesome 6**: Comprehensive icon library
- **localStorage**: Client-side data persistence

### Authentication & Security

- **Session Management**: JWT-like session storage in localStorage
- **Role-Based Access Control**: User and admin roles
- **Protected Routes**: Auto-redirect for unauthorized access
- **Onboarding Tracking**: One-time setup with completion flag
- **Password Validation**: Minimum length requirements

### Design

- **Fully Responsive**: Mobile-first design (320px to 4K)
- **Modern Gradients**: Purple and dark themes
- **Smooth Animations**: CSS transitions and transforms
- **Component-Based**: Reusable card and modal components
- **Accessible UI**: WCAG 2.1 Level AA compliant

## File Structure

```
prototype/
├── index.html              # Landing page (public)
├── pages/                  # All application pages
│   ├── login.html          # Authentication page
│   ├── register.html       # User registration
│   ├── onboarding.html     # One-time user setup
│   ├── dashboard.html      # User dashboard (protected)
│   ├── workout-plan.html   # Workout schedules
│   ├── diet-plan.html      # Meal planning
│   ├── gym-finder.html     # Gym search and filter
│   ├── ai-assistant.html   # AI workout guidance
│   ├── progress.html       # Progress tracking
│   ├── settings.html       # User preferences
│   └── admin-dashboard.html # Admin control panel (admin only)
├── css/
│   ├── bootstrap.min.css   # Bootstrap 5.3
│   ├── all.min.css         # Font Awesome 6
│   └── style.css           # Custom styles (700+ lines)
├── js/
│   ├── bootstrap.bundle.min.js  # Bootstrap JS
│   ├── all.min.js          # Font Awesome JS
│   ├── auth.js             # Authentication system (250+ lines)
│   ├── admin.js            # Admin functions (650+ lines)
│   └── main.js             # Utility functions
├── files/
│   ├── SRS V1.pdf          # Requirements document
│   ├── Class Diagram_V1.drawio.png
│   └── ERD Diagram_V1.drawio.png
├── webfonts/               # Font Awesome fonts
├── CHANGELOG.md            # Version history
├── NAVIGATION_GUIDE.md     # Page navigation reference
├── PAGE_CLASSIFICATION.md  # Admin vs user pages
├── PROJECT_SUMMARY.md      # Project overview
├── QUICK_START.md          # Getting started guide
└── README.md               # This file
```

## How to Use

### Running the Prototype

1. Open `index.html` in a modern web browser
2. Click "Get Started" or "Login" to access the system

### Default Accounts

**User Account:**

- Email: `user@fitcore.com`
- Password: `user123`
- Access: All user pages, onboarding completed

**Admin Account:**

- Email: `admin@fitcore.com`
- Password: `admin123`
- Access: Admin dashboard with full CRUD operations

### New User Registration Flow

1. **Register** → Fill in details (including allergies)
2. **Auto-Login** → Automatically logged in after registration
3. **Onboarding** (One-time):
   - Step 1: Choose training type (on-site/offline)
   - Step 2: Enter personal info (age, gender, height, weight)
   - Step 3: Set fitness goals and experience level
   - Step 4: Diet preferences and equipment
4. **Dashboard** → Access main user dashboard
5. **Settings** → Change preferences later (including training type)

### User Flows

#### On-Site User Flow

1. Register → Select "At a Gym" in onboarding
2. Complete 4-step onboarding
3. Access dashboard with gym-specific features
4. Search for gyms in Cairo & Giza
5. View workout plans
6. Access AI assistant
7. Track progress

#### Offline User Flow

1. Register → Select "At Home" in onboarding
2. Complete 4-step onboarding
3. Access dashboard with home workout features
4. Select equipment (dumbbells, resistance bands, etc.)
5. Get AI-powered workout guidance
6. Track progress without gym dependency

### Admin Access

1. Login with admin credentials
2. Access admin dashboard with 6 sections:
   - **Dashboard**: View statistics (total users, active gyms, AI sessions)
   - **Users**: View, edit, delete users (cannot delete admins)
   - **Gyms**: Add, edit, delete, view gym details
   - **Exercises**: Manage exercise library with difficulty levels
   - **Reports**: View user growth, training distribution, activity stats
   - **Settings**: Configure security, export data, manage database
3. All operations persist in localStorage

## Key Features Demonstrated

### 1. Complete Authentication System

- User registration with validation
- Secure login with credential checking
- Session management (localStorage-based)
- Role-based access control (user/admin)
- Auto-login after registration
- Protected routes with auto-redirect
- Logout functionality across all pages

### 2. Onboarding System

- **One-Time Setup**: Runs only once after registration
- **4-Step Process**: Training type → Personal info → Goals → Diet/Equipment
- **Completion Tracking**: Users cannot return to onboarding
- **Flexible Settings**: Change choices later in settings page
- **Data Persistence**: All onboarding data saved to user profile

### 3. Admin Dashboard (Fully Functional)

- **User Management**: View all users, edit details, delete non-admin users
- **Gym CRUD**: Add/edit/delete gyms with location, hours, ratings
- **Exercise Library**: Manage exercises with categories and difficulty
- **Reports**: User growth charts, training type distribution, statistics
- **Settings**: Security config, data export, database management
- **Real-time Stats**: Dashboard updates with current data

### 4. Data Management

- **localStorage Integration**: All data persists in browser
- **CRUD Operations**: Full create, read, update, delete functionality
- **Data Export**: Download all data as JSON backup
- **Default Data**: Pre-populated gyms and exercises
- **Session Tracking**: User sessions with login time
- **Profile Updates**: Real-time profile synchronization

### 5. User Experience

- **Smooth Transitions**: CSS animations between pages
- **Intuitive Navigation**: Sidebar navigation on dashboards
- **Visual Feedback**: Success/error messages for all actions
- **Responsive Design**: Works on all devices
- **Always-Available AI**: AI assistant visible to all users
- **Context-Aware UI**: Different features based on training type

### 6. AI Assistant Interface

- Exercise selection dropdown
- Rep counter display
- Real-time feedback area
- Performance metrics
- Camera integration placeholder
- Session controls (start/pause/stop)

### 7. Progress Tracking

- Weight tracking with chart visualization
- Body measurements logging
- Workout history
- Goal progress indicators
- Last workout display

## What Works (Fully Functional)

✅ **Complete Authentication System** - Login, registration, session management
✅ **Role-Based Access Control** - User and admin roles with protected routes
✅ **localStorage Data Persistence** - All data saved in browser
✅ **Admin CRUD Operations** - Full user, gym, and exercise management
✅ **One-Time Onboarding** - First-time setup with completion tracking
✅ **Profile Management** - Edit user preferences and training type
✅ **Reports & Analytics** - Real-time statistics and charts
✅ **Data Export** - Download backup as JSON
✅ **Responsive Design** - Works on all screen sizes
✅ **Form Validation** - Password strength, email format, required fields

## Prototype Limitations

This is a **frontend prototype** and does not include:

- ❌ Backend server (uses localStorage instead of database)
- ❌ Server-side authentication (client-side only)
- ❌ Actual AI/ML models (UI placeholder only)
- ❌ Real camera processing (simulated interface)
- ❌ Payment processing
- ❌ Email notifications
- ❌ Real-time data sync across devices
- ❌ Password hashing (stored in plain text)
- ❌ Multi-device session management

## Future Implementation (For Production)

### Backend Development

1. **API Server**: Node.js/Express or Python/Django
2. **Database**: PostgreSQL or MongoDB with proper schema
3. **Authentication**: JWT tokens with refresh mechanism
4. **Password Security**: bcrypt hashing and salting
5. **Session Management**: Redis for session storage
6. **File Storage**: AWS S3 or similar for media

### AI/ML Integration

7. **Pose Detection**: MediaPipe or OpenPose integration
8. **Exercise Recognition**: TensorFlow/PyTorch models
9. **Real-time Processing**: WebRTC video streaming
10. **Form Analysis**: Custom ML models for posture correction

### Additional Features

11. **Payment Gateway**: Stripe/PayPal integration
12. **Email Service**: SendGrid/Mailgun for notifications
13. **SMS Notifications**: Twilio integration
14. **Social Features**: Friend connections, challenges
15. **Nutrition API**: Integration with food databases
16. **Wearable Integration**: Fitbit, Apple Watch sync

### Infrastructure

17. **Cloud Hosting**: AWS/Google Cloud/Azure
18. **CDN**: CloudFlare for static assets
19. **CI/CD Pipeline**: Automated testing and deployment
20. **Monitoring**: Error tracking and analytics
21. **Mobile Apps**: React Native or Flutter development
22. **Progressive Web App**: Service workers and offline support

## Design Decisions

### Color Scheme

- Primary: Purple gradient (#667eea to #764ba2)
- Success: Green (#198754)
- Warning: Yellow (#ffc107)
- Danger: Red (#dc3545)
- Dark: Navy (#212529)

### Typography

- Font Family: Segoe UI, Tahoma, Geneva, Verdana
- Headings: Bold, large sizes
- Body: Regular weight, readable sizes

### Layout

- Fixed top navigation
- Collapsible sidebar for dashboard
- Card-based content blocks
- Grid system for responsive layout

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility Features

- Semantic HTML5
- ARIA labels
- Keyboard navigation
- High contrast ratios
- Responsive font sizes

## localStorage Data Structure

The prototype stores data in the following localStorage keys:

- `fitcore_users` - Array of all registered users
- `fitcore_session` - Current user session information
- `fitcore_current_user` - Current logged-in user object
- `fitcore_gyms` - Array of gym locations
- `fitcore_exercises` - Array of exercise library
- `fitcore_security_settings` - Security configuration
- `fitcore_app_settings` - Application settings
- `fitcore_initialized` - Initialization flag

### Clear Data

To reset the prototype, run in browser console:

```javascript
localStorage.clear();
location.reload();
```

## Testing Checklist

### User Registration & Login

- [x] New user can register with valid email
- [x] Duplicate email validation works
- [x] Password length validation (min 6 chars)
- [x] Auto-login after registration
- [x] Login with existing credentials
- [x] Role-based redirect (user → dashboard, admin → admin-dashboard)

### Onboarding Flow

- [x] First-time users see onboarding after registration
- [x] 4-step process completes successfully
- [x] Training type selection works (on-site/offline)
- [x] Profile data saves correctly
- [x] Cannot return to onboarding after completion
- [x] Completed users go directly to dashboard

### User Features

- [x] Dashboard shows user-specific information
- [x] AI Assistant page accessible to all users
- [x] Settings page allows preference changes
- [x] Logout works correctly
- [x] Protected pages require login

### Admin Features

- [x] Admin login redirects to admin dashboard
- [x] View all users in table
- [x] Edit user email and training type
- [x] Delete users (non-admin only)
- [x] Add/edit/delete gyms
- [x] Add/edit/delete exercises
- [x] Reports show correct statistics
- [x] Settings allow data export
- [x] Database operations persist in localStorage

## Known Issues

1. **No password recovery** - Users cannot reset forgotten passwords
2. **Plain text passwords** - Stored without hashing (prototype only)
3. **No email verification** - Email addresses not validated
4. **Single device only** - localStorage not synced across devices
5. **Data loss on clear** - Clearing browser data removes all users
6. **No backup mechanism** - Manual export required for backups

## Browser Support

- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ❌ Internet Explorer (Not supported)

## Credits

- **Bootstrap 5.3** - Responsive CSS framework
- **Font Awesome 6** - Icon library
- **SRS V1** - Requirements specification document
- **Vanilla JavaScript** - No external JS frameworks

## License

Educational/Graduation Project - 2025
For academic purposes only

## Documentation

Additional documentation files:

- `CHANGELOG.md` - Version history and updates
- `NAVIGATION_GUIDE.md` - Page navigation reference
- `PAGE_CLASSIFICATION.md` - Admin vs user page matrix
- `PROJECT_SUMMARY.md` - Technical overview
- `QUICK_START.md` - Quick start guide

## Contact

For questions or feedback about this prototype, please refer to the project documentation or SRS V1 requirements document.

---

**Note**: This is a **fully functional frontend prototype** with complete authentication, data management, and CRUD operations using localStorage. All features work as intended within the browser environment. For production use, backend integration and security enhancements are required.
