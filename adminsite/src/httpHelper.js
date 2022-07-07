import axios from 'axios';
import {BASE_URL} from "./Constants/config"

// const token = localStorage.getItem("token");

// export function get(url) {
//     console.log(token);
//     return axios.get(endpoint + url, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
// }

export const get = endpoint => {
    return axios.get(BASE_URL + "/" + endpoint);
}

export function post(endpoint, body) {
    console.log(body)
    return axios.post(BASE_URL + "/" + endpoint, body);
}
  
export function put(endpoint, body) {
    return axios.put(BASE_URL + "/" + endpoint, body);
}

export function del(endpoint) {
    return axios.delete(BASE_URL + "/" + endpoint);
}