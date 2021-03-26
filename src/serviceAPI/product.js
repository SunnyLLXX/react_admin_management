import request from '../util/request'


/**查询商品分页 */
export const reqGetProduct = (pageNum,pageSize) => request('/manage/product/list',{pageNum,pageSize})


/**搜索商品名称分页 */
export const reqSearchProduct = ({pageNum,pageSize,searchName,searchType}) => request('/manage/product/search',{pageNum,pageSize,[searchType]:searchName})


/**获取商品分类 */

export const reqCategory = (categoryId) => request('/manage/category/info',{categoryId})

/**更新商品状态 */
export const reqUpdateStatus = (productId,status) => request('/manage/product/updateStatus',{productId,status},'POST')

/**删除图片 */

export const reqDeletePic = (name) => request('/manage/img/delete',{name},'POST')