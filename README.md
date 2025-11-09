# 通讯录管理系统 - 后端项目

## 项目简介

这是一个基于Node.js和Express开发的通讯录管理系统后端服务。该系统提供RESTful API接口，支持联系人的增删改查操作，并使用SQLite作为数据库存储。

## 技术栈

- **Node.js**: JavaScript运行环境
- **Express**: Web框架
- **SQLite**: 轻量级数据库
- **cors**: 跨域资源共享中间件

## 项目结构

```
StudentID_concacts_backend/
├── server.js          # 服务器入口文件
├── controller/        # 控制器目录
│   └── contacts.js    # 联系人控制器
├── README.md          # 项目说明文档
└── codestyle.md       # 代码规范文档
```

## 功能特性

- **数据持久化**：使用SQLite数据库存储联系人信息
- **RESTful API**：提供标准的RESTful接口
- **跨域支持**：通过CORS中间件支持跨域请求
- **错误处理**：包含基本的错误处理机制

## API接口

### 1. 获取所有联系人

- **URL**: `/contacts`
- **方法**: `GET`
- **成功响应**:
  - **状态码**: `200 OK`
  - **数据格式**: `[{"id": 1, "name": "张三", "phone": "13800138000"}]`

### 2. 添加联系人

- **URL**: `/contacts`
- **方法**: `POST`
- **请求体**:
  ```json
  {"name": "李四", "phone": "13900139000"}
  ```
- **成功响应**:
  - **状态码**: `201 Created`
  - **数据格式**: `{"id": 2, "name": "李四", "phone": "13900139000"}`

### 3. 获取单个联系人

- **URL**: `/contacts/:id`
- **方法**: `GET`
- **成功响应**:
  - **状态码**: `200 OK`
  - **数据格式**: `{"id": 1, "name": "张三", "phone": "13800138000"}`

### 4. 更新联系人

- **URL**: `/contacts/:id`
- **方法**: `PUT`
- **请求体**:
  ```json
  {"name": "张三（已更新）", "phone": "13700137000"}
  ```
- **成功响应**:
  - **状态码**: `200 OK`
  - **数据格式**: `{"id": 1, "name": "张三（已更新）", "phone": "13700137000"}`

### 5. 删除联系人

- **URL**: `/contacts/:id`
- **方法**: `DELETE`
- **成功响应**:
  - **状态码**: `200 OK`
  - **数据格式**: `{"message": "Contact deleted successfully"}`

## 如何运行

### 前置条件

- 安装Node.js (v12+)

### 运行步骤

1. 克隆项目到本地
   ```bash
   git clone <repository-url>
   ```

2. 进入项目目录
   ```bash
   cd StudentID_concacts_backend
   ```

3. 安装依赖
   ```bash
   npm install express cors sqlite3
   ```

4. 启动服务器
   ```bash
   node server.js
   ```

5. 服务器将在 `http://localhost:3000` 运行

## 数据库结构

### contacts表

| 字段名 | 数据类型 | 约束 | 描述 |
|--------|----------|------|------|
| id     | INTEGER  | PRIMARY KEY AUTOINCREMENT | 联系人ID |
| name   | TEXT     | NOT NULL | 联系人姓名 |
| phone  | TEXT     | NOT NULL | 电话号码 |

## 许可证

MIT License
