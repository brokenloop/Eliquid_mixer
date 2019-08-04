import axios from 'axios';
import * as urls from '../constants/base-url.js';
import {userService} from './user-service.js'

// ```
// Need to add authentication to all backend API requests
// ```

export const recipeService = {
    getUserRecipes,
    saveRecipe,
    loadRecipe,
};

function saveRecipe(recipe) {
    let flavours = [];
    let headers = {headers: userService.getAuthHeader()};
    Object.entries(recipe.flavours).forEach(([key, value]) => flavours.push(value))
    return axios.post(urls.BASE_URL + "/recipes/name/" + recipe.name, {
        name: recipe.name,
        batchvolume: recipe.batchVolume,
        batchnic: recipe.batchNic,
        batchratio: recipe.batchRatio,
        basenic: recipe.baseNic,
        baseratio: recipe.baseRatio,
        flavours: flavours
    }, headers)
    .then(_ => Promise.resolve('save successful'))
    .catch(error => Promise.reject(error));
}

function loadRecipe(recipeName) {
    return new Promise((resolve, reject) => {
        if (userService.isLoggedIn()) {
            if (typeof recipeName !== "undefined") {
                const requestOptions = {
                    method: 'GET',
                    headers: userService.getAuthHeader()
                }
                const url = urls.BASE_URL + "/recipes/name/" + recipeName;
                return fetch(url, requestOptions)
                .then(userService.handleResponse)
                .then(recipe => {
                    return resolve(recipe)
                }) 
                .catch(error => reject(error));
            }
        } else {
            return reject("not logged in");
        }
    });
}

function getUserRecipes() {
    return new Promise((resolve, reject) => {
        if (userService.isLoggedIn()) {
            const requestOptions = {
                method: 'GET',
                headers: userService.getAuthHeader()
            }
            const url = urls.BASE_URL + "/my_recipes";
            return fetch(url, requestOptions)
            .then(userService.handleResponse)
            .then(recipes => resolve(recipes))
            .catch(error => reject(error));
        } else {
            return reject("not logged in");
        }
    });
}


