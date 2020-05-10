import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
/*
  这里引入mainRouter是因为这里的页面都不需要登录，这里的App是最上层组件，打开这个组件是不需要登录的
  通常直接看到一个登录页面。如果我们以后还需要一些不登录就需要访问的页面，其实是都放到mainRouter中的
  所以这里要引入mainRouter。
*/
import { mainRouter} from "./routes";

// 如果要让antd组件显示中文就需要引入下面的包，并在顶层做包裹。
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        {/*
            这里配置的是外层路由
        */}
        <Router>
            <Switch>
                {/**/}
                <Route path="/admin" render={(routePops) => {
                    // TODO 这里要做权限认证，需要登录才能访问admin，没有登录则跳转到登录页
                    return <App {...routePops}/>
                }}/>

                {/* 下面的 {} 表示里面是JS代码，标签里面嵌套JS就是JSX */}
                {
                    // 这里是为了遍历mainRouter数组，生成一条条路由，因为这里的路由都不需要登录认证
                    mainRouter.map(route => {
                        return <Route key={route.pathname} path={route.pathname} component={route.component}/>
                    })
                }

                {/*
                    访问 / 则重定向到 /admin ，这里之所以不重定向到登录页，是因为在 /admin 哪里会做验证
                    验证不通过再重定向到登录页，这是正常的逻辑。
                */}
                <Redirect to='/admin' from='/' exact/>
                {/* 除了上面的允许的路由，其他不存在的路由 都重定向到404 */}
                <Redirect to='/404.html'/>
            </Switch>
        </Router>
    </ConfigProvider>,
  document.getElementById('root')
);
