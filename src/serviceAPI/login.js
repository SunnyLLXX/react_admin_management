import request from '../until/request'

/**登录 */
export const reqLogin = (data) => request('/login',data,'POST')