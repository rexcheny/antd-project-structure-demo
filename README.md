# 项目说明

本项目是一个项目模板，这里会介绍使用antd开发管理后台时如何初始化一个项目，其中包括安装哪些组件以及如何配置。

## 创建项目

如果使用IDE的话就通过IDE向导完成，如果是使用命令可以`npmc `来完成。完成之后删除一些没用的文件，比如`src`目录下的`App.css`、`App.test.js`、
`index.css`、`log.svg`、`serviceWorker.js`、`setupTests.js`并删除`App.js`和`index.js`中对删除文件的引用；以及删除`public`目录下的`favicon.ico`、`logo192.png`、`logo512.png`、
并修改`index.html`中对删除文件的引用。

## 关于gitignore文件

这里我是从github上采用的模板[Node.gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore)这里有各种语言的模板，
直接使用就可以。

## 配置antd

