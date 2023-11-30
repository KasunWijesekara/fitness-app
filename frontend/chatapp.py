from flask import Blueprint, jsonify, make_response, session, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import Chat
import os
import time
import openai
from database import db, app
import uuid
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

CORS(app, supports_credentials=True)

Chat.to_dict = lambda self: {
    "id": self.id,
    "user_message": self.user_message,
    "ai_response": self.ai_response,
    "session_id": self.session_id,
    "ip_address": self.ip_address,
    "timestamp": self.timestamp.isoformat(),
}


@app.route("/api/chats", methods=["GET"])
def get_chats():
    chats = Chat.query.all()
    return jsonify([chat.to_dict() for chat in chats])


migrate = Migrate(app, db)

chatbot_blueprint = Blueprint("chatbot", __name__)


@chatbot_blueprint.route("/message", methods=["POST"])
def chat_with_bot():
    start_time = time.time()
    user_message = request.json.get("message", "")
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

    session_id = request.cookies.get("session_id")
    if session_id is None:
        session_id = str(uuid.uuid4())
        app.logger.debug(f"New session ID generated: {session_id}")

    ip_address = request.headers.get("X-Real-IP", request.remote_addr)

    new_chat = Chat(
        user_message=user_message,
        ai_response=response_message,
        session_id=session_id,
        ip_address=ip_address,
    )
    db.session.add(new_chat)
    db.session.commit()

    response = make_response(jsonify({"response": response_message}))
    response.set_cookie("session_id", session_id, domain="localhost", samesite="Lax")

    return response


app.register_blueprint(chatbot_blueprint, url_prefix="/frontend/chatbot")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5100)
