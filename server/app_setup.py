from flask import Flask
import flask_sqlalchemy
import os.path
# from flask_cors import CORS

application = Flask(__name__)
# CORS(app)
application.config["DEBUG"] = True
application.config['SECRET_KEY'] = 'top secret'
application.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
application.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db = flask_sqlalchemy.SQLAlchemy(application)

