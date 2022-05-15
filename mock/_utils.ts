export interface HandleResponse {
    url: Recordable;
    body: Recordable;
    query: Recordable;
    headers: Recordable;
}

/**
 * 定义成功的响应结构
 * @param data 
 * @returns 
 */
export function responseSuccess(data: any) {
    return {
        code: 1000,
        data,
        result: "",
        resultDesc: "",
    }
}

/**
 * 定义分页的成功响应结构
 * @param data 
 * @param pageNo 
 * @param pageSize 
 * @param pageDataCount 
 * @returns 
 */
export function responsePageSuccess(data: any[] = [], pageNo: number = 1, pageSize: number = 10, pageDataCount: number = 0) {
    return {
        code: 1000,
        data,
        pageBean: { pageCount: data.length, pageDataCount, pageNo, pageSize },
        result: "",
        resultDesc: "",
    }
}

export function responseError() {
    return {
        code: 1001,
        data: null,
        result: '响应失败',
        resultDesc: '响应失败'
    }
}