from database import db


class Chat(db.Model):
    __tablename__ = "chat"
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.String(500), nullable=False)
    ai_response = db.Column(db.String(500), nullable=False)
    session_id = db.Column(db.String(100), nullable=False)
