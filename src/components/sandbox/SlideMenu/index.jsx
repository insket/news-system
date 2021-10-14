import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
  SubnodeOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import './index.css'

const { Sider } = Layout;
const { SubMenu } = Menu

// 模拟数组映射icon
const iconList = {
  '/home':<HomeOutlined />,
  "/user-manage":<UserAddOutlined />,
  "/user-manage/list":<UnorderedListOutlined />,
  "/right-manage":<SubnodeOutlined />,
  "/right-manage/role/list":<UnorderedListOutlined />,
  "/right-manage/right/list":<UnorderedListOutlined />
}

function SlideMenu(props) {
  // 存储导航栏数据
  const [menu, setMenu] = useState([])

  // 获取导航栏数据
  useEffect(() => {
    axios.get('http://localhost:8000/rights?_embed=children').then((res) => {
      // console.log(res.data)
      setMenu(res.data)
    })
  }, [])

  // 判断导航栏列表展示项  pagepermisson 是否为 1
  const checkPagePermisson = (item) => {
    return item.pagepermisson === 1
  }

  // renderMenu()
  //  item.children?.length>0  判断 item.children 是否为真,如果为真 ，则执行后面，如果未假， 则不执行后面
  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (item.children?.length > 0 && checkPagePermisson(item)) {
        return <SubMenu
          key={item.key}
          icon={iconList[item.key]}
          title={item.title}
        >
          {renderMenu(item.children)}
        </SubMenu>
      }else{
        return  checkPagePermisson(item) && <Menu.Item
          key={item.key}
          icon={iconList[item.key]}
          onClick={() => {props.history.push(item.key)}}
        >
          {item.title}
        </Menu.Item>
      }
    })
  }

  // 存储当前的路由路径
  const ActivedKey = props.location.pathname
  // 刷新之后的打开的选项路径
  const openKey = ['/'+ ActivedKey.split('/')[1]]
  // console.log(openKey)

  return (
    <div>
      {/* 左侧导航栏 */}
      <Sider trigger={null} collapsible collapsed={false}>
        <div style={{height:'100%',display:'flex',flexDirection:'column'}}>
          <div className="logo">全球新闻发布系统</div>
            <div style={{overflow:'auto'}}>
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={ActivedKey}
                defaultOpenKeys={openKey}
              >
              {/* 调用 renderMenu()  */}
              {renderMenu(menu)}
          </Menu>
            </div>
        </div>
      </Sider>
    </div>
  )
}

export default withRouter(SlideMenu)
