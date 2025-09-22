
// Initialize the notice generator
document.addEventListener('DOMContentLoaded', function () {
    initNoticeGenerator();
});

// Current notice state
let currentNotice = {
    title: '',
    content: '',
    type: 'normal',
    department: '',
    priority: 'normal',
    date: new Date(),
    signatures: []
};

// AI suggestions data
const aiSuggestions = {
    exam: [
        "Please ensure all students bring their hall tickets and college ID cards.",
        "Electronic devices are strictly prohibited in the examination hall.",
        "Results will be declared within 15 working days after the examination."
    ],
    event: [
        "All participants must register before the deadline to secure their spot.",
        "Certificates will be provided to all attendees and participants.",
        "For any queries, please contact the event coordinator."
    ],
    important: [
        "This notice requires immediate attention and compliance from all concerned.",
        "Failure to adhere to these guidelines may result in disciplinary action.",
        "Please acknowledge receipt of this notice by replying to the sender."
    ],
    urgent: [
        "This is an urgent notice that requires immediate action.",
        "Please respond within the specified timeframe to avoid consequences.",
        "Direct all urgent queries to the concerned department head."
    ],
    normal: [
        "Please make note of this information for your reference.",
        "We appreciate your cooperation and understanding in this matter.",
        "For further details, please refer to the attached document or contact us."
    ]
};

// Initialize the notice generator
function initNoticeGenerator() {
    // Set current date
    const dateElement = document.getElementById('notice-date');
    const now = new Date();
    dateElement.textContent = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Set up template buttons
    document.querySelectorAll('.template-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.template-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            changeNoticeType(this.dataset.type);
        });
    });

    // Set up department select
    document.getElementById('notice-department-select').addEventListener('change', function () {
        currentNotice.department = this.value;
        updateDepartmentDisplay();
    });

    // Set up priority select
    document.getElementById('notice-priority-select').addEventListener('change', function () {
        currentNotice.priority = this.value;
        updateNoticeStyle();
    });

    // Set up formatting buttons
    document.querySelectorAll('.format-btn').forEach(button => {
        button.addEventListener('click', function () {
            applyFormatting(this.dataset.format);
        });
    });

    // Set up input listeners
    document.getElementById('input-title').addEventListener('input', function () {
        currentNotice.title = this.value;
        updateNoticePreview();
    });

    document.getElementById('input-content').addEventListener('input', function () {
        currentNotice.content = this.value;
        updateNoticePreview();
    });

    // Set up auto-save
    setInterval(saveNoticeDraft, 30000); // Auto-save every 30 seconds

    // Load draft if exists
    loadNoticeDraft();
}

// Add signature
function addSignature() {
    const name = document.getElementById('signature-name').value;
    const title = document.getElementById('signature-title').value;

    if (!name.trim()) {
        alert('Please enter a name for the signature');
        return;
    }

    const signature = {
        id: Date.now(),
        name: name,
        title: title
    };

    currentNotice.signatures.push(signature);
    updateSignatureList();
    updateSignatureDisplay();

    // Clear input fields
    document.getElementById('signature-name').value = '';
    document.getElementById('signature-title').value = '';
}

// Remove signature
function removeSignature(id) {
    currentNotice.signatures = currentNotice.signatures.filter(sig => sig.id !== id);
    updateSignatureList();
    updateSignatureDisplay();
}

// Update signature list
function updateSignatureList() {
    const list = document.getElementById('signature-list');
    list.innerHTML = '';

    currentNotice.signatures.forEach(signature => {
        const item = document.createElement('div');
        item.className = 'signature-item';
        item.innerHTML = `
                    <div>
                        <strong>${signature.name}</strong>
                        ${signature.title ? `<br><small>${signature.title}</small>` : ''}
                    </div>
                    <div class="signature-actions">
                        <button class="signature-btn" onclick="removeSignature(${signature.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
        list.appendChild(item);
    });
}

// Update signature display in preview
function updateSignatureDisplay() {
    const container = document.getElementById('signature-container');
    container.innerHTML = '';

    currentNotice.signatures.forEach(signature => {
        const signatureLine = document.createElement('div');
        signatureLine.className = 'signature-line';
        signatureLine.innerHTML = `
                    <div class="signature-field"></div>
                    <div class="signature-name">${signature.name}</div>
                    ${signature.title ? `<div class="signature-title">${signature.title}</div>` : ''}
                `;
        container.appendChild(signatureLine);
    });
}

// Change notice type
function changeNoticeType(type) {
    currentNotice.type = type;
    updateNoticeStyle();
    generateAISuggestion();
}

// Update notice style based on type and priority
function updateNoticeStyle() {
    const preview = document.getElementById('notice-preview');
    preview.className = 'notice-template';

    // Apply priority-based styling
    preview.classList.add(`notice-${currentNotice.priority}`);

    // Update based on type
    switch (currentNotice.type) {
        case 'exam':
            preview.style.borderLeft = '4px solid var(--error)';
            break;
        case 'important':
            preview.style.borderLeft = '4px solid var(--warning)';
            break;
        case 'urgent':
            preview.style.borderLeft = '4px solid var(--error)';
            break;
        case 'event':
            preview.style.borderLeft = '4px solid var(--success)';
            break;
        default:
            preview.style.borderLeft = '4px solid var(--primary-500)';
    }
}

// Update department display
function updateDepartmentDisplay() {
    const departmentElement = document.getElementById('notice-department');
    if (currentNotice.department) {
        departmentElement.textContent = currentNotice.department + ' Department';
    } else {
        departmentElement.textContent = '';
    }
}

// Apply formatting to text
function applyFormatting(format) {
    const textarea = document.getElementById('input-content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let formattedText = '';

    switch (format) {
        case 'bold':
            formattedText = `**${selectedText}**`;
            break;
        case 'italic':
            formattedText = `_${selectedText}_`;
            break;
        case 'underline':
            formattedText = `__${selectedText}__`;
            break;
        case 'ul':
            formattedText = selectedText ? `- ${selectedText}` : '- ';
            break;
        case 'ol':
            formattedText = selectedText ? `1. ${selectedText}` : '1. ';
            break;
        case 'link':
            formattedText = selectedText ? `[${selectedText}](url)` : '[link text](url)';
            break;
    }

    textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);

    // Update content
    currentNotice.content = textarea.value;
    updateNoticePreview();
}

// Generate AI suggestion
function generateAISuggestion() {
    const suggestions = aiSuggestions[currentNotice.type] || aiSuggestions.normal;
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    document.getElementById('suggestion-text').textContent = randomSuggestion;
    document.getElementById('ai-suggestions').style.display = 'block';
}

// Apply AI suggestion
function applySuggestion() {
    const suggestion = document.getElementById('suggestion-text').textContent;
    const textarea = document.getElementById('input-content');

    if (textarea.value) {
        textarea.value += '\n\n' + suggestion;
    } else {
        textarea.value = suggestion;
    }

    currentNotice.content = textarea.value;
    updateNoticePreview();
    hideSuggestion();
}

// Regenerate AI suggestion
function regenerateSuggestion() {
    generateAISuggestion();
}

// Hide AI suggestion
function hideSuggestion() {
    document.getElementById('ai-suggestions').style.display = 'none';
}

// Update notice preview
function updateNoticePreview() {
    // Update title
    document.getElementById('notice-title').textContent = currentNotice.title || '[Notice Title]';

    // Update content with basic markdown parsing
    let formattedContent = currentNotice.content;

    // Convert markdown to HTML
    formattedContent = formattedContent
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
        .replace(/_(.*?)_/g, '<em>$1</em>') // italic
        .replace(/__(.*?)__/g, '<u>$1</u>') // underline
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>') // links
        .replace(/^- (.*$)/gm, '<li>$1</li>') // unordered list items
        .replace(/^\d+\. (.*$)/gm, '<li>$1</li>') // ordered list items
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>') // wrap lists
        .replace(/\n/g, '<br>'); // line breaks

    document.getElementById('notice-content').innerHTML = formattedContent || '<p>[Notice content will appear here...]</p>';
}

// Generate notice
function generateNotice() {
    const title = document.getElementById('input-title').value;
    const content = document.getElementById('input-content').value;

    if (!title.trim()) {
        alert('Please enter a notice title');
        return;
    }

    if (!content.trim()) {
        alert('Please enter notice content');
        return;
    }

    currentNotice.title = title;
    currentNotice.content = content;

    updateNoticePreview();
    saveNoticeDraft();

    // Show success message
    showNotification('Notice generated successfully!');
}

// Download notice as PDF
function downloadNotice() {
    if (!currentNotice.title || !currentNotice.content) {
        alert('Please generate a notice first');
        return;
    }

    showNotification('Preparing PDF download...');

    // Use html2canvas and jsPDF to generate PDF
    const { jsPDF } = window.jspdf;

    html2canvas(document.getElementById('notice-preview')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add more pages if needed
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save(`${currentNotice.title.replace(/\s+/g, '_')}.pdf`);
        showNotification('Notice downloaded as PDF successfully!');
    });
}

// Print notice
function printNotice() {
    if (!currentNotice.title || !currentNotice.content) {
        alert('Please generate a notice first');
        return;
    }

    const printContent = document.getElementById('notice-preview').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;

    // Reinitialize the page
    initNoticeGenerator();
}

// Save notice draft
function saveNoticeDraft() {
    const draft = {
        ...currentNotice,
        savedAt: new Date().toISOString()
    };
    localStorage.setItem('noticeDraft', JSON.stringify(draft));
}

// Load notice draft
function loadNoticeDraft() {
    const draft = localStorage.getItem('noticeDraft');
    if (draft) {
        const parsedDraft = JSON.parse(draft);
        currentNotice = { ...parsedDraft };

        // Update form fields
        document.getElementById('input-title').value = currentNotice.title;
        document.getElementById('input-content').value = currentNotice.content;
        document.getElementById('notice-department-select').value = currentNotice.department;
        document.getElementById('notice-priority-select').value = currentNotice.priority;

        // Update signatures
        updateSignatureList();
        updateSignatureDisplay();

        // Update preview
        updateNoticePreview();
        updateDepartmentDisplay();
        updateNoticeStyle();

        showNotification('Draft notice loaded');
    }
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
