## axios封装

utils/request.js

```javascript
import axios from 'axios'

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const instance = axios.create({
	// baseUrl: process.env.VUE_APP_API_BASE_URL, // 通过环境变量设置
	baseUrl:'', //请求后端数据的基本地址，可以直接在vite.config.js中配置代理
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

//url中携带:id或者其他参数
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

api/auth.js

```javascript
import {getRequest, postRequest} from '@/utils/request';

export const getRoutes = () => {
  return getRequest('/api/routes');
};

export const getUsers = (data) => {
    return postRequest('/api/userlogin', data);
  };
```

## axios的get请求方式

### 1. 基本的 GET 请求

以下是一个基本的 GET 请求代码示例：

```plain
// 引入 axios
const axios = require('axios');

// 发起 GET 请求
axios.get('https://api.example.com/data')
  .then(response => {
    // 请求成功处理
    console.log(response.data);
  })
  .catch(error => {
    // 请求失败处理
    console.error(error);
  });
```

### 2. 带参数的 GET 请求（直接拼接在 URL 上）

可以通过在 URL 上拼接参数来传递 GET 请求参数：

```plain
const axios = require('axios');

// 假设有两个参数：id 和 category
const id = 123;
const category = 'electronics';

// 使用模板字符串将参数拼接在 URL 上
axios.get(`https://api.example.com/data?id=${id}&category=${category}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

### 3. 带参数的 GET 请求（使用 params 对象）

axios 还提供了 `params` 对象选项，用于在 GET 请求中传递参数：

```plain
const axios = require('axios');

// 定义 params 对象
const params = {
  id: 123,
  category: 'electronics'
};

// 将 params 对象传递给 GET 请求
axios.get('https://api.example.com/data', { params })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

### 4. RESTful 风格的 GET 请求

如果使用 RESTful 风格的 API，通常会将参数直接作为 URL 的一部分：

```plain
const axios = require('axios');

// 假设需要获取 id 为 123 的商品信息
const productId = 123;

// 使用 RESTful 风格传递参数
axios.get(`https://api.example.com/products/${productId}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

## axios与router请求

在前端开发中，`axios` 和 `router`（通常指 Vue Router 或 React Router）处理参数的方式有本质区别。以下是两者的对比说明：

---

### **一、Axios 携带参数的请求方式**  

Axios 是用于发送 HTTP 请求的库，主要用于与后端 API 交互。以下是常见的参数传递方式：

#### 1. **GET 请求（查询参数 Query Params）**

   ```javascript
axios.get('/api/data', {
  params: {
    page: 1,
    keyword: 'search'
  }
});
   ```

   **后端接收**（以 Express 为例）：

   ```javascript
app.get('/api/data', (req, res) => {
  const { page, keyword } = req.query;
});
   ```

#### 2. **POST 请求（请求体 Request Body）**

   ```javascript
axios.post('/api/data', {
  username: 'user1',
  password: '123456'
});
   ```

   **后端接收**：

   ```javascript
// 需添加 body-parser 中间件
app.use(express.json());
app.post('/api/data', (req, res) => {
  const { username, password } = req.body;
});
   ```

#### 3. **路径参数（URL Params）**

   ```javascript
axios.get('/api/users/123');
   ```

   **后端接收**：

   ```javascript
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params; // 123
});
   ```

---

### **二、Router 携带参数的请求方式**  

Router（以 Vue Router 为例）用于前端页面路由跳转，参数传递方式如下：

#### 1. **路径参数（URL Params）**

   ```javascript
// 路由定义
{ path: '/user/:id', component: User }

// 跳转时传递
router.push('/user/123');

// 组件内获取
const { id } = this.$route.params; // 123
   ```

#### 2. **查询参数（Query Params）**

   ```javascript
// 跳转时传递
router.push({ path: '/search', query: { keyword: 'vue' } });

// 组件内获取
const { keyword } = this.$route.query; // 'vue'
   ```

#### 3. **通过 props 传递**

   ```javascript
// 路由定义
{ path: '/user/:id', component: User, props: true }

// 组件内通过 props 接收
props: ['id']
   ```

---

### **三、核心区别总结**

| **特性**     | **Axios (HTTP 请求)**             | **Router (前端路由)**    |
| ------------ | --------------------------------- | ------------------------ |
| **用途**     | 与后端 API 交互                   | 前端页面跳转             |
| **参数位置** | URL 查询参数、请求体、路径参数    | URL 路径参数、查询参数   |
| **参数类型** | 支持复杂数据（JSON、FormData 等） | 仅支持字符串（URL 编码） |
| **典型场景** | 获取/提交数据到服务器             | 页面导航、组件间参数传递 |
| **后端交互** | 直接与服务器通信                  | 不涉及服务器，纯前端行为 |

---

### **四、最佳实践**

#### 1. **Axios 参数使用场景**

   ```javascript
   // 提交复杂数据
   axios.post('/api/login', {
     username: 'admin',
     password: 'securePassword'
   });

   // 分页请求
   axios.get('/api/posts', { params: { page: 2, size: 10 } });
   ```

#### 2. **Router 参数使用场景**

   ```javascript
   // 详情页跳转（传递 ID）
   router.push(`/product/${productId}`);

   // 搜索结果页（保留搜索条件）
   router.push({ 
     path: '/search',
     query: { keyword: 'laptop', sort: 'price' }
   });
   ```

---

### **五、常见问题解决**

#### 1. **Axios 发送数组参数**

   ```javascript
// 使用 paramsSerializer 处理数组
axios.get('/api/data', {
  params: { ids: [1, 2, 3] },
  paramsSerializer: params => qs.stringify(params, { indices: false })
});
// 生成 URL: /api/data?ids=1&ids=2&ids=3
   ```

#### 2. **Router 传递对象参数**

   ```javascript
// 通过 JSON 序列化传递对象
router.push({
  path: '/details',
  query: { 
    data: JSON.stringify({ id: 1, name: 'test' })
  }
});

// 组件内解析
const data = JSON.parse(this.$route.query.data);
   ```

