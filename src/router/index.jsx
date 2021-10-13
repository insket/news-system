import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../views/login'
import NewSandBox from '../views/sandbox'

export default function Router() {
  return (
    <HashRouter>
      {/* Switch  精准匹配路由 */}
      <Switch>
        <Route path='/login' component={Login}/>
        {/* 判断是有有token  如果有，渲染 <NewSandBox/>    如果没有，重定向到login  */}
        <Route path='/' render={() =>
            localStorage.getItem('token') ?
            <NewSandBox></NewSandBox> : <Redirect to='/login'/>
        }/>
      </Switch>
    </HashRouter>
  )
}
