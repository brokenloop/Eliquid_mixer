from pymongo import MongoClient, ASCENDING
from secret import * 

def initialise_db():
	recipes = open_connection()
	recipes.create_index([("name",ASCENDING),
						("version",ASCENDING)],
						unique=True)

def open_connection():
	username = login["username"]
	password = login["password"]

	url = 'mongodb://' + username + ":" + password + '@ds255253.mlab.com:55253/diy_eliquid'
	client = MongoClient(url)
	db = client.get_database()

	return db.recipes

def insert_recipe(name=None, version=1, flavours={}, batchVolume=100, batchNic=6, batchRatio=70, baseNic=100, baseRatio=0, validRecipe=True):
	recipes = open_connection()

	recipe_template = {
		"name": name,
		"version": version,
		"numFlavours": len(flavours),
		"flavours": flavours,
		"batchVolume": batchVolume,
		"batchNic": batchNic,
		"batchRatio": batchRatio,
		"baseNic": baseNic,
		"baseRatio": baseRatio,
		"validRecipe": validRecipe
	}

	try:
		recipes.insert_one(recipe_template)
		print("Inserted", name, "version", version)
	except:
		print("Duplicate error! Couldn't insert", name, "version", version)

def get_recipes():
	recipes = open_connection()
	return recipes.find()


if __name__=="__main__":
	recipe_list = get_recipes()
	[print(x) for x in recipe_list]


# users = db.users

# smith = {"lastname": "Smith", "age": 50}
# users.insert_one(smith)
# print(db.collection_names())

