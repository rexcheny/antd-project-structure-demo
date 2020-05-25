/*
    @file config-overrides.js
    @author

    基于customize-cra和react-app-rewired定制化配置文件
*/

const {
    override,
    fixBabelImports,
    addLessLoader,
    addDecoratorsLegacy
} = require('customize-cra');

// 导入antd默认主题颜色设置
const theme = require('./theme');

// 导入阿里云控制台主题
const aliyunTheme = require('@ant-design/aliyun-theme');

module.exports = override(
    fixBabelImports('antd', {
        libraryDirectory: 'es',
        style: true,
    }),
    addDecoratorsLegacy(),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: aliyunTheme,  // 这里来切换主题
    }),
);