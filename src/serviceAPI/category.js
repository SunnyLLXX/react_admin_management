import request from '../util/request'


/**添加分类 */
export const reqAddCategory = (data) => request('/manage/category/add',data,'POST')

/**获取分类列表（一级和二级） */
export const reqGetCategory = (parentId) => request('/manage/category/list',{parentId})

/**更新分类 */
export const reqUpdateCategory = (data) => request('/manage/category/update',data,'POST')