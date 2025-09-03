document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorSpan = document.querySelector('.error');

    if (username === '20061901' && password === 'Prabhas@MyLove') {
        window.location.href = 'gdg.html';
    } else {
        errorSpan.textContent = 'Invalid username or password.';
        errorSpan.style.visibility = 'visible';
    }
});

document.querySelector('.reset-btn').addEventListener('click', function() {
    window.location.href = 'reset.html';
});