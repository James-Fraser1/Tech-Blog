async function loginPage(event) {
    event.preventDefault();
    console.log("Login Page Reached!")
    // email link
    const email = document.querySelector('#email-login').value.trim();
    // password link
    const password = document.querySelector('#password-login').value.trim();
    console.log(email, password);

    if (email && password) {
        const loginfeedback = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('LOGIN NEXT STEP')
        if (loginfeedback.ok) {
            document.location.replace('/dashboard/');
        } else {
            console.log('Is not populating dashboard');
        }
    }
}

// Async Register Form Function
async function registerPage(event) {
    event.preventDefault();
    console.log("Hit Register Page!")
    // username link
    const username = document.querySelector('#username-signup').value.trim();
    // email link
    const email = document.querySelector('#email-signup').value.trim();
    // password link
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const registerFeedback = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-type': 'application/json'}
        });

        if (registerFeedback.ok) {
            document.location.replace('/dashboard/');
        } else {
            console.error(error);
        }
    }
}

// Event Listener on Register form navigates user to login page
document.querySelector('.login-form').addEventListener('submit', loginPage);

// Event Listener on Login form navigates user to register page
document.querySelector('.signup-form').addEventListener('submit', registerPage);