import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

import { withRouter } from 'react-router-dom'

import { Icon } from '@ant-design/compatible';

import './frame.less'
import logo from './logo.png'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

/*
* 就去官网找相关组件，找到实例后把ReactDOM.render() 括号里面的内容复制并粘贴过来，然后把相关导入也粘贴过来就可以。
* */
@withRouter
class Frame extends Component {

    // 这里实现的是点击菜单栏之后切换页面
    onMenuClick = ({ item, key, keyPath, domEvent }) => {
        console.log({ item, key, keyPath, domEvent });
        console.log(this.props);

        this.props.history.push(key)
    };
    render() {
        return (
            <Layout style={{minHeight: '100%'}}>
                {/* 这里可以直接加一个 style={{backgroundColor:'#fff'}} 来修改Header的颜色*/}
                <Header className="header qf-header">
                    {/*这里的 qf-logo 是自定义样式，原来叫做logo，为了不覆盖原有的，所以单独起名字，创建一个frame.less文件里面写样式*/}
                    <div className="qf-logo">
                        <img src={logo} alt=""/>
                    </div>
                    {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>*/}
                    {/*    <Menu.Item key="1">nav 1</Menu.Item>*/}
                    {/*    <Menu.Item key="2">nav 2</Menu.Item>*/}
                    {/*    <Menu.Item key="3">nav 3</Menu.Item>*/}
                    {/*</Menu>*/}
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            selectedKeys={[this.props.location.pathname]}
                            // defaultOpenKeys={['sub1']}
                            onClick={this.onMenuClick}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                // 这里通过循环来遍历生成左侧菜单，这里只用到了一级菜单
                                this.props.menus.map(menu => {
                                    return (
                                        <Menu.Item key={menu.pathname}>
                                            <Icon type={menu.icon} />
                                            {menu.title}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                        {/*<Menu*/}
                        {/*    mode="inline"*/}
                        {/*    defaultSelectedKeys={['1']}*/}
                        {/*    defaultOpenKeys={['sub1']}*/}
                        {/*    style={{ height: '100%', borderRight: 0 }}*/}
                        {/*>*/}
                        {/*    <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">*/}
                        {/*        <Menu.Item key="1">option1</Menu.Item>*/}
                        {/*        <Menu.Item key="2">option2</Menu.Item>*/}
                        {/*        <Menu.Item key="3">option3</Menu.Item>*/}
                        {/*        <Menu.Item key="4">option4</Menu.Item>*/}
                        {/*    </SubMenu>*/}
                        {/*    <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">*/}
                        {/*        <Menu.Item key="5">option5</Menu.Item>*/}
                        {/*        <Menu.Item key="6">option6</Menu.Item>*/}
                        {/*        <Menu.Item key="7">option7</Menu.Item>*/}
                        {/*        <Menu.Item key="8">option8</Menu.Item>*/}
                        {/*    </SubMenu>*/}
                        {/*    <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">*/}
                        {/*        <Menu.Item key="9">option9</Menu.Item>*/}
                        {/*        <Menu.Item key="10">option10</Menu.Item>*/}
                        {/*        <Menu.Item key="11">option11</Menu.Item>*/}
                        {/*        <Menu.Item key="12">option12</Menu.Item>*/}
                        {/*    </SubMenu>*/}
                        {/*</Menu>*/}
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px'}}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {/*
                                这里是原来的 Content 我们就替换为 this.props.children 这个意思起就是我们使用Frame时候它
                                内部的子组件。
                                <Frame>
                                    <子组件1 />
                                </Frame>

                                通过this.props.children就可以获取子组件，可以看App.js中使用Frame标签包裹Switch.
                            */}
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Frame;