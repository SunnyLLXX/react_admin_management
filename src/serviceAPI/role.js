
import request from '../util/request'

/**获取角色列表 */
export const reqGetRoleList = () => request('/manage/role/list')

/**添加角色 */

export const reqAddRole = (roleName) => request('/manage/role/add',{roleName},'POST')

/**更新角色权限 */

export const reqUpdateRole = (data) => request('/manage/role/update',data,'POST')