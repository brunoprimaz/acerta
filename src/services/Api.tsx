import axios from "axios";

const urlServer = process.env.urlServer || 'http://localhost:3000/';

export async function get(url) {
    let response = await axios.get(urlServer + url);
    return response;
}

export async function post(url, data) {
    let response = await axios.post(urlServer + url, data);
    return response;
}

export async function put(url, data) {
    let response = await axios.put(urlServer + url, data);
    return response;
}

export async function remove(url) {
    let response = await axios.delete(urlServer + url);
    return response;
}