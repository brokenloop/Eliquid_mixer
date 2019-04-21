from flask import Flask
import flask_praetorian 
import flask_sqlalchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True
app.config['SECRET_KEY'] = 'top secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db = flask_sqlalchemy.SQLAlchemy(app)

