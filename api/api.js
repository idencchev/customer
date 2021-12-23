import { getUserData, setUserData, clearUserData } from "./util.js";

const host = 'https://parseapi.back4app.com';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);
        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.error);
        }
        return response.json();
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'GET', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'poEl3C5bWCfmKMKxwTx48HEgPiAMucaqlVGRzRcf',
            'X-Parse-REST-API-Key': 'FKh3d8nPQDjMgVoqDY590C9Ls2LA3wKQaXSMuhZ0'
        }
    };
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('POST', data));
}

export async function put(url, data) {
    return request(url, createOptions('PUT', data));
}

export async function del(url) {
    return request(url, createOptions('DELETE'));
}

export async function login(username, password) {
    const response = await request('/login', createOptions('POST', { username, password }));
    const userData = {
        email: response.email,
        username: response.username,
        userId: response.objectId,
        token: response.sessionToken
    };
    setUserData(userData);
}

export async function register(username, email, password) {
    const response = await request('/users', createOptions('POST', {username, email, password }));
}

export async function logout() {
    await post('/logout');
    clearUserData();
}

// set this to the file that we want to use the functions
// import * as api from './api.js';
// this will import all export functions from the file