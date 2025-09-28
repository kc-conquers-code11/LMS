// Sample data
const attendanceData = {
    overall: {
        present: 42,
        absent: 5,
        late: 3,
        total: 50,
        percentage: 85
    },
    courses: [
        {
            id: 1,
            name: "Data Structures & Algorithms",
            instructor: "Prof. Pranav Khalate",
            icon: "fas fa-code",
            attendance: 42,
            total: 45,
            percentage: 93,
            status: "high"
        },
        {
            id: 2,
            name: "Database Management Systems",
            instructor: "Prof. Pranav Khalate",
            icon: "fas fa-database",
            attendance: 47,
            total: 50,
            percentage: 94,
            status: "high"
        },
        {
            id: 3,
            name: "Web Development",
            instructor: "Prof. Pranav Khalate",
            icon: "fas fa-laptop-code",
            attendance: 40,
            total: 48,
            percentage: 83,
            status: "medium"
        },
        {
            id: 4,
            name: "Advanced Calculus",
            instructor: "Prof. Pranav Khalate",
            icon: "fas fa-calculator",
            attendance: 34,
            total: 50,
            percentage: 68,
            status: "low"
        },
        {
            id: 5,
            name: "Artificial Intelligence",
            instructor: "Prof. Pranav Khalate",
            icon: "fas fa-robot",
            attendance: 38,
            total: 45,
            percentage: 84,
            status: "medium"
        }
    ],
    recentRecords: [
        {
            date: "2025-10-15",
            course: "Data Structures",
            status: "present",
            time: "09:00 AM",
            remarks: "-"
        },
        {
            date: "2025-10-14",
            course: "Database Management",
            status: "present",
            time: "10:30 AM",
            remarks: "-"
        },
        {
            date: "2025-10-13",
            course: "Web Development",
            status: "late",
            time: "02:15 PM",
            remarks: "15 minutes late"
        },
        {
            date: "2025-10-12",
            course: "Advanced Calculus",
            status: "absent",
            time: "11:00 AM",
            remarks: "Medical leave"
        },
        {
            date: "2025-10-11",
            course: "Artificial Intelligence",
            status: "present",
            time: "03:30 PM",
            remarks: "-"
        },
        {
            date: "2025-10-10",
            course: "Data Structures",
            status: "present",
            time: "09:00 AM",
            remarks: "-"
        }
    ],
    calendar: {
        year: 2025,
        month: 9, // October (0-indexed)
        days: [
            { date: "2025-10-02", status: "present" },
            { date: "2025-10-03", status: "present" },
            { date: "2025-10-04", status: "late" },
            { date: "2025-10-05", status: "present" },
            { date: "2025-10-06", status: "present" },
            { date: "2025-10-09", status: "present" },
            { date: "2025-10-10", status: "present" },
            { date: "2025-10-11", status: "present" },
            { date: "2025-10-12", status: "absent" },
            { date: "2025-10-13", status: "late" },
            { date: "2025-10-16", status: "present" },
            { date: "2025-10-17", status: "present" },
            { date: "2025-10-18", status: "present" },
            { date: "2025-10-19", status: "present" },
            { date: "2025-10-20", status: "present" }
        ]
    }
};

// DOM elements
const calendarDays = document.getElementById('calendarDays');
const courseList = document.getElementById('courseList');
const attendanceRecords = document.getElementById('attendanceRecords');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const semesterFilter = document.getElementById('semesterFilter');
const courseFilter = document.getElementById('courseFilter');
const monthFilter = document.getElementById('monthFilter');

// Current date
let currentDate = new Date(2025, 9, 1); // October 2025

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    renderCalendar();
    renderCourses();
    renderRecentRecords();
    setupEventListeners();
});

// Render calendar
function renderCalendar() {
    calendarDays.innerHTML = '';

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarDays.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const today = new Date();
        const isToday = today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

        if (isToday) {
            dayElement.classList.add('today');
        }

        // Check attendance status for this day
        const attendanceRecord = attendanceData.calendar.days.find(d => d.date === dateStr);
        if (attendanceRecord) {
            const statusDot = document.createElement('div');
            statusDot.className = `attendance-status status-${attendanceRecord.status}`;
            dayElement.appendChild(statusDot);
        }

        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);

        calendarDays.appendChild(dayElement);
    }

    // Update calendar header
    document.querySelector('.calendar-current').textContent =
        currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// Render courses
function renderCourses() {
    courseList.innerHTML = '';

    attendanceData.courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';

        let fillClass = '';
        if (course.percentage >= 85) fillClass = 'fill-high';
        else if (course.percentage >= 75) fillClass = 'fill-medium';
        else fillClass = 'fill-low';

        courseItem.innerHTML = `
                    <div class="course-icon">
                        <i class="${course.icon}"></i>
                    </div>
                    <div class="course-info">
                        <div class="course-name">${course.name}</div>
                        <div class="course-instructor">${course.instructor}</div>
                    </div>
                    <div class="course-stats">
                        <div class="attendance-bar">
                            <div class="attendance-fill ${fillClass}" style="width: ${course.percentage}%"></div>
                        </div>
                        <div class="attendance-percentage">${course.percentage}%</div>
                    </div>
                `;

        courseList.appendChild(courseItem);
    });
}

// Render recent records
function renderRecentRecords() {
    attendanceRecords.innerHTML = '';

    attendanceData.recentRecords.forEach(record => {
        const row = document.createElement('tr');

        // Format date
        const dateObj = new Date(record.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        let statusClass = '';
        let statusText = '';

        switch (record.status) {
            case 'present':
                statusClass = 'badge-present';
                statusText = 'Present';
                break;
            case 'absent':
                statusClass = 'badge-absent';
                statusText = 'Absent';
                break;
            case 'late':
                statusClass = 'badge-late';
                statusText = 'Late';
                break;
            case 'holiday':
                statusClass = 'badge-holiday';
                statusText = 'Holiday';
                break;
        }

        row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${record.course}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td>${record.time}</td>
                    <td>${record.remarks}</td>
                `;

        attendanceRecords.appendChild(row);
    });
}

// Setup event listeners
function setupEventListeners() {
    prevMonthBtn.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Filter functionality
    semesterFilter.addEventListener('change', applyFilters);
    courseFilter.addEventListener('change', applyFilters);
    monthFilter.addEventListener('change', applyFilters);
}

// Apply filters (placeholder function)
function applyFilters() {
    // In a real application, this would filter the data
    console.log('Filters applied:', {
        semester: semesterFilter.value,
        course: courseFilter.value,
        month: monthFilter.value
    });
}

// Update progress circle
function updateProgressCircle() {
    const progress = document.querySelector('.circle-progress');
    const percentage = attendanceData.overall.percentage;
    progress.style.background = `conic-gradient(var(--primary-500) 0% ${percentage}%, var(--border) ${percentage}% 100%)`;
}

// Initialize progress circle
updateProgressCircle();