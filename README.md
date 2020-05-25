# 项目说明

本项目是一个项目模板，这里会介绍使用antd开发管理后台时如何初始化一个项目，其中包括安装哪些组件以及如何配置。

## 目录结构

- actions: redux中的action的存放位置
- reducers: redux中reducer的存放位置
- components: 组件，我们自己写的各种组件
- routes: 路由设置
- services: 外部调用比如Ajax的调用会放到这里
- views: 这里主要是放页面，当然并不是HTML页面，其实也是js文件，只不过这里是多个组件组成的页面

## 创建项目

如果使用IDE的话就通过IDE向导完成，如果是使用命令可以`npmc `来完成。完成之后删除一些没用的文件，比如`src`目录下的`App.css`、`App.test.js`、
`index.css`、`log.svg`、`serviceWorker.js`、`setupTests.js`并删除`App.js`和`index.js`中对删除文件的引用；
以及删除`public`目录下的`favicon.ico`、`logo192.png`、`logo512.png`、`manifest.json`并修改`index.html`中对删除文件的引用。

## 关于gitignore文件

这里我是从github上采用的模板[Node.gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore)这里有各种语言的模板，
直接使用就可以。

## 安装antd和react相关模块

`npm install antd react-redux react-router-dom -S`

## 配置antd（方便的使用antd组件）

安装必要组件`npm install react-app-rewired customize-cra babel-plugin-import -D`，`customize-cra`和`react-app-rewired`搭配使用
其作用就是提供了一组实用程序，以利用react-app-rewired的核心功能来自定义create-react-app版本2和3的配置，因为`create-react-app`创建的
react项目中`webpack`是被隐藏的，当然可以弄出来，但是直接修改`webpack`不太方便所以通过其他方式来进行配置。

### 配置

这个工具后，在项目根目录中新建文件`config-overrides.js`文件。此时我们可以方便`webpack`的操作。我们需要修改`package.json`中的`scripts`中的内容，原始内容如下：

```json
{
  "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
   }
}
```

修改为：
```json
{
  "scripts": {
      "start": "react-app-rewired start",
      "build": "react-app-rewired build",
      "test": "react-app-rewired test",
      "eject": "react-scripts eject"
   }
}
```

然后在项目根目录创建一个`config-overrides.js`，内如如下：

```javascript
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
    fixBabelImports('antd', {
        libraryDirectory: 'es',
        style: 'css'
    }),
);
```

配置好后需要关闭重启项目。

[官网介绍](https://ant.design/docs/react/use-with-create-react-app-cn)

### 配置自定义主题

默认是蓝色，如果更换就需要配置less，安装工具`npm install less less-loader@5.0.0 -D`，然后在项目根目录创建一个`theme.js`用来存放主题相关
的设置，内容可以参考官网[Ant Design 的样式变量](https://ant.design/docs/react/customize-theme-cn)

修改`config-overrides.js`文件为如下内容：

```javascript
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const theme = require('./theme');

module.exports = override(
    fixBabelImports('antd', {
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: theme,
    }),
);
```

### 配置装饰器模式

安装`npm install @babel/plugin-proposal-decorators -D`

这里也使用`customize-cra`这个组件提供的功能，由于已经安装所以直接修改`config-overrides.js`文件，主要添加`addDecoratorsLegacy`，如下内容：

```javascript
const {
    override,
    fixBabelImports,
    addLessLoader,
    addDecoratorsLegacy,  // 启用装饰器模式
} = require('customize-cra');

// 导入主题颜色设置
const theme = require('./theme');

module.exports = override(
    fixBabelImports('antd', {
        libraryDirectory: 'es',
        style: true,
    }),
    addDecoratorsLegacy(),  // 启用装饰器模式
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: theme,
    }),
);
```

### 配置懒加载

什么是懒加载呢？就是按需加载，如果不配置的话这些页面和JS在你打开页面的时候就全部加载，不管是不是当前页面需要的，你打开浏览器network
，然后切换真实URL，你会发现怎么切换network里面都不刷新，但是内容确实切换了，这就是全部加载。

而懒加载就是按需加载，并不会一次都加载出来。表现特定就是切换URL时network会刷新，也就是浏览器会重新发请求。懒加载的的好处是加载速度快，
因为不加载与当前访问页面无关的东西。

由于管理后台通常都是单页应用，所以如果没有应用懒加载，运用webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，延时过长，不利于用户体验，

安装依赖`npm install react-loadable -S`

安装完成后，需要自定义一个加载组件，这个就是components里面的Loading中的index.js。另外就需要做被路由页面的一层包装，这个参照views里面的index.js


### 使用Ajax请求

`npm install axios -S `

### 时间格式化

`npm install moment -S`
