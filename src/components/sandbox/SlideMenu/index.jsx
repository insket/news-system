import React from 'react'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './index.css'

const { Sider } = Layout;
const { SubMenu } = Menu

// 模拟数组解构
const menuList = [
  {
    key: '/home',
    title: '首页',
    icon: <UserOutlined/>,
  },
  {
    key: '/user-manage',
    title: '用户管理',
    icon: <UserOutlined/>,
    children: [
      {
        key: '/user-manage/list',
        title: '用户列表',
        icon: <UserOutlined/>
      }
    ]
  },
  {
    key: '/right-manage',
    title: '权限管理',
    icon: <UserOutlined/>,
    children: [
      {
        key: '/right-manage/role/list',
        title: '角色列表',
        icon: <UserOutlined/>
      },
      {
        key: '/right-manage/right/list',
        title: '权限列表',
        icon: <UserOutlined/>
      }
    ]
  }
]

export default function SlideMenu() {
  return (
    <div>
      {/* 左侧导航栏 */}
      <Sider trigger={null} collapsible collapsed={false}>
        <div className="logo">全球新闻发布系统</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={menuList.icon}>
            {menuList.title}
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <SubMenu key="sub2" icon={<UploadOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        </Menu>
      </Sider>
    </div>
  )
}
