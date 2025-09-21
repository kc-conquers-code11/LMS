function generateNotice() {
    const title = document.getElementById("input-title").value;
    const content = document.getElementById("input-content").value;
    const date = new Date().toLocaleDateString();

    document.getElementById("notice-title").innerText = title;
    document.getElementById("notice-content").innerText = content;
    document.getElementById("notice-date").innerText = date;

    // Save in browser storage (for now)
    localStorage.setItem("lastNotice", JSON.stringify({ title, content, date }));
}

// Load previous notice on page load
window.onload = () => {
    const saved = localStorage.getItem("lastNotice");
    if (saved) {
        const { title, content, date } = JSON.parse(saved);
        document.getElementById("notice-title").innerText = title;
        document.getElementById("notice-content").innerText = content;
        document.getElementById("notice-date").innerText = date;
    }
};
