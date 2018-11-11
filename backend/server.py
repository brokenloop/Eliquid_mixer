from flask import Flask
from flask_cors import CORS
from bson.json_util import dumps
from datalayer import *
import sys

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

def consoleprint(message):
	print(message, file=sys.stderr)


@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/recipes', methods=['GET'])
def recipes():
	
	recipes = dumps(list_recipes())
	consoleprint(recipes) 
	# recipes = json.dumps()
	return recipes


app.run()