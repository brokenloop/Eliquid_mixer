import { authHeader } from '../helpers/auth-header.js';
import * as urls from '../constants/base-url.js';
// import { ContextProvider } from '../components/Context/ContextProvider';

// ```
// Methods we need:

// Log in 
// Log out 
// Check is logged in

// validate jwt?? 

// Create account?
// Reset password? 
// ```

export const userService = {
    login,
    logout,
    isLoggedIn,
    createUser,
    getProtected,
    getAuthHeader,
    handleResponse
};

function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    };
    return fetch(`${urls.BASE_URL}/users/login`, requestOptions)
        .then(handleResponse)
        .then(data => {
            if (data !== undefined) {
                localStorage.setItem('user', JSON.stringify(data));
            }
            // ContextProvider.logIn();
            // return data;
            return {success: true};
        })
        .catch(error => {
            console.log('error');
            console.log(error);
            return {success: false};
        });
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        console.log(response);
        response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    logout();
                    window.location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return reject(error);
            }
            return resolve(data);
        })
    });
}

function createUser(username, password) {
    console.log('create_user');
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({username, password})
    }
    return new Promise((resolve, reject) => {
        fetch(`${urls.BASE_URL}/users/create_user`, requestOptions)
        .then(handleResponse)
        .then(data => {
            if (data !== undefined) {
                localStorage.setItem('user', JSON.stringify(data));
            }
            return resolve(data);
        })
        .catch(error => {
            console.log('error');
            console.log(error);
            reject(error);
        });
    });
}

function logout() {
	localStorage.removeItem('user');
    window.location.reload(true);
}
 
function getAuthHeader() {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    return { 'Authorization': 'Bearer ' +  user['access_token']};
}

function getProtected() {
    const requestOptions = {
        method: 'GET',
        headers: getAuthHeader()
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
