from flask import Flask, abort
from flask_cors import CORS
from bson.json_util import dumps
import datalayer as db
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
	
	recipes = db.list_recipes()
	consoleprint(recipes) 
	return dumps(recipes)


@app.route('/recipes/<string:name>')
def recipe_by_name(name):
	consoleprint(name)
	recipe = db.recipe_by_name(name)
	if recipe:
		recipe_dict = db.dictify_recipe(recipe)
		return dumps(recipe_dict)
	else:
		abort(404)
	


app.run()