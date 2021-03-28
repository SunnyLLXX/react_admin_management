import request from '../util/request'

/**获取用户列表 */

export const reqGetUserList = () => request('/manage/user/list')

/**删除用户 */

export const reqDeleteUser = (userId) => request('/manage/user/delete',{userId},'POST')

/**添加或更新用户 */

export const reqAddUpdateUser = (data) => request('/manage/user/'+(data._id ? 'update' : 'add'),data,'POST')