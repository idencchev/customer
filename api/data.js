import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    cars: (query) => `/classes/carDB?where=${createQuery(query)}`
}

export async function create(data) {
    return await api.post('/classes/carDB', data);
}

export async function getCars(query) {

    if (query) {
        query = {
            name: {
                $text: {
                    $search: query
                }
            }
        }
    }


    return api.get(endpoints.cars());
}

export function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query))
}


export async function searchCar(regNumber){
    return api.get(`/data/cars?where=RegNumber%3D${regNumber}`);
}