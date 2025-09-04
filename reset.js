<<<<<<< HEAD
// script.js for challenge.html

document.addEventListener('DOMContentLoaded', () => {
    // Define correct values (arrays for multiple options, strings for single; replace with your actual values if needed)
    const correctValues = {
        input1: ['Adhity', 'adhity'],
        input2: ['Agarwal', 'agarwal'],
        input3: '20061901',
        input4: ['Accountant', 'accountant'],
        input5: ['03/09/2001', '3/9/2001'],
        input6: '8074009077',
        input7: 'adhity.agarwal.techwin@gmail.com',
        input8: ['Harry Potter', 'harry potter', 'HarryPotter', 'Harrypotter', 'harrypotter'],
        input9: ['KIL580', 'KIL 580', 'kil580', 'kil 580']
    };

    // Track correctness of each input
    const inputStatus = {
        input1: false,
        input2: false,
        input3: false,
        input4: false,
        input5: false,
        input6: false,
        input7: false,
        input8: false,
        input9: false
    };

    // Check if all inputs are correct
    function areAllInputsCorrect() {
        console.log('Checking all inputs:', inputStatus);
        const allCorrect = Object.values(inputStatus).every(status => status === true);
        console.log('All inputs correct:', allCorrect);
        return allCorrect;
    }

    // Create and show modal within the same page
    function showSuccessModal() {
        console.log('Showing success modal');
        // Remove any existing modal
        const existingModal = document.querySelector('.success-modal');
        if (existingModal) existingModal.remove();

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        // Modal content
        modal.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #28a745;">Successfully Completed Password Recovery!</h1>
                <p>Your encrypted password is hJDdq/hQ7Pn/C+ZNwvFpXA==</p>
                <p>Enter the Employee Id and password in the original portal to login</p>
                <button onclick="this.parentElement.parentElement.remove()" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        console.log('Success modal displayed');
    }

    // Attempt to open new window with fallback to modal
    function openSuccessWindow() {
        console.log('Attempting to open success window');
        try {
            const win = window.open('', '_blank');
            if (!win) {
                console.error('Window opening failed, likely blocked by pop-up blocker');
                showSuccessModal();
                return;
            }
            win.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Success</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f4f4f4;
                        }
                        .message {
                            text-align: center;
                            background: white;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #28a745;
                        }
                    </style>
                </head>
                <body>
                    <div class="message">
                        <h1>Successfully Completed Password Recovery!</h1>
                        <p>Your encrypted password is hJDdq/hQ7Pn/C+ZNwvFpXA==</p>
                        <p>Enter the Employee Id and password in the original portal to login</p>
                    </div>
                </body>
                </html>
            `);
            win.document.close();
            console.log('Success window opened');
        } catch (error) {
            console.error('Error opening window:', error);
            showSuccessModal();
        }
    }

    // Attach event listeners to all check buttons
    const checkButtons = document.querySelectorAll('.check-btn');
    checkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const fieldId = button.getAttribute('data-field');
            const input = document.getElementById(fieldId);
            const feedback = document.getElementById(`feedback${fieldId.replace('input', '')}`);

            console.log(`Checking input ${fieldId}:`, input.value);

            if (input.value.trim() === '') {
                feedback.textContent = 'Please enter a value.';
                feedback.className = 'feedback error';
                inputStatus[fieldId] = false;
                console.log(`Input ${fieldId} is empty`);
                return;
            }

            // String comparison (case-insensitive)
            if (Array.isArray(correctValues[fieldId])) {
                // Handle array of correct values
                if (correctValues[fieldId].map(val => val.toLowerCase()).includes(input.value.toLowerCase())) {
                    feedback.textContent = 'Correct!';
                    feedback.className = 'feedback success';
                    inputStatus[fieldId] = true;
                    console.log(`Input ${fieldId} is correct`);
                } else {
                    feedback.textContent = 'Incorrect. Try again.';
                    feedback.className = 'feedback error';
                    inputStatus[fieldId] = false;
                    console.log(`Input ${fieldId} is incorrect`);
                }
            } else {
                // Handle single string value
                if (input.value.toLowerCase() === correctValues[fieldId].toLowerCase()) {
                    feedback.textContent = 'Correct!';
                    feedback.className = 'feedback success';
                    inputStatus[fieldId] = true;
                    console.log(`Input ${fieldId} is correct`);
                } else {
                    feedback.textContent = 'Incorrect. Try again.';
                    feedback.className = 'feedback error';
                    inputStatus[fieldId] = false;
                    console.log(`Input ${fieldId} is incorrect`);
                }
            }

            // Check if all inputs are correct
            if (areAllInputsCorrect()) {
                console.log('All inputs are correct, attempting to open success window');
                openSuccessWindow();
            }
        });
    });
=======
// script.js for challenge.html

document.addEventListener('DOMContentLoaded', () => {
    // Define correct values (arrays for multiple options, strings for single; replace with your actual values if needed)
    const correctValues = {
        input1: ['Adhity', 'adhity'],
        input2: ['Agarwal', 'agarwal'],
        input3: '20061901',
        input4: ['Accountant', 'accountant'],
        input5: ['03/09/2001', '3/9/2001'],
        input6: '8074009077',
        input7: 'adhity.agarwal.techwin@gmail.com',
        input8: ['Harry Potter', 'harry potter', 'HarryPotter', 'Harrypotter', 'harrypotter'],
        input9: ['KIL580', 'KIL 580', 'kil580', 'kil 580']
    };

    // Track correctness of each input
    const inputStatus = {
        input1: false,
        input2: false,
        input3: false,
        input4: false,
        input5: false,
        input6: false,
        input7: false,
        input8: false,
        input9: false
    };

    // Check if all inputs are correct
    function areAllInputsCorrect() {
        console.log('Checking all inputs:', inputStatus);
        const allCorrect = Object.values(inputStatus).every(status => status === true);
        console.log('All inputs correct:', allCorrect);
        return allCorrect;
    }

    // Create and show modal within the same page
    function showSuccessModal() {
        console.log('Showing success modal');
        // Remove any existing modal
        const existingModal = document.querySelector('.success-modal');
        if (existingModal) existingModal.remove();

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        // Modal content
        modal.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #28a745;">Successfully Completed Password Recovery!</h1>
                <p>Your encrypted password is hJDdq/hQ7Pn/C+ZNwvFpXA==</p>
                <p>Enter the Employee Id and password in the original portal to login</p>
                <button onclick="this.parentElement.parentElement.remove()" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        console.log('Success modal displayed');
    }

    // Attempt to open new window with fallback to modal
    function openSuccessWindow() {
        console.log('Attempting to open success window');
        try {
            const win = window.open('', '_blank');
            if (!win) {
                console.error('Window opening failed, likely blocked by pop-up blocker');
                showSuccessModal();
                return;
            }
            win.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Success</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f4f4f4;
                        }
                        .message {
                            text-align: center;
                            background: white;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #28a745;
                        }
                    </style>
                </head>
                <body>
                    <div class="message">
                        <h1>Successfully Completed Password Recovery!</h1>
                        <p>Your encrypted password is hJDdq/hQ7Pn/C+ZNwvFpXA==</p>
                        <p>Enter the Employee Id and password in the original portal to login</p>
                    </div>
                </body>
                </html>
            `);
            win.document.close();
            console.log('Success window opened');
        } catch (error) {
            console.error('Error opening window:', error);
            showSuccessModal();
        }
    }

    // Attach event listeners to all check buttons
    const checkButtons = document.querySelectorAll('.check-btn');
    checkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const fieldId = button.getAttribute('data-field');
            const input = document.getElementById(fieldId);
            const feedback = document.getElementById(`feedback${fieldId.replace('input', '')}`);

            console.log(`Checking input ${fieldId}:`, input.value);

            if (input.value.trim() === '') {
                feedback.textContent = 'Please enter a value.';
                feedback.className = 'feedback error';
                inputStatus[fieldId] = false;
                console.log(`Input ${fieldId} is empty`);
                return;
            }

            // String comparison (case-insensitive)
            if (Array.isArray(correctValues[fieldId])) {
                // Handle array of correct values
                if (correctValues[fieldId].map(val => val.toLowerCase()).includes(input.value.toLowerCase())) {
                    feedback.textContent = 'Correct!';
                    feedback.className = 'feedback success';
                    inputStatus[fieldId] = true;
                    console.log(`Input ${fieldId} is correct`);
                } else {
                    feedback.textContent = 'Incorrect. Try again.';
                    feedback.className = 'feedback error';
                    inputStatus[fieldId] = false;
                    console.log(`Input ${fieldId} is incorrect`);
                }
            } else {
                // Handle single string value
                if (input.value.toLowerCase() === correctValues[fieldId].toLowerCase()) {
                    feedback.textContent = 'Correct!';
                    feedback.className = 'feedback success';
                    inputStatus[fieldId] = true;
                    console.log(`Input ${fieldId} is correct`);
                } else {
                    feedback.textContent = 'Incorrect. Try again.';
                    feedback.className = 'feedback error';
                    inputStatus[fieldId] = false;
                    console.log(`Input ${fieldId} is incorrect`);
                }
            }

            // Check if all inputs are correct
            if (areAllInputsCorrect()) {
                console.log('All inputs are correct, attempting to open success window');
                openSuccessWindow();
            }
        });
    });
>>>>>>> 4fd6a0392ef379f9acc13fc8d0b4d38776bd597f
});