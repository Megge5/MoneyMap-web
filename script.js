document.getElementById('submit').addEventListener('click', async function() {
    const query = document.getElementById('query').value;
    if (!query) {
        alert('Please enter a question');
        return;
    }

    const responseField = document.getElementById('response');

    try {
        // Make a POST request to your backend (myai.py)
        const response = await fetch('https://127.0.0.1:5000', {  // Adjust the URL to match your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
        });

        const result = await response.json();

        if (result && result.reply) {
            responseField.textContent = result.reply;  // Assuming the backend sends a 'reply' field in the response
        } else {
            responseField.textContent = 'Sorry, I could not get a response.';
        }
    } catch (error) {
        console.error('Error:', error);
        responseField.textContent = 'There was an error with the request.';
    }
});
