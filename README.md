# FitCore - Fitness Platform Prototype

## Overview

FitCore is a comprehensive web-based fitness platform designed for both gym-goers and home workout enthusiasts. This prototype demonstrates the core features and user interface of the system.

## Project Information

- **Version**: 1.0
- **Date**: November 2025
- **Type**: Frontend Prototype
- **Target Users**: On-site gym users and offline (home) workout users

## Features

### For All Users

- ✅ User registration and login
- ✅ Profile management and goal setting
- ✅ Personalized workout plans
- ✅ Custom diet recommendations
- ✅ Progress tracking
- ✅ Workout logging

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

- 👥 User management (CRUD)
- 🏢 Gym management (CRUD)
- 💪 Exercise library management
- 📈 System statistics and reports
- 🔔 Activity monitoring

## Pages Included

1. **index.html** - Landing page with features and marketing content
2. **login.html** - User authentication
3. **register.html** - New user registration
4. **onboarding.html** - 4-step user profile setup
5. **dashboard.html** - Main user dashboard
6. **workout-plan.html** - Weekly workout schedule
7. **gym-finder.html** - Search and find gyms
8. **ai-assistant.html** - AI-powered live workout session
9. **admin.html** - Administrative panel

## Technology Stack

### Frontend

- HTML5
- CSS3 (Bootstrap 5)
- JavaScript (Vanilla)
- Font Awesome Icons

### Design

- Responsive design (mobile, tablet, desktop)
- Modern gradient themes
- Smooth animations
- Accessible UI (WCAG 2.1 Level AA)

## File Structure

```
prototype/
├── index.html              # Landing page
├── login.html              # Login page
├── register.html           # Registration page
├── onboarding.html         # User onboarding
├── dashboard.html          # User dashboard
├── workout-plan.html       # Workout plans
├── gym-finder.html         # Gym finder
├── ai-assistant.html       # AI workout assistant
├── admin.html              # Admin panel
├── css/
│   ├── bootstrap.min.css   # Bootstrap framework
│   ├── all.min.css         # Font Awesome
│   └── style.css           # Custom styles
├── js/
│   ├── bootstrap.bundle.min.js
│   ├── all.min.js
│   └── main.js             # Custom JavaScript
├── files/
│   ├── SRS V1.pdf          # Requirements document
│   ├── Class Diagram_V1.drawio.png
│   └── ERD Diagram_V1.drawio.png
└── webfonts/               # Font files
```

## How to Use

### Running the Prototype

1. Open `index.html` in a modern web browser
2. Navigate through the pages using the menu
3. Click "Get Started" to go through the registration flow
4. Use "Login" to access the dashboard (no actual authentication required)

### User Flows

#### On-Site User Flow

1. Register → Select "At a Gym"
2. Complete onboarding
3. View dashboard
4. Search for gyms
5. View workout plan
6. Track progress

#### Offline User Flow

1. Register → Select "At Home"
2. Complete onboarding
3. View dashboard
4. Start AI workout assistant
5. Get real-time feedback
6. Track progress

### Admin Access

- Navigate to `admin.html`
- Manage users, gyms, and exercises
- View system statistics

## Key Features Demonstrated

### 1. Responsive Design

- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly interface

### 2. User Experience

- Smooth transitions
- Intuitive navigation
- Clear visual hierarchy
- Accessible components

### 3. AI Assistant Interface

- Camera integration (simulated)
- Real-time feedback display
- Rep counter
- Performance metrics
- Exercise selection

### 4. Data Management

- Local storage for user preferences
- Session management
- Progress tracking

## Prototype Limitations

This is a **frontend prototype** and does not include:

- ❌ Backend server
- ❌ Database connectivity
- ❌ Actual AI/ML models
- ❌ Real camera processing
- ❌ Payment processing
- ❌ Email notifications
- ❌ Real-time data sync

## Future Implementation

For full production version:

1. Backend API development (Node.js/Python)
2. Database setup (PostgreSQL/MongoDB)
3. AI model integration (TensorFlow/MediaPipe)
4. WebRTC for video streaming
5. User authentication (JWT/OAuth)
6. Payment gateway integration
7. Email service integration
8. Cloud hosting and CDN
9. Mobile app development

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

## Credits

- Bootstrap 5 Framework
- Font Awesome Icons
- Based on SRS V1 requirements document

## License

Educational/Graduation Project - 2025

## Contact

For questions or feedback about this prototype, please refer to the project documentation.

---

**Note**: This is a visual prototype designed to demonstrate the user interface and user experience of the FitCore platform. All data shown is mock data for demonstration purposes.
