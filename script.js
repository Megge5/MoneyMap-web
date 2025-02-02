document.getElementById('submit').addEventListener('click', async function() {
    const query = document.getElementById('query').value;
    if (!query) {
        alert('Please enter a question');
        return;
    }

    const responseField = document.getElementById('response');
    responseField.textContent = 'Loading...'; // Set initial loading text

    try {
        const response = await fetch('http://127.0.0.1:5500/query', {  // URL of Flask endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        responseField.textContent = data.response;  // Show the response from Flask
    } catch (error) {
        console.error('Error:', error);
        responseField.textContent = 'There was an error with the request.';
    }
});
