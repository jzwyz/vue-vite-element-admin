export declare interface ApiResult<T> {
    code: number
    data: T
    result: string | null
    resultDesc: string | null
}

export declare interface PaginResult<T> {
    data: T[]
    count: number
}

export declare type ApiResponse<T> = ApiResult<T>

export declare interface LoginUserInfo {
    username: string;
    email: string | null;
    quota_job_num: number | null;
    quota_page_num: number | null;
}

export declare interface LoginUserForm {
    username: string | null;
    password: string | null;
}

export declare interface LoginResult {
    access_token: string;
    roles: string[];
    user_info: LoginUserInfo
}