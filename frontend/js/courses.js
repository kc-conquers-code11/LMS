// courses.js - Enhanced with 3 courses per row and modal
document.addEventListener('DOMContentLoaded', function () {
  // Initialize the courses page
  initCoursesPage();
});

// Sample course data with college structure
const coursesData = [
  {
    id: 1,
    title: 'Advanced Web Development',
    instructor: 'Sarah Johnson',
    description:
      'Master modern web development with React, Node.js, and MongoDB. Build full-stack applications from scratch.',
    category: 'Programming',
    year: 3,
    branch: 'COMP',
    division: 'A',
    semester: 5,
    duration: '24h 10m',
    modules: 12,
    progress: 75,
    enrolled: true,
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    bookmarked: false,
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    instructor: 'Michael Chen',
    description:
      'Learn the core concepts of machine learning algorithms and how to implement them using Python.',
    category: 'Data Science',
    year: 4,
    branch: 'AIML',
    division: 'B',
    semester: 7,
    duration: '18h 30m',
    modules: 10,
    progress: 40,
    enrolled: true,
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    bookmarked: false,
  },
  {
    id: 3,
    title: 'UI/UX Design Masterclass',
    instructor: 'Emily Rodriguez',
    description:
      'Learn to create beautiful and functional user interfaces with modern design principles and tools.',
    category: 'Design',
    year: 2,
    branch: 'IT',
    division: 'C',
    semester: 4,
    duration: '22h 15m',
    modules: 14,
    progress: 20,
    enrolled: true,
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80',
    bookmarked: false,
  },
  {
    id: 4,
    title: 'Digital Marketing Strategies',
    instructor: 'James Wilson',
    description:
      'Master digital marketing techniques including SEO, social media, email marketing, and analytics.',
    category: 'Marketing',
    year: 3,
    branch: 'COMP',
    division: 'D',
    semester: 6,
    duration: '16h 45m',
    modules: 9,
    progress: 90,
    enrolled: true,
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80',
    bookmarked: false,
  },
  {
    id: 5,
    title: 'Agile Project Management',
    instructor: 'Robert Martinez',
    description:
      'Learn agile methodologies and how to manage software development projects effectively.',
    category: 'Business',
    year: 4,
    branch: 'COMP',
    division: 'A',
    semester: 8,
    duration: '14h 20m',
    modules: 8,
    progress: 100,
    enrolled: true,
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    bookmarked: false,
  },
  {
    id: 6,
    title: 'iOS App Development with Swift',
    instructor: 'Jennifer Lee',
    description:
      "Build native iOS applications using Swift and Apple's latest development tools and frameworks.",
    category: 'Programming',
    year: 3,
    branch: 'COMP',
    division: 'B',
    semester: 5,
    duration: '28h 40m',
    modules: 15,
    progress: 0,
    enrolled: false,
    image:
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    bookmarked: false,
  },
  {
    id: 7,
    title: 'Data Structures and Algorithms',
    instructor: 'Alex Thompson',
    description: 'Learn fundamental data structures and algorithms for efficient problem solving.',
    category: 'Programming',
    year: 2,
    branch: 'COMP',
    division: 'A',
    semester: 3,
    duration: '30h 15m',
    modules: 12,
    progress: 0,
    enrolled: false,
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    bookmarked: false,
  },
  {
    id: 8,
    title: 'Database Management Systems',
    instructor: 'David Kim',
    description: 'Comprehensive course on database design, implementation, and management.',
    category: 'Database',
    year: 3,
    branch: 'IT',
    division: 'C',
    semester: 5,
    duration: '22h 30m',
    modules: 10,
    progress: 0,
    enrolled: false,
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    bookmarked: false,
  },
];

// Current state
let currentState = {
  courses: [...coursesData],
  filteredCourses: [...coursesData],
  currentTab: 'all-courses',
  currentPage: 1,
  itemsPerPage: 6,
  filters: {
    year: 'all',
    branch: 'all',
    division: 'all',
    semester: 'all',
    search: '',
  },
};

// Semester mapping based on year
const semesterOptions = {
  1: ['1', '2'],
  2: ['3', '4'],
  3: ['5', '6'],
  4: ['7', '8'],
};

// Initialize the courses page
function initCoursesPage() {
  setupSemesterOptions();
  renderCourses();
  setupEventListeners();
  updatePagination();
}

// Set up semester options based on year selection
function setupSemesterOptions() {
  const yearFilter = document.getElementById('year-filter');
  const semesterFilter = document.getElementById('semester-filter');
  const courseYear = document.getElementById('course-year');
  const courseSemester = document.getElementById('course-semester');

  // Function to update semester options
  const updateSemesters = (yearSelect, semesterSelect) => {
    const year = yearSelect.value;
    semesterSelect.innerHTML = '<option value="all">All Semesters</option>';

    if (year !== 'all' && semesterOptions[year]) {
      semesterOptions[year].forEach((sem) => {
        const option = document.createElement('option');
        option.value = sem;
        option.textContent = `Semester ${sem}`;
        semesterSelect.appendChild(option);
      });
    }
  };

  // Set up event listeners for year changes
  yearFilter.addEventListener('change', () => {
    updateSemesters(yearFilter, semesterFilter);
    currentState.filters.year = yearFilter.value;
  });

  courseYear.addEventListener('change', () => {
    updateSemesters(courseYear, courseSemester);
  });

  // Initialize semester options
  updateSemesters(yearFilter, semesterFilter);
  updateSemesters(courseYear, courseSemester);
}

// Set up event listeners
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentState.currentTab = tab.dataset.tab;
      filterCourses();
    });
  });

  // Filter changes
  document.getElementById('year-filter').addEventListener('change', (e) => {
    currentState.filters.year = e.target.value;
  });

  document.getElementById('branch-filter').addEventListener('change', (e) => {
    currentState.filters.branch = e.target.value;
  });

  document.getElementById('division-filter').addEventListener('change', (e) => {
    currentState.filters.division = e.target.value;
  });

  document.getElementById('semester-filter').addEventListener('change', (e) => {
    currentState.filters.semester = e.target.value;
  });

  // Search input
  document.getElementById('course-search').addEventListener('input', (e) => {
    currentState.filters.search = e.target.value.toLowerCase();
    filterCourses();
  });

  // Apply filters button
  document.getElementById('apply-filters').addEventListener('click', filterCourses);

  // Reset filters button
  document.getElementById('reset-filters').addEventListener('click', resetFilters);

  // New course button
  document.getElementById('new-course-btn').addEventListener('click', () => {
    document.getElementById('create-course-modal').classList.add('active');
  });

  // Modal close buttons
  document.querySelector('.close-modal').addEventListener('click', closeModal);
  document.getElementById('cancel-course').addEventListener('click', closeModal);

  // Course form submission
  document.getElementById('course-form').addEventListener('submit', handleCourseCreation);

  // Pagination buttons
  document.getElementById('prev-page').addEventListener('click', () => {
    if (currentState.currentPage > 1) {
      currentState.currentPage--;
      renderCourses();
      updatePagination();
    }
  });

  document.getElementById('next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(currentState.filteredCourses.length / currentState.itemsPerPage);
    if (currentState.currentPage < totalPages) {
      currentState.currentPage++;
      renderCourses();
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
    // Enroll/Continue buttons
    if (
      e.target.classList.contains('btn-primary') ||
      e.target.parentElement.classList.contains('btn-primary')
    ) {
      const button = e.target.classList.contains('btn-primary') ? e.target : e.target.parentElement;
      const courseCard = button.closest('.course-card');
      const courseId = parseInt(courseCard.dataset.courseId);

      handleCourseAction(courseId, button.textContent.trim());
    }

    // Bookmark buttons
    if (
      e.target.classList.contains('btn-secondary') ||
      e.target.parentElement.classList.contains('btn-secondary')
    ) {
      const button = e.target.classList.contains('btn-secondary')
        ? e.target
        : e.target.parentElement;
      const courseCard = button.closest('.course-card');
      const courseId = parseInt(courseCard.dataset.courseId);

      toggleBookmark(courseId, button);
    }

    // Unenroll buttons
    if (e.target.classList.contains('unenroll-btn')) {
      const courseCard = e.target.closest('.course-card');
      const courseId = parseInt(courseCard.dataset.courseId);
      unenrollFromCourse(courseId);
    }
  });
}

// Close modal
function closeModal() {
  document.getElementById('create-course-modal').classList.remove('active');
  document.getElementById('course-form').reset();
}

// Handle course creation
function handleCourseCreation(e) {
  e.preventDefault();

  const newCourse = {
    id: currentState.courses.length + 1,
    title: document.getElementById('course-title').value,
    instructor: document.getElementById('course-instructor').value,
    description: document.getElementById('course-description').value,
    category: document.getElementById('course-category').value,
    year: parseInt(document.getElementById('course-year').value),
    branch: document.getElementById('course-branch').value,
    division: document.getElementById('course-division').value,
    semester: parseInt(document.getElementById('course-semester').value),
    duration: document.getElementById('course-duration').value,
    modules: parseInt(document.getElementById('course-modules').value),
    image: document.getElementById('course-image').value,
    progress: 0,
    enrolled: true, // Teacher is automatically enrolled in their own course
    bookmarked: false,
  };

  currentState.courses.unshift(newCourse);
  filterCourses();
  closeModal();

  showNotification(`Course "${newCourse.title}" created successfully!`);
}

// Filter courses based on current state
function filterCourses() {
  let filtered = [...currentState.courses];

  // Apply tab filter
  if (currentState.currentTab === 'my-courses') {
    filtered = filtered.filter((course) => course.enrolled);
  } else if (currentState.currentTab === 'bookmarked-courses') {
    filtered = filtered.filter((course) => course.bookmarked);
  }

  // Apply year filter
  if (currentState.filters.year !== 'all') {
    filtered = filtered.filter((course) => course.year == currentState.filters.year);
  }

  // Apply branch filter
  if (currentState.filters.branch !== 'all') {
    filtered = filtered.filter((course) => course.branch === currentState.filters.branch);
  }

  // Apply division filter
  if (currentState.filters.division !== 'all') {
    filtered = filtered.filter((course) => course.division === currentState.filters.division);
  }

  // Apply semester filter
  if (currentState.filters.semester !== 'all') {
    filtered = filtered.filter((course) => course.semester == currentState.filters.semester);
  }

  // Apply search filter
  if (currentState.filters.search) {
    filtered = filtered.filter(
      (course) =>
        course.title.toLowerCase().includes(currentState.filters.search) ||
        course.description.toLowerCase().includes(currentState.filters.search) ||
        course.instructor.toLowerCase().includes(currentState.filters.search) ||
        course.category.toLowerCase().includes(currentState.filters.search)
    );
  }

  currentState.filteredCourses = filtered;
  currentState.currentPage = 1; // Reset to first page when filters change

  renderCourses();
  updatePagination();
}

// Reset all filters
function resetFilters() {
  currentState.filters = {
    year: 'all',
    branch: 'all',
    division: 'all',
    semester: 'all',
    search: '',
  };

  // Reset filter dropdowns
  document.getElementById('year-filter').value = 'all';
  document.getElementById('branch-filter').value = 'all';
  document.getElementById('division-filter').value = 'all';
  document.getElementById('semester-filter').value = 'all';
  document.getElementById('course-search').value = '';

  // Reset semester options
  setupSemesterOptions();

  filterCourses();
  showNotification('Filters reset');
}

// Render courses to the DOM
function renderCourses() {
  const coursesContainer = document.getElementById('courses-container');
  const startIndex = (currentState.currentPage - 1) * currentState.itemsPerPage;
  const endIndex = startIndex + currentState.itemsPerPage;
  const coursesToRender = currentState.filteredCourses.slice(startIndex, endIndex);

  // Clear existing courses
  coursesContainer.innerHTML = '';

  if (coursesToRender.length === 0) {
    // Show empty state
    coursesContainer.innerHTML = `
            <div class="empty-state">
              <i class="fas fa-book-open"></i>
              <h3>No courses found</h3>
              <p>Try adjusting your search or filters</p>
              <button class="btn-primary" id="reset-filters-btn">Reset Filters</button>
            </div>
          `;

    // Add event listener to reset filters button
    document.getElementById('reset-filters-btn').addEventListener('click', resetFilters);
    return;
  }

  // Render courses
  coursesToRender.forEach((course) => {
    const courseCard = createCourseCard(course);
    coursesContainer.appendChild(courseCard);
  });
}

// Create a course card element
function createCourseCard(course) {
  const card = document.createElement('div');
  card.className = 'course-card';
  card.dataset.courseId = course.id;

  let actionButtonText = 'Enroll Now';
  if (course.enrolled) {
    actionButtonText = 'Continue'; // Removed "View Certificate" option
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
                <span>${course.progress}%</span>
              </div>
            </div>
          `;
  }

  // Add unenroll button for enrolled courses in "My Courses" tab
  let unenrollButton = '';
  if (course.enrolled && currentState.currentTab === 'my-courses') {
    unenrollButton = `<button class="unenroll-btn">Unenroll</button>`;
  }

  card.innerHTML = `
          <div class="course-image">
            <img src="${course.image}" alt="${course.title}">
            <span class="course-category">${course.category}</span>
          </div>
          <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-instructor">By: ${course.instructor}</p>
            <div class="course-meta">
              <span>Year ${course.year}</span>
              <span>• ${course.branch}</span>
              <span>• Div ${course.division}</span>
              <span>• Sem ${course.semester}</span>
            </div>
            <p class="course-description">${course.description}</p>
            
            <div class="course-meta">
              <div><i class="far fa-clock"></i> ${course.duration}</div>
              <div><i class="far fa-file-alt"></i> ${course.modules} modules</div>
            </div>
            
            ${progressHtml}
            
            <div class="course-actions">
              <button class="btn-primary">${actionButtonText}</button>
              <button class="btn-secondary"><i class="${
                course.bookmarked ? 'fas' : 'far'
              } fa-bookmark"></i></button>
            </div>
            
            ${unenrollButton}
          </div>
        `;

  return card;
}

// Handle course action (Enroll/Continue)
function handleCourseAction(courseId, actionText) {
  const course = currentState.courses.find((c) => c.id === courseId);

  if (actionText === 'Enroll Now') {
    enrollInCourse(courseId);
  } else if (actionText === 'Continue') {
    continueCourse(courseId);
  }
}

// Enroll in a course
function enrollInCourse(courseId) {
  const courseIndex = currentState.courses.findIndex((c) => c.id === courseId);

  if (courseIndex !== -1) {
    currentState.courses[courseIndex].enrolled = true;
    currentState.courses[courseIndex].progress = 0;

    // Update UI - switch to "My Courses" tab
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    document.querySelector('[data-tab="my-courses"]').classList.add('active');
    currentState.currentTab = 'my-courses';

    // Update UI
    filterCourses();

    // Show confirmation message
    showNotification(`Enrolled in "${currentState.courses[courseIndex].title}" successfully!`);
  }
}

// Unenroll from a course
function unenrollFromCourse(courseId) {
  if (confirm('Are you sure you want to unenroll from this course?')) {
    const courseIndex = currentState.courses.findIndex((c) => c.id === courseId);

    if (courseIndex !== -1) {
      currentState.courses[courseIndex].enrolled = false;
      currentState.courses[courseIndex].progress = 0;

      // Update UI
      filterCourses();

      // Show confirmation message
      showNotification(`Unenrolled from "${currentState.courses[courseIndex].title}"`);
    }
  }
}

// Continue a course (simulate progress)
function continueCourse(courseId) {
  const course = currentState.courses.find((c) => c.id === courseId);
  showNotification(`Continuing with "${course.title}"`);

  // Simulate progress increase
  const courseIndex = currentState.courses.findIndex((c) => c.id === courseId);
  if (courseIndex !== -1 && currentState.courses[courseIndex].progress < 100) {
    currentState.courses[courseIndex].progress += 10;
    if (currentState.courses[courseIndex].progress > 100) {
      currentState.courses[courseIndex].progress = 100;
    }

    // Update UI
    filterCourses();
  }
}

// Toggle bookmark for a course
function toggleBookmark(courseId, button) {
  const courseIndex = currentState.courses.findIndex((c) => c.id === courseId);

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

// Update pagination UI
function updatePagination() {
  const totalPages = Math.ceil(currentState.filteredCourses.length / currentState.itemsPerPage);
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
      renderCourses();
      updatePagination();
    });
    pageNumbers.appendChild(pageBtn);
  }

  // Enable/disable navigation buttons
  document.getElementById('prev-page').disabled = currentState.currentPage === 1;
  document.getElementById('next-page').disabled =
    currentState.currentPage === totalPages || totalPages === 0;
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
    document.body.removeChild(toast);
  }, 3000);
}

// Initialize the page
initCoursesPage();
