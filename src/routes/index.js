// 路由配置，需要把views里的页面导入进来
import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit
} from '../views'

/*
    路由规划，login和404 是平级的，与这两个平级的是admin，但实际上admin只是一个URL的路径并不是真正的页面
    因为admin页面其实就是dashboard页面。所以我们在 adminRouter 里规划了admin下面的页面，因为这些页面都是
    登录之后才能看到的。

    所以下面定义2个数组，里面是对象，对象的键其实写什么都行，但是我们要把它们对应到 <Route> 标签里面，这个标签是
    <Route path='' component='' /> 这样的，为了便于识别，我们这里把键叫做 pathname和component。
*/

export const mainRoutes = [
    {pathname: '/login', component: Login},
    {pathname: '/404.html', component: NotFound},  // 虽然这里是 404.html 实际上它并不是HTML页面，只是路由这样显示
];

export const adminRoutes = [
    {pathname: '/admin/dashboard', component: Dashboard, title: '仪表盘', isNav: true, icon: 'dashboard'},

    // 这里为什么要配置 exact: true 呢，因为/admin/articlelist和/admin/article/edit/:id前半部分一样，这样的URL需要为短的那个配置 exact: true 精确匹配
    {pathname: '/admin/article', component: ArticleList, exact: true, title: '文章管理', isNav: true, icon: 'unorderedList'},
    {pathname: '/admin/article/edit/:id', component: ArticleEdit, title: '文章编辑'},

    {pathname: '/admin/settings', component: Settings, title: '设置', isNav: true, icon: 'setting'},
];