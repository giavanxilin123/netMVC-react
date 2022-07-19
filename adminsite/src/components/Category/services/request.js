import EndPoints from '../../../Constants/endpoints';
import {get, postFormData, del} from '../../../httpHelper'


export const addCategoryRequest = (payload) => {
    return postFormData(EndPoints.category, payload);
}

export const deleteCategoryRequest = (name) => {
    return del(`${EndPoints.category}/${name}`);
}

export const getCategoryRequest = () => {
    return get(EndPoints.category);
}
