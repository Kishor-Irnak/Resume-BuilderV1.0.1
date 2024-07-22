// Function to generate the resume from form inputs
function generateResume() {
    // Get form values
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const website = document.getElementById('website').value;
    const profile = document.getElementById('profile').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    const experience = document.getElementById('experience').value.split('\n').map(exp => exp.trim());
    const education = document.getElementById('education').value.split('\n').map(edu => edu.trim());

    // Create resume output
    const resumeOutput = document.getElementById('resumeOutput');
    resumeOutput.innerHTML = `
        <h2>${name}</h2>
        <h3>${title}</h3>
        <div class="contact-info">
            <p>📞 ${phone}</p>
            <p>✉️ ${email}</p>
            <p>🏠 ${address}</p>
            <p>🌐 ${website}</p>
        </div>
        <div class="section">
            <div class="section-title">PROFILE</div>
            <p>${profile}</p>
        </div>
        <div class="section">
            <div class="section-title">SKILLS</div>
            <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
        </div>
        <div class="section">
            <div class="section-title">EXPERIENCE</div>
            ${experience.map(exp => `<div class="section-item">${exp}</div>`).join('')}
        </div>
        <div class="section">
            <div class="section-title">EDUCATION</div>
            ${education.map(edu => `<div class="section-item">${edu}</div>`).join('')}
        </div>
    `;
}

// Function to download the resume as a PDF
async function downloadResume() {
    const { jsPDF } = window.jspdf;
    const resumeOutput = document.getElementById('resumeOutput');

    // Use html2canvas to capture the resumeOutput as an image
    const canvas = await html2canvas(resumeOutput);
    const imgData = canvas.toDataURL('image/png');

    // Create a new jsPDF instance
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
    });

    // Add the image to the PDF
    doc.addImage(imgData, 'PNG', 20, 20, 555, 780);

    // Save the PDF
    doc.save('resume.pdf');
}

// To change the font size, modify the CSS rules in styles.css for .resume p
// For example, change font-size: 16px; to a different value as needed
