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

// 导入主题颜色设置
const theme = require('./theme');

module.exports = override(
    fixBabelImports('antd', {
        libraryDirectory: 'es',
        style: true,
    }),
    addDecoratorsLegacy(),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: theme,
    }),
);