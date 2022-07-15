import EndPoints from '../../../Constants/endpoints';
import {get, post, del} from '../../../httpHelper'


export const addCategoryRequest = (payload) => {
    return post(EndPoints.category, payload);
}

export const deleteCategoryRequest = (name) => {
    return del(`${EndPoints.category}/${name}`);
}

export const getCategoryRequest = () => {
    return get(EndPoints.category);
}




