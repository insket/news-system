import request from "../utils/request";

/*
    获取 角色列表数据
*/
export const getRolesList = () => {
  return request({
    method: 'get',
    url: '/roles'
  })
}

/*
    删除角色数据
*/
export const deleteRole = (id) => {
  return request({
    method: 'delete',
    url: `/roles/${id}`
  })
}

/*
    修改权限分配
*/
export const changeRight = (id, rights) => {
  return request({
    method: 'patch',
    url: `/roles/${id}`,
    data:{
      rights
    }
  })
}