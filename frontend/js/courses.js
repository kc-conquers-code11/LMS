// courses.js - Functional script for EduSync LMS Courses Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the courses page functionality
    initCoursesPage();
});

function initCoursesPage() {
    // Initialize all functionality
    initSearch();
    initFilters();
    initCategoryFilters();
    initCourseActions();
    initPagination();
    initSorting();
}

// Course data - In a real application, this would come from an API
const coursesData = [
    {
        id: 1,
        title: "Advanced Web Development",
        instructor: "Sarah Johnson",
        description: "Master modern web development with React, Node.js, and MongoDB. Build full-stack applications from scratch.",
        category: "Programming",
        duration: "24h 10m",
        modules: 12,
        progress: 75,
        enrolled: true,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        bookmarked: false
    },
    {
        id: 2,
        title: "Machine Learning Fundamentals",
        instructor: "Michael Chen",
        description: "Learn the core concepts of machine learning algorithms and how to implement them using Python.",
        category: "Data Science",
        duration: "18h 30m",
        modules: 10,
        progress: 40,
        enrolled: true,
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        bookmarked: false
    },
    {
        id: 3,
        title: "UI/UX Design Masterclass",
        instructor: "Emily Rodriguez",
        description: "Learn to create beautiful and functional user interfaces with modern design principles and tools.",
        category: "Design",
        duration: "22h 15m",
        modules: 14,
        progress: 20,
        enrolled: true,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
        bookmarked: false
    },
    {
        id: 4,
        title: "Digital Marketing Strategies",
        instructor: "James Wilson",
        description: "Master digital marketing techniques including SEO, social media, email marketing, and analytics.",
        category: "Marketing",
        duration: "16h 45m",
        modules: 9,
        progress: 90,
        enrolled: true,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80",
        bookmarked: false
    },
    {
        id: 5,
        title: "Agile Project Management",
        instructor: "Robert Martinez",
        description: "Learn agile methodologies and how to manage software development projects effectively.",
        category: "Business",
        duration: "14h 20m",
        modules: 8,
        progress: 100,
        enrolled: true,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        bookmarked: false
    },
    {
        id: 6,
        title: "iOS App Development with Swift",
        instructor: "Jennifer Lee",
        description: "Build native iOS applications using Swift and Apple's latest development tools and frameworks.",
        category: "Programming",
        duration: "28h 40m",
        modules: 15,
        progress: 0,
        enrolled: false,
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        bookmarked: false
    },
    {
        id: 7,
        title: "Data Visualization with D3.js",
        instructor: "Alex Thompson",
        description: "Create interactive and engaging data visualizations using D3.js library.",
        category: "Data Science",
        duration: "15h 30m",
        modules: 11,
        progress: 0,
        enrolled: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        bookmarked: false
    },
    {
        id: 8,
        title: "Advanced Python Programming",
        instructor: "David Kim",
        description: "Deep dive into advanced Python concepts and programming techniques.",
        category: "Programming",
        duration: "20h 15m",
        modules: 13,
        progress: 0,
        enrolled: false,
        image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        bookmarked: false
    }
];

// Current state
let currentState = {
    courses: [...coursesData],
    filteredCourses: [...coursesData],
    currentPage: 1,
    itemsPerPage: 6,
    currentCategory: 'all',
    currentSort: 'default',
    searchQuery: ''
};

// Initialize search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    
    searchInput.addEventListener('input', function(e) {
        currentState.searchQuery = e.target.value.toLowerCase();
        filterCourses();
    });
}

// Initialize filter functionality
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real app, this would show filter options
            alert(`Filter option: ${this.textContent.trim()}`);
        });
    });
}

// Initialize category filter functionality
function initCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('.category-title').textContent;
            currentState.currentCategory = category.toLowerCase();
            
            // Highlight selected category
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            filterCourses();
        });
    });
}

// Initialize course action buttons
function initCourseActions() {
    // Event delegation for dynamic content
    document.addEventListener('click', function(e) {
        // Continue/Enroll buttons
        if (e.target.classList.contains('btn-primary') || 
            e.target.parentElement.classList.contains('btn-primary')) {
            const button = e.target.classList.contains('btn-primary') ? e.target : e.target.parentElement;
            const courseCard = button.closest('.course-card');
            const courseId = parseInt(courseCard.dataset.courseId);
            
            handleCourseAction(courseId, button.textContent.trim());
        }
        
        // Bookmark buttons
        if (e.target.classList.contains('btn-secondary') || 
            e.target.parentElement.classList.contains('btn-secondary')) {
            const button = e.target.classList.contains('btn-secondary') ? e.target : e.target.parentElement;
            const courseCard = button.closest('.course-card');
            const courseId = parseInt(courseCard.dataset.courseId);
            
            toggleBookmark(courseId, button);
        }
        
        // New Course button
        if (e.target.classList.contains('page-actions') || 
            e.target.parentElement.classList.contains('page-actions')) {
            createNewCourse();
        }
    });
}

// Handle course action (Continue/Enroll/View Certificate)
function handleCourseAction(courseId, actionText) {
    const course = currentState.courses.find(c => c.id === courseId);
    
    if (actionText === 'Enroll Now') {
        enrollInCourse(courseId);
    } else if (actionText === 'Continue') {
        continueCourse(courseId);
    } else if (actionText === 'View Certificate') {
        viewCertificate(courseId);
    }
}

// Enroll in a course
function enrollInCourse(courseId) {
    const courseIndex = currentState.courses.findIndex(c => c.id === courseId);
    
    if (courseIndex !== -1) {
        currentState.courses[courseIndex].enrolled = true;
        currentState.courses[courseIndex].progress = 0;
        
        // Update UI
        filterCourses();
        
        // Show confirmation message
        showNotification(`Enrolled in "${currentState.courses[courseIndex].title}" successfully!`);
    }
}

// Continue a course
function continueCourse(courseId) {
    // In a real application, this would redirect to the course page
    const course = currentState.courses.find(c => c.id === courseId);
    showNotification(`Continuing with "${course.title}"`);
    
    // Simulate progress increase (in a real app, this would be tracked server-side)
    const courseIndex = currentState.courses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1 && currentState.courses[courseIndex].progress < 100) {
        currentState.courses[courseIndex].progress += 10;
        if (currentState.courses[courseIndex].progress > 100) {
            currentState.courses[courseIndex].progress = 100;
        }
        
        // Update UI
        filterCourses();
    }
}

// View certificate
function viewCertificate(courseId) {
    const course = currentState.courses.find(c => c.id === courseId);
    showNotification(`Viewing certificate for "${course.title}"`);
    
    // In a real application, this would open a certificate modal or page
    alert(`Certificate of Completion\n\nThis certifies that\nJohn Smith\nhas successfully completed the course\n"${course.title}"\n\nDate: ${new Date().toLocaleDateString()}`);
}

// Toggle bookmark for a course
function toggleBookmark(courseId, button) {
    const courseIndex = currentState.courses.findIndex(c => c.id === courseId);
    
    if (courseIndex !== -1) {
        currentState.courses[courseIndex].bookmarked = !currentState.courses[courseIndex].bookmarked;
        
        // Update button icon
        const icon = button.querySelector('i');
        if (currentState.courses[courseIndex].bookmarked) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.color = 'var(--primary-500)';
            showNotification(`"${currentState.courses[courseIndex].title}" bookmarked`);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.color = '';
            showNotification(`"${currentState.courses[courseIndex].title}" removed from bookmarks`);
        }
    }
}

// Create a new course
function createNewCourse() {
    // In a real application, this would open a course creation modal
    showNotification('Opening course creation form...');
    
    // Simulate course creation
    const newCourseId = currentState.courses.length + 1;
    const newCourse = {
        id: newCourseId,
        title: `New Course ${newCourseId}`,
        instructor: "You",
        description: "Describe your new course here.",
        category: "Programming",
        duration: "0h 0m",
        modules: 0,
        progress: 0,
        enrolled: true,
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        bookmarked: false
    };
    
    currentState.courses.unshift(newCourse);
    filterCourses();
    
    showNotification(`New course "${newCourse.title}" created!`);
}

// Initialize pagination
function initPagination() {
    const paginationContainer = document.querySelector('.pagination');
    
    paginationContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('pagination-btn')) {
            const button = e.target;
            const currentActive = document.querySelector('.pagination-btn.active');
            
            if (button.classList.contains('active')) return;
            
            // Handle previous button
            if (button.querySelector('.fa-chevron-left')) {
                if (currentState.currentPage > 1) {
                    currentState.currentPage--;
                    updatePagination();
                }
                return;
            }
            
            // Handle next button
            if (button.querySelector('.fa-chevron-right')) {
                const totalPages = Math.ceil(currentState.filteredCourses.length / currentState.itemsPerPage);
                if (currentState.currentPage < totalPages) {
                    currentState.currentPage++;
                    updatePagination();
                }
                return;
            }
            
            // Handle number buttons
            currentState.currentPage = parseInt(button.textContent);
            updatePagination();
        }
    });
}

// Update pagination UI
function updatePagination() {
    const totalPages = Math.ceil(currentState.filteredCourses.length / currentState.itemsPerPage);
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    // Remove active class from all buttons
    paginationButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to current page button
    paginationButtons.forEach(button => {
        if (parseInt(button.textContent) === currentState.currentPage) {
            button.classList.add('active');
        }
    });
    
    // Render courses for current page
    renderCourses();
}

// Initialize sorting functionality
function initSorting() {
    // This would be connected to the sort dropdown in a real implementation
    // For now, we'll add a simple example
    const sortOptions = [
        { id: 'default', name: 'Default' },
        { id: 'title-asc', name: 'Title (A-Z)' },
        { id: 'title-desc', name: 'Title (Z-A)' },
        { id: 'progress', name: 'Progress' },
        { id: 'newest', name: 'Newest' }
    ];
    
    // In a real app, you would create a dropdown with these options
}

// Filter courses based on current state
function filterCourses() {
    let filtered = [...currentState.courses];
    
    // Apply category filter
    if (currentState.currentCategory !== 'all') {
        filtered = filtered.filter(course => 
            course.category.toLowerCase() === currentState.currentCategory
        );
    }
    
    // Apply search filter
    if (currentState.searchQuery) {
        filtered = filtered.filter(course => 
            course.title.toLowerCase().includes(currentState.searchQuery) ||
            course.description.toLowerCase().includes(currentState.searchQuery) ||
            course.instructor.toLowerCase().includes(currentState.searchQuery) ||
            course.category.toLowerCase().includes(currentState.searchQuery)
        );
    }
    
    // Apply sorting
    switch (currentState.currentSort) {
        case 'title-asc':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'progress':
            filtered.sort((a, b) => b.progress - a.progress);
            break;
        case 'newest':
            // Assuming newer courses have higher IDs
            filtered.sort((a, b) => b.id - a.id);
            break;
        default:
            // Default sorting (no change)
            break;
    }
    
    currentState.filteredCourses = filtered;
    currentState.currentPage = 1; // Reset to first page when filters change
    
    updatePagination();
    renderCourses();
}

// Render courses to the DOM
function renderCourses() {
    const coursesGrid = document.querySelector('.courses-grid');
    const startIndex = (currentState.currentPage - 1) * currentState.itemsPerPage;
    const endIndex = startIndex + currentState.itemsPerPage;
    const coursesToRender = currentState.filteredCourses.slice(startIndex, endIndex);
    
    // Clear existing courses
    coursesGrid.innerHTML = '';
    
    if (coursesToRender.length === 0) {
        // Show empty state
        coursesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>No courses found</h3>
                <p>Try adjusting your search or filters</p>
                <button class="btn-primary" id="reset-filters">Reset Filters</button>
            </div>
        `;
        
        // Add event listener to reset filters button
        document.getElementById('reset-filters').addEventListener('click', resetFilters);
        return;
    }
    
    // Render courses
    coursesToRender.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
    
    // Update pagination info
    updatePaginationInfo();
}

// Create a course card element
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.dataset.courseId = course.id;
    
    let actionButtonText = 'Enroll Now';
    if (course.enrolled) {
        actionButtonText = course.progress === 100 ? 'View Certificate' : 'Continue';
    }
    
    let progressHtml = '';
    if (course.enrolled) {
        progressHtml = `
            <div class="course-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <div class="progress-text">
                    <span>Progress</span>
                    <span>${course.progress === 100 ? 'Completed' : `${course.progress}%`}</span>
                </div>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="course-image">
            <img src="${course.image}" alt="${course.title}">
            <span class="course-category">${course.category}</span>
        </div>
        <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-instructor">By: ${course.instructor}</p>
            <p class="course-description">${course.description}</p>
            
            <div class="course-meta">
                <div><i class="far fa-clock"></i> ${course.duration}</div>
                <div><i class="far fa-file-alt"></i> ${course.modules} modules</div>
            </div>
            
            ${progressHtml}
            
            <div class="course-actions">
                <button class="btn-primary">${actionButtonText}</button>
                <button class="btn-secondary"><i class="${course.bookmarked ? 'fas' : 'far'} fa-bookmark"></i></button>
            </div>
        </div>
    `;
    
    return card;
}

// Update pagination information
function updatePaginationInfo() {
    const totalCourses = currentState.filteredCourses.length;
    const startIndex = (currentState.currentPage - 1) * currentState.itemsPerPage + 1;
    const endIndex = Math.min(startIndex + currentState.itemsPerPage - 1, totalCourses);
    
    // In a real app, you might display this information to the user
    console.log(`Showing ${startIndex}-${endIndex} of ${totalCourses} courses`);
}

// Reset all filters
function resetFilters() {
    currentState.currentCategory = 'all';
    currentState.searchQuery = '';
    currentState.currentSort = 'default';
    
    // Clear search input
    document.querySelector('.search-box input').value = '';
    
    // Remove active class from category filters
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    
    filterCourses();
    showNotification('Filters reset');
}

// Show notification
function showNotification(message) {
    // In a real app, you might use a toast notification library
    // For this example, we'll use a simple alert
    console.log(message);
    
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
        document.body.removeChild(toast);
    }, 3000);
}

// Initialize the page
function initializePage() {
    renderCourses();
    updatePagination();
}

// Start the application
initializePage();