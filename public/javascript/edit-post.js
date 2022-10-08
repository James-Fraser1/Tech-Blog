async function editFormHandler(event) {
    event.preventDefault();

    // Select a Post by ID from the url and convert it into a string in order to edit it
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Add Updated Post title in async function
    const title = document.querySelector('input[name="post-title"]').value;
    // Add Updated Post text in async function
    const post_text = document.querySelector('textarea[name="post-text"]').value;

    // Fetching Updated Post data by ID and sending to the dashboard page in json format
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // If response is ok, commit updated post to the dashboard, otherwise add an error alert
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

}

// Upon clicking the edit post button, run above async function
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);