document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://techwinsols.onrender.com'; // Update to your Render URL
    const allowedReferrer = `${baseUrl}/index.html`;

    // Check referrer and submission status
    if (!document.referrer.includes(allowedReferrer)) {
        console.log('Referrer check failed:', document.referrer);
        document.body.innerHTML = '<h1>Access Denied</h1><p>You must access this page via the Techwin site. This page is locked after submission.</p>';
        return;
    }
    console.log('Referrer check passed:', document.referrer);

    // Check if form was already submitted (using sessionStorage)
    if (sessionStorage.getItem('formSubmitted')) {
        console.log('Form already submitted, disabling page');
        document.body.innerHTML = '<h1>Form Already Submitted</h1><p>This form has been submitted. Please visit <a href="https://gdg.community.dev/gdg-on-campus-indian-institute-of-information-technology-sri-city-india/">GDG Page</a>.</p>';
        return;
    }

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
                const istOffset = 5.5 * 60 * 60 * 1000;
                const istTime = new Date(now.getTime() + istOffset);
                const timestamp = istTime.toISOString()
                    .replace('T', '_')
                    .replace(/:\d{2}\.\d{3}Z$/, '')
                    .replace(/:/g, '-');

                console.log('Collected form data:', { firstName, lastName, email, phone, subject, message, newsletter, timestamp });

                // Send form data to Google Form
                const formData = new URLSearchParams();
                formData.append('entry.1627610957', `${firstName} ${lastName}`); // Name
                formData.append('entry.274063259', subject); // Subject
                formData.append('entry.78062134', email); // Email
                formData.append('entry.1741210347', phone); // Phone Number
                formData.append('entry.883731493', message); // Message

                const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe3GeJ0gU7phWGy-uzmjUWYAHT4Je9UjOG6ot2eDcst3W60yw/formResponse', {
                    method: 'POST',
                    mode: 'no-cors', // Google Forms doesn't return meaningful responses
                    body: formData
                });

                // Note: Google Forms POST with no-cors won't provide response.ok, assume success
                console.log('Form data sent to Google Form');
                // Mark as submitted
                sessionStorage.setItem('formSubmitted', 'true');
                // Show submitted window
                alert('Form submitted successfully!');
                // Redirect and replace history to prevent back navigation
                window.location.replace('https://gdg.community.dev/gdg-on-campus-indian-institute-of-information-technology-sri-city-india/');
            } catch (error) {
                console.error('Error in form submission:', error);
                alert('An error occurred. Please try again.');
            }

            // Reset form (optional, before redirect)
            form.reset();
            console.log('Form reset');
        });
    } else {
        console.error('Form with class .contact-form not found');
    }
});