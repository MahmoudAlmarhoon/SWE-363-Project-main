// Function to validate login form inputs
function validateLoginForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return false;
    }

    return true;
}

// Function to handle login form submission
function handleLoginFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    if (validateLoginForm()) {
        // Assuming the form is valid, proceed with form submission
        console.log('Login form is valid! Submitting data...');

        // Example: POST request with fetch API
        fetch('your_login_endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login successful:', data);
            alert('Login successful!');

            // Optionally redirect the user to another page
            window.location.href = 'MainSell.html'; // Change this URL to where you want users to go after login
        })
        .catch((error) => {
            console.error('Login failed:', error);
            alert('Login failed. Please check your username and password and try again.');
        });
    } else {
        console.log('Login form validation failed.');
    }
}

// Add event listener to login form submission
document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.login-form');
    if(form){
        form.addEventListener('submit', handleLoginFormSubmit);
    }
});


// Function to validate form inputs
function validateForm() {
    // Example validation checks
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form'); // Ensure this correctly selects your registration form
    form.addEventListener('submit', handleFormSubmit);
});

async function handleFormSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
        console.log('Form validation failed.');
        return; // Stop the function if validation fails
    }

    console.log('Form is valid! Submitting data...');
    try {
        const response = await fetch('your_backend_endpoint', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            })
        });
        
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        console.log('Registration successful:', data);
        alert('Registration successful!');
        window.location.href = 'MainSell.html'; // Redirect after successful registration
    } catch (error) {
        console.error('Registration failed:', error);
        alert('An error occurred. Please try again.');
    }
}

// Add event listener to form submission
document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
});
