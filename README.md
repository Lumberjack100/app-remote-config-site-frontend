# Android应用远程配置管理系统前端

## 项目简介

Android应用远程配置管理系统是一个专为Android开发人员设计的Web应用，用于管理Android应用的远程配置。该系统允许用户通过直观的Web界面管理MR702-遥测终端机传感器的配置参数。

## 功能特点

- 用户登录与身份验证
- 传感器配置参数的管理（查看、添加、编辑、删除）
- 支持按接口和传感器名称筛选
- 支持每个传感器最多2个采集项配置
- 表单验证确保数据正确性

## 技术栈

- **Nuxt 3**: 基于Vue 3的服务端渲染框架
- **TypeScript**: 提供类型安全
- **Tailwind CSS**: 用于快速UI开发
- **Pinia**: 状态管理
- **Vee-Validate**: 表单验证
- **FontAwesome**: 图标库

## 安装与运行

1. 安装依赖

```bash
npm install
```

2. 开发环境运行

```bash
npm run dev
```

3. 构建生产版本

```bash
npm run build
```

4. 预览生产版本

```bash
npm run preview
```

## 环境变量

- `API_BASE_URL`: API服务器地址（默认：http://localhost:8000/api/v1）

## 目录结构

```
├── assets/            # 静态资源文件
├── components/        # Vue组件
├── composables/       # 可复用的组合式API
├── layouts/           # 布局组件
├── middleware/        # 中间件
├── pages/             # 页面组件
├── plugins/           # 插件
├── public/            # 公共静态资源
├── stores/            # Pinia状态存储
├── types/             # TypeScript类型定义
├── app.vue            # 应用入口
├── nuxt.config.ts     # Nuxt配置
└── tailwind.config.js # Tailwind CSS配置
```

## 使用说明

### 默认登录账号

- 账号：medo_gh
- 密码：medo123456 