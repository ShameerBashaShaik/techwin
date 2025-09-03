// script.js for gdg.html

document.addEventListener('DOMContentLoaded', () => {
    // Configurable base URL for deployment (update for your domain)
    const baseUrl = window.location.origin; // e.g., 'https://your-site.onrender.com' or 'http://127.0.0.1:3000'
    const allowedReferrer = `${baseUrl}/index.html`; // Referrer for index.html

    if (!document.referrer.includes(allowedReferrer)) {
        console.log('Referrer check failed:', document.referrer);
        document.body.innerHTML = '<h1>Access Denied</h1><p>You must access this page via the Techwin site.</p>';
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
        form.addEventListener('submit', async (e) => {
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

                // Send form data to server
                const response = await fetch(`${baseUrl}/submit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        phone,
                        subject,
                        message,
                        newsletter,
                        timestamp
                    })
                });

                if (response.ok) {
                    console.log('Form data successfully sent to server');
                    form.reset();
                    console.log('Form reset');
                    alert('Submission saved successfully!');
                } else {
                    console.error('Server error:', response.status, response.statusText);
                    alert('Failed to save submission. Please try again.');
                }
            } catch (error) {
                console.error('Error in form submission:', error);
                alert('An error occurred. Please try again.');
            }
        });
    } else {
        console.error('Form with class .contact-form not found');
    }
});