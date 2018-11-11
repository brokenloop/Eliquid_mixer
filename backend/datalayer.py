from models import Recipe, Flavour
from base import Session, engine, Base

def insert_recipe():
	session = Session()

	testflav = Flavour(name="Strawberry", volume=5)
	testflav2 = Flavour(name="Orange", volume=2)

	test_recipe = Recipe(
		name = "Test recipe1",
		version = 1,
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
	print(names)

if __name__=="__main__":
	Base.metadata.create_all(engine)
	insert_recipe()
	list_recipes()