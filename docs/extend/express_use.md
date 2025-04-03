## express安装与启动

### 0. 快速搭建项目

创建项目

首先，全局安装 express-generator 工具，用于快速创建应用程序框架：

```bash
npm install -g express-generator
```

然后，使用 express-generator 创建项目：

```bash
express myapp

cd myapp

npm install
```

启动项目：

```bash
npm start
```

浏览器打开`http://localhost:3000`，可以看到默认页面。

### 1. 安装 Node.js 和 npm

Express 是一个基于 Node.js 的 Web 框架，因此需要先安装 Node.js 和 npm（Node.js 的包管理器）。

1. **下载并安装 Node.js**：

   - 访问 [Node.js 官方网站](https://nodejs.org/)，下载适合 Windows 的安装包。
   - 运行安装程序，按照提示完成安装。

2. **验证安装**：

   - 打开命令提示符（CMD）或 PowerShell，运行以下命令，确保 Node.js 和 npm 已正确安装：

     ```bash
     node -v
     npm -v
     ```

### 2. 创建项目目录

1. **创建项目文件夹**：

   - 在命令提示符中，运行以下命令创建一个新目录并进入该目录：

     ```bash
     mkdir my-express-app
     cd my-express-app
     ```

### 3. 初始化项目

1. **初始化 npm 项目**：

   - 在项目目录中运行以下命令，初始化一个新的 npm 项目：

     ```bash
     npm init -y
     ```

   - 这会生成一个 `package.json` 文件，用于管理项目的依赖。

### 4. 安装 Express

1. **安装 Express**：

   - 在项目目录中运行以下命令，安装 Express：

     ```bash
     npm install express
     ```

### 5. 创建基本的 Express 应用

1. **创建入口文件**：

   - 在项目目录中创建一个名为 `app.js` 的文件：

     ```bash
     touch app.js
     ```

   - 如果你的系统不支持 `touch` 命令，可以使用以下命令：

     ```bash
     type nul > app.js
     ```

2. **编辑 `app.js`**：

   - 使用文本编辑器（如 VS Code、Notepad++ 或其他编辑器）打开 `app.js`，并添加以下代码：

     ```javascript
     const express = require('express');
     const app = express();
     const port = 3000;
     
     app.get('/', (req, res) => {
       res.send('Hello, World!');
     });
     
     app.listen(port, () => {
       console.log(`Server is running on http://localhost:${port}`);
     });
     ```

### 6. 启动项目

1. **运行项目**：

   - 在命令提示符中运行以下命令，启动 Express 应用：

     ```bash
     node app.js
     ```

2. **访问应用**：

   - 打开浏览器，访问 `http://localhost:3000`，你应该会看到页面显示“Hello, World!”。

### 7. 可选：安装其他常用依赖

如果你需要更多功能，可以安装其他常用的 Express 中间件，例如 `body-parser` 和 `morgan`：

```bash
npm install body-parser morgan
```

然后在 `app.js` 中引入并使用它们：

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = 3000;

// 使用中间件
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## express中间件

Express.js 提供了许多内置中间件和第三方中间件，用于处理各种常见的任务，例如解析请求体、处理静态文件、日志记录、身份验证等。以下是一些常用的 Express 中间件：

### 1. **内置中间件**

#### 1.1 `express.static`

用于提供静态文件服务，例如 HTML 文件、图片、CSS 文件等。

```javascript
app.use(express.static('public'));
```

#### 1.2 `express.json`

解析 JSON 格式的请求体。

```javascript
app.use(express.json());
```

#### 1.3 `express.urlencoded`

解析 URL 编码的请求体（通常用于表单提交）。

```javascript
app.use(express.urlencoded({ extended: true }));
```

#### 1.4 `express.text`

解析纯文本请求体。

```javascript
app.use(express.text());
```

### 2. **第三方中间件**

#### 2.1 `body-parser`

虽然 `express.json()` 和 `express.urlencoded()` 已经足够处理大多数请求体解析需求，但 `body-parser` 是一个更强大的第三方中间件，提供了更多选项。

```javascript
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

#### 2.2 `cookie-parser`

用于解析请求中的 Cookie。

```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

#### 2.3 `morgan`

一个日志记录中间件，用于记录 HTTP 请求的详细信息。

```javascript
const morgan = require('morgan');
app.use(morgan('dev'));
```

#### 2.4 `cors`

用于处理跨域资源共享（CORS）问题。

```javascript
const cors = require('cors');
app.use(cors());
```

#### 2.5 `helmet`

用于设置各种 HTTP 安全相关的头信息，增强应用的安全性。

```javascript
const helmet = require('helmet');
app.use(helmet());
```

#### 2.6 `compression`

用于压缩响应体，提高传输效率。

```javascript
const compression = require('compression');
app.use(compression());
```

#### 2.7 `method-override`

允许使用 HTTP 动词覆盖，例如通过 POST 请求模拟 PUT 或 DELETE 请求。

```javascript
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
```

#### 2.8 `express-session`

用于管理用户会话。

```javascript
const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
```

#### 2.9 `passport`

一个强大的身份验证中间件，支持多种身份验证策略（如 OAuth、JWT 等）。

```javascript
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
```

#### 2.10 `errorhandler`

一个错误处理中间件，用于开发环境中的错误日志记录。

```javascript
const errorhandler = require('errorhandler');
app.use(errorhandler());
```

### 3. **自定义中间件**

除了使用内置和第三方中间件，你还可以编写自己的中间件。自定义中间件可以执行任何逻辑，并通过调用 `next()` 将控制权传递给下一个中间件。

##### 示例：自定义日志中间件

```javascript
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});
```

##### 示例：错误处理中间件

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

#### 总结

Express 提供了丰富的中间件生态系统，通过合理使用这些中间件，可以大大简化开发工作，提高应用的可维护性和安全性。以下是一些常用的中间件总结：

- **请求体解析**：`express.json()`、`express.urlencoded()`、`body-parser`
- **Cookie 和会话管理**：`cookie-parser`、`express-session`
- **日志记录**：`morgan`
- **安全**：`helmet`
- **压缩响应**：`compression`
- **跨域资源共享**：`cors`
- **身份验证**：`passport`
- **错误处理**：`errorhandler`

## express中间件参数

在 Express.js 中，中间件是一种非常重要的概念，它允许你在请求处理流程中插入自定义逻辑。每个中间件函数都接收三个主要参数：`req`、`res` 和 `next`。下面分别解释这三个参数的作用：

### 1. `req`（Request 对象）

`req` 是一个代表 HTTP 请求的对象，它包含了与请求相关的所有信息。通过 `req` 对象，你可以访问请求的详细内容，例如请求头、请求体、查询参数等。

#### 常用的 `req` 属性和方法：

- **`req.method`**：请求方法（如 `GET`、`POST` 等）。
- **`req.url`**：请求的 URL。
- **`req.path`**：请求的路径部分（不包括查询参数）。
- **`req.query`**：请求的查询参数（通过 URL 的查询字符串解析得到的对象）。
- **`req.body`**：请求体的内容（通常需要使用 `body-parser` 中间件来解析）。
- **`req.headers`**：请求头信息。
- **`req.params`**：路由参数（通过 URL 的路径参数解析得到的对象）。
- **`req.cookies`**：请求中的 cookie（需要使用 `cookie-parser` 中间件来解析）。
- **`req.session`**：会话对象（需要使用 `express-session` 中间件来启用）。

### 2. `res`（Response 对象）

`res` 是一个代表 HTTP 响应的对象，它提供了多种方法来发送响应给客户端。通过 `res` 对象，你可以设置响应头、状态码、响应体等。

#### 常用的 `res` 方法：

- **`res.send(data)`**：发送响应体给客户端（可以是字符串、JSON 对象等）。
- **`res.json(data)`**：发送 JSON 格式的响应体。
- **`res.status(code)`**：设置响应状态码。
- **`res.set(header)`**：设置响应头。
- **`res.cookie(name, value, options)`**：设置响应中的 cookie。
- **`res.clearCookie(name, options)`**：清除响应中的 cookie。
- **`res.redirect(url)`**：发送重定向响应。
- **`res.end()`**：结束响应。

### 3. `next`（Next 函数）

`next` 是一个函数，用于将控制权传递给下一个中间件或路由处理器。如果当前中间件没有处理完请求，或者需要让后续的中间件继续处理，就需要调用 `next()`。

#### 使用 `next` 的场景：

- **传递控制权**：当当前中间件完成其任务后，调用 `next()` 将控制权传递给下一个中间件或路由处理器。
- **错误处理**：如果在中间件中发生错误，可以通过调用 `next(err)` 将错误传递给错误处理中间件。

#### 示例：

```javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // 将控制权传递给下一个中间件
});

app.get('/', (req, res, next) => {
  if (!req.query.name) {
    const err = new Error('Name parameter is required');
    err.status = 400;
    next(err); // 将错误传递给错误处理中间件
  } else {
    res.send(`Hello, ${req.query.name}`);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({ error: err.message });
});
```

### 总结

- **`req`**：表示 HTTP 请求，包含请求相关的所有信息。
- **`res`**：表示 HTTP 响应，提供多种方法来发送响应给客户端。
- **`next`**：用于将控制权传递给下一个中间件或路由处理器，或用于错误处理。

## express处理跨域

### CORS

```javascript
// 手动设置 CORS
app.use((req, res, next) => {
  // 允许所有来源访问
  res.header('Access-Control-Allow-Origin', '*');

  // 允许的 HTTP 方法
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // 允许的请求头
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});
```

```javascript
//自动处理
// 允许所有跨域请求
app.use(cors());
// 如果需要更细粒度的控制，可以配置 CORS
// 例如，只允许特定域名的请求
app.use(cors({
  origin: 'http://example.com' // 只允许来自 http://example.com 的请求
}));
```

## 公网部署

要将一个前后端分离的项目（后端使用 Express）通过 Nginx 部署到公网，可以按照以下步骤操作。这些步骤包括配置 Nginx 作为反向代理、部署前端静态资源、配置 Express 后端服务，以及确保公网可以访问。

#### 步骤 1：安装 Nginx

1. **下载并安装 Nginx**：

   - 访问 Nginx 官方网站下载页面：[Nginx Download](http://nginx.org/en/download.html) 。
   - 根据你的操作系统选择合适的版本下载并安装。

2. **启动 Nginx**：

   - 在 Windows 上，解压下载的文件并运行 `nginx.exe`。

   - 在 Linux 上，可以使用以下命令启动 Nginx：

     ```bash
     sudo systemctl start nginx
     ```

#### 步骤 2：配置 Nginx 作为反向代理

1. **编辑 Nginx 配置文件**：

   - Nginx 的配置文件通常位于 `/etc/nginx/nginx.conf` 或 `/etc/nginx/sites-available/default`（取决于你的操作系统和安装方式）。

   - 打开配置文件并添加以下内容：

     ```nginx
     server {
         listen 80;  ## 监听 80 端口
         server_name your_domain_or_IP;  ## 替换为你的域名或公网 IP
     
         ## 配置前端静态资源
         location / {
             root /path/to/your/frontend/dist;  ## 替换为前端项目的 dist 文件夹路径
             try_files $uri $uri/ /index.html;  ## 用于支持前端路由
         }
     
         ## 配置后端服务
         location /api {
             proxy_pass http://localhost:3000;  ## 替换为你的 Express 服务器地址和端口
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header X-Forwarded-Proto $scheme;
         }
     }
     ```

2. **重启 Nginx 以应用配置**：

   - 在 Windows 上，关闭并重新运行 `nginx.exe`。

   - 在 Linux 上，运行以下命令：

     ```bash
     sudo systemctl restart nginx
     ```

#### 步骤 3：部署前端静态资源

1. **构建前端项目**：

   - 如果你使用的是 Vue.js，运行以下命令构建项目：

     ```bash
     npm run build
     ```

   - 构建成功后，会在项目下生成一个 `dist` 文件夹，里面存放项目所需的 `js`、`css`、`html` 和网站图标 `favicon.ico`。

2. **将构建后的文件复制到 Nginx 的静态资源目录**：

   - 将 `dist` 文件夹的内容复制到 `/path/to/your/frontend/dist`（根据你的 Nginx 配置文件中的 `root` 指定的路径）。

#### 步骤 4：启动 Express 后端服务

1. **进入后端项目目录**：

   ```bash
   cd /path/to/your/express-project
   ```

2. **安装项目依赖**：

   ```bash
   npm install
   ```

3. **启动后端服务**：

   ```bash
   npm start
   ```

#### 步骤 5：确保防火墙允许访问

确保你的服务器防火墙允许外部访问 Nginx 监听的端口（默认是 80）。

- 在 Windows 上，可以通过控制面板中的防火墙设置添加规则。

- 在 Linux 上，可以使用以下命令：

  ```bash
  sudo ufw allow 'Apache Full'
  sudo ufw enable
  ```

#### 步骤 6：测试公网访问

1. **在浏览器中访问你的服务器**：
   - 使用你的公网 IP 地址或域名访问你的服务器，例如 `http://your_public_ip` 或 `http://your_domain.com`。
   - 如果一切配置正确，你应该能够看到你的前端页面，并且前端页面可以通过 `/api` 路径访问后端服务。

#### 额外建议：使用内网穿透工具

如果你的服务器位于内网，没有公网 IP，可以使用内网穿透工具如 [花生壳](https://blog.csdn.net/BiandanLoveyou/article/details/138919361) 或 [frp](https://www.cnblogs.com/jingzh/p/18798370) 来实现公网访问。

##  CI/CD 部署

要实现前后端分离项目的 CI/CD 部署，可以使用 GitLab、Jenkins、Docker 和 Nginx 等工具。以下是一个基于 Docker Compose 的 CI/CD 部署方案，包括 Jenkins 作为 CI/CD 工具，GitLab 作为代码仓库，以及 Nginx 作为反向代理。

#### 1. 环境准备

##### 安装 Docker 和 Docker Compose

- **安装 Docker**：

  ```bash
  sudo apt-get update
  sudo apt-get install -y docker.io
  ```

- **安装 Docker Compose**：

  ```bash
  sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  ```

#### 2. 创建项目目录

创建用于存放配置文件和数据卷的目录：

```bash
mkdir -p /home/docker/{compose,jenkins_home,nginx,html}
```

#### 3. 编写 `docker-compose.yml` 文件

在 `/home/docker/compose` 目录下创建 `docker-compose.yml` 文件，内容如下：

```yaml
version: '3'

services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    restart: always
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - /home/docker/jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose

  nginx:
    image: nginx:alpine
    container_name: nginx
    restart: always
    ports:
      - "80:80"
    volumes:
      - /home/docker/nginx/conf:/etc/nginx/conf.d
      - /home/docker/html:/usr/share/nginx/html
```

#### 4. 配置 Nginx

在 `/home/docker/nginx/conf` 目录下创建 `default.conf` 文件，内容如下：

```nginx
server {
    listen 80;
    server_name your_domain_or_IP;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 5. 配置 Jenkins

##### 初始化 Jenkins

- 启动 Jenkins：

  ```bash
  docker-compose up -d
  ```

- 获取初始管理员密码：

  ```bash
  docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
  ```

- 访问 `http://your_domain_or_IP:8080`，使用初始密码完成安装。

##### 配置 Jenkins 任务

- **创建前端构建任务**：

  - 源码管理：选择 Git，输入你的前端项目仓库地址。

  - 构建触发器：选择轮询 SCM 或使用 Webhook。

  - 构建环境：添加构建步骤，执行 Shell 命令：

    ```bash
    npm install
    npm run build
    ```

- **创建后端构建任务**：

  - 源码管理：选择 Git，输入你的后端项目仓库地址。

  - 构建触发器：选择轮询 SCM 或使用 Webhook。

  - 构建环境：添加构建步骤，执行 Shell 命令：

    ```bash
    npm install
    npm start
    ```

#### 6. 部署前端和后端

##### 前端部署

- 前端构建完成后，将 `dist` 文件夹复制到 `/home/docker/html` 目录下。

##### 后端部署

- 后端构建完成后，确保后端服务运行在本地端口 3000 上。

#### 7. 测试部署

- 访问 `http://your_domain_or_IP`，确保前端页面可以正常访问。
- 访问 `http://your_domain_or_IP/api`，确保后端接口可以正常访问。

通过以上步骤，你可以实现前后端分离项目的 CI/CD 部署。如果有任何问题，请随时告诉我！