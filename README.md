
## Quick start
```bash
npm install

#

npm run dev
```

## Overview
- webpack 4
- electron
- electron-package
- react 16
- react-router 5
- redux 4
- echarts 4
- ant-design 3
- less

## DevTools

Toggle DevTools:

* OSX: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

## Packaging


## 启动 (开发模式)
```
https://svn.joyintech.com/svn/Guzhi_ZhongZhai/1-dev/branches/cbpc-client
cd cbpc-client

npm i

npm start

```
## 源码目录结构
> 文件夹 src
```
├── assets                  // 项目媒体资源文件夹
|   ├── images              // 图片文件夹
|   └── iconfonts           // 图标字体文件夹
├── components              // 项目公共组件文件
|   ├── Loading             // loading 公共组件文件夹
|   |   ├── index.less      // loading 组件样式文件
|   |   └── index.js        // loading 组件文件
|   └── ...                 // 其他公共组件文件夹，其目录机构同 loading
├── layout                  // 项目基本布局
├── pages                   // 项目页面文件夹
|   ├── home                // 项目首页
|   |   ├── index.less      // 首页样式
|   |   └── index.js        // 首页页面文件
|   └── ...                 // 其他页面，其目录结构同首页
├── store                   // 项目 store 文件夹
|   ├── home                // 首页 store
|   |   ├── action-type.js  // 首页 action-type 文件
|   |   ├── action.js       // 首页 action 文件
|   |   └── reducer.js      // 首页 reducer 文件
|   ├── ...                 // 其他页面 store 文件夹，其目录结构同首页 store 文件夹
|   └── index.js            // 项目整体 reducer 文件
├── routes.js               // 项目路由配置文件
├── index.js                  // 项目入口文件
└── index.html              // 项目 HTML 模板
```
## 打包 (生产模式)
```运行
npm run build
```
Create a package for OSX, Windows and Linux
```
npm run pack
```
Or target a specific platform
```打包
npm run pack:mac
npm run pack:win
npm run pack:linux
```