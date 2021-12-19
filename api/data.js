import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function searchCar(query){
    return api.get(`/classes/carDB?where={"RegNumber":"${query}"}`);
}

export async function create(data) {
    return await api.post('/classes/carDB', data);
}
