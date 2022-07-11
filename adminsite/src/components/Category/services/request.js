import EndPoints from '../../../Constants/endpoints';
import {get, post, put, del} from '../../../httpHelper'

export const getProductRequest = () => {
    return get(EndPoints.product);
}

export const addCategoryRequest = (payload) => {
    return post(EndPoints.category, payload);
}

export const updateProductRequest = (payload) => {
    return put(`${EndPoints.product}/${payload.id}`, payload);
}

export const deleteProductRequest = (id) => {
    return del(`${EndPoints.product}/${id}`);
}

export const getCategoryRequest = () => {
    return get(EndPoints.category);
}


