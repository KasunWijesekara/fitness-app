from flask import Flask, Blueprint, jsonify, make_response, session, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import Chat
import os
import time
import openai

from database import db, app
from models import Chat
import uuid

from dotenv import load_dotenv

load_dotenv()

# Create Flask app
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")
openai.api_key = os.getenv("OPENAI_API_KEY")

# Enable CORS for all routes and all origins
CORS(app, supports_credentials=True)

# Configure SQLAlchemy with the database URI and disable track modifications
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize SQLAlchemy with the Flask app
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Create a blueprint for chatbot routes
chatbot_blueprint = Blueprint("chatbot", __name__)


# Define a route for chatting with the bot
@chatbot_blueprint.route("/message", methods=["POST"])
def chat_with_bot():
    start_time = time.time()
    user_message = request.json.get("message", "")
    session_id = request.json.get("session_id", "")
    if not session_id:
        session_id = str(uuid.uuid4())
        app.logger.debug(f"New session ID generated: {session_id}")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that helps the user.",
            },
            {"role": "user", "content": user_message},
        ],
        max_tokens=100,
        temperature=0.1,
    )
    end_time = time.time()
    app.logger.info(f"Time taken: {end_time - start_time} seconds")
    response_message = response.choices[0].message["content"].strip()

    ip_address = request.remote_addr

    # Save the chat to the database
    new_chat = Chat(
        user_message=user_message,
        ai_response=response_message,
        session_id=session_id,
        ip_address=ip_address,
    )
    db.session.add(new_chat)
    db.session.commit()

    # Create the response
    response = make_response(jsonify({"response": response_message}))

    return response


# Register the blueprint
app.register_blueprint(chatbot_blueprint, url_prefix="/frontend/chatbot")

# Run the Flask app
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5200)
