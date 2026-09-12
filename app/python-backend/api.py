from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add core path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'core')))

app = Flask(__name__)
CORS(app)  # Next.js se requests allow karne ke liye

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_query = data.get('query', '')
    
    # Yahan Kamil ki main logic/model call hogi
    # Filhal test response:
    response_text = f"Asaan Qanoon AI Response for: {user_query}"
    
    return jsonify({"response": response_text})

if __name__ == '__main__':
    app.run(port=5000, debug=True)