import request from "../utils/request";

/*
    权限管理列表
*/
export const getRightList = () => {
  return request({
    method: 'get',
    url: '/rights?_embed=children'
  })
}

/*
    删除权限列表选项  一级
*/
export const deleteSlideMenuList = (id) => {
  return request({
    method: 'delete',
    url: `/rights/${id}`
  })
}

/*
    删除权限列表选项  二级
*/
export const deleteChildrenList = (id) => {
  return request({
    method: 'delete',
    url: `/children/${id}`
  })
}