### 一、前端工程化的整体流程

前端工程化是一个整体，从**前端开始写代码** --> **如何构建** --> **如何发布测试** --> **如何上线** --> **上线后的应用状态如何监控等**

![示例图片](./images/engineering-1.jpg)

1.从创建项目与开发阶段--> 我们要使用脚手架，对应的Eslint规范以及我们要使用什么UI组件库 

2.CI --> 持续集成： 在一个集中的环境去构建我们的项目(避免不同协作人员环境不同带来的Bug) 

3. CD --> 持续部署

### 二、大厂工程化实践及开源方案

**蚂蚁金服**开源的 [UmiJS](https://v3.umijs.org/zh-CN/); (React，包含基础配置比如路由、mock、构建(Webpack)、部署)

**阿里**开源的 [飞冰](https://iceteam.gitee.io/)（React，数据请求、状态管理、日志打印、菜单配置等等）

字节跳动开源的 [MODERN.js](https://modernjs.dev/)（按照业务场景把功能做了一个更细致的分类，比如：正常网站、中后台、桌面应用、微前端等等，主要的是支持Vue）

### 何为前端工程化

前端工程化是指将软件工程的原理和方法应用到前端开发中，以提高开发效率、代码质量和可维护性。随着 Web 应用的复杂度不断增加，传统的前端开发方式已经难以满足需求，因此引入了工程化的概念来更好地管理和优化前端开发流程。前端工程化主要包括以下几个方面：

#### 1. **项目构建工具**

使用自动化构建工具（如 Webpack, Vite, Parcel 等）来处理和打包前端资源（JavaScript, CSS, 图片等），从而简化开发流程，提升开发体验。这些工具通常支持模块化开发、代码压缩、混淆、热更新等功能。

#### 2. **模块化开发**

采用模块化的开发模式（如 ES6 模块、CommonJS、AMD 等），可以将代码拆分为更小、更易于管理的部分，有助于团队协作和代码复用。每个模块负责单一功能，并且通过明确的接口与其他模块交互。

#### 3. **组件化开发**

基于组件的思想构建用户界面，比如 React、Vue 和 Angular 中的组件。组件是独立且可复用的 UI 构建块，它们封装了自身的逻辑和样式，可以在不同的页面或应用之间共享。

#### 4. **版本控制**

利用 Git 或其他版本控制系统来跟踪代码的变化历史，方便团队成员之间的协作开发，确保项目的稳定性和可回溯性。

#### 5. **持续集成/持续部署 (CI/CD)**

设置 CI/CD 流程自动化测试、构建和部署过程，保证每次代码变更都能经过严格的测试并顺利上线，减少人工操作带来的风险。

#### 6. **静态代码分析**

通过 ESLint、Prettier 等工具进行静态代码分析，帮助开发者遵循编码规范，提前发现潜在的问题，如语法错误、风格不一致等。

#### 7. **性能优化**

采取各种措施优化 Web 应用的加载速度和运行性能，例如图片懒加载、服务端渲染（SSR）、客户端缓存策略、减少 HTTP 请求次数、使用 CDN 分发静态资源等。

#### 8. **文档生成与维护**

保持良好的文档习惯，包括但不限于 API 文档、架构设计文档、开发指南等，这不仅有助于新人快速上手项目，也能为后续的维护提供便利。

#### 9. **依赖管理**

合理地管理和更新第三方库依赖，确保项目所使用的库是最新的同时避免引入不必要的安全漏洞。常用工具如 pnpm、npm、yarn 可以有效地管理 JavaScript 包依赖。

#### 10. **单元测试与集成测试**

编写测试用例对组件的功能进行验证，保证在修改代码后不会破坏现有功能；集成测试则用于检查不同模块之间的协同工作是否正常。

通过上述措施，前端工程化旨在打造一个高效、可靠、易扩展的前端开发环境，使得大型复杂的 Web 应用程序能够更加稳健地开发和迭代。

#### 小结

- 前端开发管理工具集
- 降低开发成本，提升开发效率

### 何为模块化（代码的分解和聚合）

模块化是一种软件设计原则，它提倡将一个复杂的系统分解为多个独立的、可复用的部分（即模块），每个模块负责实现特定的功能或解决特定的问题。通过这种方式，可以简化系统的复杂性，提高代码的组织性和可维护性。在前端开发中，模块化具体表现为以下几个方面：

#### 1. **定义清晰的接口**

每个模块都应该有明确的输入和输出，这样其他部分的代码就可以方便地调用该模块而不需要了解其内部工作原理。这种做法提高了代码的解耦程度，使得各个模块之间的依赖关系更加松散。

#### 2. **功能单一性**

遵循“单一职责原则”，确保每个模块只做一件事并且做好。如果一个模块需要处理多种任务，则应该考虑将其拆分成更小的模块。这样做有助于减少错误的发生，并且便于测试和调试。

#### 3. **易于测试**

由于模块是独立存在的，因此可以单独对其进行单元测试。这不仅加快了测试速度，也更容易定位问题所在。此外，良好的模块化设计还可以促进集成测试，以验证不同模块之间的交互是否正确。

#### 4. **高内聚低耦合**

高内聚意味着模块内部的组件紧密相关，专注于完成某一特定功能；低耦合则表示模块之间相互依赖较少，改变一个模块不会对其他模块造成太大影响。这样的结构有利于系统的扩展和维护。

#### 5. **复用性**

一旦某个模块被创建并经过充分测试后，可以在不同的项目或者同一项目的不同地方重复使用这个模块，从而避免重复劳动，提升开发效率。

#### 6. **代码分割与懒加载**

在现代前端框架（如 Vue, React）中，可以通过路由级别的代码分割和懒加载技术来实现按需加载模块，减少初始加载时间，优化用户体验。

#### 7. **模块化的实现方式**

##### JavaScript 模块系统

- **CommonJS**：Node.js 默认采用的模块化方案，基于文件的方式定义模块，使用 `require()` 加载模块。
- **AMD (Asynchronous Module Definition)**：异步加载模块的标准，主要用于浏览器端，`define()` 和 `require()` 是它的核心方法。
- **ES6 Modules**：ECMAScript 标准引入的原生模块化解决方案，使用 `import` 和 `export` 关键字进行模块导入导出。这是目前最广泛接受和支持的模块化标准之一。

##### 模块打包工具

为了更好地管理和打包这些模块，前端开发者通常会使用构建工具（如 Webpack, Vite, Parcel 等）。它们能够解析项目中的各种资源文件（JavaScript, CSS, 图片等），根据依赖关系生成最终的输出文件。

### 模块化标准以及解决什么问题

- 函数
- 解决文件分解（全局污染）和聚合（依赖混乱）的问题

#### 民间/社区标准

模块化标准是指在软件开发中，为了确保不同模块之间可以正确交互、共享资源，并且能够被有效地管理和维护而设立的一套规则和协议。特别是在前端开发领域，JavaScript 的模块化标准经历了多个阶段的发展。以下是几种主流的 JavaScript 模块化标准：

#### 1. **CommonJS**

- **简介**：这是 Node.js 中默认使用的模块系统。它基于文件的方式定义模块，每个文件被视为一个独立的模块。

- 导入导出

  ：

  - 导入模块使用 `require()` 函数。
  - 导出模块成员通过 `module.exports` 或直接修改 `exports` 对象。

- **特点**：同步加载模块，适用于服务器端环境。

```javascript
javascript 代码解读复制代码// 导出模块
module.exports = function() {
  console.log('Hello from CommonJS');
};

// 导入模块
const myModule = require('./myModule');
```

#### 2. **AMD (Asynchronous Module Definition)**

- **简介**：专门为浏览器端设计的一种异步加载模块的标准，常与 RequireJS 一起使用。

- 导入导出

  ：

  - 使用 `define()` 定义模块，接受依赖作为参数。
  - `require()` 用来加载模块。

- **特点**：支持异步加载，适合浏览器环境下动态加载模块。

```javascript
javascript 代码解读复制代码// 定义模块
define(['dependency'], function(dependency) {
  return function() {
    console.log('Hello from AMD');
  };
});

// 加载模块
require(['module'], function(module) {
  module();
});
```

#### 3. **UMD (Universal Module Definition)**

- **简介**：UMD 是一种兼容多种模块系统的格式，旨在同时支持 CommonJS、AMD 和全局变量（即浏览器中的 `<script>` 标签）。
- **特点**：提供了跨平台的支持，使得同一个模块可以在不同的环境中无缝工作。

```javascript
javascript 代码解读复制代码(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['b'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('b'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.b);
  }
}(this, function (b) {
  // module implementation
}));
```

#### 4. **CMD (Common Module Definition, 更常指 Sea.js 的模块定义方式)**

- **设计目的**：CMD 是由国内开发者提出的模块定义规范，主要用于 Sea.js 这样的模块加载器。它的设计理念与 CommonJS 类似，但在某些方面进行了优化，更适合浏览器环境。
- **主要用途**：CMD 主要用于浏览器端开发，并且 Sea.js 提供了对 CMD 的原生支持。
- **实现工具**：Sea.js 是最著名的 CMD 实现之一。
- **语法特点**：
  - 使用 `define()` 来定义模块，支持按需加载和延迟执行。
  - `require` 和 `exports` 用于同步加载依赖项，而 `require.async` 则用于异步加载。

```javascript
javascript 代码解读复制代码// 定义模块
define(function(require, exports, module) {
  var dependency = require('./dependency');
  
  exports.greet = function() {
    console.log('Hello from CMD');
  };
});

// 同步加载模块
var myModule = require('./myModule');

// 异步加载模块
require.async('./asyncModule', function(asyncModule) {
  asyncModule();
});
```

#### **官方标准**

#### 1. **ES6 Modules (ECMAScript 2015 Modules)** 编译时方案

- **简介**：这是 ECMAScript 规范中正式引入的原生模块化方案，已经被所有现代浏览器广泛支持。

- 导入导出

  ：

  - 使用 `import` 关键字导入模块。
  - 使用 `export` 关键字导出模块成员。

- **特点**：静态分析友好，允许工具链进行优化；支持按需加载（Tree Shaking），有助于减少打包体积。

```javascript
javascript 代码解读复制代码// 导出模块
export function greet() {
  console.log('Hello from ES6 Modules');
}

// 默认导出
export default class Greeter {}

// 导入模块
import { greet } from './greet.js';
import Greeter from './Greeter.js';
```

#### ２. **Harmony Modules (ES Harmony)**

- **简介**：这是 ES6 Modules 的早期名称，在 ES6 正式发布之前，一些浏览器已经开始实验性地实现了这些特性。
- **现状**：随着 ES6 Modules 成为官方标准，"Harmony Modules" 这个术语已经不再常用。

#### 当前趋势

目前，**ES6 Modules（编译时）** 已经成为最主流的 JavaScript 模块化标准，因为它是由 ECMAScript 标准委员会制定的官方规范，得到了广泛的社区支持和技术栈集成。大多数现代前端框架（如 Vue, React, Angular 等）以及构建工具（如 Webpack, Vite, Parcel 等）都内置了对 ES6 Modules 的支持。因此，如果你正在启动一个新的项目，推荐优先考虑使用 ES6 Modules。**CommonJS（运行时）**　也很庞大随着ｎｏｄｅｊｓ的发展而发展，其他几种目前不是很推荐使用了；

### **ES6 Modules 和 CommonJS 之间的一些主要区别**

#### 1. **加载机制**

- **CommonJS**：
  - **同步加载**：CommonJS 模块是同步加载的，这意味着当 `require()` 被调用时，程序会阻塞并等待模块加载完成。
  - **运行时解析**：依赖关系是在代码执行期间动态解析的，即当你调用 `require()` 函数时才加载模块。
- **ES6 Modules**：
  - **异步加载**：ES6 Modules 支持静态分析和按需加载（例如通过 `<script type="module">` 标签），因此它们可以异步加载，不会阻塞主线程。
  - **编译时解析**：依赖关系是在编译阶段就确定下来了，这允许工具链进行更深入的优化，如 Tree Shaking（去除未使用的代码）。

#### 2. **导入导出语法**

- CommonJS

  ：

  - **导出**：使用 `module.exports` 或 `exports` 对象来导出成员。
  - **导入**：使用 `require()` 函数来导入模块。

```javascript
javascript 代码解读复制代码// 导出模块 (CommonJS)
module.exports = function greet() {
  console.log('Hello from CommonJS');
};

// 导入模块 (CommonJS)
const greet = require('./greet');
```

- ES6 Modules

  ：

  - **导出**：使用 `export` 关键字来导出函数、类或变量；也可以使用 `export default` 来定义默认导出。
  - **导入**：使用 `import` 关键字来导入模块，支持命名导入、默认导入等。

```javascript
javascript 代码解读复制代码// 导出模块 (ES6 Modules)
export function greet() {
  console.log('Hello from ES6 Modules');
}

export default class Greeter {}

// 导入模块 (ES6 Modules)
import { greet } from './greet.js';
import Greeter from './Greeter.js';
```

#### 3. **单例 vs 多例**

- **CommonJS**：每次 `require()` 同一个模块都会返回同一个实例，即模块是单例模式。
- **ES6 Modules**：每个模块都是一个新的实例，除非显式地共享状态。这使得模块的行为更加可预测，减少了意外的副作用。

#### 4. **互操作性**

- **CommonJS**：Node.js 原生支持 CommonJS，但可以通过 Babel 或其他转译器将 ES6 Modules 转换为 CommonJS 以在 Node.js 中使用。
- **ES6 Modules**：现代浏览器原生支持 ES6 Modules，但在 Node.js 中需要特定的配置（如 `.mjs` 文件扩展名或启用实验性的 `--experimental-modules` 标志）。不过，从 Node.js v12 开始，对 ES6 Modules 的支持逐渐增强，到了 Node.js v14 及以上版本，这种支持变得更加稳定和成熟。

#### 5. **性能与优化**

- **ES6 Modules**：由于其静态解析特性，构建工具可以更好地理解模块之间的依赖关系，从而实现更高效的打包和优化策略，如 Tree Shaking。
- **CommonJS**：因为依赖关系是在运行时确定的，所以很难在编译阶段进行类似的优化。

#### 小结

尽管 CommonJS 在 Node.js 环境中依然非常重要，并且对于服务器端开发来说仍然是一个非常强大的选择，但 ES6 Modules 因其更好的性能、更灵活的语法以及广泛的社区支持，已经成为现代前端开发的首选。如果你正在启动一个新的项目，尤其是在客户端应用中，推荐优先考虑使用 ES6 Modules。然而，在某些情况下，比如处理遗留系统或特定的 Node.js 模块时，你可能仍然需要使用 CommonJS。

### **包管理器 (Package Manager)**　（一系列模块集合）

包管理器是用于自动化处理软件包（库、框架等）的安装、更新、配置和删除的工具。在 JavaScript 和 Node.js 生态系统中，最常用的包管理器包括 npm、Yarn 和 pnpm。它们简化了依赖管理和项目构建过程，使得开发者可以更专注于编写业务逻辑。

#### 1. **npm (Node Package Manager)**

- **简介**：npm 是 Node.js 的默认包管理器，也是世界上最大的软件注册表之一。它提供了丰富的命令行接口来管理依赖项，并且拥有庞大的社区支持。

- 特点

  ：

  - 安装全局或本地的 npm 包。
  - 自动生成 `package.json` 文件以记录项目的依赖关系。
  - 支持脚本命令，允许你定义和运行自定义任务。
  - 内置安全审计功能，帮助识别潜在的安全问题。

- 使用示例：

  ```bash
  bash 代码解读复制代码## 初始化一个新的 npm 项目
  npm init
  
  ## 安装一个依赖包到项目中
  npm install <package-name>
  
  ## 更新所有依赖包到最新版本
  npm update
  
  ## 运行自定义脚本
  npm run <script-name>
  ```

#### 2. **Yarn**

- **简介**：由 Facebook 开发并维护，旨在解决 npm 在速度和安全性方面的一些局限性。Yarn 通过锁文件 (`yarn.lock`) 来确保不同环境中依赖的一致性。

- 特点：

  - 更快的安装速度，得益于并行化下载和缓存机制。
  - 确定性的安装，保证每次安装的结果相同。
  - 提供了更好的离线模式支持。

- 使用示例：

  ```bash
  bash 代码解读复制代码## 初始化一个新的 Yarn 项目
  yarn init
  
  ## 安装一个依赖包到项目中
  yarn add <package-name>
  
  ## 更新所有依赖包到最新版本
  yarn upgrade
  
  ## 运行自定义脚本
  yarn run <script-name>
  ```

#### 3. **pnpm**

- **简介**：pnpm 是一种新型的包管理器，它解决了传统 npm 和 Yarn 在磁盘空间利用率上的不足，采用了一种称为“内容可寻址存储”的方法来存储依赖包。

- 特点：

  - 极大地节省磁盘空间，因为相同的依赖只保存一份副本。
  - 快速安装速度，同样利用了并行化下载。
  - 与 npm 和 Yarn 兼容，可以直接替换现有工作流。

- 使用示例：

  ```bash
  bash 代码解读复制代码## 初始化一个新的 pnpm 项目
  pnpm init
  
  ## 安装一个依赖包到项目中
  pnpm add <package-name>
  
  ## 更新所有依赖包到最新版本
  pnpm update
  
  ## 运行自定义脚本
  pnpm run <script-name>
  ```

#### 4. **其他包管理器**

虽然 npm、Yarn 和 pnpm 是目前最流行的 JavaScript/Node.js 包管理器，但也存在一些其他的选项：

- **Bower**（已废弃）：曾经是一个流行的前端包管理器，但由于其设计限制（如缺乏对嵌套依赖的支持），已经被社区广泛弃用。
- **Volta**：专门为 Node.js 应用提供一致的开发环境，能够自动切换 Node.js 版本。

#### 选择合适的包管理器

选择哪种包管理器取决于你的具体需求和技术栈偏好。对于大多数新项目来说，npm 和 pnpm 是非常好的选择，因为它们都提供了出色的性能和广泛的社区支持。如果你需要特别关注依赖一致性或更快的安装速度，那么 Yarn 或 pnpm 可能更适合你。此外，随着 pnpm 的快速发展及其独特的内容可寻址存储特性，在大型项目或多团队协作环境中，pnpm 正变得越来越受欢迎。

无论选择哪一个包管理器，确保遵循最佳实践，例如使用锁文件来固定依赖版本、定期检查和更新依赖以保持安全性和兼容性。

确实，选择哪种包管理器应该基于项目的具体需求和技术栈偏好。以下是更详细的分析，帮助你更好地理解如何根据这些因素做出选择：

#### 1. **npm 和 pnpm 的出色性能与广泛支持**

- **npm**：作为 Node.js 的默认包管理器，npm 拥有一个庞大的生态系统和活跃的社区。它不仅提供了丰富的命令行接口来管理依赖项，还拥有内置的安全审计功能，帮助识别潜在的安全问题。npm 的 `package-lock.json` 文件确保了不同环境中依赖的一致性。
- **pnpm**：pnpm 是一个快速且节省磁盘空间的包管理工具，它通过内容可寻址存储（CAS）机制来避免重复下载相同的依赖包，从而提高了安装速度并减少了磁盘使用量。对于大型项目或多团队协作环境，pnpm 的优势尤为明显，因为它能够有效减少多项目间的依赖冗余，并且对 monorepos 提供了良好的支持。

#### 2. **Yarn 和 pnpm 的依赖一致性及安装速度**

- **Yarn**：Yarn 引入了 `yarn.lock` 文件，确保了不同环境中依赖的一致性。它的并行化下载机制显著提升了安装速度，尤其是在网络条件较好的情况下。此外，Yarn 支持离线模式，即使没有互联网连接也能安装之前缓存过的依赖包。
- **pnpm**：除了上述提到的优点外，pnpm 还以其高效的磁盘空间管理和安装性能著称。它采用了硬链接和符号链接的方式将依赖包安装到每个项目的 `node_modules` 目录下，这不仅加快了安装过程，也保证了依赖关系的清晰度，避免了嵌套过深的问题。

#### 3. **pnpm 在大型项目中的应用**

随着 pnpm 的快速发展，越来越多的企业级项目开始采用它作为首选的包管理工具。pnpm 的独特之处在于它可以有效地处理复杂的依赖关系，并且在多项目环境下表现出色。例如，在 monorepo 架构中，pnpm 能够很好地管理多个包之间的依赖，同时保持高效的工作流。

#### 4. **最佳实践建议**

无论选择了哪一种包管理器，遵循以下最佳实践都是非常重要的：

- **使用锁文件固定依赖版本**：无论是 npm 的 `package-lock.json` 还是 Yarn 的 `yarn.lock`，锁文件都能确保每次安装的结果一致，这对于维护项目的稳定性和可重复构建至关重要。
- **定期检查和更新依赖**：随着时间推移，新的安全补丁和功能改进会被添加到各个库中。因此，定期运行如 `npm audit` 或者 `yarn upgrade` 来查找并修复可能存在的漏洞或兼容性问题是必要的。
- **关注安全性**：所有现代包管理器都提供了一定程度的安全保障措施，比如加密哈希验证、安全警告等。确保你的开发流程中包含了这些特性，以保护应用程序免受恶意软件的影响。

综上所述，虽然 npm 和 pnpm 都是非常优秀的选项，但在特定场景下，Yarn 或 pnpm 可能会更适合某些开发者的需求。特别是当涉及到依赖一致性和安装速度时，Yarn 和 pnpm 各有千秋；而对于大型项目或多团队协作环境，则应优先考虑 pnpm 的优势。最终的选择应当结合自身的技术栈以及项目的实际需求来决定。

### 使用 pnpm 搭建 monorepo

使用 pnpm 搭建 monorepo 项目可以极大地简化多项目管理和依赖处理。pnpm 提供了对 monorepos 的原生支持，使得开发者能够在一个单一的代码仓库中管理多个包或应用。以下是详细的步骤指南，帮助你构建一个基于 pnpm 的 monorepo 结构。

#### 1. 安装 pnpm

首先确保你的环境中已经安装了 Node.js 和 npm。然后全局安装 pnpm：

```bash
bash

 代码解读
复制代码npm install -g pnpm
```

验证安装是否成功：

```bash
bash

 代码解读
复制代码pnpm -v
```

#### 2. 创建并初始化项目目录

创建一个新的文件夹作为 monorepo 的根目录，并进入该文件夹：

```bash
bash 代码解读复制代码mkdir my-monorepo
cd my-monorepo
```

初始化项目，生成 `package.json` 文件：

```bash
bash

 代码解读
复制代码pnpm init
```

#### 3. 配置工作空间（Workspace）

在项目的根目录下创建 `pnpm-workspace.yaml` 文件，用于定义哪些目录下的包属于这个 monorepo：

```yaml
yaml 代码解读复制代码## pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

这里我们假设所有的子包都将存放在 `packages/` 目录下，而应用程序则放置于 `apps/` 目录。

#### 4. 添加子项目

根据需要，在 `packages/` 或 `apps/` 目录下创建子项目，并为每个子项目初始化 `package.json` 文件。例如，添加一个名为 `utils` 的工具库：

```bash
bash 代码解读复制代码mkdir -p packages/utils
cd packages/utils
pnpm init -y
```

编辑 `packages/utils/package.json` 来指定其名称、版本和其他相关信息：

```json
json 代码解读复制代码{
  "name": "utils",
  "version": "0.0.0",
  "main": "./index.ts",
  "module": "./index.ts"
}
```

同样地，你可以按照这种方式添加更多的子项目或应用程序。

#### 5. 安装依赖

对于公共依赖项，可以直接在根目录的 `package.json` 中添加，并使用 `-w` 参数将它们安装到整个工作区范围内：

```bash
bash

 代码解读
复制代码pnpm add <dependency-name> -w
```

对于特定于某个子项目的依赖，则可以在相应的子项目目录内执行安装命令，或者通过 `--filter` 参数指定要影响的包：

```bash
bash

 代码解读
复制代码pnpm --filter <package-name> add <dependency-name>
```

#### 6. 跨项目依赖

为了让一个子项目依赖另一个子项目，可以在子项目的 `package.json` 中添加依赖声明，并使用 `workspace:*` 来引用其他工作区内的包：

```json
json 代码解读复制代码{
  "dependencies": {
    "utils": "workspace:*"
  }
}
```

这告诉 pnpm 从当前的工作区中查找最新的 `utils` 版本。

#### 7. 构建与运行脚本

为了方便管理所有子项目的构建和测试任务，可以在根目录的 `package.json` 中定义一些脚本命令，利用 `pnpm recursive` 来批量执行这些命令：

```json
json 代码解读复制代码{
  "scripts": {
    "build": "pnpm -r run build",
    "test": "pnpm -r run test"
  }
}
```

这样就可以一次性对所有相关联的子项目进行构建或测试。

#### 8. ESLint, Prettier 等工具配置

为了保证代码风格的一致性，可以在 monorepo 的根目录设置统一的 ESLint 和 Prettier 规则，并将其安装为开发依赖：

```bash
bash

 代码解读
复制代码pnpm add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser -D -w
```

接着初始化 ESLint 并配置 `.eslintrc.json` 文件：

```bash
bash

 代码解读
复制代码npx eslint --init
```

同时也可以为 Prettier 创建配置文件 `.prettierrc.json`：

```json
json 代码解读复制代码{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "bracketSpacing": true
}
```

#### 9. Git Hooks

为了确保提交前的质量检查，可以集成 Git Hooks 工具如 Husky 和 Lint-Staged。先安装必要的依赖：

```bash
bash

 代码解读
复制代码pnpm add husky lint-staged -D -w
```

初始化 Husky：

```bash
bash

 代码解读
复制代码npx husky install
```

添加预提交钩子以运行 ESLint：

```bash
bash

 代码解读
复制代码npx husky add .husky/pre-commit "pnpm lint"
```

以上步骤完成后，你就拥有了一套完整的基于 pnpm 的 monorepo 开发环境。这种结构不仅有助于组织复杂的前端工程，还能提高团队协作效率，减少重复劳动。

### JS工具链

#### 兼容性

- API 兼容 polyfill 代表 [core-js](https://link.juejin.cn?target=https%3A%2F%2Fgitee.com%2Findependenter_admin%2Fcore-js%2F%23usage)
- 语法增强 代表 syntax transformer （runtime 运行时）语法转换器

下面来着重介绍一下这个 core-js

#### core-js功能特点

#### core-js支持最新的 ECMAScript 标准

`core-js` 不仅支持已发布的 ECMAScript 标准，还涵盖了处于不同阶段的提案。这使得开发者可以在他们的项目中试验即将成为标准的新特性，同时保持良好的浏览器兼容性

#### core-js模块化设计

`core-js` 的一大亮点在于其高度模块化的设计，允许开发者只引入他们需要的部分。这种按需加载的方式有助于减少最终打包文件的大小，从而提高应用性能。此外，`core-js` 可以在不污染全局命名空间的情况下工作，这意味着它可以与其他库或框架很好地共存，而不会引起命名冲突

#### core-js与工具链集成

`core-js` 设计时考虑到了与现代构建工具的良好集成。例如，它与 Babel 高度兼容，可以通过 `@babel/preset-env` 和 `@babel/transform-runtime` 插件轻松配置，以便根据目标浏览器列表自动选择合适的 polyfills。对于 Webpack 用户来说，还可以利用 `core-js-compat` 包来优化 polyfill 的选择，确保只包含必要的代码

#### 安装与使用

安装 `core-js` 非常简单，可以通过 npm 或 yarn 进行安装：

```bash
bash 代码解读复制代码深色版本
npm install --save core-js
```

或者

```bash
bash

 代码解读
复制代码yarn add core-js
```

接下来，你可以选择全局导入所有 polyfills，也可以根据需要单独导入特定的功能。为了更好地控制哪些 polyfills 被包含进来，推荐的做法是在入口文件之前添加如下语句：

```javascript
javascript 代码解读复制代码import 'core-js/stable'; // 引入稳定版的 ES polyfills
// 或者更具体地
import 'core-js/features/array/from'; // 只引入 Array.from 的 polyfill
```

如果你正在使用 Babel，则可能不需要手动导入 `core-js`，因为 `@babel/preset-env` （预设 一堆内置插件）会自动处理这一过程。只需确保你的 `.browserslistrc` 文件中定义了正确的目标浏览器范围，Babel 就会据此决定需要哪些 polyfills（`.browserslistrc` 文件的作用是定义前端项目所支持的目标浏览器范围，这对于确保代码在不同浏览器中的兼容性至关重要。它被多个前端工具使用，如 Babel、Autoprefixer 等，以决定如何处理代码转换和样式前缀添加等问题

#### 为什么需要 .browserslistrc？

当开发者编写现代 JavaScript 或 CSS 时，他们可能会用到一些较新的语法特性或 CSS 属性，这些可能并不是所有浏览器都能理解的。例如，某些浏览器可能不支持最新的 JavaScript 语法糖或是特定的 CSS 属性。通过配置 `.browserslistrc` 文件，开发者可以指定他们的应用程序应该支持哪些浏览器版本，这样像 Babel 这样的工具就能根据这个列表智能地添加必要的 polyfills 或者转译代码，确保最终生成的代码能够在目标浏览器中正确运行

此外，对于 CSS 来说，不同的浏览器对新特性的支持程度也各不相同。Autoprefixer 可以读取 `.browserslistrc` 中的信息，并据此自动为 CSS 规则添加所需的浏览器前缀，从而避免了手动管理这些复杂性和潜在错误的可能性

#### browserslistrc 基础语法

`.browserslistrc` 文件中的每一行代表一个查询条件，用来描述你希望支持的浏览器版本。以下是一些常见的例子：

- `last 1 version`: 包含每个浏览器的最新版本。
- `> 1%`: 全球范围内使用率超过 1% 的浏览器版本。
- `maintained node versions`: 所有由 Node.js 基金会维护的 Node.js 版本。
- `not dead`: 排除那些已经不再更新且全球使用率低于 0.5% 的浏览器版本

值得注意的是，在 2022 年 6 月 21 日之后，Browserslist 已经将 Internet Explorer 标记为已死，因此通常情况下不需要特别为 IE 添加额外的支持规则，除非项目确实有这方面的需求

#### browserslistrc 配置方式

除了创建单独的 `.browserslistrc` 文件外，还可以直接在 `package.json` 文件内设置 `browserslist` 字段来实现同样的效果。两种方法都可以有效地传达给相关工具你的项目打算支持哪些浏览器版本。如果同时存在这两种配置，则优先使用 `.browserslistrc` 文件中的设置

另外，为了适应不同的开发环境（如生产环境与开发环境），可以通过设置环境变量 `BROWSERSLIST_ENV` 或者 `NODE_ENV` 来指定不同的浏览器查询条件。这允许你在不同环境中应用不同的优化策略，比如在开发阶段专注于最新的浏览器特性，而在生产环境中更广泛地覆盖用户群体）

#### 语言增强

‌**前端中的语言增强**‌是指通过改进和扩展现有编程语言的功能和特性，以提升开发效率和代码质量。在前端开发中，语言增强主要体现在以下几个方面：

1. ‌**[ES6**](https://link.juejin.cn?target=https%3A%2F%2Fwww.baidu.com%2Fs%3Frsv_dl%3Dre_dqa_generate%26sa%3Dre_dqa_generate%26wd%3DES6%26rsv_pq%3De576cb1c02987e83%26oq%3D%E5%89%8D%E7%AB%AF%E4%B8%AD%E7%9A%84%E8%AF%AD%E8%A8%80%E5%A2%9E%E5%BC%BA%E6%98%AF%E4%BB%80%E4%B9%88%26rsv_t%3D3e24QtyaKdHsvG%2FccL%2BYoNpB0XIQLo6QnBzOYlc3h7vYC3UBixuJktVQ6%2Fg%26tn%3Dbaidu%26ie%3Dutf-8)及更高版本**‌：ES6引入了块级作用域、默认参数、箭头函数、解构赋值、扩展运算符、模板字符串等新特性，使得代码更加简洁、易于维护。此外，ES6还新增了`Map`、`Set`、`Proxy`、`Reflect`等数据结构和辅助函数，增强了处理对象的能力，使得异步编程更加直观‌1。
2. ‌**[TypeScript**](https://link.juejin.cn?target=https%3A%2F%2Fwww.baidu.com%2Fs%3Frsv_dl%3Dre_dqa_generate%26sa%3Dre_dqa_generate%26wd%3DTypeScript%26rsv_pq%3De576cb1c02987e83%26oq%3D%E5%89%8D%E7%AB%AF%E4%B8%AD%E7%9A%84%E8%AF%AD%E8%A8%80%E5%A2%9E%E5%BC%BA%E6%98%AF%E4%BB%80%E4%B9%88%26rsv_t%3D3e24QtyaKdHsvG%2FccL%2BYoNpB0XIQLo6QnBzOYlc3h7vYC3UBixuJktVQ6%2Fg%26tn%3Dbaidu%26ie%3Dutf-8)**‌：TypeScript是JavaScript的一个超集，添加了静态类型检查等特性。通过类型注解，TypeScript提供了更强的类型检查，帮助开发者在编码阶段发现潜在的类型错误，提高代码质量和开发效率‌2。
3. ‌**[Babel**](https://link.juejin.cn?target=https%3A%2F%2Fwww.baidu.com%2Fs%3Frsv_dl%3Dre_dqa_generate%26sa%3Dre_dqa_generate%26wd%3DBabel%26rsv_pq%3De576cb1c02987e83%26oq%3D%E5%89%8D%E7%AB%AF%E4%B8%AD%E7%9A%84%E8%AF%AD%E8%A8%80%E5%A2%9E%E5%BC%BA%E6%98%AF%E4%BB%80%E4%B9%88%26rsv_t%3D3e24QtyaKdHsvG%2FccL%2BYoNpB0XIQLo6QnBzOYlc3h7vYC3UBixuJktVQ6%2Fg%26tn%3Dbaidu%26ie%3Dutf-8)**‌：Babel是一个广泛使用的转译器，可以将ES6及更高版本的代码转译为向后兼容的JavaScript代码，使得开发者可以使用最新的JavaScript特性，同时保证老版本的浏览器也能正常运行代码‌1。
4. ‌**[Webpack**](https://link.juejin.cn?target=https%3A%2F%2Fwww.baidu.com%2Fs%3Frsv_dl%3Dre_dqa_generate%26sa%3Dre_dqa_generate%26wd%3DWebpack%26rsv_pq%3De576cb1c02987e83%26oq%3D%E5%89%8D%E7%AB%AF%E4%B8%AD%E7%9A%84%E8%AF%AD%E8%A8%80%E5%A2%9E%E5%BC%BA%E6%98%AF%E4%BB%80%E4%B9%88%26rsv_t%3D3e24QtyaKdHsvG%2FccL%2BYoNpB0XIQLo6QnBzOYlc3h7vYC3UBixuJktVQ6%2Fg%26tn%3Dbaidu%26ie%3Dutf-8)和[Rollup**](https://link.juejin.cn?target=https%3A%2F%2Fwww.baidu.com%2Fs%3Frsv_dl%3Dre_dqa_generate%26sa%3Dre_dqa_generate%26wd%3DRollup%26rsv_pq%3De576cb1c02987e83%26oq%3D%E5%89%8D%E7%AB%AF%E4%B8%AD%E7%9A%84%E8%AF%AD%E8%A8%80%E5%A2%9E%E5%BC%BA%E6%98%AF%E4%BB%80%E4%B9%88%26rsv_t%3D3e24QtyaKdHsvG%2FccL%2BYoNpB0XIQLo6QnBzOYlc3h7vYC3UBixuJktVQ6%2Fg%26tn%3Dbaidu%26ie%3Dutf-8)**‌：这些模块打包工具支持ES6模块化开发，帮助开发者更好地组织和管理项目，提高开发效率和代码复用性‌1。
5. ‌**[CSS Modules**](https://link.juejin.cn?target=https%3A%2F%2Fwww.baidu.com%2Fs%3Frsv_dl%3Dre_dqa_generate%26sa%3Dre_dqa_generate%26wd%3DCSS%20Modules%26rsv_pq%3De576cb1c02987e83%26oq%3D%E5%89%8D%E7%AB%AF%E4%B8%AD%E7%9A%84%E8%AF%AD%E8%A8%80%E5%A2%9E%E5%BC%BA%E6%98%AF%E4%BB%80%E4%B9%88%26rsv_t%3D3e24QtyaKdHsvG%2FccL%2BYoNpB0XIQLo6QnBzOYlc3h7vYC3UBixuJktVQ6%2Fg%26tn%3Dbaidu%26ie%3Dutf-8)和[Scoped CSS**](https://link.juejin.cn?target=https%3A%2F%2Fwww.baidu.com%2Fs%3Frsv_dl%3Dre_dqa_generate%26sa%3Dre_dqa_generate%26wd%3DScoped%20CSS%26rsv_pq%3De576cb1c02987e83%26oq%3D%E5%89%8D%E7%AB%AF%E4%B8%AD%E7%9A%84%E8%AF%AD%E8%A8%80%E5%A2%9E%E5%BC%BA%E6%98%AF%E4%BB%80%E4%B9%88%26rsv_t%3D3e24QtyaKdHsvG%2FccL%2BYoNpB0XIQLo6QnBzOYlc3h7vYC3UBixuJktVQ6%2Fg%26tn%3Dbaidu%26ie%3Dutf-8)**‌：这些技术通过封装CSS，避免全局污染，使得组件化开发成为可能，提高了代码的可维护性和复用性‌3。
6. **CSS 预处理器与 PostCSS** 虽然 HTML 和 CSS 并不是传统意义上的编程语言，但它们同样经历了显著的增强。CSS 预处理器如 SASS/SCSS、LESS 和 Stylus 引入了变量、混合宏、嵌套规则等功能，极大地简化了复杂样式表的设计过程。而 PostCSS 则是一个强大的插件平台，它可以进一步扩展 CSS 的能力，例如自动添加供应商前缀、优化输出大小等。这些工具共同作用，使得 CSS 更加富有表现力且易于管理，同时也提高了开发效率和维护性。
7. **WebAssembly (Wasm)** WebAssembly 是一种新兴的二进制格式，允许 C、C++、Rust 等编译型语言编写的高性能代码直接在浏览器中执行。它为前端带来了前所未有的计算能力和速度优势，尤其是在处理图像处理、音频视频编码解码、游戏渲染等需要大量计算资源的任务时表现出色，随着 WebAssembly 生态系统的不断完善，越来越多的开发者开始探索将其应用于日常工作中，以提升应用性能并拓宽可用技术栈的选择范围。
8. **渐进增强与响应式设计** 渐进增强是一种开发策略，它强调以分层的方式构建网页，确保即使是最基础的内容和服务也能被所有用户访问到，无论他们使用何种设备或网络条件。这一理念鼓励开发者首先创建一个简单但功能完整的版本，然后再逐渐添加更多高级特性，如 JavaScript 动画、AJAX 请求等。与此相关联的是响应式设计，它确保网站能够在不同尺寸的屏幕上良好显示，从而提供一致且优质的用户体验

通过这些语言增强技术，前端开发变得更加高效和可靠，同时也推动了前端工程化的发展。

#### 前端中的语法增强

‌**前端中的语法增强**‌主要指的是在JavaScript中使用ES6（ECMAScript 2015）及更高版本中引入的新特性，这些特性能够简化代码编写，提高开发效率和代码的可读性

#### 什么是 Babel

[Babel](https://link.juejin.cn?target=https%3A%2F%2Fwww.babeljs.cn%2Fdocs%2F) 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中

#### 如何使用 Babel

```sh
sh

 代码解读
复制代码pnpm add --save-dev @babel/core @babel/cli @babel/preset-env
babel.config.json / babel.config.js
js 代码解读复制代码{
  "presets": [
    [
      "@babel/preset-env",
      // 浏览器版本
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        // 按需使用
        "useBuiltIns": "usage",
        // corejs版本
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

#### Babel 工作流程 [在线AST](https://link.juejin.cn?target=https%3A%2F%2Fastexplorer.net%2F)

#### 解析（Parsing）

在编译的第一阶段，Babel 使用 `@babel/parser` 将源代码解析成抽象语法树（AST）。这个过程分为两个子步骤：词法分析和语法分析。词法分析会将原始代码拆分成一个个的 token（最小独立语法单元），而语法分析则负责将 tokens 数组递归处理，构建出 AST

例如，当我们将一段包含箭头函数的代码 `[1, 2, 3].map((n) => n + 1);` 输入给 Babel 时，它首先会被解析成相应的 AST 结构。这一阶段是所有后续操作的基础，因为 AST 提供了一种结构化的表示方法，使得我们可以对代码进行各种变换而不直接操作字符串。

#### 转换（Transforming）

一旦生成了 AST，接下来就是对其进行遍历和修改。这一步骤由 `@babel/traverse` 完成，它可以提供深度遍历 AST 节点的能力，并允许通过插件来实现具体的转换逻辑。插件可以定义 visitor 函数，在进入或离开特定类型的节点时执行自定义的操作，比如添加、删除或替换节点

继续上面的例子，如果我们要将箭头函数转换为传统函数表达式，则会在转换阶段应用相应的插件，如 `@babel/plugin-transform-arrow-functions`。此插件会在遇到箭头函数节点时，用等价的传统函数表达式替换之，从而生成一个新的 AST。

#### 生成（Generating）

最后，经过转换后的 AST 需要被重新序列化为 JavaScript 代码。这是由 `@babel/generator` 负责完成的任务，它会遍历新的 AST 并打印出目标代码字符串，同时还可以生成 source map 文件，以便于调试

对于之前的例子而言，最终输出的代码将是 `[1, 2, 3].map(function(n) { return n + 1; });`。此外，Babel 还支持通过 `@babel/code-frame` 在遇到错误时打印出详细的代码位置信息，帮助开发者快速定位问题所在。

#### 插件与 Preset

值得注意的是，**Babel 本身并不会对代码做任何转换；所有的转换都是通过插件来实现的**。插件通常针对某一类语法特性，如箭头函数、类属性等。为了简化配置，Babel 引入了 preset 的概念，它是多个相关插件的集合，旨在一次性解决一组相关的转换需求。例如，`@babel/preset-env` 可以根据指定的目标环境自动选择所需的转换规则，减少了手动配置的工作量

#### babel 如何使用插件和预设

Babel 的插件和预设是其功能的核心，它们使得开发者可以灵活地定制编译过程，以满足特定项目的需求。下面将详细介绍如何使用 Babel 的插件和预设，并解释两者之间的关系及配置方法。

#### babel使用插件

插件是 Babel 的基本构建块，每个插件负责处理一种或多种特定的 JavaScript 语法特性转换。例如，`@babel/plugin-transform-arrow-functions` 专门用于将 ES6 箭头函数转换为 ES5 兼容的形式。要使用某个插件，你需要先通过 npm 或 yarn 安装它，然后在 Babel 的配置文件中声明该插件。

##### 安装插件

```bash
bash

 代码解读
复制代码npm install --save-dev @babel/plugin-transform-arrow-functions
```

##### 配置插件

你可以选择 `.babelrc`、`.babelrc.js`、`babel.config.js` 或者 `package.json` 中的一个来作为你的 Babel 配置文件。推荐使用带有 `.js` 扩展名的文件，因为这样可以在配置文件中编写逻辑代码，从而实现更复杂的配置控制。以下是一个简单的 `babel.config.js` 示例：

```javascript
javascript 代码解读复制代码module.exports = {
  plugins: [
    '@babel/plugin-transform-arrow-functions'
  ]
};
```

#### babel使用预设

预设是一组预先定义好的插件集合，旨在简化配置流程。比如，`@babel/preset-env` 是一个非常流行的预设，它可以自动检测目标环境并加载必要的转换插件，而无需手动指定每一个单独的插件。这意味着你只需要安装这一个预设，就能支持大多数现代 JavaScript 特性到旧版浏览器的兼容性转换。

##### 安装预设

```bash
bash

 代码解读
复制代码npm install --save-dev @babel/preset-env
```

##### 配置预设

同样地，在配置文件中添加预设也是非常直接的事情：

```javascript
javascript 代码解读复制代码module.exports = {
  presets: [
    '@babel/preset-env'
  ]
};
```

#### 插件与预设的关系

当同时配置了插件和预设时，Babel 会按照如下顺序执行：**先运行插件列表中的所有插件，然后再依次执行预设中的插件**。因此，**如果你在配置文件中同时指定了插件和预设，那么插件中的转换规则将会优先于预设中的规则被应用**。此外，值得注意的是，即使某些插件已经在预设中包含，如果在插件列表中再次声明这些插件，则会覆盖预设中的设置。

#### 参数配置

对于需要额外参数的插件或预设，可以通过传递对象形式的第二个参数来进行个性化配置。例如，`@babel/preset-env` 可以接受诸如 `targets`（定义支持的目标环境）、`useBuiltIns`（是否引入 polyfill）等选项。下面是如何配置 `@babel/preset-env` 的例子：

```javascript
javascript 代码解读复制代码module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: "> 0.25%, not dead",
      useBuiltIns: "usage",
      corejs: 3
    }]
  ]
};
```

在这个例子中，我们设置了 `targets` 来指示 Babel 根据 [Can I Use](https://link.juejin.cn?target=https%3A%2F%2Fcaniuse.com%2F) 数据确定哪些浏览器版本应该被支持；同时启用了按需加载 polyfills 的功能，并指定了使用的 `core-js` 版本为 3 。

#### Babel 的 API

Babel 提供了一系列的 API，使得开发者可以在不同的场景下灵活地集成和使用 Babel 的功能。这些 API 主要集中在几个关键包中：`@babel/core`、`@babel/parser`、`@babel/traverse`、`@babel/generator` 和 `@babel/types` 等。下面将详细介绍这些核心 API 及其用途。

#### @babel/core

`@babel/core` 是 Babel 的核心模块，它封装了整个编译流程，并提供了简单的接口来执行代码转换。这个包最常用的 API 包括：

- **transformSync(code, options)**: 同步地从源代码开始处理，最终生成目标代码和 sourceMap。
- **transformAsync(code, options)**: 异步版本的 `transformSync`，返回一个 Promise。
- **transformFileSync(filename, options)**: 从文件读取源代码并同步地进行转换。
- **transformFromAstSync(ast, code, options)**: 接受已经解析好的 AST 和原始代码作为输入，然后生成目标代码和 sourceMap。
- **transformFromAstAsync(ast, code, options)**: 异步版本的 `transformFromAstSync` 。

这些 API 的 `options` 参数主要用于配置插件和预设，以指定具体的转换规则。此外，还可以通过选项配置输出格式、source maps 以及其他高级设置。

#### @babel/parser

`@babel/parser`（之前称为 babylon）用于将 JavaScript 源代码解析为抽象语法树（AST）。默认情况下，它可以解析标准的 JavaScript 语法，但也可以通过插件扩展以支持 JSX、TypeScript 等非标准语法。例如：

```javascript
javascript 代码解读复制代码const parser = require('@babel/parser');
const ast = parser.parse('const x = () => 42;', {
  sourceType: 'module',
  plugins: ['jsx', 'typescript']
});
```

#### @babel/traverse

`@babel/traverse` 提供了一个强大的工具集，可以遍历 AST 并在遍历过程中对特定节点进行操作。它允许你定义 visitor 函数，在进入或离开某个节点时触发特定的行为。每个 visitor 函数接收两个参数：path 和 state。Path 对象包含了关于当前节点的信息以及一系列用于修改 AST 的方法；而 State 则是在遍历期间传递数据的一种方式。

#### @babel/generator

`@babel/generator` 负责将 AST 转换回 JavaScript 代码字符串，并且可以选择性地生成 source map 文件。该过程与解析相反，旨在确保转换后的代码能够正确反映 AST 的结构变化。

#### @babel/types

`@babel/types` 提供了一组实用函数，用于创建、检查和验证 AST 节点。这对于编写复杂的 Babel 插件尤其有用，因为它可以帮助开发者更方便地构建和操作 AST 。

#### 示例：自定义 Babel 插件

结合上述 API，我们可以创建一个简单的 Babel 插件，比如将所有箭头函数转换为普通函数表达式。首先，我们需要安装必要的依赖项：

```bash
bash

 代码解读
复制代码npm install --save-dev @babel/core @babel/parser @babel/traverse @babel/generator @babel/types
```

然后编写插件代码：

```javascript
javascript 代码解读复制代码module.exports = function ({ types: t }) {
  return {
    visitor: {
      ArrowFunctionExpression(path) {
        const { node } = path;
        // 创建一个新的函数表达式节点
        const newFunction = t.functionExpression(
          null,
          node.params,
          node.body,
          node.async,
          true
        );
        // 替换旧的箭头函数
        path.replaceWith(newFunction);
      }
    }
  };
};
```

#### 自定义babel插件

创建 Babel 自定义插件是一个强大且灵活的过程，它允许开发者根据自身需求对 JavaScript 代码进行特定的转换。Babel 插件的核心在于操作抽象语法树（AST），通过解析、转换和生成三个步骤来修改代码。下面将详细介绍如何开发一个 Babel 自定义插件，并提供一些实用的例子。

##### 创建自定义插件的基本结构

一个典型的 Babel 插件遵循以下格式：

```javascript
javascript 代码解读复制代码module.exports = function (babel) {
  const t = babel.types;
  return {
    name: 'my-custom-plugin', // 插件名称
    visitor: {
      // 定义访问者模式下的节点处理逻辑
    }
  };
};
```

在这个基本结构中，`babel` 对象包含了所有 Babel 提供的方法和工具，而 `visitor` 属性则用于定义当遍历 AST 时遇到特定类型的节点时要执行的操作。

#### 使用 Visitor 模式

在 Babel 中，遍历 AST 的方式是基于访问者模式的。这意味着你可以为不同的 AST 节点类型定义特定的行为。例如，如果你想改变所有的标识符（Identifier）从 `n` 变成 `x`，可以这样做：

```javascript
javascript 代码解读复制代码visitor: {
  Identifier(path) {
    if (path.node.name === 'n') {
      path.node.name = 'x';
    }
  }
}
```

这段代码会检查每一个标识符节点的名字是否为 `n`，如果是，则将其改为 `x`。

##### 示例：向 console.log 添加调用位置信息

假设我们想要创建一个插件，它可以在每次调用 `console.log` 时自动添加当前调用的位置信息。这可以通过监听 `CallExpression` 类型的节点并检查其是否为 `console.log` 来实现：

```javascript
javascript 代码解读复制代码module.exports = function (babel) {
  const t = babel.types;
  return {
    name: 'custom-babel-plugin-demo',
    visitor: {
      CallExpression(path) {
        const obj = path.node.callee.object;
        const prop = path.node.callee.property;

        if (
          t.isIdentifier(obj) &&
          t.isIdentifier(prop) &&
          obj.name === 'console' &&
          prop.name === 'log'
        ) {
          const location = `---trace: line ${path.node.loc.start.line}, column ${path.node.loc.start.column}---`;
          path.node.arguments.push(t.stringLiteral(location));
        }
      }
    }
  };
};
```

此插件会在每个 `console.log` 的参数列表末尾添加一行文本，指示该日志语句所在的行号和列号。

##### 测试你的插件

为了确保插件按预期工作，建议编写测试用例。可以使用 `@babel/core` 的 `transformSync` 方法来编译一段测试代码，并验证输出是否符合预期。此外，还可以利用 `babel-plugin-tester` 库简化测试流程。

##### 发布你的插件

一旦你完成了插件的开发并且经过充分测试后，就可以考虑将其打包并发布到 npm 上了。首先需要创建一个 `package.json` 文件描述你的插件元数据，然后通过 `npm publish` 命令发布。

总之，[Babel 自定义插件](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fjamiebuilds%2Fbabel-handbook)的开发不仅限于上述例子；实际上，任何你能想到的代码转换都可以通过这种方式来实现。掌握这些基础知识后，你可以开始探索更多复杂的场景，比如优化性能、清理不必要的代码或是集成其他工具和服务。

#### 小结

综上所述，Babel 的核心在于它能够将现代 JavaScript 代码解析为 AST，然后通过一系列插件对该 AST 进行转换，最后再生成符合目标环境要求的新代码。

### CSS工具链
![示例图片](./images/engineering-2.png)

在Web开发中，CSS代码压缩和剪枝是优化网站性能的重要步骤。通过移除不必要的字符、注释以及未使用的样式规则，可以显著减少CSS文件的大小，从而加快页面加载速度。以下是几种常用的插件和技术，用于实现CSS代码的压缩和剪枝。

#### CSS代码压缩

##### [CssNano](https://link.juejin.cn?target=https%3A%2F%2Fwww.cssnano.cn%2Fdocs%2Fintroduction%2F)

`CssNano` 是一个基于PostCSS的CSS优化工具，它能够在保持CSS代码语义不变的情况下，执行一系列优化操作，如删除多余的空白符及注释、简化选择器等，以确保最终生成的CSS文件尽可能小。此外，`CssNano` 还支持多种配置选项，允许开发者根据项目需求调整优化级别。

##### [Optimize-css-assets-webpack-plugin](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FNMFR%2Foptimize-css-assets-webpack-plugin)

对于使用Webpack构建系统的项目而言，`optimize-css-assets-webpack-plugin` 插件是一个不错的选择。该插件可以在生产模式下自动压缩CSS文件，并且兼容其他类型的资源优化插件。安装后，只需将其添加到Webpack配置中的`optimization.minimizer`数组即可启用压缩功能。

##### [CssMinimizerWebpackPlugin](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fplugins%2Fcss-minimizer-webpack-plugin%2F)

随着Webpack 5的到来，推荐使用`css-minimizer-webpack-plugin`来替代旧版本中的`optimize-css-assets-webpack-plugin`**进行CSS压缩**。此插件同样依赖于`cssnano`作为其内部引擎之一，提供了更好的性能和更丰富的特性集。

#### CSS代码剪枝

##### [PurifyCSS](https://link.juejin.cn?target=https%3A%2F%2Fwww.purgecss.cn%2Fcomparison%2F)

`PurifyCSS` 是一款专门用来清除未使用CSS代码的工具。它可以分析HTML文档并与之关联的CSS文件对比，识别出哪些样式规则实际上并未被应用，进而将这些冗余部分从最终输出中剔除。这种方式不仅有助于减小文件体积，还能改善浏览器渲染效率。

##### [UnCSS github](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Funcss%2Funcss) & [UnCSS在线效果](https://link.juejin.cn?target=https%3A%2F%2Funcss-online.com%2F)

与`PurifyCSS`类似，`UnCSS`也是一个能够检测并移除网页中未引用CSS规则的工具。不过，`UnCSS`更加注重对动态内容的支持，例如JavaScript生成的DOM元素或AJAX加载的内容。这意味着即使是在复杂的交互式页面上，也能有效去除无用样式。

#### 结合使用

为了达到最佳效果，通常建议结合多种工具共同作用。例如，在Webpack工作流中，首先利用`MiniCssExtractPlugin`将所有CSS文件抽离成独立文件，然后借助上述提到的任何一个压缩工具对其进行进一步优化；与此同时，可以运行`PurifyCSS`或`UnCSS`来进行代码剪枝，确保只保留真正需要的样式规则。

#### [postcss](https://link.juejin.cn?target=https%3A%2F%2Fwww.postcss.com.cn%2Fdocs%2Fpostcss-architecture)


PostCSS 是一个强大的工具，它使用 JavaScript 插件来转换 CSS 代码。与传统的 CSS 预处理器不同，PostCSS 自身并不提供特定的语法或功能集，而是作为一个平台，允许开发者通过丰富的插件生态系统扩展和定制其功能。这使得 PostCSS 成为了一个灵活且高效的解决方案，适用于各种前端开发场景。

##### 主要作用

1. **增强CSS功能**：通过一系列插件，PostCSS 可以为标准的 CSS 添加额外的功能，如变量、混合（mixins）、嵌套规则等。这意味着开发者可以编写更简洁、更具表现力的样式表，同时保持与现有浏览器的良好兼容性
2. **自动化任务处理**：PostCSS 的插件能够自动执行许多常见的 CSS 相关任务，例如添加供应商前缀（vendor prefixes），检查代码质量（linting），以及压缩文件大小。这些操作不仅提高了工作效率，还确保了生成的 CSS 文件既高效又符合最佳实践
3. **支持未来标准**：借助像 `postcss-preset-env` 这样的插件，PostCSS 允许开发者立即采用最新的 CSS 规范和技术，即使它们尚未被所有主流浏览器完全支持。该插件会根据指定的目标浏览器列表自动将现代特性编译成向后兼容的形式
4. **优化性能**：除了简化开发流程外，PostCSS 还可以帮助改善网站的整体性能。例如，`cssnano` 插件可以在不影响视觉效果的前提下大幅缩减 CSS 文件体积；而 `purgecss` 则可用于移除未使用的样式声明，从而减少不必要的网络传输开销
5. **促进团队协作**：由于 PostCSS 支持多种格式化的输入输出，并且提供了详细的源映射（source maps）选项，因此非常适合多人协作环境下的项目管理。此外，某些插件还能强制实施统一的编码风格指南，进一步增强了代码的一致性和可维护性
6. **与其他工具集成**：作为 Node.js 生态系统的一部分，PostCSS 轻松集成了 Webpack、Gulp、Grunt 等流行的构建工具，形成了完整的前端工作流。这意味着无论你选择哪种方式组织项目，都能轻松地将 PostCSS 整合进来，享受其带来的便利

##### 功能示例

- **Autoprefixer**：这是一个非常受欢迎的 PostCSS 插件，用于自动为 CSS 属性添加必要的浏览器前缀。它基于 Can I Use 数据库确定哪些前缀是必需的，并根据配置的目标浏览器范围进行相应的调整
- **PreCSS**：此插件集成了多个有用的功能，包括但不限于变量、嵌套、继承等 Sass 类似特性。它让那些习惯于预处理器语法的人能够在不改变原有工作流的情况下快速上手 PostCSS
- **Stylelint**：作为一种先进的 Linter 工具，Stylelint 可以帮助开发者发现潜在的问题，比如拼写错误、冗余选择器或是不符合团队约定俗成的格式化问题。这对于维持高质量的代码库至关重要

##### 如何使用和配置 [官方按使用构建工具分情况](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fpostcss%2Fpostcss%23usage)

使用和配置PostCSS涉及几个关键步骤，包括安装必要的工具、创建配置文件以及选择适当的插件来满足特定需求。以下是详细的指南，帮助你顺利地开始使用PostCSS。

##### 安装PostCSS

首先，确保你的开发环境中已经安装了Node.js，因为PostCSS依赖于Node.js环境。接着，你可以通过npm（Node Package Manager）或yarn来安装PostCSS及其所需的插件。对于全局安装PostCSS CLI，可以使用以下命令：

```bash
bash

 代码解读
复制代码npm install -g postcss-cli
```

如果你打算在某个具体的项目中使用PostCSS，则应该在该项目根目录下创建一个`package.json`文件（如果还没有的话，可以通过`npm init`命令初始化项目），然后为该项目安装PostCSS作为本地开发依赖项：

```bash
bash

 代码解读
复制代码npm install --save-dev postcss postcss-cli
```

此外，还需要根据项目的需要安装额外的插件，例如用于自动添加浏览器前缀的`autoprefixer`插件：

```bash
bash

 代码解读
复制代码npm install --save-dev autoprefixer
```

##### 创建配置文件

安装完成后，下一步是创建一个配置文件来指定要使用的PostCSS插件及其配置。通常，这个配置文件命名为`postcss.config.js`，并放置在项目的根目录中。下面是一个简单的例子，展示了如何配置`autoprefixer`插件：

```javascript
javascript 代码解读复制代码module.exports = {
  plugins: [
    require('autoprefixer')({
      // 兼容市面上所有版本浏览器
      browsers: ['> 0%']
    })
  ]
};
```

对于更复杂的设置，比如当你想要整合其他CSS预处理器或者应用更多的优化规则时，可以在同一个配置文件中添加多个插件。例如，结合`postcss-import`插件来导入外部样式表，或是使用`cssnano`进行代码压缩。

##### 配置Vite项目中的PostCSS

如果你正在使用Vite构建工具，那么可以直接在`vite.config.js`内的`css.postcss`属性内进行PostCSS配置。例如，使用`postcss-preset-env`插件可以帮助你将最新的CSS语法转换为向后兼容的形式：

```javascript
javascript 代码解读复制代码import { defineConfig } from 'vite';
const postcssPresetEnv = require('postcss-preset-env');

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssPresetEnv()]
    }
  }
});
```

##### 运行PostCSS处理CSS文件

完成上述配置后，你可以使用PostCSS CLI工具来运行PostCSS并处理CSS文件。例如，假设你的主CSS文件名为`main.css`，并且你想要将处理后的CSS输出到`build/main.css`，可以运行以下命令：

```bash
bash

 代码解读
复制代码npx postcss main.css -o build/main.css
```

这条命令会读取`main.css`的内容，按照`postcss.config.js`中定义的规则对其进行转换，并将结果保存到指定的目标路径下。

##### 构建流程集成

在实际开发过程中，PostCSS常常被集成到构建工具（如Webpack、Gulp、Grunt等）中，以便自动化地处理CSS文件并在开发和构建阶段执行编译和优化。以Webpack为例，你需要安装`postcss-loader`，并通过修改`webpack.config.js`来包含PostCSS处理逻辑：

```javascript
javascript 代码解读复制代码module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  postcss: function() {
    return [
      require('autoprefixer')({ browsers: ['last 2 versions'] })
    ];
  }
};
```

以上就是PostCSS的基本安装和配置流程。通过合理利用PostCSS提供的强大功能和丰富的插件库，你可以极大地简化CSS开发过程，同时确保生成的样式表既高效又符合现代Web标准的要求。

#### CSS原子化概念

CSS原子化（Atomic CSS）是一种**CSS架构方式**，它提倡**将样式拆分为最小且独立的单位**——即“原子”。**每个原子类只包含一个或少数几个特定的样式属性**，如颜色、边距、字体大小等。这些原子类可以组合起来创建复杂的样式效果，从而实现样式的模块化和复用性。与传统的面向组件的CSS编写方法不同，**原子化CSS强调的是通过一系列小型、单一用途的类来构建页面，而非为每个UI组件定义专门的样式规则**。

##### 核心特点

- **单一样式属性**：每个类名通常对应一个具体的样式属性，比如`.p-4`代表`padding: 4px;`，这使得开发者能够直观地理解类的作用。
- **高度可复用**：由于类是高度独立的，它们可以在不同的上下文中被自由组合使用，减少了重复定义样式的需求。
- **减少冗余代码**：原子化CSS有助于消除不必要的CSS文件膨胀问题，因为它避免了大量未使用的样式规则堆积。
- **易于维护**：当需要调整某个特定的样式时，只需更改相应的HTML标签上的类名即可，无需修改CSS文件本身。
- **基于视觉功能命名**：类名往往直接反映了其在界面上的表现形式，例如`.text-center`表示文本居中显示。

##### CSS原子化解决方案

随着Web开发社区对高效、灵活的样式管理方案的需求增长，出现了多个优秀的CSS原子化框架和工具，其中最著名的包括：

##### [Tailwind CSS](https://link.juejin.cn?target=https%3A%2F%2Ftailwindcss.com%2F)

Tailwind CSS 是目前最受欢迎的功能优先型CSS框架之一。它提供了丰富的预设样式类库，允许开发者直接在HTML中组合这些类以快速搭建界面。Tailwind的设计理念非常符合原子化CSS的原则，它的类名简洁明了，并且支持自定义主题配置。此外，Tailwind还内置了大量的实用工具类，涵盖了从布局到动画的各种场景，极大地简化了前端开发流程。

##### [Windi CSS](https://link.juejin.cn?target=https%3A%2F%2Fwindicss.org%2F)

Windi CSS 是另一个高效的原子化CSS框架，它的工作原理类似于Tailwind，但更加注重性能优化。Windi采用了按需生成策略，只有当某些样式类真正出现在HTML文档中时才会被编译进最终输出的CSS文件里，这样可以进一步降低资源消耗。同时，Windi也支持多种插件扩展，满足不同项目的个性化需求。

##### [UnoCSS](https://link.juejin.cn?target=https%3A%2F%2Funocss.dev%2F)

不同于前面提到的两个框架，UnoCSS更像是一个引擎而不是固定框架。它允许用户定义自己的原子化规则集，提供了极大的灵活性。UnoCSS的核心优势在于它可以与Vite等现代构建工具无缝集成，实现了真正的按需加载机制，确保只有必要的样式才会被打包进去。此外，UnoCSS还支持自动前缀添加、媒体查询等功能，帮助开发者轻松应对跨浏览器兼容性挑战。

##### [Basscss](https://link.juejin.cn?target=https%3A%2F%2Fbasscss.com%2F)

Basscss 是一款轻量级的原子化CSS框架，旨在提供一组简单而有效的基础样式类。尽管它的规模较小，但对于那些追求极简风格的应用程序来说却是理想的选择。Basscss遵循了原子化CSS的核心思想，即通过少量的基础类构建出复杂多变的用户界面。不过，相比其他更全面的框架，Basscss提供的功能相对有限，更适合小型项目或者作为更大框架的一部分使用。

##### [Tachyons](https://link.juejin.cn?target=https%3A%2F%2Ftachyons.io%2Fdocs%2F)

Tachyons 是一个专注于速度和响应式的原子化CSS框架。它不仅拥有庞大的样式类库，而且经过精心设计以保证良好的渲染性能。Tachyons的类名遵循了一套清晰易懂的命名约定，便于记忆和使用。该框架特别适合需要快速迭代的设计原型或是要求极高加载效率的应用场景。

综上所述，CSS原子化不仅仅是一个理论上的概念，而是已经被广泛应用于实际项目中的有效实践。通过采用上述任何一个或多个框架，开发者可以获得更好的开发体验、更高的生产力以及更优质的用户体验。值得注意的是，虽然原子化CSS带来了诸多便利之处，但**它也可能导致HTML标记变得冗长复杂维护困难**，因此在选择是否采用此方法之前，应当充分考虑项目的具体情况和技术栈特性。

### 构建工具和脚手架

在2024年，前端开发领域继续快速发展，构建工具和脚手架作为提高开发效率、简化项目初始化过程的关键组成部分，也在不断演进。这一年中，一些构建工具和脚手架因其卓越的性能、简便的配置以及强大的社区支持而脱颖而出。

#### 构建工具 (将开发者编写的源代码转换成浏览器能够理解和执行的形式)

##### [Vite](https://link.juejin.cn?target=https%3A%2F%2Fcn.vitejs.dev%2F)

Vite 是一个新兴的构建工具（都vite6.0了），它凭借其出色的启动速度和热更新能力，在2024年成为了许多开发者的新宠。与传统的 Webpack 相比，Vite 在开发阶段的构建速度提升了数倍，这得益于它基于原生 ES 模块（ESM）的工作原理。Vite 通过即时编译请求模块来实现快速反馈循环，并且提供了开箱即用的 TypeScript 支持。此外，Vite 还拥有丰富的插件生态系统，能够满足多样化的开发需求。对于 Vue 生态系统而言，Vite 已经成为新项目的首选构建工具。双引擎（[esbuild](https://link.juejin.cn?target=https%3A%2F%2Fesbuild.bootcss.com%2F)和[rollup](https://link.juejin.cn?target=https%3A%2F%2Fwww.rollupjs.com%2F)）

##### [Webpack](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.p2hp.com%2F)

尽管有新的挑战者出现，Webpack 仍然是最流行的 JavaScript 应用构建工具之一。它以其灵活性和强大的功能著称，支持模块化开发、代码分割、懒加载等功能。Webpack 的插件机制允许开发者根据需要定制化构建流程，适用于各种规模的应用程序。然而，随着其他工具如 Vite 的崛起，Webpack 面临着一定的竞争压力。为了保持竞争力，Webpack 社区也在持续改进其性能和用户体验。

##### [Turbopack](https://link.juejin.cn?target=https%3A%2F%2Fvercel.com%2Fblog%2Fturbopack)

Turbopack 是由 Webpack 的作者使用 Rust 开发的一款高性能打包工具，旨在对抗 Vite。它的目标是提供更快的增量构建时间和更小的输出文件大小。虽然 Turbopack 尚处于早期发展阶段，但它已经吸引了部分开发者的注意，并有可能在未来成为重要的构建选项之一。

##### [Rspack](https://link.juejin.cn?target=https%3A%2F%2Frspack.dev%2F)

Rspack 是一款基于 Rust 编写的高性能 JavaScript 打包工具，它被设计成 Webpack 的直接替代品，并且提供了与 Webpack 生态系统的高度兼容性。这意味着开发者可以轻松地将现有的 Webpack 项目迁移到 Rspack 上，同时享受到显著的构建速度提升。根据官方提供的信息，Rspack 可以提供比 Webpack 快 5 到 10 倍的构建性能

#### 脚手架 (提供界面交互和基础工程模板)

##### [Create React App (CRA)](https://link.juejin.cn?target=https%3A%2F%2Fcra.nodejs.cn%2F)

Create React App 是官方推荐的 React 应用创建工具，它为开发者提供了一个无需配置的环境来快速搭建 React 项目。CRA 内置了对 Babel、ESLint 和 Webpack 的支持，使得开发者可以专注于业务逻辑而非繁琐的工具链设置。尽管 Vite 等新型构建工具带来了挑战，但 CRA 依然保持着广泛的用户基础，并且不断更新以适应最新的 React 版本和技术趋势。

##### [Vue CLI](https://link.juejin.cn?target=https%3A%2F%2Fcli.vuejs.org%2F)

Vue CLI 是 Vue.js 官方提供的命令行工具，用于生成完整的项目结构并集成常用的构建工具和库。它不仅简化了项目的初始设置，还提供了灵活的插件系统，允许开发者轻松扩展功能。Vue CLI 支持多种模板选择，包括但不限于 Webpack、Parcel 和 Vite，这让开发者可以根据具体需求做出最佳选择。特别是结合 Vite 使用时，Vue CLI 可以为开发者带来极佳的开发体验。

##### [Angular CLI](https://link.juejin.cn?target=https%3A%2F%2Fangular.dev%2Ftools%2Fcli)

Angular CLI 是 Angular 团队维护的一个命令行界面工具，帮助开发者快速启动 Angular 应用。它集成了诸如路由配置、状态管理等常用特性，并且内置了对服务端渲染（SSR）、Progressive Web Apps (PWA) 等高级特性的支持。Angular CLI 的优势在于其紧密集成 Angular 生态系统的能力，使得开发者可以利用丰富的官方资源和文档进行高效开发。

##### [Next.js](https://link.juejin.cn?target=https%3A%2F%2Fnextjs.org%2F)

Next.js 是一个React框架，它不仅仅是一个简单的脚手架工具，而是提供了完整的解决方案，包括服务器端渲染（SSR）、静态站点生成（SSG）、API路由等功能。Next.js 的特点是易于上手且功能强大，适合构建从简单博客到复杂电子商务平台等各种类型的Web应用。随着React Server Components 和 Server Actions 等新技术的引入，Next.js 在2024年的地位更加稳固。

##### [Nuxtjs](https://link.juejin.cn?target=https%3A%2F%2Fwww.nuxtjs.cn%2F)

Nuxt.js 是一个基于 Vue.js 的框架，它为开发者提供了一种直观且可扩展的方式来创建类型安全、性能优越以及适合生产环境的全栈 Web 应用程序。Nuxt.js 不仅简化了服务器端渲染（SSR）和静态站点生成（SSG）应用的构建过程，还通过其内置的功能如自动路由、中间件支持、布局支持等特性极大地提升了开发效率

##### [Nestjs](https://link.juejin.cn?target=https%3A%2F%2Fdocs.nestjs.com%2F)

NestJS 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架，它使用渐进式 JavaScript 构建，并且完全支持 TypeScript（尽管开发者仍然可以选择使用纯 JavaScript）。NestJS 的设计理念深受 Angular 框架的影响，同时借鉴了后端开发中常用的 Java 技术栈 Spring 框架的最佳实践

综上所述，2024年的前端构建工具和脚手架市场呈现出多元化的发展态势。无论是追求极致性能还是希望获得全面的功能支持，开发者都能找到适合自己项目需求的理想工具。值得注意的是，技术进步永无止境，未来几年内可能会有更多的创新涌现，推动整个行业向前发展。

### 前端主流框架技术

在2024年，前端开发领域继续快速发展，主流框架也在不断进化以适应新的需求和技术趋势。根据最新的资料，**React、Vue、Angular仍然是最受欢迎的三大前端框架**，但同时一些新兴框架如Svelte和SolidJS也逐渐崭露头角。

#### [React.js](https://link.juejin.cn?target=https%3A%2F%2Fwww.php.cn%2Fdoc%2Freact%2F)

React 作为由Facebook维护的JavaScript库，在2024年依然是构建用户界面组件的强大工具。React 19版本引入了React Server Components（RSC），这是一种新的架构风格，它允许开发者编写只在服务器上运行的React组件，并且可以与客户端组件无缝协作。此外，React团队还在持续扩展其生态系统，包括React Compiler和Server Actions等功能，这些特性不仅增强了React的能力，还进一步提升了开发者的体验。React的优势在于其庞大的社区支持、丰富的插件系统以及虚拟DOM带来的性能优势。

#### [Vue.js](https://link.juejin.cn?target=https%3A%2F%2Fcn.vuejs.org%2F)

Vue 3.4版本带来了显著的技术革新，例如完全重写的解析器提高了编译速度，更快的单文件组件（SFC）编译流程，以及一个经过优化的响应式系统，提高了重新计算的效率。更重要的是，Vue正在开发中的Vapor模式，这是一种可选的、以性能为导向的编译策略，旨在生成比现有方法更高效的代码，甚至可以在所有组件中使用时消除对虚拟DOM的需求，从而减少打包大小。此外，Vue 3.4还稳定了`defineModel`宏，并引入了v-bind简写等新特性，进一步简化了开发过程。

#### [Angular.js](https://link.juejin.cn?target=https%3A%2F%2Fangular.dev%2F)

Angular 在2024年的更新中引入了信号机制、可延迟视图、NgOptimizedImage组件等一系列新功能，旨在提高应用性能并改善开发者体验。特别是信号机制，它提供了一种更加直观的方式来进行状态管理和组件间通信。非破坏性预加载和即将推出的部分预加载特性，则有助于加快页面加载速度，提升用户体验。尽管Angular的学习曲线较为陡峭，但对于大型复杂的企业级应用来说，Angular仍然是一个强有力的选择。

#### [Svelte.js](https://link.juejin.cn?target=https%3A%2F%2Fwww.svelte.cn%2F)

Svelte 是一个相对较新的框架，但在2024年已经获得了相当大的关注。它的独特之处在于编译时框架的概念，这意味着Svelte会在构建阶段处理掉大部分逻辑，最终生成的代码没有额外的运行时开销，这使得应用程序启动更快、体积更小。Svelte 4版本强调细粒度响应性，允许开发者在全栈应用中使用，并提供了强大的开发者体验，包括单次飞行变异以避免服务器上的瀑布流效应，请求和资源去重等功能。

#### [SolidJS](https://link.juejin.cn?target=https%3A%2F%2Fwww.solidjs.com%2F)

SolidJS以其细粒度响应性和高效的性能而闻名，它允许开发者创建高性能的应用程序，而不需要担心复杂的依赖跟踪或手动管理副作用。SolidStart是用于构建SolidJS应用的一个框架，在最新版本中，它整合了多个独立的包以提供完整的功能，并且每个部分都可以被替换为开发者自己的实现。这种灵活性使得SolidJS成为那些寻求快速迭代和高度定制化解决方案的理想选择。

#### 其他值得关注的框架

除了上述提到的主要框架外，还有一些其他值得注意的选项，如Astro、Next.js、Nuxt.js等。其中，Astro作为一个前沿的静态网站构建器，因其对性能和开发者体验的深入优化而在业界引起了广泛关注；Next.js则是React生态中最受欢迎的框架之一，特别适合需要服务器端渲染的应用；而Nuxt.js则专注于Vue生态，提供了类似的服务器端渲染能力。

综上所述，2024年的前端开发环境充满了机遇与挑战，从成熟稳定的React、Vue、Angular到快速崛起的Svelte和SolidJS，每个框架都有其独特的魅力和适用场景。开发者应根据项目需求和个人偏好来选择最适合自己的工具链。随着技术的进步，未来几年内我们可以期待更多令人兴奋的变化和发展。

### 写在结尾

2024年，前端工程化方案和技术继续向着智能化、模块化、跨平台的方向演进。随着Web技术的发展，前端开发不仅在框架和工具链的选择上更加多样化，而且在构建高性能、可维护的应用方面也提出了更高的要求。以下是当前主流的前端工程化方案和技术趋势。

#### 智能化工具与AI辅助开发

人工智能（AI）正在深刻改变前端开发的方式。AI驱动的开发工具如cursor、GitHub Copilot、CodeGeeX等已经能够在项目中自动完成一些重复性的编码任务，并根据描述自动生成代码片段或继续书写代码。这类工具不仅提高了开发效率，还降低了新手学习成本，使得开发者可以更专注于业务逻辑的设计。此外，AI还可以用于自动化测试、智能优化以及个性化用户体验等多个方面，为前端开发带来更多可能性。

#### 微前端架构

微前端作为一种将大型单体应用拆分为多个独立部署的小型应用的方法，在2024年得到了广泛应用。通过采用微前端架构，企业能够实现不同团队并行开发、快速迭代的同时保持系统的灵活性和稳定性。目前流行的微前端解决方案包括qiankun、Module Federation（模块联邦）等，它们提供了不同的隔离机制和服务通信方式来满足多样化的应用场景需求。例如，Module Federation允许不同技术栈的应用共享公共模块，从而减少了冗余代码并提升了整体性能。

#### WebAssembly (Wasm) 的普及

WebAssembly作为一种高效的字节码格式，因其接近本机执行的速度而受到越来越多的关注。它允许开发者使用C/C++、Rust等多种编程语言编写高性能的应用程序，并将其编译成可以在浏览器环境中运行的wasm文件。特别是在处理复杂计算任务如图像处理、3D渲染等领域时，WebAssembly表现出了极大的优势。2024年预计会有更多框架开始支持WebAssembly，进一步推动其在前端领域的应用范围。

#### 静态站点生成器(SSG)

静态站点生成器（SSG）如Gatsby、Next.js、Nuxt.js等已经成为构建高效网站的重要手段之一。这些工具可以通过预渲染页面内容生成静态HTML文件，显著提高首屏加载速度并改善SEO效果。对于那些不需要频繁更新内容的企业官网或者博客类站点来说，SSG提供了一种简单且有效的解决方案。同时，结合服务端渲染（SSR），还可以兼顾动态数据展示的需求。

#### 跨平台开发 [推荐看看大前端跨端开发指南](https://s.juejin.cn/ds/iUhLCEut/)

为了减少多平台适配的工作量并提升开发效率，“一次编写，各处运行”的理念越来越受到重视。React Native、Flutter等移动端跨平台框架让开发者可以用一套代码库创建iOS和Android应用；而对于桌面应用程序，则有Electron、Tauri等选择。这些框架不仅简化了开发流程，同时也保证了用户体验的一致性。

#### 前端性能优化

随着用户期望的不断提高，性能优化成为了前端开发中的关键考虑因素。开发者需要关注资源的有效加载、动画平滑过渡、无障碍设计等方面，以确保所有用户都能获得优质的体验。具体措施包括但不限于：懒加载图片和其他非必要资源、利用CDN加速全球访问、实施缓存策略、压缩传输的数据量等。此外，Core Web Vitals等评估标准的普及促使开发者更加注重核心指标如LCP（最大内容绘制）、FID（首次输入延迟）等。

#### TypeScript 和静态类型检查

TypeScript作为JavaScript的超集，凭借其静态类型系统有效减少了潜在错误的发生几率，并提高了代码质量和可读性。2024年，TypeScript的使用预计将更加普遍，尤其是在大型团队和企业级项目中。除了增强代码健壮性和开发效率外，TypeScript还带来了更好的IDE支持，比如代码补全和错误提示等功能。

#### 构建自动化与CI/CD

构建自动化是指利用脚本或专门的工具链来完成重复性的任务，例如代码格式化、单元测试执行、ESLint检查等。持续集成/持续部署（CI/CD）则进一步扩展了这一概念，确保每次提交都能经过严格的验证流程后自动发布到生产环境。常用的CI/CD平台包括GitHub Actions、GitLab CI、CircleCI等，它们提供了丰富的插件生态系统，可以帮助团队快速设置并运行流水线

#### 环境变量管理

在多环境部署的情况下，合理配置环境变量至关重要。通过`.env`文件或其他形式的配置机制，开发者可以在不同阶段（如开发、测试、生产）之间轻松切换API地址、密钥等敏感信息。以Vue CLI为例，它内置了对多种模式的支持，允许用户通过命令行参数指定要使用的环境配置文件，同时结合cross-env这样的跨平台解决方案，确保所有操作系统下都能正确读取NODE_ENV等关键变量

#### 代码质量控制

为了保证代码的一致性和高质量，许多项目都会引入静态分析工具，如ESLint用于JavaScript/TypeScript代码规范检查；Prettier负责统一代码风格；Stylelint则是针对CSS/SASS/Less等样式文件的审查利器。这些工具往往可以通过编辑器插件直接集成到日常编码过程中，实时给出反馈，帮助开发者养成良好的习惯

综上所述，2024年的**前端工程化不仅仅局限于某个特定的技术或工具**，而是涵盖了**从开发流程到最终产品交付的全过程**。面对不断变化的技术环境，持续学习新技术、紧跟行业发展步伐将是每个前端工程师成长道路上不可或缺的一部分。通过合理运用上述提到的各项技术和方法，我们可以构建出既美观又实用的现代化Web应用，为用户提供卓越的数字体验。



作者：鱼樱前端
链接：https://juejin.cn/post/7448191774537842714
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。