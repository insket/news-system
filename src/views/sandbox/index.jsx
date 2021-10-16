import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SlideMenu from '../../components/sandbox/SlideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import ErrorPage from '../../components/ErrorPage'
import { Layout } from 'antd'
import './index.css'

const { Content } = Layout
export default function NewSandBox() {
  return (
    <Layout>
      <SlideMenu/>
      <Layout className="site-layout">
        <TopHeader/>
        <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              // overflow:'auto'
            }}
          >
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/user-manage/list' component={UserList} />
            <Route path='/right-manage/role/list' component={RoleList} />
            <Route path='/right-manage/right/list' component={RightList} />
            {/* 默认重定向 Home */}
            <Redirect from='/' to='/home' exact />
            <Route path='*' component={ErrorPage}/>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}
