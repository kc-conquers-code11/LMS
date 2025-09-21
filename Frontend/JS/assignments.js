document.addEventListener('DOMContentLoaded', function () {
    // Initialize the assignments page
    initAssignmentsPage();
});

// Sample assignments data
const assignmentsData = [
    {
        id: 1,
        title: "Web Development Project - E-commerce Website",
        course: "web-dev",
        courseName: "Web Development",
        description: "Create a responsive e-commerce website with product listings, shopping cart, and checkout functionality. Use HTML, CSS, JavaScript and any framework of your choice.",
        dueDate: "2023-12-15T23:59:00",
        points: 100,
        status: "pending",
        file: "web-dev-project.pdf",
        createdAt: "2023-11-01T10:00:00",
        submissions: []
    },
    {
        id: 2,
        title: "Data Structures - Binary Search Tree Implementation",
        course: "dsa",
        courseName: "Data Structures & Algorithms",
        description: "Implement a binary search tree with insertion, deletion, and traversal methods. Analyze the time complexity of each operation.",
        dueDate: "2023-11-20T23:59:00",
        points: 50,
        status: "submitted",
        file: "bst-assignment.pdf",
        createdAt: "2023-10-15T14:30:00",
        submissions: [
            {
                studentId: "student1",
                studentName: "John Smith",
                file: "bst-implementation.zip",
                submittedAt: "2023-11-19T15:45:00",
                comments: "I implemented all the required methods. Please let me know if you need anything else.",
                grade: null,
                feedback: null
            }
        ]
    },
    {
        id: 3,
        title: "Database Design - University Management System",
        course: "dbms",
        courseName: "Database Management",
        description: "Design a database schema for a university management system. Include entities for students, courses, instructors, and enrollments. Normalize to 3NF.",
        dueDate: "2023-11-10T23:59:00",
        points: 75,
        status: "graded",
        file: "db-design-assignment.pdf",
        createdAt: "2023-10-20T09:15:00",
        submissions: [
            {
                studentId: "student1",
                studentName: "John Smith",
                file: "university-db-design.pdf",
                submittedAt: "2023-11-09T20:30:00",
                comments: "I've included ER diagram and normalization steps.",
                grade: 85,
                feedback: "Good design overall. Consider adding indexes for better query performance."
            }
        ]
    },
    {
        id: 4,
        title: "Operating Systems - Process Scheduling Algorithms",
        course: "os",
        courseName: "Operating Systems",
        description: "Implement and compare different CPU scheduling algorithms: FCFS, SJF, Priority, and Round Robin. Analyze their performance.",
        dueDate: "2023-12-05T23:59:00",
        points: 60,
        status: "pending",
        file: "scheduling-algorithms.pdf",
        createdAt: "2023-11-05T11:20:00",
        submissions: []
    },
    {
        id: 5,
        title: "Web Development - React Component Library",
        course: "web-dev",
        courseName: "Web Development",
        description: "Create a reusable React component library with at least 5 components. Include documentation and examples for each component.",
        dueDate: "2023-11-25T23:59:00",
        points: 80,
        status: "late",
        file: "react-components.pdf",
        createdAt: "2023-10-25T16:45:00",
        submissions: [
            {
                studentId: "student1",
                studentName: "John Smith",
                file: "react-component-library.zip",
                submittedAt: "2023-11-27T10:15:00",
                comments: "Sorry for the late submission. I've included 6 components with documentation.",
                grade: 70,
                feedback: "Good components but late submission resulted in point deduction."
            }
        ]
    }
];

// Current state
let currentState = {
    assignments: [],
    filteredAssignments: [],
    currentTab: 'all-assignments',
    currentPage: 1,
    itemsPerPage: 5,
    filters: {
        course: 'all',
        status: 'all',
        dueDate: 'all',
        search: ''
    },
    // In a real app, this would come from authentication
    currentUser: {
        id: 'student1',
        name: 'John Smith',
        role: 'student' // or 'teacher'
    }
};

// Initialize the assignments page
function initAssignmentsPage() {
    loadAssignmentsData();
    renderAssignments();
    setupEventListeners();
    updatePagination();
}

// Load assignments data from localStorage or use sample data
function loadAssignmentsData() {
    const savedAssignments = localStorage.getItem('lmsAssignments');

    if (savedAssignments) {
        currentState.assignments = JSON.parse(savedAssignments);
    } else {
        currentState.assignments = [...assignmentsData];
        // Save to localStorage for future use
        localStorage.setItem('lmsAssignments', JSON.stringify(currentState.assignments));
    }

    currentState.filteredAssignments = [...currentState.assignments];
}

// Save assignments to localStorage
function saveAssignmentsToStorage() {
    localStorage.setItem('lmsAssignments', JSON.stringify(currentState.assignments));
}

// Set up event listeners
function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
            currentState.currentTab = tab.dataset.tab;
            filterAssignments();
        });
    });

    // Filter changes
    document.getElementById('course-filter').addEventListener('change', (e) => {
        currentState.filters.course = e.target.value;
    });

    document.getElementById('status-filter').addEventListener('change', (e) => {
        currentState.filters.status = e.target.value;
    });

    document.getElementById('due-date-filter').addEventListener('change', (e) => {
        currentState.filters.dueDate = e.target.value;
    });

    // Search input
    document.getElementById('assignment-search').addEventListener('input', (e) => {
        currentState.filters.search = e.target.value.toLowerCase();
        filterAssignments();
    });

    // Apply filters button
    document.getElementById('apply-filters').addEventListener('click', filterAssignments);

    // Reset filters button
    document.getElementById('reset-filters').addEventListener('click', resetFilters);

    // Create assignment button
    document.getElementById('create-assignment-btn').addEventListener('click', () => {
        document.getElementById('create-assignment-modal').classList.add('active');
    });

    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    document.getElementById('cancel-assignment').addEventListener('click', closeModal);
    document.getElementById('cancel-submission').addEventListener('click', closeModal);
    document.getElementById('cancel-grading').addEventListener('click', closeModal);

    // Form submissions
    document.getElementById('assignment-form').addEventListener('submit', handleAssignmentCreation);
    document.getElementById('submission-form').addEventListener('submit', handleAssignmentSubmission);
    document.getElementById('grading-form').addEventListener('submit', handleAssignmentGrading);

    // File upload handling
    setupFileUploads();

    // Pagination buttons
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentState.currentPage > 1) {
            currentState.currentPage--;
            renderAssignments();
            updatePagination();
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(currentState.filteredAssignments.length / currentState.itemsPerPage);
        if (currentState.currentPage < totalPages) {
            currentState.currentPage++;
            renderAssignments();
            updatePagination();
        }
    });

    // Filter toggle for mobile
    document.querySelector('.filter-toggle').addEventListener('click', () => {
        const filterPanel = document.getElementById('filter-panel');
        filterPanel.classList.toggle('active');
    });

    // Event delegation for dynamic content
    document.addEventListener('click', function (e) {
        // Submit assignment buttons
        if (e.target.classList.contains('submit-assignment-btn')) {
            const assignmentCard = e.target.closest('.assignment-card');
            const assignmentId = parseInt(assignmentCard.dataset.assignmentId);
            openSubmissionModal(assignmentId);
        }

        // Grade assignment buttons
        if (e.target.classList.contains('grade-assignment-btn')) {
            const assignmentCard = e.target.closest('.assignment-card');
            const assignmentId = parseInt(assignmentCard.dataset.assignmentId);
            openGradingModal(assignmentId);
        }

        // View submission buttons
        if (e.target.classList.contains('view-submission-btn')) {
            const assignmentCard = e.target.closest('.assignment-card');
            const assignmentId = parseInt(assignmentCard.dataset.assignmentId);
            viewSubmission(assignmentId);
        }
    });
}

// Set up file upload functionality
function setupFileUploads() {
    // Assignment file upload
    const fileUpload = document.getElementById('file-upload');
    const filePreview = document.getElementById('file-preview');
    const fileName = document.getElementById('file-name');
    const uploadContainer = document.getElementById('file-upload-container');

    if (uploadContainer) {
        uploadContainer.addEventListener('click', () => fileUpload.click());
        fileUpload.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                fileName.textContent = e.target.files[0].name;
                filePreview.classList.add('active');
            }
        });
    }

    // Submission file upload
    const submissionFileUpload = document.getElementById('submission-file-upload');
    const submissionFilePreview = document.getElementById('submission-file-preview');
    const submissionFileName = document.getElementById('submission-file-name');
    const submissionUploadContainer = document.getElementById('submission-file-upload-container');

    if (submissionUploadContainer) {
        submissionUploadContainer.addEventListener('click', () => submissionFileUpload.click());
        submissionFileUpload.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                submissionFileName.textContent = e.target.files[0].name;
                submissionFilePreview.classList.add('active');
            }
        });
    }
}

// Close modal
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });

    // Reset forms
    document.getElementById('assignment-form').reset();
    document.getElementById('submission-form').reset();
    document.getElementById('grading-form').reset();

    // Reset file previews
    document.getElementById('file-preview').classList.remove('active');
    document.getElementById('submission-file-preview').classList.remove('active');
    document.getElementById('file-name').textContent = 'No file selected';
    document.getElementById('submission-file-name').textContent = 'No file selected';
}

// Open submission modal
function openSubmissionModal(assignmentId) {
    const assignment = currentState.assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    document.getElementById('submission-assignment-id').value = assignmentId;
    document.getElementById('submission-assignment-title').textContent = assignment.title;

    const dueDate = new Date(assignment.dueDate);
    document.getElementById('submission-due-date').textContent = dueDate.toLocaleString();

    document.getElementById('submit-assignment-modal').classList.add('active');
}

// Open grading modal
function openGradingModal(assignmentId) {
    const assignment = currentState.assignments.find(a => a.id === assignmentId);
    if (!assignment || !assignment.submissions || assignment.submissions.length === 0) return;

    const submission = assignment.submissions[0];

    document.getElementById('grading-assignment-id').value = assignmentId;
    document.getElementById('grading-student-id').value = submission.studentId;
    document.getElementById('grading-student-name').textContent = submission.studentName;
    document.getElementById('grading-assignment-title').textContent = assignment.title;
    document.getElementById('grading-file-link').href = '#'; // In real app, this would be the actual file URL
    document.getElementById('grading-submission-date').textContent = new Date(submission.submittedAt).toLocaleString();
    document.getElementById('grading-student-comments').textContent = submission.comments || 'No comments provided';
    document.getElementById('grading-max-points').textContent = assignment.points;
    document.getElementById('grading-score').value = submission.grade || '';
    document.getElementById('grading-feedback').value = submission.feedback || '';

    document.getElementById('grade-assignment-modal').classList.add('active');
}

// View submission
function viewSubmission(assignmentId) {
    const assignment = currentState.assignments.find(a => a.id === assignmentId);
    if (!assignment || !assignment.submissions || assignment.submissions.length === 0) return;

    const submission = assignment.submissions[0];
    alert(`Submission Details:\n\nStudent: ${submission.studentName}\nSubmitted: ${new Date(submission.submittedAt).toLocaleString()}\nGrade: ${submission.grade || 'Not graded yet'}\nFeedback: ${submission.feedback || 'No feedback yet'}`);
}

// Handle assignment creation
function handleAssignmentCreation(e) {
    e.preventDefault();

    const newAssignment = {
        id: Date.now(),
        title: document.getElementById('assignment-title').value,
        course: document.getElementById('assignment-course').value,
        courseName: document.getElementById('assignment-course').selectedOptions[0].text,
        description: document.getElementById('assignment-description').value,
        dueDate: document.getElementById('assignment-due-date').value,
        points: parseInt(document.getElementById('assignment-points').value),
        status: "pending",
        file: document.getElementById('file-upload').files[0]?.name || null,
        createdAt: new Date().toISOString(),
        submissions: []
    };

    currentState.assignments.unshift(newAssignment);
    saveAssignmentsToStorage();
    filterAssignments();
    closeModal();

    showNotification(`Assignment "${newAssignment.title}" created successfully!`);
}

// Handle assignment submission
function handleAssignmentSubmission(e) {
    e.preventDefault();

    const assignmentId = parseInt(document.getElementById('submission-assignment-id').value);
    const assignment = currentState.assignments.find(a => a.id === assignmentId);

    if (!assignment) return;

    const submissionFile = document.getElementById('submission-file-upload').files[0];
    if (!submissionFile) {
        alert('Please select a file to submit');
        return;
    }

    // Check if already submitted
    const existingSubmissionIndex = assignment.submissions.findIndex(s => s.studentId === currentState.currentUser.id);

    const submission = {
        studentId: currentState.currentUser.id,
        studentName: currentState.currentUser.name,
        file: submissionFile.name,
        submittedAt: new Date().toISOString(),
        comments: document.getElementById('submission-comments').value,
        grade: null,
        feedback: null
    };

    if (existingSubmissionIndex >= 0) {
        // Update existing submission
        assignment.submissions[existingSubmissionIndex] = submission;
    } else {
        // Add new submission
        assignment.submissions.push(submission);
    }

    // Check if submission is late
    const dueDate = new Date(assignment.dueDate);
    const submittedAt = new Date(submission.submittedAt);
    if (submittedAt > dueDate) {
        assignment.status = "late";
    } else {
        assignment.status = "submitted";
    }

    saveAssignmentsToStorage();
    filterAssignments();
    closeModal();

    showNotification(`Assignment "${assignment.title}" submitted successfully!`);
}

// Handle assignment grading
function handleAssignmentGrading(e) {
    e.preventDefault();

    const assignmentId = parseInt(document.getElementById('grading-assignment-id').value);
    const studentId = document.getElementById('grading-student-id').value;
    const assignment = currentState.assignments.find(a => a.id === assignmentId);

    if (!assignment) return;

    const submissionIndex = assignment.submissions.findIndex(s => s.studentId === studentId);
    if (submissionIndex < 0) return;

    assignment.submissions[submissionIndex].grade = parseInt(document.getElementById('grading-score').value);
    assignment.submissions[submissionIndex].feedback = document.getElementById('grading-feedback').value;

    assignment.status = "graded";

    saveAssignmentsToStorage();
    filterAssignments();
    closeModal();

    showNotification(`Grade submitted for ${assignment.submissions[submissionIndex].studentName}!`);
}

// Filter assignments based on current state
function filterAssignments() {
    let filtered = [...currentState.assignments];

    // Apply tab filter
    switch (currentState.currentTab) {
        case 'pending-assignments':
            filtered = filtered.filter(assignment =>
                assignment.status === "pending" ||
                (assignment.submissions && assignment.submissions.length === 0)
            );
            break;
        case 'submitted-assignments':
            filtered = filtered.filter(assignment =>
                assignment.status === "submitted" ||
                assignment.status === "late"
            );
            break;
        case 'graded-assignments':
            filtered = filtered.filter(assignment => assignment.status === "graded");
            break;
    }

    // Apply course filter
    if (currentState.filters.course !== 'all') {
        filtered = filtered.filter(assignment => assignment.course === currentState.filters.course);
    }

    // Apply status filter
    if (currentState.filters.status !== 'all') {
        filtered = filtered.filter(assignment => assignment.status === currentState.filters.status);
    }

    // Apply due date filter
    const now = new Date();
    if (currentState.filters.dueDate !== 'all') {
        switch (currentState.filters.dueDate) {
            case 'today':
                filtered = filtered.filter(assignment => {
                    const dueDate = new Date(assignment.dueDate);
                    return dueDate.toDateString() === now.toDateString();
                });
                break;
            case 'week':
                const weekEnd = new Date(now);
                weekEnd.setDate(weekEnd.getDate() + 7);
                filtered = filtered.filter(assignment => {
                    const dueDate = new Date(assignment.dueDate);
                    return dueDate >= now && dueDate <= weekEnd;
                });
                break;
            case 'month':
                const monthEnd = new Date(now);
                monthEnd.setMonth(monthEnd.getMonth() + 1);
                filtered = filtered.filter(assignment => {
                    const dueDate = new Date(assignment.dueDate);
                    return dueDate >= now && dueDate <= monthEnd;
                });
                break;
            case 'future':
                filtered = filtered.filter(assignment => {
                    const dueDate = new Date(assignment.dueDate);
                    return dueDate > now;
                });
                break;
            case 'past':
                filtered = filtered.filter(assignment => {
                    const dueDate = new Date(assignment.dueDate);
                    return dueDate < now;
                });
                break;
        }
    }

    // Apply search filter
    if (currentState.filters.search) {
        filtered = filtered.filter(assignment =>
            assignment.title.toLowerCase().includes(currentState.filters.search) ||
            assignment.description.toLowerCase().includes(currentState.filters.search) ||
            assignment.courseName.toLowerCase().includes(currentState.filters.search)
        );
    }

    currentState.filteredAssignments = filtered;
    currentState.currentPage = 1; // Reset to first page when filters change

    renderAssignments();
    updatePagination();
}

// Reset all filters
function resetFilters() {
    currentState.filters = {
        course: 'all',
        status: 'all',
        dueDate: 'all',
        search: ''
    };

    // Reset filter dropdowns
    document.getElementById('course-filter').value = 'all';
    document.getElementById('status-filter').value = 'all';
    document.getElementById('due-date-filter').value = 'all';
    document.getElementById('assignment-search').value = '';

    filterAssignments();
    showNotification('Filters reset');
}

// Render assignments to the DOM
function renderAssignments() {
    const assignmentsContainer = document.getElementById('assignments-container');
    const startIndex = (currentState.currentPage - 1) * currentState.itemsPerPage;
    const endIndex = startIndex + currentState.itemsPerPage;
    const assignmentsToRender = currentState.filteredAssignments.slice(startIndex, endIndex);

    // Clear existing assignments
    assignmentsContainer.innerHTML = '';

    if (assignmentsToRender.length === 0) {
        // Show empty state
        assignmentsContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-file-alt"></i>
                        <h3>No assignments found</h3>
                        <p>Try adjusting your search or filters</p>
                        <button class="btn-primary" id="reset-filters-btn">Reset Filters</button>
                    </div>
                `;

        // Add event listener to reset filters button
        document.getElementById('reset-filters-btn').addEventListener('click', resetFilters);
        return;
    }

    // Render assignments
    assignmentsToRender.forEach((assignment) => {
        const assignmentCard = createAssignmentCard(assignment);
        assignmentsContainer.appendChild(assignmentCard);
    });
}

// Create an assignment card element
function createAssignmentCard(assignment) {
    const card = document.createElement('div');
    card.className = 'assignment-card';
    card.dataset.assignmentId = assignment.id;

    // Add urgency class if due date is soon
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    const timeDiff = dueDate - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff <= 2 && daysDiff >= 0 && assignment.status === 'pending') {
        card.classList.add('urgent');
    } else if (assignment.status === 'graded') {
        card.classList.add('completed');
    }

    // Get status text and class
    let statusText = '';
    let statusClass = '';

    switch (assignment.status) {
        case 'pending':
            statusText = 'Pending';
            statusClass = 'status-pending';
            break;
        case 'submitted':
            statusText = 'Submitted';
            statusClass = 'status-submitted';
            break;
        case 'graded':
            statusText = 'Graded';
            statusClass = 'status-graded';
            break;
        case 'late':
            statusText = 'Late';
            statusClass = 'status-late';
            break;
    }

    // Check if user has submitted this assignment
    const userSubmission = assignment.submissions.find(s => s.studentId === currentState.currentUser.id);
    const isSubmitted = !!userSubmission;
    const isGraded = isSubmitted && userSubmission.grade !== null;

    // Format due date
    const dueDateFormatted = dueDate.toLocaleString();

    // Create action buttons based on user role and assignment status
    let actionButtons = '';

    if (currentState.currentUser.role === 'student') {
        if (!isSubmitted && assignment.status !== 'graded') {
            actionButtons = `
                        <button class="btn-primary submit-assignment-btn">
                            <i class="fas fa-paper-plane"></i> Submit Assignment
                        </button>
                    `;
        } else if (isSubmitted && !isGraded) {
            actionButtons = `
                        <button class="btn-secondary" disabled>
                            <i class="fas fa-check"></i> Submitted
                        </button>
                    `;
        } else if (isGraded) {
            actionButtons = `
                        <button class="btn-success view-submission-btn">
                            <i class="fas fa-chart-bar"></i> View Grade (${userSubmission.grade}/${assignment.points})
                        </button>
                    `;
        }
    } else if (currentState.currentUser.role === 'teacher') {
        if (assignment.submissions && assignment.submissions.length > 0) {
            if (assignment.status === 'graded') {
                actionButtons = `
                            <button class="btn-success grade-assignment-btn">
                                <i class="fas fa-edit"></i> Edit Grade
                            </button>
                        `;
            } else {
                actionButtons = `
                            <button class="btn-primary grade-assignment-btn">
                                <i class="fas fa-graduation-cap"></i> Grade Assignment
                            </button>
                        `;
            }
        }
    }

    card.innerHTML = `
                <div class="assignment-header">
                    <h3 class="assignment-title">${assignment.title}</h3>
                    <span class="assignment-status ${statusClass}">${statusText}</span>
                </div>
                
                <div class="assignment-details">
                    <div class="detail-item">
                        <span class="detail-label">Course</span>
                        <span class="detail-value">${assignment.courseName}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Due Date</span>
                        <span class="detail-value">${dueDateFormatted}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Points</span>
                        <span class="detail-value">${assignment.points}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Submissions</span>
                        <span class="detail-value">${assignment.submissions.length}</span>
                    </div>
                </div>
                
                <p class="assignment-description">${assignment.description}</p>
                
                ${assignment.file ? `
                    <div class="detail-item">
                        <span class="detail-label">Assignment File</span>
                        <a href="#" class="btn-secondary">
                            <i class="fas fa-download"></i> Download
                        </a>
                    </div>
                ` : ''}
                
                ${isSubmitted && userSubmission ? `
                    <div class="submission-details">
                        <div class="submission-header">
                            <span class="submission-title">Your Submission</span>
                            <div class="submission-meta">
                                <span>${new Date(userSubmission.submittedAt).toLocaleString()}</span>
                                ${userSubmission.grade ? `<span>Grade: ${userSubmission.grade}/${assignment.points}</span>` : ''}
                            </div>
                        </div>
                        ${userSubmission.comments ? `<p>${userSubmission.comments}</p>` : ''}
                    </div>
                ` : ''}
                
                <div class="assignment-actions">
                    ${actionButtons}
                </div>
            `;

    return card;
}

// Update pagination UI
function updatePagination() {
    const totalPages = Math.ceil(currentState.filteredAssignments.length / currentState.itemsPerPage);
    const pageNumbers = document.getElementById('page-numbers');

    // Clear existing page numbers
    pageNumbers.innerHTML = '';

    // Add page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination-btn ${i === currentState.currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentState.currentPage = i;
            renderAssignments();
            updatePagination();
        });
        pageNumbers.appendChild(pageBtn);
    }

    // Enable/disable navigation buttons
    document.getElementById('prev-page').disabled = currentState.currentPage === 1;
    document.getElementById('next-page').disabled = currentState.currentPage === totalPages || totalPages === 0;
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
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '1000';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

// Initialize the page
initAssignmentsPage();