# vue2-element-admin

<p align="center">
  <a href="https://github.com/elk777/vue2-element-admin">
    <img src="https://img.shields.io/badge/Vue-2.6.14-brightgreen.svg" alt="Vue">
  </a>
  <a href="https://element.eleme.io">
    <img src="https://img.shields.io/badge/Element--UI-2.15.12-brightgreen.svg" alt="Element UI">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  </a>
</p>

## 简介

vue2-element-admin 是一个免费开源的中后台管理系统模板，采用 Vue 2.6 + Element UI 作为主体技术栈开发，开箱即用。同时集成了 Ant Design Vue、ECharts、WangEditor 等丰富的生态库，适用于企业级中后台管理系统、数据可视化平台以及低代码平台的快速搭建，也可作为 Vue 2 + Element UI 技术栈的学习参考项目。

## 分支说明

| 分支 | 说明 |
|------|------|
| `master` | 主分支，包含完整前端代码 |
| `server` | 后端对接分支，包含后端接口联调相关配置 |

## 功能特性

- **认证与权限**
  - JWT 登录认证，支持 Token 自动续期
  - 动态路由：从后端获取菜单路由，自动生成前端路由表
  - 按钮级权限控制，通过 `v-permission` 指令实现 DOM 级别的权限管控
- **布局系统**
  - 侧边栏 / 顶栏两种布局模式，可自由切换
  - 可折叠侧边栏、固定/非固定顶栏
  - TagsView 标签页管理，支持 `keep-alive` 页面缓存
  - 面包屑导航
- **主题配置**
  - 深色 / 浅色 / 护眼三种主题风格
  - 主题色自定义
  - 布局元素开关（Logo、面包屑、标签页等）
- **国际化 (i18n)**
  - 内置中文 / 英文两种语言方案
  - 用户语言偏好持久化存储
- **系统管理模块**
  - 用户管理、角色管理、菜单管理、部门管理、字典管理
  - 完整 CRUD 功能，附带 Mock 数据
- **功能演示页**
  - ECharts 图表集成
  - WangEditor 富文本编辑器
  - vue-cropper 图片裁剪
  - 二维码生成、打印功能、文件下载
  - 分片上传（SparkMD5 文件哈希校验）
  - 虚拟滚动列表
- **数据可视化**
  - 自定义布局仪表盘
  - 月报 / 周报数据页面
- **低代码模块**
  - 数据列表、数据表单、元数据管理

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 前端框架 | Vue.js | 2.6.14 |
| 路由管理 | vue-router | 3.4.9 |
| 状态管理 | Vuex | 3.6.2 |
| 持久化存储 | vuex-persistedstate | 4.1.0 |
| UI 组件库 | Element UI | 2.15.12 |
| UI 组件库 | Ant Design Vue | 1.7.2 |
| HTTP 客户端 | Axios | 1.4.0 |
| 构建工具 | Vue CLI / Webpack | 5.0.0 |
| CSS 预处理 | Sass/SCSS | 1.69.5 |
| 国际化 | vue-i18n | 8.28.2 |
| 图表库 | ECharts | 5.5.0 |
| 富文本编辑器 | WangEditor | 5.1.23 |
| Mock 数据 | Mock.js | 1.1.0 |
| 视频播放 | flv.js / mpegts.js | - |

## 项目结构

```
├── public/                  # 静态资源
├── mock/                    # Mock 数据
├── src/
│   ├── api/                 # 接口请求模块
│   ├── assets/              # 静态资源（图标、图片）
│   ├── components/          # 公共组件
│   │   ├── Pagination/      # 分页组件
│   │   ├── Chart/           # ECharts 封装
│   │   ├── Editor/          # 富文本编辑器
│   │   ├── Cropper/         # 图片裁剪
│   │   ├── SvgIcon/         # SVG 图标
│   │   └── ...
│   ├── directive/           # 自定义指令（权限控制）
│   ├── lang/                # 国际化语言包
│   ├── layout/              # 布局组件
│   ├── libs/                # 工具库
│   │   ├── permission/      # 路由守卫
│   │   └── utils/           # 工具函数（请求封装、认证、主题等）
│   ├── router/              # 路由配置
│   ├── store/               # Vuex 状态管理
│   ├── style/               # 全局样式
│   └── views/               # 页面视图
│       ├── system/          # 系统管理
│       ├── fun/             # 功能演示
│       ├── bigData/         # 数据可视化
│       └── lowcode/         # 低代码模块
├── .env.development         # 开发环境配置
├── .env.production          # 生产环境配置
├── .env.staging             # 预发布环境配置
├── .env.test                # 测试环境配置
├── vue.config.js            # Webpack 配置
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 12.x
- npm >= 6.x 或 yarn >= 1.x

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/elk777/vue2-element-admin.git

# 进入项目目录
cd vue2-element-admin

# 安装依赖（推荐使用 yarn）
yarn install
# 或
npm install
```

### 开发环境

```bash
# 启动开发服务器（默认端口 9938）
yarn serve
# 或
npm run serve
```

### 生产构建

```bash
# 构建生产环境
yarn build
# 或
npm run build

# 构建预发布环境
yarn build:stage
```

### 单元测试

```bash
# 运行单元测试
yarn test:unit
# 或
npm run test:unit
```

## 环境变量

项目支持 4 种环境模式，通过 `.env.*` 文件配置：

| 环境 | 文件 | 说明 |
|------|------|------|
| 开发环境 | `.env.development` | 本地开发，API 地址为 `http://127.0.0.1:63210` |
| 测试环境 | `.env.test` | 测试环境，API 前缀 `/test-api` |
| 预发布环境 | `.env.staging` | 预发布，API 前缀 `/stage-api` |
| 生产环境 | `.env.production` | 生产环境，API 前缀 `/pro-api` |

## 浏览器支持

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | 支持 |
| Firefox | 支持 |
| Safari | 支持 |
| Edge | 支持 |
| IE | 不支持 |

## 许可证

[MIT](https://opensource.org/licenses/MIT)
