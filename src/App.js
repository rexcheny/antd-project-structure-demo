import React, {Component} from 'react';

import { adminRouter } from './routes'
import {Route, Switch, Redirect} from "react-router-dom";

// // 一个高阶函数实例，这个没啥用，主要为了测试一下装饰器模式是否有效
// const testHOC = (WrapperComponent) => {
//     return class HOCComponent extends Component {
//         render() {
//             return (
//                 <>
//                     <WrapperComponent/>
//                     <div>高阶组件信息</div>
//                 </>
//             )
//         }
//     }
// };
//
// // 使用装饰器模式
// @testHOC
class App extends Component {
    render() {
        return (
            /*
                这里放功能的东西，比如页面的header，侧边栏导航以及底部。另外就是内部路由
            */
            <div>

            {/*  这里是内部路由  */}
            <Switch>
                {
                    adminRouter.map(route => {
                        // 为什么这里用 render 呢？因为到了这里虽然通过了验证，但是还会根据角色的不同来显示不同的侧边栏
                        return (
                            <Route key={route.pathname} path={route.pathname} exact={route.exact} render={(routeProps) => {
                                return <route.component {...routeProps} />
                            }}/>
                        )
                    })
                }
                {/*
                    这里为什么要把 /admin 重定向到 /admin/dashboard 呢？因为/admin本身不是页面只是URL路径需要，能访问到/admin说明已经通过验证
                    那么就应该重定向到一个真实的页面，/admin的主页其实就是 /admin/dashboard
                */}
                <Redirect to={adminRouter[0].pathname} from='/admin' exact />
                {/*  这里一样，对于不存在的页面也重定向到404  */}
                <Redirect to='/404.html'/>
            </Switch>


            </div>
        );
    }
}

// 这是高阶组件的常规使用方式
// export default testHOC(App);
export default App;
