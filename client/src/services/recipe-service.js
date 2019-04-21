```
Need to add authentication to all backend API requests
```

import axios from 'axios';
import * as urls from '../constants/base-url.js';

export const recipeService = {
    getAllRecipes,
};

const baseUrl = "http://127.0.0.1:5000/";

function getAllRecipes() {
    return axios.get(urls.BASE_URL + "recipes")
        .then(res => {
            const recipes = res.data;
            return recipes;
        })
}

function saveRecipe(recipe) {
    
}