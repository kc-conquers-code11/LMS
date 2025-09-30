// DOM elements
const announcementsGrid = document.getElementById('announcementsGrid');
const searchInput = document.getElementById('searchInput');
const departmentFilter = document.getElementById('departmentFilter');
const priorityFilter = document.getElementById('priorityFilter');
const dateFilter = document.getElementById('dateFilter');
const newAnnouncementBtn = document.getElementById('newAnnouncementBtn');
const totalAnnouncements = document.getElementById('totalAnnouncements');
const urgentCount = document.getElementById('urgentCount');
const todayCount = document.getElementById('todayCount');

// Modal elements
const announcementModal = document.getElementById('announcementModal');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const modalSubmit = document.getElementById('modalSubmit');
const announcementForm = document.getElementById('announcementForm');

// Initialize announcements from localStorage or use sample data
let announcements = JSON.parse(localStorage.getItem('announcements')) || [
    {
        id: 1,
        title: "Midterm Examination Schedule Released",
        content: "The midterm examinations for all departments will be conducted from October 15th to October 25th. Please check the examination schedule on the student portal and ensure you have no conflicts. Hall tickets will be available for download starting October 10th.",
        author: "Dr. Johnson",
        role: "Examination Coordinator",
        department: "Examination Cell",
        date: "2023-10-05",
        priority: "high",
        authorInitials: "DJ"
    },
    {
        id: 2,
        title: "Workshop on Machine Learning & AI Applications",
        content: "The Department of Computer Engineering is organizing a comprehensive 3-day workshop on Machine Learning from October 20th to October 22nd. Industry experts will cover practical applications and hands-on projects. Limited seats available.",
        author: "Prof. Williams",
        role: "Head of Department",
        department: "Computer Engineering",
        date: "2023-10-03",
        priority: "medium",
        authorInitials: "PW"
    },
    {
        id: 3,
        title: "Library Extended Hours During Exams",
        content: "To support your exam preparation, the central library will remain open until 10 PM during the examination period. Additional study spaces have been arranged in the library annex. Please maintain silence in study areas.",
        author: "Ms. Davis",
        role: "Chief Librarian",
        department: "Library",
        date: "2023-10-01",
        priority: "low",
        authorInitials: "MD"
    },
    {
        id: 4,
        title: "Annual Hackathon 2023 Registration Open",
        content: "Registrations for our annual inter-college hackathon are now open! This year's theme is 'Sustainable Tech Solutions'. Teams of 2-4 members can register by October 10th. Exciting prizes, mentorship opportunities, and potential internship offers await the winners!",
        author: "Dr. Anderson",
        role: "Event Coordinator",
        department: "Information Technology",
        date: "2023-09-28",
        priority: "medium",
        authorInitials: "DA"
    },
    {
        id: 5,
        title: "Important: Fee Payment Deadline Approaching",
        content: "This is a reminder that the last date for fee payment for the current semester is October 15th. Late payments will incur a penalty of 5% per week. Please ensure your payments are processed on time to avoid any disruptions to your academic activities.",
        author: "Accounts Department",
        role: "Finance Office",
        department: "Administration",
        date: "2023-09-25",
        priority: "high",
        authorInitials: "AD"
    },
    {
        id: 6,
        title: "Career Guidance Session for Final Year Students",
        content: "A special career guidance session will be conducted on October 12th for final year students. Industry experts from leading tech companies will share insights about current job market trends, interview preparation, and career paths in technology.",
        author: "Placement Cell",
        role: "Training & Placement",
        department: "Training & Placement",
        date: "2023-09-22",
        priority: "medium",
        authorInitials: "PC"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    saveAnnouncements(); // Ensure initial data is saved
    updateStats();
    renderAnnouncements(announcements);
    setupEventListeners();
});

// Save announcements to localStorage
function saveAnnouncements() {
    localStorage.setItem('announcements', JSON.stringify(announcements));
}

// Update statistics
function updateStats() {
    totalAnnouncements.textContent = announcements.length;

    const urgent = announcements.filter(a => a.priority === 'high').length;
    urgentCount.textContent = urgent;

    const today = new Date().toISOString().split('T')[0];
    const todayAnnouncements = announcements.filter(a => a.date === today).length;
    todayCount.textContent = todayAnnouncements;
}

// Render announcements to the grid
function renderAnnouncements(announcementsToRender) {
    announcementsGrid.innerHTML = '';

    if (announcementsToRender.length === 0) {
        announcementsGrid.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="fas fa-bullhorn"></i>
                        </div>
                        <h3 class="empty-title">No announcements found</h3>
                        <p class="empty-text">Try adjusting your search criteria or filters to find what you're looking for.</p>
                        <button class="btn-primary" id="resetFiltersBtn">
                            <i class="fas fa-redo"></i> Reset Filters
                        </button>
                    </div>
                `;

        document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);
        return;
    }

    announcementsToRender.forEach(announcement => {
        const card = createAnnouncementCard(announcement);
        announcementsGrid.appendChild(card);
    });
}

// Create an announcement card
function createAnnouncementCard(announcement) {
    const card = document.createElement('div');
    card.className = 'announcement-card';
    card.dataset.id = announcement.id;
    card.dataset.department = announcement.department.toLowerCase().replace(/\s+/g, '-');
    card.dataset.priority = announcement.priority;
    card.dataset.date = announcement.date;

    // Format date
    const dateObj = new Date(announcement.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Determine priority badge class
    let priorityClass = '';
    switch (announcement.priority) {
        case 'high':
            priorityClass = 'priority-high';
            break;
        case 'medium':
            priorityClass = 'priority-medium';
            break;
        case 'low':
            priorityClass = 'priority-low';
            break;
    }

    // Generate initials from author name
    const initials = announcement.author
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();

    card.innerHTML = `
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${announcement.title}</h3>
                        <div class="card-meta">
                            <div class="meta-item">
                                <i class="fas fa-calendar"></i>
                                <span>${formattedDate}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-building"></i>
                                <span>${announcement.department}</span>
                            </div>
                        </div>
                    </div>
                    <span class="priority-badge ${priorityClass}">${announcement.priority}</span>
                </div>
                <div class="card-body">
                    <p class="card-content">${announcement.content}</p>
                    <span class="read-more">
                        Read more <i class="fas fa-arrow-right"></i>
                    </span>
                </div>
                <div class="card-footer">
                    <div class="card-author">
                        <div class="author-avatar">${initials}</div>
                        <div class="author-info">
                            <div class="author-name">${announcement.author}</div>
                            <div class="author-role">${announcement.role}</div>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="action-btn delete" title="Delete" data-id="${announcement.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="action-btn" title="Save">
                            <i class="fas fa-bookmark"></i>
                        </button>
                        <button class="action-btn" title="Share">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            `;

    // Add delete functionality
    const deleteBtn = card.querySelector('.action-btn.delete');
    deleteBtn.addEventListener('click', function () {
        const announcementId = parseInt(this.dataset.id);
        deleteAnnouncement(announcementId);
    });

    return card;
}

// Delete an announcement
function deleteAnnouncement(id) {
    if (confirm('Are you sure you want to delete this announcement?')) {
        announcements = announcements.filter(announcement => announcement.id !== id);
        saveAnnouncements();
        updateStats();
        filterAnnouncements();

        // Show confirmation message
        showNotification('Announcement deleted successfully!');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', filterAnnouncements);

    // Filter functionality
    departmentFilter.addEventListener('change', filterAnnouncements);
    priorityFilter.addEventListener('change', filterAnnouncements);
    dateFilter.addEventListener('change', filterAnnouncements);

    // New announcement button
    newAnnouncementBtn.addEventListener('click', openModal);

    // Modal functionality
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modalSubmit.addEventListener('click', submitAnnouncement);

    // Close modal when clicking outside
    announcementModal.addEventListener('click', function (e) {
        if (e.target === announcementModal) {
            closeModal();
        }
    });
}

// Open the modal
function openModal() {
    announcementModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close the modal
function closeModal() {
    announcementModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    announcementForm.reset();
}

// Submit new announcement
function submitAnnouncement() {
    // Get form values
    const title = document.getElementById('announcementTitle').value.trim();
    const content = document.getElementById('announcementContent').value.trim();
    const department = document.getElementById('announcementDepartment').value;
    const priority = document.getElementById('announcementPriority').value;
    const author = document.getElementById('announcementAuthor').value.trim();
    const role = document.getElementById('announcementRole').value.trim();

    // Validate form
    if (!title || !content || !department || !priority || !author || !role) {
        alert('Please fill in all fields');
        return;
    }

    // Create new announcement
    const newAnnouncement = {
        id: Date.now(), // Use timestamp as unique ID
        title,
        content,
        author,
        role,
        department,
        date: new Date().toISOString().split('T')[0],
        priority
    };

    // Add to beginning of array (most recent first)
    announcements.unshift(newAnnouncement);

    // Save to localStorage
    saveAnnouncements();

    // Update UI
    updateStats();
    filterAnnouncements();

    // Close modal and show success message
    closeModal();
    showNotification('Announcement created successfully!');

    // Highlight the new announcement
    const newCard = document.querySelector(`.announcement-card[data-id="${newAnnouncement.id}"]`);
    if (newCard) {
        newCard.classList.add('new');

        // Scroll to the new announcement
        newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Filter announcements based on search and filters
function filterAnnouncements() {
    const searchTerm = searchInput.value.toLowerCase();
    const departmentValue = departmentFilter.value;
    const priorityValue = priorityFilter.value;
    const dateValue = dateFilter.value;

    const filteredAnnouncements = announcements.filter(announcement => {
        // Search filter
        const matchesSearch = announcement.title.toLowerCase().includes(searchTerm) ||
            announcement.content.toLowerCase().includes(searchTerm) ||
            announcement.author.toLowerCase().includes(searchTerm) ||
            announcement.department.toLowerCase().includes(searchTerm);

        // Department filter
        const matchesDepartment = departmentValue === 'all' ||
            announcement.department.toLowerCase().includes(departmentValue);

        // Priority filter
        const matchesPriority = priorityValue === 'all' || announcement.priority === priorityValue;

        // Date filter
        const matchesDate = dateValue === 'all' || matchesDateFilter(announcement.date, dateValue);

        return matchesSearch && matchesDepartment && matchesPriority && matchesDate;
    });

    renderAnnouncements(filteredAnnouncements);
}

// Check if announcement date matches the selected date filter
function matchesDateFilter(announcementDate, filterValue) {
    const today = new Date();
    const announcementDateObj = new Date(announcementDate);

    switch (filterValue) {
        case 'today':
            return announcementDateObj.toDateString() === today.toDateString();
        case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(today.getDate() - 7);
            return announcementDateObj >= weekAgo;
        case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(today.getMonth() - 1);
            return announcementDateObj >= monthAgo;
        default:
            return true;
    }
}

// Reset all filters
function resetFilters() {
    searchInput.value = '';
    departmentFilter.value = 'all';
    priorityFilter.value = 'all';
    dateFilter.value = 'all';
    filterAnnouncements();
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