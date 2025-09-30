document.addEventListener('DOMContentLoaded', function() {
    /* for mobile  */

const mobileToggle = document.querySelector(".mobile-nav-toggle");
const sidebar = document.getElementById("sidebar");

if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
}

    // Theme Initialization
    const themeIcon = document.getElementById('theme-icon');
    const themeToggle = document.querySelector('.theme-toggle');
    let savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.classList.toggle('fa-sun', savedTheme === 'dark');
    themeIcon.classList.toggle('fa-moon', savedTheme === 'light');

    // Theme Toggle Click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeIcon.classList.toggle('fa-sun', newTheme === 'dark');
            themeIcon.classList.toggle('fa-moon', newTheme === 'light');
        });
    }

    // Notifications
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('You have 3 new notifications:\n1. Assignment deadline extended\n2. New message from student\n3. System maintenance scheduled');
            this.querySelector('.notification-badge').textContent = '0';
        });
    }

document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("role");
    const teacherItems = document.querySelectorAll(".teacher-only");
    const studentItems = document.querySelectorAll(".student-only");

    if (role === "teacher") {
        teacherItems.forEach(item => item.style.display = "block");
        studentItems.forEach(item => item.style.display = "none");
    } else if (role === "student") {
        teacherItems.forEach(item => item.style.display = "none");
        studentItems.forEach(item => item.style.display = "block");
    } else {
        // If no role, redirect to login
        window.location.href = "login.html";
    }
});

// Handle login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Dummy authentication for demo
      if (username === "teacher" && password === "123") {
        localStorage.setItem("role", "teacher");
        window.location.href = "dashboard.html";
      } else if (username === "student" && password === "123") {
        localStorage.setItem("role", "student");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid Credentials!");
      }
    });
  }

  // Role-based visibility on pages
  const role = localStorage.getItem("role");
  const teacherItems = document.querySelectorAll(".teacher-only");
  const studentItems = document.querySelectorAll(".student-only");

  if (role === "teacher") {
    teacherItems.forEach(item => item.style.display = "block");
    studentItems.forEach(item => item.style.display = "block");
  } else if (role === "student") {
    teacherItems.forEach(item => item.style.display = "none");
    studentItems.forEach(item => item.style.display = "block");
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("role");
      window.location.href = "login.html";
    });
  }
});



    // Login Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login Successful! Redirecting...');
            window.location.href = "dashboard.html";
        });
    }

    // Register Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const pass = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;
            if (pass !== confirm) {
                alert("Passwords do not match!");
                return;
            }
            alert('Registration Successful! Redirecting to login...');
            window.location.href = "login.html";
        });
    }

    // Feature Cards Hover
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.feature-header').style.backgroundColor = 'var(--secondary)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.feature-header').style.backgroundColor = 'var(--primary)';
        });
    });

    // Active Navigation Links
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
