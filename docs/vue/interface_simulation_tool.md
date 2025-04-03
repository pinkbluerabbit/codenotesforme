## mock.js使用

`Mock.js` 是一个用于生成随机数据的库，支持多种数据类型的模拟。以下是 `Mock.js` 的常用规则和快速生成模拟数据的方法。

### **安装依赖**

```
npm install mockjs axios -D
```

---

### 1. 基本语法

`Mock.js` 的语法格式为：

```javascript
Mock.mock(template)
```

- `template` 是一个对象或字符串，定义了生成数据的规则。

---

### 2. 数据模板规则

`Mock.js` 使用特定的语法规则来定义数据模板。以下是一些常用规则：

#### (1) 基本数据类型

| 规则                | 描述                                     | 示例                         |
| ------------------- | ---------------------------------------- | ---------------------------- |
| `'name\|min-max'`   | 生成一个字符串，重复 `min` 到 `max` 次   | `'name\|2-4': 'a'` → `'aaa'` |
| `'number\|min-max'` | 生成一个数字，范围在 `min` 到 `max` 之间 | `'age\|18-60': 1` → `25`     |
| `'boolean'`         | 生成一个布尔值                           | `'isActive': true`           |
| `'null'`            | 生成 `null`                              | `'value': null`              |

#### (2) 随机数据占位符

`Mock.js` 提供了丰富的占位符来生成随机数据：

| 占位符          | 描述         | 示例                         |
| --------------- | ------------ | ---------------------------- |
| `@cname`        | 随机中文名   | `'name': '@cname'`           |
| `@first`        | 随机英文名   | `'name': '@first'`           |
| `@last`         | 随机英文姓氏 | `'surname': '@last'`         |
| `@email`        | 随机邮箱地址 | `'email': '@email'`          |
| `@date`         | 随机日期     | `'date': '@date'`            |
| `@datetime`     | 随机日期时间 | `'datetime': '@datetime'`    |
| `@url`          | 随机 URL     | `'website': '@url'`          |
| `@image`        | 随机图片 URL | `'avatar': '@image'`         |
| `@paragraph`    | 随机段落文本 | `'bio': '@paragraph'`        |
| `@title`        | 随机标题     | `'title': '@title'`          |
| `@city`         | 随机城市名   | `'city': '@city'`            |
| `@county(true)` | 随机省市区   | `'address': '@county(true)'` |
| `@zip`          | 随机邮政编码 | `'zip': '@zip'`              |

#### (3) 数组和对象

| 规则                 | 描述                                     | 示例                   |
| -------------------- | ---------------------------------------- | ---------------------- |
| `'list\|n'`          | 生成一个包含 `n` 个元素的数组            | `'list\|3': [{...}]`   |
| `'list\|min-max'`    | 生成一个包含 `min` 到 `max` 个元素的数组 | `'list\|2-4': [{...}]` |
| `'key\|rule': value` | 根据规则生成对象的属性值                 | `'age\|18-60': 1`      |

---

### 3. 示例代码

以下是一个完整的示例，展示如何使用 `Mock.js` 生成模拟数据：

```javascript
const Mock = require('mockjs');

const data = Mock.mock({
  // 生成 5 个用户
  'users|5': [
    {
      'id|+1': 1, // ID 自增
      'name': '@cname', // 随机中文名
      'age|18-60': 1, // 年龄在 18 到 60 之间
      'email': '@email', // 随机邮箱
      'address': '@county(true)', // 随机地址
      'avatar': '@image("200x200")', // 随机图片
      'isActive': '@boolean', // 随机布尔值
      'createdAt': '@datetime' // 随机日期时间
    }
  ]
});

console.log(JSON.stringify(data, null, 2));
```

**输出示例：**

```json
{
  "users": [
    {
      "id": 1,
      "name": "张三",
      "age": 25,
      "email": "zhangsan@example.com",
      "address": "广东省深圳市南山区",
      "avatar": "http://dummyimage.com/200x200",
      "isActive": true,
      "createdAt": "2025-03-21 14:32:10"
    },
    {
      "id": 2,
      "name": "李四",
      "age": 30,
      "email": "lisi@example.com",
      "address": "北京市朝阳区",
      "avatar": "http://dummyimage.com/200x200",
      "isActive": false,
      "createdAt": "2025-03-21 14:32:10"
    }
  ]
}
```

---

### 4. 常用规则总结

| 规则类型   | 示例                           | 描述                     |
| ---------- | ------------------------------ | ------------------------ |
| 字符串重复 | `'name\|2-4': 'a'`             | 生成 `'aa'` 到 `'aaaa'`  |
| 数字范围   | `'age\|18-60': 1`              | 生成 18 到 60 之间的数字 |
| 随机占位符 | `'email': '@email'`            | 生成随机邮箱             |
| 数组生成   | `'list\|3': [{...}]`           | 生成包含 3 个元素的数组  |
| 对象属性   | `'user': { 'name': '@cname' }` | 生成嵌套对象             |

---

### 5. 更多功能

- **自定义占位符**：可以通过 `Mock.Random.extend()` 自定义占位符。
- **拦截请求**：`Mock.js` 可以拦截 Ajax 请求并返回模拟数据。

---

通过以上规则和示例，你可以快速生成各种类型的模拟数据，满足开发和测试需求。

### 6.具体实例-员工信息

#### **创建 Mock 服务**

注意mock中不能直接解析动态路由

```javascript
// src/mock/index.js
import Mock from 'mockjs'

// 初始化员工数据（存储在内存）
let employees = Mock.mock({
  'list|5-10': [{
    'id|+1': 1,
    'name': '@cname',
    'age|20-50': 1,
    'department': '@pick(["技术部", "市场部", "财务部"])',
    'position': '@pick(["工程师", "经理", "主管"])'
  }]
}).list

// Mock 配置
Mock.setup({
  timeout: '200-500' // 模拟请求延迟
})

// 接口配置
Mock.mock(/\/api\/employees/, 'get', () => {
  return {
    code: 200,
    data: employees
  }
})

Mock.mock(/\/api\/employees/, 'post', (options) => {
  const newEmployee = JSON.parse(options.body)
  newEmployee.id = employees.length + 1
  employees.push(newEmployee)
  return { code: 200, message: '添加成功' }
})

Mock.mock(/\/api\/employees\/\d+/, 'put', (options) => {
  const id = options.url.match(/\/api\/employees\/(\d+)/)[1]
  const index = employees.findIndex(e => e.id == id)
  employees[index] = JSON.parse(options.body)
  return { code: 200, message: '更新成功' }
})

Mock.mock(/\/api\/employees\/\d+/, 'delete', (options) => {
  const id = options.url.match(/\/api\/employees\/(\d+)/)[1]
  employees = employees.filter(e => e.id != id)
  return { code: 200, message: '删除成功' }
})
```

------

#### ** 创建 API 服务**

```javascript
// src/api/employee.js
import axios from 'axios'

export default {
  // 获取员工列表
  getEmployees() {
    return axios.get('/api/employees')
  },

  // 添加员工
  addEmployee(employee) {
    return axios.post('/api/employees', employee)
  },

  // 更新员工
  updateEmployee(id, employee) {
    return axios.put(`/api/employees/${id}`, employee)
  },

  // 删除员工
  deleteEmployee(id) {
    return axios.delete(`/api/employees/${id}`)
  }
}
```

## json server

### 安装json server

```javascript
npm install -g json-server
//或者
npm install json-server --save-dev
```

### 创建详细数据文件db.json

```javascript
{
  "users": [
    {
      "id": 1,
      "username": "alice_wonder",
      "email": "alice@example.com",
      "name": "Alice Wonderland",
      "role": "admin",
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "username": "bob_builder",
      "email": "bob@example.com",
      "name": "Bob The Builder",
      "role": "author",
      "created_at": "2024-01-02T00:00:00Z"
    },
    {
      "id": 3,
      "username": "charlie_chocolate",
      "email": "charlie@example.com",
      "name": "Charlie Bucket",
      "role": "reader",
      "created_at": "2024-01-03T00:00:00Z"
    }
  ],
  "posts": [
    {
      "id": 1,
      "title": "Introduction to json-server",
      "content": "json-server is a great tool for mocking REST APIs...",
      "author_id": 1,
      "status": "published",
      "created_at": "2024-02-01T10:00:00Z",
      "updated_at": "2024-02-01T10:00:00Z"
    },
    {
      "id": 2,
      "title": "Advanced json-server techniques",
      "content": "In this post, we'll explore some advanced json-server features...",
      "author_id": 2,
      "status": "draft",
      "created_at": "2024-02-05T14:30:00Z",
      "updated_at": "2024-02-06T09:15:00Z"
    },
    {
      "id": 3,
      "title": "RESTful API Design Best Practices",
      "content": "When designing a RESTful API, it's important to consider...",
      "author_id": 1,
      "status": "published",
      "created_at": "2024-02-10T11:45:00Z",
      "updated_at": "2024-02-10T11:45:00Z"
    }
  ],
  "comments": [
    {
      "id": 1,
      "post_id": 1,
      "user_id": 3,
      "content": "Great introduction! This helped me a lot.",
      "created_at": "2024-02-02T08:30:00Z"
    },
    {
      "id": 2,
      "post_id": 1,
      "user_id": 2,
      "content": "I've been using json-server for a while, and it's fantastic!",
      "created_at": "2024-02-03T16:45:00Z"
    },
    {
      "id": 3,
      "post_id": 3,
      "user_id": 3,
      "content": "These best practices are really useful. Thanks for sharing!",
      "created_at": "2024-02-11T10:00:00Z"
    }
  ],
  "categories": [
    {
      "id": 1,
      "name": "Web Development",
      "slug": "web-dev"
    },
    {
      "id": 2,
      "name": "API Design",
      "slug": "api-design"
    },
    {
      "id": 3,
      "name": "Tools & Libraries",
      "slug": "tools-libs"
    }
  ],
  "tags": [
    {
      "id": 1,
      "name": "json-server",
      "slug": "json-server"
    },
    {
      "id": 2,
      "name": "REST API",
      "slug": "rest-api"
    },
    {
      "id": 3,
      "name": "mock data",
      "slug": "mock-data"
    },
    {
      "id": 4,
      "name": "frontend development",
      "slug": "frontend-dev"
    }
  ],
  "post_categories": [
    {
      "id": 1,
      "post_id": 1,
      "category_id": 3
    },
    {
      "id": 2,
      "post_id": 2,
      "category_id": 3
    },
    {
      "id": 3,
      "post_id": 3,
      "category_id": 2
    }
  ],
  "post_tags": [
    {
      "id": 1,
      "post_id": 1,
      "tag_id": 1
    },
    {
      "id": 2,
      "post_id": 1,
      "tag_id": 3
    },
    {
      "id": 3,
      "post_id": 2,
      "tag_id": 1
    },
    {
      "id": 4,
      "post_id": 2,
      "tag_id": 2
    },
    {
      "id": 5,
      "post_id": 3,
      "tag_id": 2
    },
    {
      "id": 6,
      "post_id": 3,
      "tag_id": 4
    }
  ]
}
```

这个数据文件包含了用户、文章、评论、分类、标签以及它们之间的关系,允许我们模拟复杂的查询和数据操作。

### 启动json-server

`json-server --watch db.json --port 3000`  

### 模拟请求

```javascript
//axios文件 /util/http.js
import axios from 'axios'

const httpInstance = axios.create({
    baseURL: '',
    timeout:50000
})

export default httpInstance
```



```javascript
//api文件
import request from '@/utils/http'

//get请求
export function getUserAPI(data) {
    return request({
        method:'get',
        url: '/user',
        params:data
    })
} 

//或者
export function getUserAPI(role) {
    return request({
        method:'get'
        url: '/user/:role'
    })
} 

export function postUserAPI(params) {
    return request({
        method: 'post',
        headers: {
        'Content-Type': 'application/json'
    },
        url: '/user',
        data: params,
    })
}

```

#### get请求

```javascript
const user = ref({})
const getAllList = async (data) => {
  try {
      	const res = await getUserAPI(data)
  		user.value = res.result
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

```

#### post请求

```javascript
POST http://localhost:3000/users
Content-Type: application/json
 
//发送的数据
{
  "username": "david_copperfield",
  "email": "david@example.com",
  "name": "David Copperfield",
  "role": "author",
  "created_at": "2024-03-01T00:00:00Z"
}
```

#### put请求

```javascript
PUT http://localhost:3000/users/4
Content-Type: application/json
 
{
  "username": "david_copperfield",
  "email": "david.new@example.com",
  "name": "David Copperfield",
  "role": "admin",
  "created_at": "2024-03-01T00:00:00Z"
}
```

#### delete请求

```javascript
DELETE http://localhost:3000/users/4
```



### 进阶使用

#### 模拟文件上传

1. 创建一个`public`文件夹来存储"上传"的文件。

2. 在启动json-server时指定静态文件目录:

   ```javascript
   json-server --watch db.json --static ./public
   ```

3. 使用`FormData`来模拟文件上传:

```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('File uploaded:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}
```

#### 模拟实时数据更新

安装包

```javascript
npm install json-server socket.io
```

创建`server.js`文件

```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 3000;
 
server.use(middlewares);
server.use(router);
 
const httpServer = server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
 
const io = require('socket.io')(httpServer);
 
io.on('connection', (socket) => {
  console.log('A user connected');
 
  socket.on('dataUpdate', (data) => {
    // 更新db.json
    const db = router.db;
    db.get('posts').push(data).write();
    
    // 广播更新到所有客户端
    io.emit('newData', data);
  });
 
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
```

在前端使用Socket.IO客户端来接收实时更新

```javascript
import io from 'socket.io-client';
 
const socket = io('http://localhost:3000');
 
socket.on('newData', (data) => {
  console.log('Received new data:', data);
  // 更新前端状态
});
 
// 发送数据更新
function sendUpdate(data) {
  socket.emit('dataUpdate', data);
}
```

### 其他故障

#### 跨域问题(错误写法，参考模拟登录请求)

```javascript
json-server --watch db.json --cors
```

#### 端口冲突

```javascript
json-server --watch db.json --port 3001
```

### 使用 `json-server` 模拟登录请求的详细步骤

---

### 1. 安装依赖

```bash
npm install json-server@0.16.3 cors body-parser jsonwebtoken bcryptjs
```

---

#### 2. 准备数据文件 `db.json`

```json
{
    "routes": [
        {
            "path": "/dashboard",
            "name": "Dashboard",
            "component": "Dashboard",
            "meta": {
                "title": "Dashboard",
                "icon": "el-icon-monitor",
                "roles": [
                    "admin"
                ]
            },
            "children": [
                {
                    "path": "analysis",
                    "name": "Analysis",
                    "component": "Dashboard/Analysis",
                    "meta": {
                        "title": "分析页"
                    }
                }
            ]
        },
        {
            "path": "/about",
            "name": "About",
            "component": "About",
            "meta": {
                "title": "相关页"
            }
        },
        {
            "path": "/map",
            "name": "Map",
            "component": "Map",
            "meta": {
                "title": "地图",
                "icon": "el-icon-monitor"
            },
            "children": [
                {
                    "path": "container",
                    "name": "Container",
                    "component": "Map/Container",
                    "meta": {
                        "title": "内容页",
                        "keepAlive": true
                    }
                }
            ]
        }
    ],
    "users": [
        {
            "id": 1,
            "username": "admin",
            "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
            "roles": [
                "admin"
            ]
        },
        {
            "id": 2,
            "username": "user",
            "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
            "roles": [
                "user"
            ]
        }
    ]
}
```

---

#### 3. 创建自定义服务器 `server.js`

```javascript
import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

server.use(cors());
server.use(bodyParser.json());
server.use(middlewares);


// 为所有 API 路由添加前缀 /api
// server.use('/api', router);

// 设置 headers 解决跨域
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

server.get('/test', (req, res) => {
  res.json({ message: 'Proxy is working!' });
});
// 模拟登录接口
server.post('/userlogin', (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username }).value();

  if (!user) {
    return res.status(401).json({ error: '用户不存在' });
  }

  // 验证密码
   const isPasswordValid = bcrypt.compareSync(password, user.password);
   if (!isPasswordValid) {
     return res.status(401).json({ error: '密码错误' });
   }

  // 生成 JWT Token
  const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
  res.json({ token, roles: user.roles }); // 返回 token 和 role
});

// 其他请求走默认路由
server.use(router);

// 启动服务器
server.listen(3000, () => {
  console.log('JSON Server 运行在 http://localhost:3000');
});
```

---

#### 4.配置vite.config.js代理转发请求

```javascript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

```

封装axios

```javascript
import axios from 'axios'

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const instance = axios.create({
	// baseUrl: process.env.VUE_APP_API_BASE_URL, // 通过环境变量设置
	baseUrl:'', //请求后端数据的基本地址，自定义
	timeout: 2000,                  //请求超时设置，单位ms
	headers: {
		'Content-Type': 'application/json',
	  },
})

// 可选：添加请求拦截器
instance.interceptors.request.use(
	(config) => {
	  // 在发送请求之前做些什么，例如添加 token
	  const token = localStorage.getItem('token');
	  if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	  }
	  return config;
	},
	(error) => {
	  // 处理请求错误
	  return Promise.reject(error);
	}
  );
  
  // 可选：添加响应拦截器
  instance.interceptors.response.use(
	(response) => {
	  // 对响应数据做点什么
	  return response;
	},
	(error) => {
	  // 处理响应错误
	  if (error.response) {
		// 服务器响应了状态码，但不是 2xx
		console.error('服务器响应错误:', error.response);
	  } else if (error.request) {
		// 请求已发送但没有收到响应
		console.error('请求发送失败:', error.request);
	  } else {
		// 设置请求时发生了错误
		console.error('请求配置错误:', error.message);
	  }
	  return Promise.reject(error);
	}
  );
  
  // 封装 POST 请求
  const postRequest = async (url, data) => {
	try {
	  const response = await instance.post(url, data);
	  return response.data;
	} catch (error) {
	  throw error; // 或者返回一个错误对象
	}
  };
  
  const getRequest = async (url) => {
	try {
	  const response = await instance.get(url);
	  return response.data;
	} catch (error) {
	  throw error;
	}
  };
  
  const putRequest = async (url, data) => {
	try {
	  const response = await instance.put(url, data);
	  return response.data;
	} catch (error) {
	  throw error;
	}
  };
  
  const deleteRequest = async (url) => {
	try {
	  const response = await instance.delete(url);
	  return response.data;
	} catch (error) {
	  throw error;
	}
  };
  
  export { getRequest, postRequest, putRequest, deleteRequest };


```

请求封装函数

```javascript
import {getRequest, postRequest} from '@/utils/request';

export const getRoutes = () => {
  return getRequest('/api/routes');
};

export const getUsers = (data) => {
    return postRequest('/api/userlogin', data);
  };
```

#### 4. 启动服务器

```bash
node server.js
```

---

#### 5. 测试登录接口

使用 **Postman** 或 **curl** 发送 POST 请求：

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1", "password":"123456"}'
```

**成功响应**：

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**错误响应**：

```json
{
  "error": "用户不存在"
}
```

---

#### 关键点说明

1. **密码哈希**：使用 `bcryptjs` 对密码加密存储，避免明文泄露。
2. **JWT 令牌**：登录成功后返回加密 Token，用于后续身份验证。
3. **中间件**：通过自定义中间件拦截 `/login` 请求，实现业务逻辑。
4. **路由分离**：普通 REST API 请求（如 `/users`）仍由 `json-server` 自动处理。

---

通过以上步骤，你可以快速模拟一个带登录验证的 API 服务。实际开发中需根据需求调整加密逻辑和错误处理。