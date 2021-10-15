import request from "../utils/request";

/*
    获取 slidemenu 导航栏数据
*/
export const getSlideMenuList = () => {
  return request({
    method: 'get',
    url: '/rights?_embed=children'
  })
}
