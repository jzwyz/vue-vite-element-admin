import { MockMethod } from 'vite-plugin-mock'
import { HandleResponse, responseSuccess } from '../_utils';
// import faker from 'faker';

const mocks: MockMethod[] = [
    {
        url: '/api/login',
        method: 'post',
        response: ({ body }: HandleResponse) => {
            console.log(body);
            return responseSuccess('ok')
        }
    },
    {
        url: '/api/userinfo',
        method: 'get',
        response: () => {
            return responseSuccess({
                userid: new Date(),
                username: 'Jason.Jiang',
                face_img: ''
            })
        }
    }
]

export default mocks;