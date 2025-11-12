# FitCore Prototype - Quick Navigation Guide

## 🚀 Getting Started

### Main Landing Page

**File**: `index.html`

- Marketing content and features
- Call-to-action buttons
- How it works section
- About information

**Navigation**:

- Click "Get Started" → Goes to `register.html`
- Click "Login" → Goes to `login.html`
- Scroll to explore features

---

## 👤 User Registration & Login

### Registration (`register.html`)

1. Fill in: First Name, Last Name, Email, Password
2. **Important**: Choose user type:
   - **At a Gym** → On-site user (access gym finder)
   - **At Home** → Offline user (access AI assistant)
3. Accept terms and conditions
4. Click "Create Account" → Redirects to onboarding

### Login (`login.html`)

- Email: any@email.com (no validation in prototype)
- Password: anything
- Click "Login" → Goes to dashboard

---

## 📝 Onboarding Process (`onboarding.html`)

### Step 1: Personal Information

- Age (13-100)
- Gender
- Height (cm)
- Current Weight (kg)

### Step 2: Fitness Goals

- Select goal: Weight Loss / Muscle Gain / Maintenance
- Choose experience level: Beginner / Intermediate / Advanced

### Step 3: Diet Preferences

- Diet type: Vegetarian, Vegan, Keto, etc.
- Allergies (optional)
- Meals per day

### Step 4: Equipment/Preferences

**For Offline Users**:

- Select available home equipment
- Bodyweight, dumbbells, resistance bands, etc.

**For On-Site Users**:

- Preferred gym location
- Important facilities (pool, sauna, classes)

---

## 🏠 Dashboard (`dashboard.html`)

### Overview

- Weekly workout stats
- Current weight tracking
- Daily calorie count
- Streak counter

### Quick Actions

- View today's workout
- Mark exercises as complete
- Access full workout plan
- View diet plan
- Find gyms (on-site) / Start AI workout (offline)

### Sidebar Navigation

- Dashboard
- Workout Plan
- Diet Plan
- Find Gyms (on-site only)
- AI Assistant (offline only)
- Progress
- Settings

---

## 💪 Workout Plan (`workout-plan.html`)

### Features

- Weekly schedule (Monday - Friday)
- Exercise details (sets × reps)
- Target muscle groups
- Exercise info buttons
- Mark exercises as complete
- Regenerate plan option

### Workout Days

- **Monday**: Chest & Triceps
- **Tuesday**: Back & Biceps
- **Wednesday**: Legs (shown as today)
- **Thursday**: Shoulders
- **Friday**: Full Body
- **Weekend**: Rest days

---

## 🏢 Gym Finder (`gym-finder.html`)

_For On-Site Users Only_

### Search & Filter Options

- Search by gym name
- Filter by location (Cairo, Giza, areas)
- Filter by operating hours (24/7, Open Now)
- Filter by equipment (squat rack, pool, sauna, etc.)

### Gym Cards Display

- Gym name and location
- Operating hours
- Open/Closed status
- Available equipment tags
- "View Details" and "Map" buttons

### Sample Gyms

1. Gold's Gym - Nasr City
2. FitZone Premium - Maadi (24/7)
3. Power House Gym - Heliopolis
4. Elite Fitness Club - 6th of October

---

## 🤖 AI Workout Assistant (`ai-assistant.html`)

_For Offline Users Only_

### Main Features

1. **Live Camera Feed** (simulated)

   - Camera toggle button
   - Microphone toggle
   - Settings button

2. **Exercise Selection Panel**

   - Choose from today's workout
   - Push-ups, Squats, Lunges, Plank
   - Click to select exercise

3. **Real-time Feedback**

   - AI form corrections
   - Success/Warning/Error messages
   - Form accuracy percentage
   - Duration timer
   - Calories burned

4. **Session Controls**
   - Start Workout (green)
   - Pause/Resume (yellow)
   - Stop (red)

### How to Use

1. Select an exercise from the list
2. Click "Start Workout"
3. Camera activates (simulated)
4. AI provides real-time feedback
5. Rep counter increments automatically
6. View performance metrics
7. Click "Stop" to end session

---

## 🔧 Admin Panel (`admin.html`)

### Dashboard Overview

- Total users count
- Active gyms
- AI sessions today
- System status

### User Management

- View all users
- Search and filter users
- User type (On-site/Offline)
- Status (Active/Inactive/Suspended)
- CRUD operations (View/Edit/Delete)

### Gym Management

- List all gyms
- Add new gyms
- Edit gym details
- View operating hours
- Manage equipment lists

### Exercise Library

- All exercises database
- Exercise categories
- Target muscles
- Difficulty levels
- Add/Edit/Delete exercises

### Navigation

- Click sidebar links to switch sections
- Each section has its own table
- Search and filter capabilities

---

## 🎨 UI Elements & Interactions

### Buttons

- **Primary (Blue)**: Main actions
- **Success (Green)**: Confirm/Complete
- **Warning (Yellow)**: Pause/Caution
- **Danger (Red)**: Delete/Stop
- **Info (Light Blue)**: Information

### Status Badges

- **Success (Green)**: Active, Completed, Open
- **Warning (Yellow)**: 24/7, Pending
- **Danger (Red)**: Closed, Inactive
- **Primary (Blue)**: On-site user
- **Success (Green)**: Offline user

### Cards

- Hover effect: Lift up slightly
- Shadow increases on hover
- Smooth transitions

---

## 📱 Responsive Behavior

### Desktop (> 768px)

- Sidebar always visible
- Full navigation
- Multi-column layouts

### Mobile (< 768px)

- Sidebar collapses (hamburger menu)
- Single column layouts
- Touch-friendly buttons
- Stacked cards

---

## 🔄 User Flow Examples

### Complete User Journey (On-Site)

1. `index.html` → Click "Get Started"
2. `register.html` → Select "At a Gym"
3. `onboarding.html` → Complete 4 steps
4. `dashboard.html` → View stats
5. `gym-finder.html` → Search gyms
6. `workout-plan.html` → View today's workout
7. `progress.html` → Track progress

### Complete User Journey (Offline)

1. `index.html` → Click "Get Started"
2. `register.html` → Select "At Home"
3. `onboarding.html` → Select equipment
4. `dashboard.html` → View stats
5. `workout-plan.html` → Check exercises
6. `ai-assistant.html` → Start AI workout
7. Complete workout with real-time feedback

---

## 💡 Tips for Demo

### Showcasing Features

1. **Start with landing page** - Show marketing content
2. **Go through registration** - Demonstrate user type selection
3. **Complete onboarding** - Show personalization
4. **Tour the dashboard** - Highlight key metrics
5. **Show gym finder** (on-site) - Search and filter
6. **Demo AI assistant** (offline) - Main differentiator
7. **Show workout plans** - Personalized schedules
8. **Visit admin panel** - Management capabilities

### Key Selling Points

- ✅ Dual user type support
- ✅ AI-powered form correction
- ✅ Comprehensive gym database
- ✅ Personalized plans
- ✅ Progress tracking
- ✅ Modern, responsive design
- ✅ Easy-to-use interface

---

## 🐛 Known Prototype Limitations

1. **No Backend**: All data is static/simulated
2. **No Database**: Uses localStorage only
3. **No AI Model**: Feedback is simulated
4. **No Camera**: Video feed is placeholder
5. **No Authentication**: Login bypassed
6. **No Real Gyms**: Sample data only
7. **No Notifications**: Simulated alerts

---

## 📞 Quick Links

- **Home**: `index.html`
- **Login**: `login.html`
- **Register**: `register.html`
- **Dashboard**: `dashboard.html`
- **Admin**: `admin.html`

---

## 🎯 Testing Checklist

- [ ] Open landing page
- [ ] Navigate through registration
- [ ] Complete onboarding for both user types
- [ ] Explore dashboard features
- [ ] Test gym finder (on-site)
- [ ] Test AI assistant (offline)
- [ ] View workout plans
- [ ] Check admin panel
- [ ] Test on mobile device
- [ ] Verify all links work

---

**Last Updated**: November 12, 2025
**Version**: 1.0
**Project**: FitCore Graduation Project
