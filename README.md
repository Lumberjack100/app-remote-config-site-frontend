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

## 项目代码结构

```
miyitong-remote-config-frontend/
├── assets/            # 静态资源文件（CSS、图片等）
├── components/        # Vue组件
│   ├── SensorAddModal.vue     # 添加传感器配置的模态框组件
│   ├── SensorEditModal.vue    # 编辑传感器配置的模态框组件
│   ├── SensorDetailModal.vue  # 查看传感器配置详情的模态框组件
│   └── ConfirmModal.vue       # 通用确认对话框组件
├── composables/       # 可复用的组合式API
│   └── useApi.ts      # API调用相关的组合式函数
├── layouts/           # 布局组件
│   └── default.vue    # 默认布局组件，包含页面结构
├── middleware/        # 中间件
│   └── auth.ts        # 身份验证中间件，用于路由守卫
├── pages/             # 页面组件
│   ├── index.vue      # 首页
│   ├── login.vue      # 登录页面
│   └── sensor-config.vue # 传感器配置管理页面
├── plugins/           # 插件
├── public/            # 公共静态资源
├── stores/            # Pinia状态存储
│   ├── auth.ts        # 认证相关的状态管理
│   └── sensorConfig.ts # 传感器配置相关的状态管理
├── types/             # TypeScript类型定义
├── app.vue            # 应用入口
├── nuxt.config.ts     # Nuxt配置
└── tailwind.config.js # Tailwind CSS配置
```

### 主要模块功能说明

#### 组件模块
- **SensorAddModal.vue**: 实现添加新传感器配置的表单和逻辑
- **SensorEditModal.vue**: 实现编辑现有传感器配置的表单和逻辑
- **SensorDetailModal.vue**: 展示传感器配置的详细信息
- **ConfirmModal.vue**: 通用确认对话框，用于确认删除等操作

#### 页面模块
- **index.vue**: 首页，提供导航入口
- **login.vue**: 实现用户登录功能
- **sensor-config.vue**: 传感器配置管理页面，包括列表展示、筛选、添加、编辑和删除功能

#### 状态管理模块
- **auth.ts**: 管理用户认证状态，包括登录、登出和认证状态持久化
- **sensorConfig.ts**: 管理传感器配置数据，包括获取、添加、编辑和删除操作

#### API模块
- **useApi.ts**: 封装API调用逻辑，处理与后端的数据交互

## 安装与运行

### 1. 安装依赖

```bash
npm install
```

### 2. 开发环境运行

```bash
npm run dev
```
该命令会启动一个开发服务器，通常在 http://localhost:3000 访问

### 3. 停止项目

在终端按 `Ctrl+C` 组合键可以停止开发服务器

### 4. 构建生产版本

```bash
npm run build
```

### 5. 预览生产版本

```bash
npm run preview
```

### 6. 生成静态站点

```bash
npm run generate
```

## 项目运行状态查看

### 查看日志
开发过程中，可以在终端中查看实时日志输出，包括编译信息和运行时错误

### 查看项目运行状态
- 开发环境下，Nuxt提供了开发工具，可通过浏览器访问 http://localhost:3000/_nuxt/ 查看
- 可通过浏览器开发者工具检查网络请求、性能和错误信息

## 环境变量

- `API_BASE_URL`: API服务器地址（默认：http://localhost/api/v1）

## 默认登录账号

- 账号：medo_gh
- 密码：medo123456 