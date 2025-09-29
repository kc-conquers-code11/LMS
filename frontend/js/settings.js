// DOM Elements
const settingsSections = document.querySelectorAll('.settings-section');
const settingsNavLinks = document.querySelectorAll('.settings-nav-link');
const passwordModal = document.getElementById('passwordModal');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const passwordModalClose = document.getElementById('passwordModalClose');
const passwordModalCancel = document.getElementById('passwordModalCancel');
const passwordModalSubmit = document.getElementById('passwordModalSubmit');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    loadUserPreferences();
});

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

    // Form submissions
    document.getElementById('profile-form').addEventListener('submit', handleProfileUpdate);
    document.getElementById('personal-form').addEventListener('submit', handlePersonalInfoUpdate);

    // Modal functionality
    changePasswordBtn.addEventListener('click', openPasswordModal);
    passwordModalClose.addEventListener('click', closePasswordModal);
    passwordModalCancel.addEventListener('click', closePasswordModal);
    passwordModalSubmit.addEventListener('click', handlePasswordChange);

    // Delete account confirmation
    deleteAccountBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deletion requested. This feature would be implemented in a real application.');
        }
    });

    // Dark mode toggle
    document.getElementById('darkModeToggle').addEventListener('change', function () {
        document.body.setAttribute('data-theme', this.checked ? 'dark' : 'light');
        saveUserPreferences();
    });

    // Close modal when clicking outside
    passwordModal.addEventListener('click', function (e) {
        if (e.target === passwordModal) {
            closePasswordModal();
        }
    });
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();
    // In a real application, this would send data to the server
    showNotification('Profile updated successfully!');
}

// Handle personal info update
function handlePersonalInfoUpdate(e) {
    e.preventDefault();
    // In a real application, this would send data to the server
    showNotification('Personal information updated successfully!');
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

// Load user preferences from localStorage
function loadUserPreferences() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.getElementById('darkModeToggle').checked = darkMode;
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
}

// Save user preferences to localStorage
function saveUserPreferences() {
    const darkMode = document.getElementById('darkModeToggle').checked;
    localStorage.setItem('darkMode', darkMode);
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