```
Methods we need:

Log in 
Log out 
Check is logged in

validate jwt?? 

Create account?
Reset password? 
```

import { authHeader } from '../helpers/auth-header.js';
import * as urls from '../constants/base-url.js';

export const userService = {
    login,
    logout,
    getProtected
};

const checkLoggedIn = () => {

}

function getProtected() {

    const user = localStorage.getItem('user');

    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' +  user.access_token},
    }

    return fetch(`${urls.BASE_URL}protected`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        })
        .catch(error => {
            return Promise.reject(error)
        });
}

function login(username, password) {
    //"username":"Walter","password":"calmerthanyouare"
    let testusername = 'Walter';
    let testpassword = 'calmerthanyouare';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ username, password })
        body: JSON.stringify({ testusername, testpassword })
    };

    return fetch(`${urls.BASE_URL}/users/login`, requestOptions)
        .then(handleResponse)
        .then(data => {

            // login successful if there's a user in the response
            if (data) {
                console.log(data);
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                // data.access_token = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(data));
            }

            return data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}