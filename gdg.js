// script.js for gdg.html

document.addEventListener('DOMContentLoaded', () => {
    const allowedReferrer = 'https://techwinsols.onrender.com/index.html'; // Replace with actual domain, e.g., 'https://techwin.com'
    
    if (!document.referrer.includes(allowedReferrer)) {
        console.log('Referrer check failed:', document.referrer);
        document.body.innerHTML = '<h1>Access Denied</h1><p>You must access this page via the Techwin site. In Case You have submitted the form then it got submitted, This is safety procedure to deny multiple requests or claims</p>';
        return;
    }
    console.log('Referrer check passed:', document.referrer);

    // Handle Cyber Hub button click to scroll to form
    const cyberHubButton = document.querySelector('.cta-button');
    if (cyberHubButton) {
        console.log('Cyber Hub button found');
        cyberHubButton.addEventListener('click', (e) => {
            e.preventDefault();
            const formContainer = document.querySelector('.form-container');
            if (formContainer) {
                console.log('Scrolling to form container');
                formContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error('Form container not found');
            }
        });
    } else {
        console.error('Cyber Hub button not found');
    }

    // Handle form submission
    const form = document.querySelector('.contact-form');
    if (form) {
        console.log('Form found with class .contact-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submission triggered');

            try {
                // Collect form data
                const firstName = document.getElementById('firstName')?.value || '';
                const lastName = document.getElementById('lastName')?.value || '';
                const email = document.getElementById('email')?.value || '';
                const phone = document.getElementById('phone')?.value || '';
                const subject = document.getElementById('subject')?.value || '';
                const message = document.getElementById('message')?.value || '';
                const newsletter = document.getElementById('newsletter')?.checked ? 'Yes' : 'No';

                // Generate timestamp in IST (UTC+5:30)
                const now = new Date();
                const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
                const istTime = new Date(now.getTime() + istOffset);
                const timestamp = istTime.toISOString()
                    .replace('T', '_')
                    .replace(/:\d{2}\.\d{3}Z$/, '')
                    .replace(/:/g, '-'); // Format: YYYY-MM-DD_HH-MM-SS

                console.log('Collected form data:', { firstName, lastName, email, phone, subject, message, newsletter, timestamp });

                // Get existing submissions from localStorage or initialize empty array
                let submissions = [];
                try {
                    submissions = JSON.parse(localStorage.getItem('submissions')) || [];
                } catch (error) {
                    console.error('Error reading from localStorage:', error);
                }

                // Add new submission with timestamp
                submissions.push({
                    firstName,
                    lastName,
                    email,
                    phone,
                    subject,
                    message,
                    newsletter,
                    timestamp
                });

                // Save back to localStorage
                try {
                    localStorage.setItem('submissions', JSON.stringify(submissions));
                    console.log('Submissions saved to localStorage:', submissions);
                } catch (error) {
                    console.error('Error writing to localStorage:', error);
                }

                // Generate table-like text for file
                let fileContent = 'First Name | Last Name | Email | Phone | Subject | Message | Newsletter | Timestamp\n';
                fileContent += '--------------------------------------------------------------------------------\n';
                submissions.forEach(sub => {
                    fileContent += `${sub.firstName} | ${sub.lastName} | ${sub.email} | ${sub.phone} | ${sub.subject} | ${sub.message} | ${sub.newsletter} | ${sub.timestamp}\n`;
                });
                console.log('Generated file content:', fileContent);

                // Create Blob and download with timestamped filename
                try {
                    const blob = new Blob([fileContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `submission_${timestamp}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    console.log(`File download triggered: submission_${timestamp}.txt`);
                } catch (error) {
                    console.error('Error creating or downloading file:', error);
                    alert('Failed to download file. Please try again.');
                }

                // Reset form after submission
                form.reset();
                console.log('Form reset');
            } catch (error) {
                console.error('Error in form submission:', error);
                alert('An error occurred. Please try again.');
            }
        });
    } else {
        console.error('Form with class .contact-form not found');
    }
});