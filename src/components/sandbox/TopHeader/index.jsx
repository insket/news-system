import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Header } = Layout;
export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false)
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  //  下拉框内容
  const menu = (
    <Menu>
      <Menu.Item>
         超级管理员
      </Menu.Item>
      <Menu.Item danger>退出</Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px)'}}>
      {/*  缩进图标 */}
     {
       collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} style={{fontSize:'20px'}}/> :
      <MenuFoldOutlined onClick={changeCollapsed} style={{fontSize:'20px'}}/>
     }

     {/* 用户管理 */}
     <div style={{float:'right'}}>
       <span>欢迎回来，Admin</span>
       <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
     </div>
    </Header>
  )
}
