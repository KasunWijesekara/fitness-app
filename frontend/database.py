from flask_sqlalchemy import SQLAlchemy
from flask import Flask

app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://kasun:123kasun@fitness-app_db_1/fitnessdb"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
