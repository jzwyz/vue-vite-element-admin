import { MockMethod } from 'vite-plugin-mock'
import { HandleResponse, responseError, responseSuccess } from '../_utils';
// import faker from 'faker';

const mocks: MockMethod[] = [
    {
        url: '/api/v1/user/login',
        method: 'post',
        response: ({ body }: HandleResponse) => {
            console.log(body);
            if (body.username !== 'admin' || body.password !== 'admin') {
                return responseError();
            }
            return responseSuccess({
                access_token: 'dasdfasdfasdfasdf',
                roles: ['admin', 'user'],
                user_info: {
                    username: 'Jason.Jiang',
                    nickname: 'Jason'
                }
            })
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