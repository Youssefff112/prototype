// FitCore Admin Dashboard Functions
// Handles all admin CRUD operations and management features

// ================== INITIALIZATION ==================
function initializeAdmin() {
  initializeGyms();
  initializeExercises();
  updateDashboardStats();
  loadSavedSettings();
}

// ================== SECTION NAVIGATION ==================
function showSection(section) {
  // Hide all sections
  document.querySelectorAll('[id$="Section"]').forEach((el) => el.classList.add("d-none"));
  
  // Show selected section
  const sectionElement = document.getElementById(section + "Section");
  if (sectionElement) {
    sectionElement.classList.remove("d-none");
  }
  
  // Update active state in sidebar
  document.querySelectorAll(".sidebar-link").forEach((link) => link.classList.remove("active"));
  if (event && event.target) {
    event.target.closest(".sidebar-link").classList.add("active");
  }
  
  // Load data when switching sections
  if (section === "users") loadUsers();
  if (section === "gyms") loadGyms();
  if (section === "exercises") loadExercises();
  if (section === "reports") loadReports();
  if (section === "settings") loadSettings();
}

// ================== USER MANAGEMENT ==================
function loadUsers() {
  const users = JSON.parse(localStorage.getItem("fitcore_users")) || [];
  const tbody = document.querySelector("#usersSection tbody");
  if (!tbody) return;
  
  tbody.innerHTML = "";

  users.forEach((user) => {
    const tr = document.createElement("tr");
    const statusBadge = user.role === "admin" ? "info" : "success";
    const trainingType = user.trainingType || "Not Set";
    const trainingBadge = user.trainingType === "onsite" ? "primary" : user.trainingType === "offline" ? "success" : "secondary";

    tr.innerHTML = `
      <td>#${user.id}</td>
      <td>${user.firstName} ${user.lastName}</td>
      <td>${user.email}</td>
      <td><span class="badge bg-${trainingBadge}">${trainingType}</span></td>
      <td><span class="badge bg-${statusBadge}">${user.role === "admin" ? "Admin" : "Active"}</span></td>
      <td>${new Date(user.createdAt).toLocaleDateString()}</td>
      <td>
        <button class="btn btn-sm btn-info" onclick="viewUser(${user.id})" title="View">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})" title="Delete" ${user.role === "admin" ? "disabled" : ""}>
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  updateDashboardStats();
}

function viewUser(userId) {
  const users = JSON.parse(localStorage.getItem("fitcore_users")) || [];
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  const details = `User Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${user.firstName} ${user.lastName}
Email: ${user.email}
Role: ${user.role}
Training Type: ${user.trainingType || "Not Set"}
Allergies: ${user.allergies || "None"}
Joined: ${new Date(user.createdAt).toLocaleString()}

${user.profile ? `Profile:
  Age: ${user.profile.age}
  Gender: ${user.profile.gender}
  Height: ${user.profile.height} cm
  Weight: ${user.profile.weight} kg
  Goal: ${user.profile.goal}
  Experience: ${user.profile.experience}
  Diet Type: ${user.profile.dietType}` : "Profile not completed"}`;
  
  alert(details);
}

function editUser(userId) {
  const users = JSON.parse(localStorage.getItem("fitcore_users")) || [];
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  const newEmail = prompt("Edit Email:", user.email);
  if (newEmail && newEmail !== user.email) {
    if (users.some((u) => u.email === newEmail && u.id !== userId)) {
      alert("Email already exists!");
      return;
    }
    user.email = newEmail;
  }

  const newTrainingType = prompt("Edit Training Type (onsite/offline):", user.trainingType || "");
  if (newTrainingType && (newTrainingType === "onsite" || newTrainingType === "offline")) {
    user.trainingType = newTrainingType;
  }

  localStorage.setItem("fitcore_users", JSON.stringify(users));

  // Update session if editing current user
  const session = JSON.parse(localStorage.getItem("fitcore_session"));
  if (session && session.id === userId) {
    localStorage.setItem("fitcore_session", JSON.stringify(user));
  }

  loadUsers();
  alert("User updated successfully!");
}

function deleteUser(userId) {
  const users = JSON.parse(localStorage.getItem("fitcore_users")) || [];
  const user = users.find((u) => u.id === userId);

  if (!user) return;
  if (user.role === "admin") {
    alert("Cannot delete admin accounts!");
    return;
  }

  if (confirm(`Delete user "${user.firstName} ${user.lastName}"? This action cannot be undone.`)) {
    const updatedUsers = users.filter((u) => u.id !== userId);
    localStorage.setItem("fitcore_users", JSON.stringify(updatedUsers));
    loadUsers();
    alert("User deleted successfully!");
  }
}

// ================== GYM MANAGEMENT ==================
function initializeGyms() {
  if (!localStorage.getItem("fitcore_gyms")) {
    const defaultGyms = [
      { id: 1, name: "Gold's Gym", location: "Nasr City, Cairo", hours: "6:00 AM - 11:00 PM", status: "active", rating: 4.5, price: "800 EGP/month" },
      { id: 2, name: "FitZone Premium", location: "Maadi, Cairo", hours: "24/7", status: "active", rating: 4.8, price: "1200 EGP/month" },
      { id: 3, name: "PowerHouse Gym", location: "Mohandessin, Giza", hours: "5:00 AM - 11:00 PM", status: "active", rating: 4.3, price: "600 EGP/month" },
      { id: 4, name: "Elite Fitness", location: "Zamalek, Cairo", hours: "6:00 AM - 10:00 PM", status: "active", rating: 4.7, price: "1500 EGP/month" }
    ];
    localStorage.setItem("fitcore_gyms", JSON.stringify(defaultGyms));
  }
}

function loadGyms() {
  initializeGyms();
  const gyms = JSON.parse(localStorage.getItem("fitcore_gyms")) || [];
  const tbody = document.querySelector("#gymsSection tbody");
  if (!tbody) return;
  
  tbody.innerHTML = "";

  gyms.forEach((gym) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>#G${String(gym.id).padStart(3, "0")}</td>
      <td>${gym.name}</td>
      <td>${gym.location}</td>
      <td>${gym.hours}</td>
      <td><span class="badge bg-${gym.status === "active" ? "success" : "danger"}">${gym.status}</span></td>
      <td>
        <button class="btn btn-sm btn-info" onclick="viewGym(${gym.id})" title="View">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-sm btn-warning" onclick="editGym(${gym.id})" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteGym(${gym.id})" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function viewGym(gymId) {
  const gyms = JSON.parse(localStorage.getItem("fitcore_gyms")) || [];
  const gym = gyms.find((g) => g.id === gymId);
  if (!gym) return;

  alert(`Gym Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${gym.name}
Location: ${gym.location}
Operating Hours: ${gym.hours}
Status: ${gym.status}
Rating: ${gym.rating}/5
Price: ${gym.price}`);
}

function editGym(gymId) {
  const gyms = JSON.parse(localStorage.getItem("fitcore_gyms")) || [];
  const gym = gyms.find((g) => g.id === gymId);
  if (!gym) return;

  const newName = prompt("Edit Gym Name:", gym.name);
  if (newName) gym.name = newName;

  const newLocation = prompt("Edit Location:", gym.location);
  if (newLocation) gym.location = newLocation;

  const newHours = prompt("Edit Operating Hours:", gym.hours);
  if (newHours) gym.hours = newHours;

  localStorage.setItem("fitcore_gyms", JSON.stringify(gyms));
  loadGyms();
  alert("Gym updated successfully!");
}

function deleteGym(gymId) {
  const gyms = JSON.parse(localStorage.getItem("fitcore_gyms")) || [];
  const gym = gyms.find((g) => g.id === gymId);
  if (!gym) return;

  if (confirm(`Delete gym "${gym.name}"? This action cannot be undone.`)) {
    const updatedGyms = gyms.filter((g) => g.id !== gymId);
    localStorage.setItem("fitcore_gyms", JSON.stringify(updatedGyms));
    loadGyms();
    alert("Gym deleted successfully!");
  }
}

function addGym() {
  const name = prompt("Gym Name:");
  if (!name) return;

  const location = prompt("Location:");
  if (!location) return;

  const hours = prompt("Operating Hours (e.g., 6:00 AM - 11:00 PM):");
  if (!hours) return;

  const gyms = JSON.parse(localStorage.getItem("fitcore_gyms")) || [];
  const newId = Math.max(...gyms.map((g) => g.id), 0) + 1;

  gyms.push({
    id: newId,
    name: name,
    location: location,
    hours: hours,
    status: "active",
    rating: 0,
    price: "0 EGP/month"
  });

  localStorage.setItem("fitcore_gyms", JSON.stringify(gyms));
  loadGyms();
  alert("Gym added successfully!");
}

// ================== EXERCISE LIBRARY ==================
function initializeExercises() {
  if (!localStorage.getItem("fitcore_exercises")) {
    const defaultExercises = [
      { id: 1, name: "Bench Press", category: "Strength", muscles: "Chest, Triceps", difficulty: "intermediate", equipment: "Barbell" },
      { id: 2, name: "Squats", category: "Strength", muscles: "Quads, Glutes", difficulty: "beginner", equipment: "Barbell" },
      { id: 3, name: "Deadlift", category: "Strength", muscles: "Back, Legs", difficulty: "advanced", equipment: "Barbell" },
      { id: 4, name: "Pull-ups", category: "Strength", muscles: "Back, Biceps", difficulty: "intermediate", equipment: "Pull-up Bar" },
      { id: 5, name: "Push-ups", category: "Strength", muscles: "Chest, Triceps", difficulty: "beginner", equipment: "Bodyweight" },
      { id: 6, name: "Lunges", category: "Strength", muscles: "Legs, Glutes", difficulty: "beginner", equipment: "Bodyweight" }
    ];
    localStorage.setItem("fitcore_exercises", JSON.stringify(defaultExercises));
  }
}

function loadExercises() {
  initializeExercises();
  const exercises = JSON.parse(localStorage.getItem("fitcore_exercises")) || [];
  const tbody = document.querySelector("#exercisesSection tbody");
  if (!tbody) return;
  
  tbody.innerHTML = "";

  exercises.forEach((exercise) => {
    const tr = document.createElement("tr");
    const difficultyColor = exercise.difficulty === "beginner" ? "success" : exercise.difficulty === "intermediate" ? "warning" : "danger";

    tr.innerHTML = `
      <td>#E${String(exercise.id).padStart(3, "0")}</td>
      <td>${exercise.name}</td>
      <td>${exercise.category}</td>
      <td>${exercise.muscles}</td>
      <td><span class="badge bg-${difficultyColor}">${exercise.difficulty}</span></td>
      <td>
        <button class="btn btn-sm btn-info" onclick="viewExercise(${exercise.id})" title="View">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-sm btn-warning" onclick="editExercise(${exercise.id})" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteExercise(${exercise.id})" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function viewExercise(exerciseId) {
  const exercises = JSON.parse(localStorage.getItem("fitcore_exercises")) || [];
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (!exercise) return;

  alert(`Exercise Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${exercise.name}
Category: ${exercise.category}
Target Muscles: ${exercise.muscles}
Difficulty: ${exercise.difficulty}
Equipment: ${exercise.equipment}`);
}

function editExercise(exerciseId) {
  const exercises = JSON.parse(localStorage.getItem("fitcore_exercises")) || [];
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (!exercise) return;

  const newName = prompt("Edit Exercise Name:", exercise.name);
  if (newName) exercise.name = newName;

  const newCategory = prompt("Edit Category:", exercise.category);
  if (newCategory) exercise.category = newCategory;

  const newMuscles = prompt("Edit Target Muscles:", exercise.muscles);
  if (newMuscles) exercise.muscles = newMuscles;

  const newDifficulty = prompt("Edit Difficulty (beginner/intermediate/advanced):", exercise.difficulty);
  if (newDifficulty && ["beginner", "intermediate", "advanced"].includes(newDifficulty)) {
    exercise.difficulty = newDifficulty;
  }

  localStorage.setItem("fitcore_exercises", JSON.stringify(exercises));
  loadExercises();
  alert("Exercise updated successfully!");
}

function deleteExercise(exerciseId) {
  const exercises = JSON.parse(localStorage.getItem("fitcore_exercises")) || [];
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (!exercise) return;

  if (confirm(`Delete exercise "${exercise.name}"? This action cannot be undone.`)) {
    const updatedExercises = exercises.filter((e) => e.id !== exerciseId);
    localStorage.setItem("fitcore_exercises", JSON.stringify(updatedExercises));
    loadExercises();
    alert("Exercise deleted successfully!");
  }
}

function addExercise() {
  const name = prompt("Exercise Name:");
  if (!name) return;

  const category = prompt("Category (e.g., Strength, Cardio):");
  if (!category) return;

  const muscles = prompt("Target Muscles (e.g., Chest, Triceps):");
  if (!muscles) return;

  const difficulty = prompt("Difficulty (beginner/intermediate/advanced):");
  if (!difficulty || !["beginner", "intermediate", "advanced"].includes(difficulty)) {
    alert("Invalid difficulty level!");
    return;
  }

  const equipment = prompt("Required Equipment:");
  if (!equipment) return;

  const exercises = JSON.parse(localStorage.getItem("fitcore_exercises")) || [];
  const newId = Math.max(...exercises.map((e) => e.id), 0) + 1;

  exercises.push({
    id: newId,
    name: name,
    category: category,
    muscles: muscles,
    difficulty: difficulty,
    equipment: equipment
  });

  localStorage.setItem("fitcore_exercises", JSON.stringify(exercises));
  loadExercises();
  alert("Exercise added successfully!");
}

// ================== REPORTS SECTION ==================
function loadReports() {
  const users = JSON.parse(localStorage.getItem("fitcore_users")) || [];
  const gyms = JSON.parse(localStorage.getItem("fitcore_gyms")) || [];
  const exercises = JSON.parse(localStorage.getItem("fitcore_exercises")) || [];

  // User counts
  const onsiteUsers = users.filter((u) => u.trainingType === "onsite").length;
  const offlineUsers = users.filter((u) => u.trainingType === "offline").length;
  const totalWithType = onsiteUsers + offlineUsers;
  const adminCount = users.filter((u) => u.role === "admin").length;

  // Update user growth stats
  const totalReg = document.getElementById("totalRegistrations");
  const monthlyReg = document.getElementById("monthlyRegistrations");
  const growthRate = document.getElementById("growthRate");
  
  if (totalReg) totalReg.textContent = users.length;
  if (monthlyReg) monthlyReg.textContent = Math.floor(users.length * 0.15);
  if (growthRate) growthRate.textContent = "+12%";

  // Update training type distribution
  if (totalWithType > 0) {
    const onsitePercent = Math.round((onsiteUsers / totalWithType) * 100);
    const offlinePercent = Math.round((offlineUsers / totalWithType) * 100);

    const onsiteCountEl = document.getElementById("onsiteCount");
    const offlineCountEl = document.getElementById("offlineCount");
    const onsiteBarEl = document.getElementById("onsiteBar");
    const offlineBarEl = document.getElementById("offlineBar");
    
    if (onsiteCountEl) onsiteCountEl.textContent = onsiteUsers;
    if (offlineCountEl) offlineCountEl.textContent = offlineUsers;
    if (onsiteBarEl) onsiteBarEl.style.width = onsitePercent + "%";
    if (offlineBarEl) offlineBarEl.style.width = offlinePercent + "%";
  }

  // Update active gyms
  const activeGyms = gyms.filter((g) => g.status === "active").length;
  const activeGymsEl = document.getElementById("activeGymsCount");
  if (activeGymsEl) activeGymsEl.textContent = activeGyms;

  // Update statistics table
  const statTotalUsers = document.getElementById("statTotalUsers");
  const statActiveGyms = document.getElementById("statActiveGyms");
  const statTotalExercises = document.getElementById("statTotalExercises");
  const statAdminCount = document.getElementById("statAdminCount");
  
  if (statTotalUsers) statTotalUsers.textContent = users.length;
  if (statActiveGyms) statActiveGyms.textContent = activeGyms;
  if (statTotalExercises) statTotalExercises.textContent = exercises.length;
  if (statAdminCount) statAdminCount.textContent = adminCount;
}

// ================== SYSTEM SETTINGS ==================
function loadSettings() {
  const securitySettings = JSON.parse(localStorage.getItem("fitcore_security_settings") || "{}");
  const appSettings = JSON.parse(localStorage.getItem("fitcore_app_settings") || "{}");

  // Load security settings
  const sessionTimeout = document.getElementById("sessionTimeout");
  const requireEmailVerification = document.getElementById("requireEmailVerification");
  const enableTwoFactor = document.getElementById("enableTwoFactor");
  
  if (sessionTimeout && securitySettings.sessionTimeout) {
    sessionTimeout.value = securitySettings.sessionTimeout;
  }
  if (requireEmailVerification && securitySettings.requireEmailVerification !== undefined) {
    requireEmailVerification.checked = securitySettings.requireEmailVerification;
  }
  if (enableTwoFactor && securitySettings.enableTwoFactor !== undefined) {
    enableTwoFactor.checked = securitySettings.enableTwoFactor;
  }

  // Load app settings
  const appName = document.getElementById("appName");
  const defaultLanguage = document.getElementById("defaultLanguage");
  const maxUploadSize = document.getElementById("maxUploadSize");
  const supportEmail = document.getElementById("supportEmail");
  const maintenanceMode = document.getElementById("maintenanceMode");
  
  if (appName && appSettings.appName) appName.value = appSettings.appName;
  if (defaultLanguage && appSettings.defaultLanguage) defaultLanguage.value = appSettings.defaultLanguage;
  if (maxUploadSize && appSettings.maxUploadSize) maxUploadSize.value = appSettings.maxUploadSize;
  if (supportEmail && appSettings.supportEmail) supportEmail.value = appSettings.supportEmail;
  if (maintenanceMode && appSettings.maintenanceMode !== undefined) {
    maintenanceMode.checked = appSettings.maintenanceMode;
  }
}

function exportData() {
  const data = {
    users: JSON.parse(localStorage.getItem("fitcore_users")) || [],
    gyms: JSON.parse(localStorage.getItem("fitcore_gyms")) || [],
    exercises: JSON.parse(localStorage.getItem("fitcore_exercises")) || [],
    exportDate: new Date().toISOString()
  };

  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fitcore-backup-${new Date().toISOString().split("T")[0]}.json`;
  link.click();

  alert("Data exported successfully! Check your downloads folder.");
}

function viewStorageInfo() {
  const users = localStorage.getItem("fitcore_users") || "[]";
  const gyms = localStorage.getItem("fitcore_gyms") || "[]";
  const exercises = localStorage.getItem("fitcore_exercises") || "[]";
  const session = localStorage.getItem("fitcore_session") || "{}";

  const totalSize = new Blob([users + gyms + exercises + session]).size;
  const usersSize = new Blob([users]).size;
  const gymsSize = new Blob([gyms]).size;
  const exercisesSize = new Blob([exercises]).size;

  const info = `Storage Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Storage Used: ${(totalSize / 1024).toFixed(2)} KB

Breakdown:
• Users Data: ${(usersSize / 1024).toFixed(2)} KB
• Gyms Data: ${(gymsSize / 1024).toFixed(2)} KB
• Exercises Data: ${(exercisesSize / 1024).toFixed(2)} KB

Items Count:
• Users: ${JSON.parse(users).length}
• Gyms: ${JSON.parse(gyms).length}
• Exercises: ${JSON.parse(exercises).length}`;

  alert(info);
}

function clearCache() {
  if (confirm("Clear application cache? This will not delete user data.")) {
    alert("Cache cleared successfully!");
  }
}

function resetDatabase() {
  const confirmation = prompt('⚠️ WARNING: This will delete ALL data!\n\nType "RESET" to confirm:', "");

  if (confirmation === "RESET") {
    localStorage.removeItem("fitcore_users");
    localStorage.removeItem("fitcore_gyms");
    localStorage.removeItem("fitcore_exercises");
    localStorage.removeItem("fitcore_session");
    localStorage.removeItem("fitcore_initialized");

    alert("Database reset successfully! The page will reload to reinitialize default accounts.");
    window.location.reload();
  } else if (confirmation) {
    alert('Reset cancelled. Please type "RESET" exactly to confirm.');
  }
}

function saveSecuritySettings() {
  const timeout = document.getElementById("sessionTimeout").value;
  const emailVerification = document.getElementById("requireEmailVerification").checked;
  const twoFactor = document.getElementById("enableTwoFactor").checked;

  const settings = {
    sessionTimeout: timeout,
    requireEmailVerification: emailVerification,
    enableTwoFactor: twoFactor
  };

  localStorage.setItem("fitcore_security_settings", JSON.stringify(settings));
  alert("Security settings saved successfully!");
}

function saveAppSettings() {
  const settings = {
    appName: document.getElementById("appName").value,
    defaultLanguage: document.getElementById("defaultLanguage").value,
    maxUploadSize: document.getElementById("maxUploadSize").value,
    supportEmail: document.getElementById("supportEmail").value,
    maintenanceMode: document.getElementById("maintenanceMode").checked
  };

  localStorage.setItem("fitcore_app_settings", JSON.stringify(settings));
  alert("Application settings saved successfully!");

  if (settings.maintenanceMode) {
    alert("⚠️ Maintenance mode enabled! Regular users will see a maintenance message.");
  }
}

// ================== DASHBOARD STATS ==================
function updateDashboardStats() {
  const users = JSON.parse(localStorage.getItem("fitcore_users")) || [];
  const gyms = JSON.parse(localStorage.getItem("fitcore_gyms")) || [];

  // Update total users count
  const totalUsersElement = document.querySelector("#dashboardSection .stat-card:nth-child(1) h3");
  if (totalUsersElement) totalUsersElement.textContent = users.length;

  // Update active gyms count
  const activeGymsElement = document.querySelector("#dashboardSection .stat-card:nth-child(2) h3");
  if (activeGymsElement) activeGymsElement.textContent = gyms.filter((g) => g.status === "active").length;

  // Calculate user distribution
  const onsiteUsers = users.filter((u) => u.trainingType === "onsite").length;
  const offlineUsers = users.filter((u) => u.trainingType === "offline").length;
  const totalWithType = onsiteUsers + offlineUsers;

  if (totalWithType > 0) {
    const onsitePercent = Math.round((onsiteUsers / totalWithType) * 100);
    const offlinePercent = Math.round((offlineUsers / totalWithType) * 100);

    const onsiteBar = document.querySelector("#dashboardSection .progress-bar.bg-primary");
    const offlineBar = document.querySelector("#dashboardSection .progress-bar.bg-success");
    const onsiteText = document.querySelector("#dashboardSection .card-body .mb-3:nth-child(1) strong");
    const offlineText = document.querySelector("#dashboardSection .card-body .mb-3:nth-child(2) strong");

    if (onsiteBar) onsiteBar.style.width = onsitePercent + "%";
    if (offlineBar) offlineBar.style.width = offlinePercent + "%";
    if (onsiteText) onsiteText.textContent = onsitePercent + "%";
    if (offlineText) offlineText.textContent = offlinePercent + "%";
  }
}

function loadSavedSettings() {
  // Load any saved settings on page load
  const securitySettings = JSON.parse(localStorage.getItem("fitcore_security_settings") || "{}");
  const appSettings = JSON.parse(localStorage.getItem("fitcore_app_settings") || "{}");
  
  // Apply app name if customized
  if (appSettings.appName) {
    const brandElements = document.querySelectorAll(".navbar-brand");
    brandElements.forEach(el => {
      if (el.textContent.includes("FitCore")) {
        el.innerHTML = `<i class="fas fa-user-shield"></i> ${appSettings.appName} Admin Panel`;
      }
    });
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  initializeAdmin();
  
  // Setup Add buttons
  const addGymBtn = document.querySelector('#gymsSection .btn-primary');
  if (addGymBtn && addGymBtn.textContent.includes('Add Gym')) {
    addGymBtn.onclick = addGym;
  }
  
  const addExerciseBtn = document.querySelector('#exercisesSection .btn-primary');
  if (addExerciseBtn && addExerciseBtn.textContent.includes('Add Exercise')) {
    addExerciseBtn.onclick = addExercise;
  }
});
