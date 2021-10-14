import request from "../utils/request";

/*
    权限管理列表
*/
export const getRightList = () => {
  return request({
    method: 'get',
    url: '/rights'
  })
}