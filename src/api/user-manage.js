import request from "../utils/request";

/*
  获取 用户列表
*/
export const getUserList = () => {
  return request({
    method: 'get',
    url: '/users?_expand=role'
  })
}

/*
  获取 区域列表(添加用户)
 */
export const getRegionsList = () => {
  return request({
    method: 'get',
    url: '/regions'
  })
}

/*
  获取 角色列表(添加用户)
 */
  export const getRoleList = () => {
    return request({
      method: 'get',
      url: '/roles'
    })
  }

  /*
      删除 角色列表(添加用户)
 */
  export const deleteRoleList = (id) => {
    return request({
      method: 'delete',
      url: `/users/${id}`
    })
  }

/*
  获取前端返回的 角色列表(添加用户)
*/
  export const getNewRoleList = (value) => {
    return request({
      method: 'post',
      url: '/users',
      data: {
        ...value,
        'roleState':true,
        'default':false,
      }
    })
  }