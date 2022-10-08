async function commentFormHandler(event) {
    event.preventDefault();

    // Added Comment body in async function
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    // Converting the Comment to a string
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Returning comments after their creation, fetching that new comment data, and sending it to the dashboard page in json format
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // If response is ok, refresh dashboard to reflect the new comment, otherwise add an error alert
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

// Upon clicking the submit comment button, run above async function
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);