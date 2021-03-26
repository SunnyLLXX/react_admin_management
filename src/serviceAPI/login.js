import request from '../util/request'

/**登录 */
export const reqLogin = (data) => request('/login',data,'POST')