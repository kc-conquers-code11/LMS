// User data structure
const userData = {
    profile: {
        displayName: "Pranav Khalate",
        username: "pranav_kh",
        bio: "Passionate computer engineering student with interest in AI and machine learning. Always eager to learn new technologies and solve complex problems.",
        avatar: "https://res.cloudinary.com/dhn92qb61/image/upload/v1751381563/Gojo__o3vpim.webp    ",
        role: "Computer Engineering Student",
        stats: {
            attendance: "85%",
            gpa: "3.8",
            courses: "12"
        }
    },
    personal: {
        firstName: "Pranav",
        lastName: "Khalate",
        email: "pranav.zx49@gmail.com",
        phone: "+91 00000 00000",
        dob: "2004-10-16",
        gender: "male",
        address: "Mumbai, India"
    },
    preferences: {
        darkMode: false,
        language: "en",
        timezone: "pst",
        autoSave: true
    },
    notifications: {
        emailAssignments: true,
        emailAnnouncements: true,
        emailGrades: true,
        pushReminders: true,
        pushMessages: false
    },
    security: {
        twoFactor: false
    }
};

// DOM Elements
const settingsSections = document.querySelectorAll('.settings-section');
const settingsNavLinks = document.querySelectorAll('.settings-nav-link');
const passwordModal = document.getElementById('passwordModal');

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    loadUserData();
    setupEventListeners();
});

// Load user data from localStorage
function loadUserData() {
    const savedData = localStorage.getItem('userSettings');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.assign(userData, parsedData);
    }
    populateForms();
    updateUI();
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('userSettings', JSON.stringify(userData));
}

// Populate forms with user data
function populateForms() {
    // Profile section
    document.getElementById('displayName').value = userData.profile.displayName;
    document.getElementById('username').value = userData.profile.username;
    document.getElementById('bio').value = userData.profile.bio;

    // Personal section
    document.getElementById('firstName').value = userData.personal.firstName;
    document.getElementById('lastName').value = userData.personal.lastName;
    document.getElementById('email').value = userData.personal.email;
    document.getElementById('phone').value = userData.personal.phone;
    document.getElementById('dob').value = userData.personal.dob;
    document.getElementById('gender').value = userData.personal.gender;
    document.getElementById('address').value = userData.personal.address;

    // Preferences section
    document.getElementById('darkModeToggle').checked = userData.preferences.darkMode;
    document.getElementById('languageSelect').value = userData.preferences.language;
    document.getElementById('timezoneSelect').value = userData.preferences.timezone;
    document.getElementById('autoSaveToggle').checked = userData.preferences.autoSave;

    // Notifications section
    document.getElementById('emailAssignments').checked = userData.notifications.emailAssignments;
    document.getElementById('emailAnnouncements').checked = userData.notifications.emailAnnouncements;
    document.getElementById('emailGrades').checked = userData.notifications.emailGrades;
    document.getElementById('pushReminders').checked = userData.notifications.pushReminders;
    document.getElementById('pushMessages').checked = userData.notifications.pushMessages;

    // Security section
    document.getElementById('twoFactorToggle').checked = userData.security.twoFactor;
}

// Update UI elements
function updateUI() {
    // Update profile header
    document.getElementById('profileName').textContent = userData.profile.displayName;
    document.getElementById('profileRole').textContent = userData.profile.role;
    document.getElementById('profileAvatar').src = userData.profile.avatar;
    document.getElementById('attendanceStat').textContent = userData.profile.stats.attendance;
    document.getElementById('gpaStat').textContent = userData.profile.stats.gpa;
    document.getElementById('coursesStat').textContent = userData.profile.stats.courses;

    // Apply dark mode
    document.body.setAttribute('data-theme', userData.preferences.darkMode ? 'dark' : 'light');
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    settingsNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.dataset.section;

            // Update active nav link
            settingsNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding section
            settingsSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${sectionId}-section`) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Profile form
    document.getElementById('profile-form').addEventListener('submit', function (e) {
        e.preventDefault();
        userData.profile.displayName = document.getElementById('displayName').value;
        userData.profile.username = document.getElementById('username').value;
        userData.profile.bio = document.getElementById('bio').value;
        saveUserData();
        updateUI();
        showNotification('Profile updated successfully!');
    });

    document.getElementById('profileCancel').addEventListener('click', function () {
        populateForms();
    });

    // Personal form
    document.getElementById('personal-form').addEventListener('submit', function (e) {
        e.preventDefault();
        userData.personal.firstName = document.getElementById('firstName').value;
        userData.personal.lastName = document.getElementById('lastName').value;
        userData.personal.email = document.getElementById('email').value;
        userData.personal.phone = document.getElementById('phone').value;
        userData.personal.dob = document.getElementById('dob').value;
        userData.personal.gender = document.getElementById('gender').value;
        userData.personal.address = document.getElementById('address').value;
        saveUserData();
        showNotification('Personal information updated successfully!');
    });

    document.getElementById('personalCancel').addEventListener('click', function () {
        populateForms();
    });

    // Preferences
    document.getElementById('preferencesSave').addEventListener('click', function () {
        userData.preferences.darkMode = document.getElementById('darkModeToggle').checked;
        userData.preferences.language = document.getElementById('languageSelect').value;
        userData.preferences.timezone = document.getElementById('timezoneSelect').value;
        userData.preferences.autoSave = document.getElementById('autoSaveToggle').checked;
        saveUserData();
        updateUI();
        showNotification('Preferences saved successfully!');
    });

    document.getElementById('preferencesReset').addEventListener('click', function () {
        userData.preferences = {
            darkMode: false,
            language: "en",
            timezone: "pst",
            autoSave: true
        };
        populateForms();
        saveUserData();
        updateUI();
        showNotification('Preferences reset to default!');
    });

    // Notifications
    document.getElementById('notificationsSave').addEventListener('click', function () {
        userData.notifications.emailAssignments = document.getElementById('emailAssignments').checked;
        userData.notifications.emailAnnouncements = document.getElementById('emailAnnouncements').checked;
        userData.notifications.emailGrades = document.getElementById('emailGrades').checked;
        userData.notifications.pushReminders = document.getElementById('pushReminders').checked;
        userData.notifications.pushMessages = document.getElementById('pushMessages').checked;
        saveUserData();
        showNotification('Notification settings updated!');
    });

    // Security
    document.getElementById('twoFactorToggle').addEventListener('change', function () {
        userData.security.twoFactor = this.checked;
        saveUserData();
        showNotification(`Two-factor authentication ${this.checked ? 'enabled' : 'disabled'}`);
    });

    // Modal functionality
    document.getElementById('changePasswordBtn').addEventListener('click', openPasswordModal);
    document.getElementById('passwordModalClose').addEventListener('click', closePasswordModal);
    document.getElementById('passwordModalCancel').addEventListener('click', closePasswordModal);
    document.getElementById('passwordModalSubmit').addEventListener('click', handlePasswordChange);

    // Delete account
    document.getElementById('deleteAccountBtn').addEventListener('click', function () {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            showNotification('Account deletion requested. This feature would be implemented in a real application.');
        }
    });

    // Avatar upload
    document.getElementById('avatarUpload').addEventListener('click', function () {
        const newAvatar = prompt('Enter image URL for your avatar:');
        if (newAvatar) {
            userData.profile.avatar = newAvatar;
            saveUserData();
            updateUI();
            showNotification('Avatar updated successfully!');
        }
    });

    // Close modal when clicking outside
    passwordModal.addEventListener('click', function (e) {
        if (e.target === passwordModal) {
            closePasswordModal();
        }
    });
}

// Open password modal
function openPasswordModal() {
    passwordModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close password modal
function closePasswordModal() {
    passwordModal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('password-form').reset();
}

// Handle password change
function handlePasswordChange() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }

    if (newPassword.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }

    // In a real application, this would send data to the server
    closePasswordModal();
    showNotification('Password updated successfully!');
}

// Show notification
function showNotification(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = 'var(--primary-500)';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '1000';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.fontWeight = '600';

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
}