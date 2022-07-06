import EndPoints from '../../../Constants/endpoints';
import {get} from '../../../httpHelper'
export const getUserRequest = () => {
    return get(EndPoints.user);
}