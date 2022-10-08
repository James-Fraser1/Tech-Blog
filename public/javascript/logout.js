async function logoutPage() {
    console.log("Logout Page Reached!")
    const logoutFeedback = await fetch('/api/users/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (logoutFeedback.ok) {
        document.location.replace('/');
    } else {
        console.error(error);
    }
}

// OnClick Button navigates logs out user returning them to login page
document.getElementById('logout-form').addEventListener("click", logoutPage);