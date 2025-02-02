from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)

# Initialize OpenAI client
client = OpenAI(
    api_key="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"
)

@app.route('/query', methods=['POST'])
def handle_query():
    # Get the query from the frontend
    data = request.get_json()
    query = data.get('query')
    print(query)

    if not query:
        return jsonify({'error': 'No query provided'}), 400

    try:
        # Use OpenAI API to generate a response based on the user's query
        completion = client.chat.completions.create(
            model="gpt-4",  # Use the correct OpenAI model (gpt-3.5-turbo or gpt-4)
            store=True,
            messages=[
                {"role": "user", "content": query}
            ]
        )

        # Extract the bot's reply from the response
        bot_reply = completion.choices[0].message['content']

        # Return the bot's reply as a JSON response
        return jsonify({'reply': bot_reply})

    except Exception as e:
        # Handle any errors during the process
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
