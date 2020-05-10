/*
    - Login  登录页
    - 404  404页
    - admin  管理后台
        - dashboard  管理后台主页
        - artical   文章主页
            - list   文章列表
            - edit   文章编辑
            - detail 文章详情
        - settings   设置
*/

import Loadable from 'react-loadable'
import { Loading } from "../components";

// 导入之后统一导出
// import Dashboard from "./Dashboard";
// import Login from "./Login";
// import NotFound from "./NotFound";
// import Settings from "./Settings";
// import ArticleList from "./Article";
// import ArticleEdit from "./Article/Edit";

// 下面页面都用Loadable包裹了一次，为了实现路由懒加载
// 这个 Loadable 是react-loadable 的一个函数，它需要一个对象做参数，对象里面有2个值
const Dashboard = Loadable({
    loader: () => import('./Dashboard'),  // 这个loader 是一个匿名函数，函数是真正要去加载的组件，你从后面的import就可以看出来
    loading: Loading  // 这个是在组件没有加载完成之前要显示的组件
});

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
});

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
});

const Settings = Loadable({
    loader: () => import('./Settings'),
    loading: Loading
});

const ArticleList = Loadable({
    loader: () => import('./Article'),
    loading: Loading
});

const ArticleEdit = Loadable({
    loader: () => import('./Article/Edit'),
    loading: Loading
});

export {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit
}