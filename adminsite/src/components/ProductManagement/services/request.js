import EndPoints from '../../../Constants/endpoints';
import {get, post, put, del} from '../../../httpHelper'

export const getProductRequest = () => {
    return get(EndPoints.product);
}

export const addProductRequest = (payload) => {
    console.log('payload', payload)
    return post(EndPoints.product, payload);
}