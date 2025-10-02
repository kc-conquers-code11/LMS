document.addEventListener('DOMContentLoaded', function () {
  // Initialize the notes page
  initNotesPage();
});

// Current state
let currentState = {
  notes: [],
  filteredNotes: [],
  currentTab: 'browse-notes',
  currentPage: 1,
  itemsPerPage: 6,
  filters: {
    year: 'all',
    branch: 'all',
    division: 'all',
    semester: 'all',
    subject: 'all',
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

// Initialize the notes page
async function initNotesPage() {
  await loadNotesData();
  setupSemesterOptions();
  populateSubjectFilter();
  renderNotes();
  setupEventListeners();
  updatePagination();
}

// Load notes data from JSON file or localStorage
async function loadNotesData() {
  try {
    // Try to load from localStorage first
    const savedNotes = localStorage.getItem('lmsNotes');
    
    if (savedNotes) {
      currentState.notes = JSON.parse(savedNotes);
    } else {
      try {
        // Load from JSON file if no data in localStorage
        const response = await fetch('../assets/data/notes.json');
        if (!response.ok) {
          throw new Error('Notes file not found');
        }
        const data = await response.json();
        currentState.notes = data.notes || [];
      } catch (error) {
        console.error('Error loading notes from JSON:', error);
        // Use fallback sample data if JSON file doesn't exist
        currentState.notes = getFallbackNotesData();
      }
      
      // Save to localStorage for future use
      localStorage.setItem('lmsNotes', JSON.stringify(currentState.notes));
    }
    
    currentState.filteredNotes = [...currentState.notes];
  } catch (error) {
    console.error('Error loading notes data:', error);
    // Fallback to sample data
    currentState.notes = getFallbackNotesData();
    currentState.filteredNotes = [...currentState.notes];
  }
}

// Save notes to localStorage
function saveNotesToStorage() {
  localStorage.setItem('lmsNotes', JSON.stringify(currentState.notes));
}

// Set up semester options based on year selection
function setupSemesterOptions() {
  const yearFilter = document.getElementById('year-filter');
  const semesterFilter = document.getElementById('semester-filter');
  const notesYear = document.getElementById('notes-year');
  const notesSemester = document.getElementById('notes-semester');

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
  if (yearFilter) {
    yearFilter.addEventListener('change', () => {
      updateSemesters(yearFilter, semesterFilter);
      currentState.filters.year = yearFilter.value;
      filterNotes();
    });
  }

  if (notesYear) {
    notesYear.addEventListener('change', () => {
      updateSemesters(notesYear, notesSemester);
    });
  }

  // Initialize semester options
  if (yearFilter && semesterFilter) {
    updateSemesters(yearFilter, semesterFilter);
  }
  if (notesYear && notesSemester) {
    updateSemesters(notesYear, notesSemester);
  }
}

// Populate subject filter with unique subjects (fixed duplicate issue)
function populateSubjectFilter() {
  const subjectFilter = document.getElementById('subject-filter');
  if (!subjectFilter) return;
  
  // Clear existing options except the first one
  while (subjectFilter.options.length > 1) {
    subjectFilter.remove(1);
  }
  
  // Get unique subjects
  const subjects = [...new Set(currentState.notes.map((note) => note.subject))];
  
  subjects.forEach((subject) => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    subjectFilter.appendChild(option);
  });
}

// Set up event listeners
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentState.currentTab = tab.dataset.tab;
      filterNotes();
    });
  });

  // Filter changes
  const yearFilter = document.getElementById('year-filter');
  const branchFilter = document.getElementById('branch-filter');
  const divisionFilter = document.getElementById('division-filter');
  const semesterFilter = document.getElementById('semester-filter');
  const subjectFilter = document.getElementById('subject-filter');
  const searchInput = document.getElementById('notes-search');
  
  if (yearFilter) {
    yearFilter.addEventListener('change', (e) => {
      currentState.filters.year = e.target.value;
      filterNotes();
    });
  }

  if (branchFilter) {
    branchFilter.addEventListener('change', (e) => {
      currentState.filters.branch = e.target.value;
      filterNotes();
    });
  }

  if (divisionFilter) {
    divisionFilter.addEventListener('change', (e) => {
      currentState.filters.division = e.target.value;
      filterNotes();
    });
  }

  if (semesterFilter) {
    semesterFilter.addEventListener('change', (e) => {
      currentState.filters.semester = e.target.value;
      filterNotes();
    });
  }

  if (subjectFilter) {
    subjectFilter.addEventListener('change', (e) => {
      currentState.filters.subject = e.target.value;
      filterNotes();
    });
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentState.filters.search = e.target.value.toLowerCase();
      filterNotes();
    });
  }

  // Apply filters button
  const applyFiltersBtn = document.getElementById('apply-filters');
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', filterNotes);
  }

  // Reset filters button
  const resetFiltersBtn = document.getElementById('reset-filters');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetFilters);
  }

  // Upload notes button
  const uploadNotesBtn = document.getElementById('upload-notes-btn');
  if (uploadNotesBtn) {
    uploadNotesBtn.addEventListener('click', () => {
      document.getElementById('upload-notes-modal').classList.add('active');
    });
  }

  // Modal close buttons
  const closeModalBtn = document.querySelector('.close-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  const cancelNotesBtn = document.getElementById('cancel-notes');
  if (cancelNotesBtn) {
    cancelNotesBtn.addEventListener('click', closeModal);
  }

  // Notes form submission
  const notesForm = document.getElementById('notes-form');
  if (notesForm) {
    notesForm.addEventListener('submit', handleNotesUpload);
  }

  // File upload handling
  setupFileUpload();

  // Pagination buttons
  const prevPageBtn = document.getElementById('prev-page');
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      if (currentState.currentPage > 1) {
        currentState.currentPage--;
        renderNotes();
        updatePagination();
      }
    });
  }

  const nextPageBtn = document.getElementById('next-page');
  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(currentState.filteredNotes.length / currentState.itemsPerPage);
      if (currentState.currentPage < totalPages) {
        currentState.currentPage++;
        renderNotes();
        updatePagination();
      }
    });
  }

  // Filter toggle for mobile
  const filterToggle = document.querySelector('.filter-toggle');
  if (filterToggle) {
    filterToggle.addEventListener('click', () => {
      const filterPanel = document.getElementById('filter-panel');
      if (filterPanel) {
        filterPanel.classList.toggle('active');
      }
    });
  }

  // Event delegation for dynamic content
  document.addEventListener('click', function (e) {
    // Download buttons
    if (e.target.closest('.btn-primary')) {
      const button = e.target.closest('.btn-primary');
      const noteCard = button.closest('.note-card');
      if (noteCard) {
        const noteId = parseInt(noteCard.dataset.noteId);
        downloadNote(noteId);
      }
    }
    
    // Bookmark buttons
    if (e.target.closest('.btn-secondary')) {
      const button = e.target.closest('.btn-secondary');
      const noteCard = button.closest('.note-card');
      if (noteCard) {
        const noteId = parseInt(noteCard.dataset.noteId);
        toggleBookmark(noteId, button);
      }
    }
    
    // Delete note buttons (for teachers)
    if (e.target.closest('.delete-note-btn')) {
      const button = e.target.closest('.delete-note-btn');
      const noteCard = button.closest('.note-card');
      if (noteCard) {
        const noteId = parseInt(noteCard.dataset.noteId);
        deleteNote(noteId);
      }
    }
  });
}

// Set up file upload functionality
function setupFileUpload() {
  const fileUpload = document.getElementById('file-upload');
  const filePreview = document.getElementById('file-preview');
  const fileName = document.getElementById('file-name');
  const uploadContainer = document.getElementById('file-upload-container');

  if (!fileUpload || !uploadContainer) return;

  // Handle file selection
  fileUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
    }
  });

  // Drag and drop functionality
  uploadContainer.addEventListener('dragover', function (e) {
    e.preventDefault();
    uploadContainer.classList.add('dragover');
  });

  uploadContainer.addEventListener('dragleave', function () {
    uploadContainer.classList.remove('dragover');
  });

  uploadContainer.addEventListener('drop', function (e) {
    e.preventDefault();
    uploadContainer.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (file) {
      fileUpload.files = e.dataTransfer.files;
      previewFile(file);
    }
  });

  // Click to upload
  uploadContainer.addEventListener('click', function () {
    fileUpload.click();
  });

  function previewFile(file) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    let fileIcon = 'fa-file';

    // Set appropriate icon based on file type
    if (['pdf'].includes(fileExtension)) {
      fileIcon = 'fa-file-pdf';
    } else if (['doc', 'docx'].includes(fileExtension)) {
      fileIcon = 'fa-file-word';
    } else if (['ppt', 'pptx'].includes(fileExtension)) {
      fileIcon = 'fa-file-powerpoint';
    } else if (['txt'].includes(fileExtension)) {
      fileIcon = 'fa-file-alt';
    }

    if (fileName) {
      fileName.innerHTML = `<i class="fas ${fileIcon}"></i> ${file.name}`;
    }
    if (filePreview) {
      filePreview.classList.add('active');
    }
  }
}

// Close modal
function closeModal() {
  const modal = document.getElementById('upload-notes-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  
  const form = document.getElementById('notes-form');
  if (form) {
    form.reset();
  }

  // Reset file preview
  const filePreview = document.getElementById('file-preview');
  const fileName = document.getElementById('file-name');
  if (filePreview) {
    filePreview.classList.remove('active');
  }
  if (fileName) {
    fileName.textContent = 'No file selected';
  }
}

// Handle notes upload
function handleNotesUpload(e) {
  e.preventDefault();

  const fileInput = document.getElementById('file-upload');
  if (!fileInput) return;

  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file to upload');
    return;
  }

  const newNote = {
    id: Date.now(), // Use timestamp for unique ID
    title: document.getElementById('notes-title').value,
    subject: document.getElementById('notes-subject').value,
    description: document.getElementById('notes-description').value,
    year: parseInt(document.getElementById('notes-year').value),
    branch: document.getElementById('notes-branch').value,
    division: document.getElementById('notes-division').value,
    semester: parseInt(document.getElementById('notes-semester').value),
    module: parseInt(document.getElementById('notes-module').value),
    file: file.name,
    fileData: null, // Store file data for download
    uploadedBy: 'Current User', // In a real app, this would be the actual user
    uploadDate: new Date().toISOString().split('T')[0],
    downloads: 0,
    bookmarked: false,
    createdBy: 'current-user' // Track who created the note
  };

  // Read file as data URL for download
  const reader = new FileReader();
  reader.onload = function(e) {
    newNote.fileData = e.target.result;
    currentState.notes.unshift(newNote);
    saveNotesToStorage();
    filterNotes();
    closeModal();
    showNotification(`Notes "${newNote.title}" uploaded successfully!`);
  };
  reader.readAsDataURL(file);
}

// Filter notes based on current state
function filterNotes() {
  let filtered = [...currentState.notes];

  // Apply tab filter
  if (currentState.currentTab === 'bookmarked-notes') {
    filtered = filtered.filter((note) => note.bookmarked);
  }

  // Apply year filter
  if (currentState.filters.year !== 'all') {
    filtered = filtered.filter((note) => note.year == currentState.filters.year);
  }

  // Apply branch filter
  if (currentState.filters.branch !== 'all') {
    filtered = filtered.filter((note) => note.branch === currentState.filters.branch);
  }

  // Apply division filter
  if (currentState.filters.division !== 'all') {
    filtered = filtered.filter((note) => note.division === currentState.filters.division);
  }

  // Apply semester filter
  if (currentState.filters.semester !== 'all') {
    filtered = filtered.filter((note) => note.semester == currentState.filters.semester);
  }

  // Apply subject filter
  if (currentState.filters.subject !== 'all') {
    filtered = filtered.filter((note) => note.subject === currentState.filters.subject);
  }

  // Apply search filter
  if (currentState.filters.search) {
    filtered = filtered.filter(
      (note) =>
        note.title.toLowerCase().includes(currentState.filters.search) ||
        note.description.toLowerCase().includes(currentState.filters.search) ||
        note.subject.toLowerCase().includes(currentState.filters.search) ||
        note.uploadedBy.toLowerCase().includes(currentState.filters.search)
    );
  }

  currentState.filteredNotes = filtered;
  currentState.currentPage = 1; // Reset to first page when filters change

  renderNotes();
  updatePagination();
}

// Reset all filters
function resetFilters() {
  currentState.filters = {
    year: 'all',
    branch: 'all',
    division: 'all',
    semester: 'all',
    subject: 'all',
    search: '',
  };

  // Reset filter dropdowns
  const yearFilter = document.getElementById('year-filter');
  const branchFilter = document.getElementById('branch-filter');
  const divisionFilter = document.getElementById('division-filter');
  const semesterFilter = document.getElementById('semester-filter');
  const subjectFilter = document.getElementById('subject-filter');
  const searchInput = document.getElementById('notes-search');

  if (yearFilter) yearFilter.value = 'all';
  if (branchFilter) branchFilter.value = 'all';
  if (divisionFilter) divisionFilter.value = 'all';
  if (semesterFilter) semesterFilter.value = 'all';
  if (subjectFilter) subjectFilter.value = 'all';
  if (searchInput) searchInput.value = '';

  // Reset semester options
  setupSemesterOptions();

  filterNotes();
  showNotification('Filters reset');
}

// Render notes to the DOM
function renderNotes() {
  const notesContainer = document.getElementById('notes-container');
  if (!notesContainer) return;

  const startIndex = (currentState.currentPage - 1) * currentState.itemsPerPage;
  const endIndex = startIndex + currentState.itemsPerPage;
  const notesToRender = currentState.filteredNotes.slice(startIndex, endIndex);

  // Clear existing notes
  notesContainer.innerHTML = '';

  if (notesToRender.length === 0) {
    // Show empty state
    notesContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-file-alt"></i>
        <h3>No notes found</h3>
        <p>Try adjusting your search or filters</p>
        <button class="btn-primary" id="reset-filters-btn">Reset Filters</button>
      </div>
    `;

    // Add event listener to reset filters button
    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetFilters);
    }
    return;
  }

  // Render notes
  notesToRender.forEach((note) => {
    const noteCard = createNoteCard(note);
    notesContainer.appendChild(noteCard);
  });
}

// Create a note card element
function createNoteCard(note) {
  const card = document.createElement('div');
  card.className = 'note-card';
  card.dataset.noteId = note.id;

  // Get appropriate icon based on file type
  const fileExtension = note.file.split('.').pop().toLowerCase();
  let fileIcon = 'fa-file';

  if (['pdf'].includes(fileExtension)) {
    fileIcon = 'fa-file-pdf';
  } else if (['doc', 'docx'].includes(fileExtension)) {
    fileIcon = 'fa-file-word';
  } else if (['ppt', 'pptx'].includes(fileExtension)) {
    fileIcon = 'fa-file-powerpoint';
  } else if (['txt'].includes(fileExtension)) {
    fileIcon = 'fa-file-alt';
  }

  // Add delete button for notes created by the current user
  let deleteButton = '';
  if (note.createdBy === 'current-user') {
    deleteButton = `
      <div class="teacher-actions">
        <button class="delete-note-btn">
          <i class="fas fa-trash"></i> Delete Note
        </button>
      </div>
    `;
  }

  card.innerHTML = `
    <div class="note-icon">
      <i class="fas ${fileIcon}"></i>
    </div>
    <div class="note-content">
      <h3 class="note-title">${note.title}</h3>
      <p class="note-subject">${note.subject} • Module ${note.module}</p>
      
      <div class="note-meta">
        <span>Year ${note.year}</span>
        <span>${note.branch}</span>
        <span>Div ${note.division}</span>
        <span>Sem ${note.semester}</span>
      </div>
      
      <p class="note-description">${note.description}</p>
      
      <div class="note-meta">
        <span>Uploaded by: ${note.uploadedBy}</span>
        <span>${note.uploadDate}</span>
        <span>${note.downloads} downloads</span>
      </div>
      
      <div class="note-actions">
        <button class="btn-primary"><i class="fas fa-download"></i> Download</button>
        <button class="btn-secondary"><i class="${
          note.bookmarked ? 'fas' : 'far'
        } fa-bookmark"></i></button>
      </div>
      
      ${deleteButton}
    </div>
  `;

  return card;
}

// Download a note (fixed double increment issue)
function downloadNote(noteId) {
  const noteIndex = currentState.notes.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    const note = currentState.notes[noteIndex];
    
    // Increment download count (only once)
    note.downloads++;
    saveNotesToStorage();

    // Update UI
    filterNotes();

    // Download the file
    if (note.fileData) {
      // For uploaded files with fileData
      const link = document.createElement('a');
      link.href = note.fileData;
      link.download = note.file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // For sample files without fileData (simulate download)
      const link = document.createElement('a');
      link.href = '#'; // In a real app, this would be the actual file URL
      link.download = note.file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    showNotification(`Downloading "${note.title}"`);
  }
}

// Delete a note
function deleteNote(noteId) {
  if (confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
    const noteIndex = currentState.notes.findIndex((note) => note.id === noteId);

    if (noteIndex !== -1) {
      const noteTitle = currentState.notes[noteIndex].title;
      currentState.notes.splice(noteIndex, 1);

      // Save to localStorage
      saveNotesToStorage();

      // Update UI
      filterNotes();

      // Show confirmation message
      showNotification(`Note "${noteTitle}" has been deleted`);
    }
  }
}

// Toggle bookmark for a note (fixed bookmark functionality)
function toggleBookmark(noteId, button) {
  const noteIndex = currentState.notes.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    currentState.notes[noteIndex].bookmarked = !currentState.notes[noteIndex].bookmarked;

    // Save to localStorage
    saveNotesToStorage();

    // Update button icon
    const icon = button.querySelector('i');
    if (icon) {
      if (currentState.notes[noteIndex].bookmarked) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.style.color = 'var(--primary-500)';
        showNotification(`"${currentState.notes[noteIndex].title}" bookmarked`);
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.style.color = '';
        showNotification(`"${currentState.notes[noteIndex].title}" removed from bookmarks`);
      }
    }

    // Update UI
    filterNotes();
  }
}

// Update pagination UI
function updatePagination() {
  const pageNumbers = document.getElementById('page-numbers');
  if (!pageNumbers) return;

  const totalPages = Math.ceil(currentState.filteredNotes.length / currentState.itemsPerPage);

  // Clear existing page numbers
  pageNumbers.innerHTML = '';

  // Add page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `pagination-btn ${i === currentState.currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.addEventListener('click', () => {
      currentState.currentPage = i;
      renderNotes();
      updatePagination();
    });
    pageNumbers.appendChild(pageBtn);
  }

  // Enable/disable navigation buttons
  const prevPage = document.getElementById('prev-page');
  const nextPage = document.getElementById('next-page');
  
  if (prevPage) prevPage.disabled = currentState.currentPage === 1;
  if (nextPage) nextPage.disabled = currentState.currentPage === totalPages || totalPages === 0;
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