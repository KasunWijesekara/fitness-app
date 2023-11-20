import os
from dotenv import load_dotenv

from flask import Flask, request, jsonify, make_response
from flask.blueprints import Blueprint
from flask_cors import CORS
import openai

load_dotenv()

AUTHORIZED_TOKENS = {"abc123": "website1.com", "xyz789": "website2.com"}

app = Flask(__name__)
CORS(app)
chatbot_blueprint = Blueprint("chatbot", __name__)

CORS(app, origins=["http://157.230.244.115"])


@app.route("/")
def index():
    return "Chatbot API is running!"


@chatbot_blueprint.route("/message", methods=["POST"])
def chat_with_bot():
    openai.api_key = os.getenv("OPENAI_API_KEY")
    user_message = request.json.get("message", "")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message},
        ],
        max_tokens=150,
        temperature=0,
    )
    response_message = response.choices[0].message["content"].strip()
    response = make_response(jsonify({"response": response_message}))
    return response


# Register the blueprint after all routes have been added
app.register_blueprint(chatbot_blueprint, url_prefix="/chatbot")
CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
