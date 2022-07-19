import axios from 'axios';
import {BASE_URL} from "./Constants/config"

export const get = endpoint => {
    return axios.get(BASE_URL + "/" + endpoint);
}

export function post(endpoint, body) {
    return axios.post(BASE_URL + "/" + endpoint, body);
}
  
export function put(endpoint, body) {
    return axios.put(BASE_URL + "/" + endpoint, body);
}

export function del(endpoint) {
    return axios.delete(BASE_URL + "/" + endpoint);
}

export function postFormData(endpoint, body) {
    return axios({
        method: "post",
        url : BASE_URL + "/" + endpoint,
        data : body,
        headers: { "Content-Type": "multipart/form-data" },
    })
}

// axios({
//     method: "post",
//     url: "myurl",
//     data: bodyFormData,
//     headers: { "Content-Type": "multipart/form-data" },
//   })
//     .then(function (response) {
//       //handle success
//       console.log(response);
//     })
//     .catch(function (response) {
//       //handle error
//       console.log(response);
//     });