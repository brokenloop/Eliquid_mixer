import unittest
from models import Flavour, Recipe

class TestModels(unittest.TestCase):

    def test_flavour_comparison(self):
        testflav = Flavour(name="Strawberry", percentage=5)
        testflav2 = Flavour(name="Orange", percentage=2)
        testflav3 = Flavour(name="Strawberry", percentage=5)
        testflav4 = Flavour(name="Strawberry", percentage=4)
        self.assertNotEqual(testflav, testflav2)
        self.assertNotEqual(testflav, testflav4)
        self.assertEqual(testflav, testflav3)
    

    def test_recipe_comparison(self):
        testflav = Flavour(name="Strawberry", percentage=5)
        testflav2 = Flavour(name="Orange", percentage=2)

        recipe1 = Recipe(
            name = "recipe_name",
            version = 3,
            batchvolume = 30,
            batchnic = 6,
            batchratio = 70,
            basenic = 60,
            baseratio = 50,
            flavours = [testflav, testflav2]
            )

        recipe2 = Recipe(
            name = "recipe_name",
            version = 4,
            batchvolume = 30,
            batchnic = 6,
            batchratio = 70,
            basenic = 60,
            baseratio = 50,
            flavours = [testflav, testflav2]
            )

        recipe3 = Recipe(
            name = "recipe_name",
            version = 4,
            batchvolume = 30,
            batchnic = 6,
            batchratio = 70,
            basenic = 60,
            baseratio = 50,
            flavours = [testflav]
            )
        self.assertEqual(recipe1, recipe2)
        self.assertNotEqual(recipe1, recipe3)
        
if __name__ == '__main__':
    unittest.main()