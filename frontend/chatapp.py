import os
from dotenv import load_dotenv
import logging
import time
import asyncio
from flask import Flask, request, jsonify, make_response
from flask.blueprints import Blueprint
from flask_cors import CORS
from openai import AsyncOpenAI, APIConnectionError, RateLimitError, APIStatusError

load_dotenv()
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(
    app,
    resources={
        r"/frontend/chatbot/message": {"origins": "https://fitnessconnection.lk/"}
    },
)
chatbot_blueprint = Blueprint("chatbot", __name__)

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.route("/")
def index():
    return "Chatbot API is running!"


@chatbot_blueprint.route("/message", methods=["POST"])
async def chat_with_bot():
    start_time = time.time()
    user_message = request.json.get("message", "")

    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that helps the user.",
                },
                {"role": "user", "content": user_message},
            ],
            max_tokens=500,
            temperature=0.1,
        )
        response_message = response.choices[0].message["content"].strip()
    except APIConnectionError as e:
        app.logger.error("Server could not be reached: " + str(e))
        return make_response(jsonify({"error": "Server could not be reached"}), 503)
    except RateLimitError as e:
        app.logger.error("Rate limit error: " + str(e))
        return make_response(jsonify({"error": "Rate limit exceeded"}), 429)
    except APIStatusError as e:
        app.logger.error("API error: " + str(e))
        return make_response(jsonify({"error": "API error occurred"}), e.status_code)

    end_time = time.time()
    app.logger.info(f"Time taken: {end_time - start_time} seconds")

    return make_response(jsonify({"response": response_message}))


# Register the blueprint after all routes have been added
app.register_blueprint(chatbot_blueprint, url_prefix="/frontend/chatbot")
CORS(app)

if __name__ == "__main__":
    asyncio.run(app.run(debug=True))
