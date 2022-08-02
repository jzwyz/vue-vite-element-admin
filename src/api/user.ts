import { axios } from '.'
import { LoginUserForm, LoginResult, ApiResponse } from '~/api'


export async function login(loginForm: LoginUserForm): Promise<ApiResponse<LoginResult>> {
    return await axios.post('/v1/user/login', loginForm)
}