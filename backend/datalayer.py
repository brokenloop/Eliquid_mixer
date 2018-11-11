from models import Recipe, Flavour
from base import Session, engine, Base
from sqlalchemy import func

def insert_recipe():
	session = Session()

	testflav = Flavour(name="Strawberry", volume=5)
	testflav2 = Flavour(name="Orange", volume=2)

	test_recipe = Recipe(
		name = "Recipe3",
		version = 3,
		batchvolume = 30,
		batchnic = 6,
		batchratio = 70,
		basenic = 60,
		baseratio = 50,
		flavours = [testflav, testflav2]
		)
	try:
		session.add(test_recipe)
		session.commit()
	except:
		print("Duplicate entry! Recipe already exists")
	session.close()

def list_recipes():
	session = Session()
	query = session.query(Recipe.name).distinct()
	names = [x for x in query]
	session.close()
	return names

def recipe_by_name(name):
	session = Session()
	subquery = session.query(func.max(Recipe.version)).filter(Recipe.name == name)
	query = session.query(Recipe).filter(Recipe.name == name, Recipe.version == subquery)
	try:
		return query.one()
	except:
		return None
	session.close()

def dictify_recipe(recipe):
	result = recipe.as_dict()
	result["flavours"] = [x.as_dict() for x in recipe.flavours]
	result["numflavours"] = len(recipe.flavours)
	return result

if __name__=="__main__":
	# Base.metadata.create_all(engine)
	insert_recipe()
	# list_recipes()
	recipe = recipe_by_name("Test recipe1")
	# print(recipe.as_dict())
	# print([x.as_dict() for x in recipe.flavours])
	print(dictify_recipe(recipe))