from app_setup import application
from flask import abort, request, jsonify
from json import dumps
from models import User
import datalayer as dl
import sys
import flask_praetorian

guard = flask_praetorian.Praetorian()
guard.init_app(application, User)


def consoleprint(message):
    print(message, file=sys.stderr)


@application.route('/', methods=['GET'])
def root():
    return dumps('Server active')


@application.route('/my_recipes', methods=['GET'])
@flask_praetorian.auth_required
def my_recipes():
    consoleprint('my recipes')
    user = flask_praetorian.current_user()
    recipes = dl.list_user_recipes(user)
    consoleprint(recipes)
    return dumps(recipes)

@application.route('/recipes/name/<string:name>', methods=['GET', 'POST'])
@flask_praetorian.auth_required
def recipe_by_name(name):
    if request.method == 'POST':
        consoleprint('save recipe request')
        consoleprint(request.get_json())
        recipe = request.get_json()
        user = flask_praetorian.current_user()
        consoleprint(user.id)
        dl.insert_recipe(recipe, user)
        return("OK")

    if request.method == 'GET':
        recipe = dl.recipe_by_name(name)
        if recipe:
            recipe_dict = dl.dictify_recipe(recipe)
            return dumps(recipe_dict)
        else:
            abort(404)


@application.route('/recipes/id/<int:recipe_id>')
@flask_praetorian.auth_required
def recipe_by_id(recipe_id):
    consoleprint(recipe_id)
    recipe = dl.recipe_by_id(recipe_id)
    if recipe:
        recipe_dict = dl.dictify_recipe(recipe)
        return dumps(recipe_dict)
    else:
        abort(404)


@application.route('/users/create_user', methods=['POST'])
def create_user():
    consoleprint('CREATE USER')
    req = request.get_json(force=True)
    consoleprint(req)
    username = req.get('username', None)
    password = req.get('password', None)
    encrypted_password = guard.encrypt_password(password)
    try:
        user = dl.create_user(username, encrypted_password)
        ret = {'access_token': guard.encode_jwt_token(user)}
        return (jsonify(ret), 200)
    except:
        ret = {'error': 'AuthenticationError',
                'message': 'User already exists',
                'status_code': 409}
        return (jsonify(ret), 409)


@application.route('/users/login', methods=['POST'])
def login():
    req = request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)

    user = guard.authenticate(username, password)
    consoleprint(user)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return (jsonify(ret), 200)


if __name__=="__main__":
    application.run(host='0.0.0.0')
