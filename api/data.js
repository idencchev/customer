import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function searchCar(type, query){
    return api.get(`/classes/carDB?where={"${type}":"${query}"}`);
}

export async function create(data) {
    return await api.post('/classes/carDB', data);
}

export async function deleteCar(id) {
    return await api.del(`/classes/carDB/${id}`);
}

export async function editCar(id, data) {
    return await api.put(`/classes/carDB/${id}`, data);
}

export async function getCar(id) {
    return await api.get(`/classes/carDB/${id}`);
}

export async function paginateSearch(type, param, skip) {
    return await api.get(`/classes/carDB?where={"${type}":"${param}"}&skip=${skip - 1}&limit=1&count=1`);
}
