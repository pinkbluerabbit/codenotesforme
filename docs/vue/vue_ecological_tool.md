## Vue生态库使用指南

### 创建一个 Vue 3 项目

#### 官方推荐

使用 `npm init vue@latest` 命令

#### 使用 Vue CLI

1. **安装 Vue CLI**：如果尚未安装 Vue CLI，可以通过 npm 安装：

   ```bash
   npm install -g @vue/cli
   ```

2. **创建项目**：运行以下命令来创建一个新项目：

   ```bash
   vue create my-vue3-project
   ```

   在交互式界面中，选择 Vue 3 作为项目模板。

3. **进入项目目录并启动开发服务器**：

   ```bash
   cd my-vue3-project
   npm run serve
   ```

#### 使用 Vite

1. **安装 Vite**：Vite 是一个现代化的前端构建工具，可以快速创建 Vue 3 项目。通过 npm 安装 Vite：

   ```bash
   npm create vite@latest
   ```

2. **创建项目**：在安装过程中，按照提示选择 Vue 3 模板，并输入项目名称等信息。

3. **进入项目目录并安装依赖**：

   ```bash
   cd my-vue3-project
   npm install
   ```

4. **启动开发服务器**：

   ```bash
   npm run dev
   ```

在创建项目后，你可以根据项目需求进行进一步的配置和开发，如安装额外的依赖库、配置路由、状态管理等。

### 本地运行打包产物

#### 方法一：使用本地 HTTP 服务器

如果你不想修改浏览器设置或手动调整 HTML 文件，可以使用本地 HTTP 服务器来预览打包后的项目。这种方法不需要解决跨域问题，更加稳定。

1. **安装 HTTP 服务器**：

   - 使用 `http-server`：

     bash复制

     ```bash
     npm install -g http-server
     ```

   - 或者使用 Python 自带的 HTTP 服务器：

     bash复制

     ```bash
     python -m http.server -d dist
     ```

2. **启动服务器**：

   - 在项目根目录下运行以下命令：

     bash复制

     ```bash
     http-server dist
     ```

   - 或者使用 Python：

     bash复制

     ```bash
     python -m http.server -d dist
     ```

3. **访问项目**：

   - 打开浏览器，访问 `http://localhost:8080`（或其他端口，具体取决于服务器配置）。

#### 方法二：使用 Vite 的 `preview` 命令（推荐）

Vite 提供了一个 `preview` 命令，可以快速启动一个本地服务器来预览打包后的项目。

1. **构建项目**：

   ```bash
   npm run build
   ```

2. **启动预览服务器**：

   ```bash
   npm run preview
   ```

3. **访问项目**：

   - 打开浏览器，访问 `http://localhost:4173`（默认端口）。

### vue-router使用指南

#### 一、安装与引入

1. **安装 Vue Router**：使用 npm 或 yarn 安装 Vue Router：

   ```bash
   npm install vue-router@next
   ```

   或

   ```bash
   yarn add vue-router@next
   ```

2. **在项目中引入 Vue Router**：在项目的入口文件（如 `main.js`）中引入 Vue Router，并创建路由实例：

   ```javascript
   import { createRouter, createWebHistory } from 'vue-router';
   import Home from './views/Home.vue';
   import About from './views/About.vue';
   
   const routes = [
     { path: '/', component: Home },
     { path: '/about', component: About }
   ];
   
   const router = createRouter({
     history: createWebHistory(),
     routes
   });
   
   import { createApp } from 'vue';
   const app = createApp(App);
   app.use(router);
   app.mount('#app');
   ```

#### 二、基本使用

1. **使用 `<router-link>` 创建导航链接**：在模板中使用 `<router-link>` 组件创建导航链接：

   ```html
   <template>
     <div>
       <router-link to="/">首页</router-link>
       <router-link to="/about">关于</router-link>
       <router-view></router-view>
     </div>
   </template>
   ```

2. **使用 `<router-view>` 渲染匹配的组件**：`<router-view>` 会根据当前的路由路径渲染对应的组件。

#### 三、动态路由

1. **定义动态路由**：在路由配置中使用参数占位符定义动态路由：

   ```javascript
   const routes = [
     { path: '/user/:id', component: User }
   ];
   ```

2. **在组件中访问参数**：在组件中通过 `useRoute` 获取当前路由对象，进而访问参数：

   ```javascript
   import { useRoute } from 'vue-router';
   export default {
     setup() {
       const route = useRoute();
       console.log(route.params.id);
     }
   };
   ```

#### 四、嵌套路由

1. **定义子路由**：在路由配置中，通过 `children` 属性定义子路由：

   ```javascript
   const routes = [
     {
       path: '/user',
       component: User,
       children: [
         { path: 'profile', component: UserProfile },
         { path: 'posts', component: UserPosts }
       ]
     }
   ];
   ```

2. **在父组件中使用 `<router-view>`**：在父组件的模板中使用 `<router-view>` 来展示子路由对应的组件。

#### 五、导航守卫

在 Vue 3 中，路由守卫用于在路由导航的不同阶段插入控制逻辑，以实现诸如身份验证、权限检查、数据预加载等功能。以下是 Vue 3 中路由守卫的使用方法和一些常见场景的应用实例：

##### 1.全局守卫

全局守卫是在整个应用中对路由跳转进行统一控制的守卫。

###### ①全局前置守卫

全局前置守卫在路由跳转之前执行，适用于所有路由。可以用于进行全局的权限验证、用户认证等。使用 `router.beforeEach` 方法注册全局前置守卫：

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import router from './router';

router.beforeEach((to, from, next) => {
  // 检查用户是否已登录
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      // 检查用户是否有权限访问管理员页面
      const hasPermission = localStorage.getItem('userRole') === 'admin';

      if (!isLoggedIn) {
        // 如果未登录，重定向到登录页面
        next('/login');
      } else if (!hasPermission) {
        // 如果没有权限，重定向到首页
        next('/');
      } else {
        // 允许访问
        next();
      }
});
```

###### ②全局后置守卫

全局后置守卫在路由跳转完成后执行，适用于所有路由。常用于记录路由变化、发送统计信息等。使用 `router.afterEach` 方法注册全局后置守卫：

```javascript
router.afterEach((to, from) => {
  // 这里不需要调用 next 函数
  console.log('全局后置守卫：已经从', from.path, '跳转到', to.path);
});
```

##### 2.路由独享守卫

路由独享守卫是在路由配置中为特定路由定义的守卫，只有在访问该路由时才会触发。可以用于特定页面的权限控制等。在路由配置中使用 `beforeEnter` 属性定义路由独享守卫：

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      // 执行逻辑，如权限验证
      const hasPermission = localStorage.getItem('userRole') === 'admin';
      if (!hasPermission) {
        // 如果没有权限，重定向到其他页面
        next('/home');
      } else {
        next();
      }
    }
  }
];
```

##### 3.组件内守卫

组件内守卫是在 Vue 组件内部定义的守卫，用于控制组件生命周期中的路由跳转。

###### ①`beforeRouteEnter`

在组件被创建之前执行，无法访问组件实例 `this`，但可以通过 `next` 函数的回调访问组件实例。可以用于在组件进入前进行数据预加载等操作：

```javascript
export default {
  beforeRouteEnter(to, from, next) {
    // 进入该路由之前的逻辑
    console.log('组件内守卫：进入前');
    // 通过 next 的回调访问组件实例
    next(vm => {
      // vm 是组件实例
      console.log('组件实例:', vm);
    });
  }
};
```

###### ②`beforeRouteLeave`

在离开当前路由时触发，通常用于数据保存提示、确认是否离开当前页面等操作：

```javascript
export default {
  beforeRouteLeave(to, from, next) {
    // 离开当前路由前的逻辑，比如提示是否保存
    const answer = window.confirm('Do you really want to leave?');
    if (answer) {
      next(); // 允许离开
    } else {
      next(false); // 取消离开
    }
  }
};
```

##### 4.路由守卫的执行顺序

路由守卫的执行顺序如下：

1. 全局前置守卫 (`beforeEach`)
2. 路由独享守卫 (`beforeEnter`)
3. 组件内离开守卫 (`beforeRouteLeave`)
4. 全局解析守卫 (`beforeResolve`)
5. 组件内进入守卫 (`beforeRouteEnter`)
6. 全局后置钩子 (`afterEach`)

通过合理使用这些路由守卫，可以实现对路由跳转的精细控制，如权限验证、页面访问限制、数据预加载等，提升应用的安全性和用户体验。



#### 六、路由元信息

1. **定义路由元信息**：在路由配置中为路由添加 `meta` 属性：

   ```javascript
   const routes = [
     {
       path: '/',
       component: Home,
       meta: { title: '首页', 
              requiresAuth: true ,
             roles:['user','admin']}
     }
   ];
   ```

2. **在组件中访问元信息**：在组件中通过 `useRoute` 获取路由对象，进而访问元信息：

   ```javascript
   import { useRoute } from 'vue-router';
   export default {
     setup() {
       const route = useRoute();
       console.log(route.meta.title);
     }
   };
   ```

以上是 Vue Router 的基本使用方法和一些常见功能的实现方式，通过合理配置和使用 Vue Router，可以构建出功能强大的单页面应用。



#### 七、路由参数跳转

##### 编程式路由传参

> 除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

###### 1. 通过 `params` 传递

####### 路由配置

> *路径参数* 用冒号 `:` 表示。

```arduino
arduino 代码解读复制代码const routes = [
  // 动态段以冒号开始
  { path: 'details/:id', name: "details", component: Details },
]
```

> `router.push()` 方法的参数可以是一个字符串路径，或者一个描述地址的对象。

```php
php 代码解读复制代码const Home = {
  template: '<div @click="toDetails">To Details</div>',
  metheds: {
    toDetails() {
      // 字符串路径
      this.$router.push('/details/001')
      // 带有路径的对象
      this.$router.push({path: '/details/001'})
      // 命名路由，路由配置时，需要 name 字段
      this.$router.push({ name: 'details', params: { id: '001' } })
    }
  }
}
```

注意，如果提供了 `path`，`params` 会被忽略：

```php
php 代码解读复制代码// `params` 不能与 `path` 一起使用
router.push({ path: '/details', params: { id: '001' } }) // -> /details
```

####### 组件获取数据

> 当一个路由被匹配时，它的 *params* 的值将在每个组件中以 `this.$route.params` 的形式暴露出来。

```javascript
javascript 代码解读复制代码const Details = {
  template: '<div>Details {{ $route.params.id }} </div>',
  created() {
    // 监听路由变化
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
      }
    )
  },
}
```

###### 2. 通过 `query` 传递

这种情况下 `query` （查询参数）传递的参数会显示在 url 后面，如：`/details/001?kind=car`。

####### 路由配置

使用 `query` 时，以下三种方式都是可行的：

```kotlin
kotlin

 代码解读
复制代码this.$router.push('/details/001?kind=car')
php

 代码解读
复制代码this.$router.push({ path: '/details/001', query: { kind: "car" }})
php

 代码解读
复制代码this.$router.push({ name: 'details', params: { id: '001' }, query: { kind: 'car' }})
```

####### 组件获取数据

组件通过 `$route.query` 获取：

```javascript
javascript 代码解读复制代码const Details = {
  template: '<div>Details {{ $route.query.kind }} </div>',
  created() {
    // 监听路由变化
    this.$watch(
      () => this.$route.query,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
      }
    )
  },
}
```

> 要对同一个组件中参数的变化做出响应的话，你可以简单地 watch `$route` 对象上的任意属性，在这个场景中，就是 `$route.query` 。

###### 3. 通过 `hash` 传递

通过此方式，url 路径中带有 `hash`，例如：`/details/001#car`。

####### 路由配置

使用 `hash` 时，以下三种方式都是可行的（同 `query`）：

```kotlin
kotlin

 代码解读
复制代码this.$router.push('/details/001#car')
php

 代码解读
复制代码this.$router.push({ path: '/details/001', hash: '#car'})
php

 代码解读
复制代码this.$router.push({ name: 'details', params: { id: '001' }, hash: 'car'})
```

####### 组件获取数据

组件通过 `$route.hash.slice(1)` 获取：

```arduino
arduino 代码解读复制代码const Details = {
  template: '<div>Details {{ $route.hash.slice(1) }} </div>',
}
```

##### 通过 props 进行传递

> 在组件中使用 `$route` 会与路由紧密耦合，这限制了组件的灵活性，因为它只能用于特定的 URL。虽然这不一定是件坏事，但我们可以通过 `props` 配置来解除这种行为。

以解耦的方式使用 `props` 进行参数传递，主要是在路由配置中进行操作。

###### 1. 布尔模式

当 `props` 设置为 `true` 时，`route.params` 将被设置为组件的 props。

例如下面的代码是通过 `$route` 的方式获取动态字段 `id`：

```arduino
arduino 代码解读复制代码const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const routes = [{ path: '/user/:id', component: User }]
```

将上面的代码替换成 `props` 的形式，如下：

```arduino
arduino 代码解读复制代码const User = {
  props: ['id'], // 组件中通过 props 获取 id
  template: '<div>User {{ id }}</div>'
}
// 路由配置中，增加 props 字段，并将值 设置为 true
const routes = [{ path: '/user/:id', component: User, props: true }]
```

**注意：对于有命名视图的路由，你必须为每个命名视图定义 `props` 配置：**

```yaml
yaml 代码解读复制代码const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    // 为 User 提供 props
    props: { default: true, sidebar: false }
  }
]
```

###### 2. 对象模式

当 `props` 是一个对象时，它将原样设置为组件 props。当 props 是静态的时候很有用。

####### 路由配置

```ini
ini 代码解读复制代码const routes = [
  {
    path: '/hello',
    component: Hello,
    props: { name: 'World' }
  }
]
```

####### 组件中获取数据

```arduino
arduino 代码解读复制代码const Hello = {
  props: {
    name: {
      type: String,
      default: 'Vue'
    }
  },
  template: '<div> Hello {{ name }}</div>'
}
```

`<Hello />` 组件默认显示 Hello Vue，但路由配置了 `props` 对象，当路由跳转到 `/hello` 时，会显示传递过来的 `name`， 页面会显示为 Hello World。

###### 3. 函数模式

可以创建一个返回 props 的函数。这允许你将参数转换为其他类型，将静态值与基于路由的值相结合等等。

####### 路由配置

使用函数模式时，返回 props 的函数接受的参数为路由记录 `route`。

```javascript
javascript 代码解读复制代码// 创建一个返回 props 的函数
const dynamicPropsFn = (route) => {
  return { name: route.query.say + "!" }
}
const routes = [
  {
    path: '/hello',
    component: Hello,
    props: dynamicPropsFn
  }
]
```

####### 组件获取数据

当 URL 为 `/hello?say=World` 时， 将传递 `{name: 'World!'}` 作为 props 传给 `Hello` 组件。

```arduino
arduino 代码解读复制代码const Hello = {
  props: {
    name: {
      type: String,
      default: 'Vue'
    }
  },
  template: '<div> Hello {{ name }}</div>'
}
```

作者：奥赛苏伟
链接：https://juejin.cn/post/7017750202857553956
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### Vuex使用指南

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式和库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。以下是使用 Vuex 的基本步骤：

#### 1. 安装 Vuex

在使用 Vuex 之前，需要先安装它。可以通过 npm 或 yarn 进行安装：

```bash
npm install vuex@next --save
## 或者
yarn add vuex@next
```

#### 2. 创建 Vuex Store

创建一个 store 文件夹，并在其中创建一个 index.js 文件，用于定义 Vuex 的 store：

```javascript
import { createStore } from 'vuex'

export default createStore({
  state: {
    // 存储状态
    count: 0
  },
  mutations: {
    // 修改状态的方法，必须是同步的
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  },
  actions: {
    // 异步操作，提交 mutations
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    decrementAsync({ commit }) {
      setTimeout(() => {
        commit('decrement')
      }, 1000)
    }
  },
  getters: {
    // 类似于计算属性，用于派生状态
    doubleCount(state) {
      return state.count * 2
    }
  }
})
```

#### 3. 在 Vue 应用中使用 Vuex Store

在 Vue 应用的入口文件中引入并使用 Vuex store：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)
app.mount('#app')
```

#### 4. 在组件中使用 Vuex

##### 访问状态

在组件中可以通过 `this.$store.state.count` 访问状态：

```javascript
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
```

或者使用 `mapState` 辅助函数：

```javascript
import { mapState } from 'vuex'

export default {
  computed: mapState({
    count: state => state.count
  })
}
```

##### 提交 mutations

在组件中可以通过 `this.$store.commit('increment')` 提交 mutations：

```javascript
export default {
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    decrement() {
      this.$store.commit('decrement')
    }
  }
}
```

或者使用 `mapMutations` 辅助函数：

```javascript
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['increment', 'decrement'])
  }
}
```

##### 触发 actions

在组件中可以通过 `this.$store.dispatch('incrementAsync')` 触发 actions：

```javascript
export default {
  methods: {
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    },
    decrementAsync() {
      this.$store.dispatch('decrementAsync')
    }
  }
}
```

或者使用 `mapActions` 辅助函数：

```javascript
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['incrementAsync', 'decrementAsync'])
  }
}
```

##### 使用 getters

在组件中可以通过 `this.$store.getters.doubleCount` 使用 getters：

```javascript
export default {
  computed: {
    doubleCount() {
      return this.$store.getters.doubleCount
    }
  }
}
```

或者使用 `mapGetters` 辅助函数：

```javascript
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['doubleCount'])
  }
}
```

#### 5. 示例

以下是一个完整的示例，展示如何在 Vue 组件中使用 Vuex：

```html
<template>
  <div>
    <h1>计数器</h1>
    <p>当前计数：{{ count }}</p>
    <p>双倍计数：{{ doubleCount }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
    <button @click="incrementAsync">异步增加</button>
    <button @click="decrementAsync">异步减少</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount'])
  },
  methods: {
    ...mapMutations(['increment', 'decrement']),
    ...mapActions(['incrementAsync', 'decrementAsync'])
  }
}
</script>
```

通过以上步骤，可以在 Vue.js 应用中使用 Vuex 进行状态管理。

### pinia使用指南

Pinia 是 Vue.js 的状态管理库，专为 Vue 3 设计，提供了更简洁和直观的 API。以下是使用 Pinia 的基本步骤：

#### 1. 安装 Pinia

在 Vue 3 项目中，可以通过 npm 或 yarn 安装 Pinia：

```bash
npm install pinia
## 或者
yarn add pinia
```

#### 2. 创建 Pinia 实例并挂载到 Vue 应用

在项目的入口文件（如 `main.js`）中创建 Pinia 实例并挂载到 Vue 应用：

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
```

#### 3. 创建 Store

在 `src` 目录下创建一个 `stores` 文件夹，用于存放所有的 Store 文件。例如，创建一个 `counter.js` 文件来管理计数器的状态：

```javascript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  // 定义状态
  const count = ref(0);

  // 定义获取器（相当于计算属性）
  const doubleCount = computed(() => count.value * 2);

  // 定义方法（动作）
  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  // 暴露状态和方法
  return { count, doubleCount, increment, decrement };
});
```

#### 4. 在组件中使用 Store

在组件中可以通过 `useStore` 函数来使用 Store：

```vue
<template>
  <div>
    <h1>计数器</h1>
    <p>当前计数：{{ counterStore.count }}</p>
    <p>双倍计数：{{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment">增加</button>
    <button @click="counterStore.decrement">减少</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter';

// 使用 Store
const counterStore = useCounterStore();
</script>
```

#### 5. 其他高级功能

##### 批量更新状态

Pinia 提供了 `$patch` 方法，可以一次性更新多个状态属性：

```javascript
actions: {
  updateCount(value) {
    this.$patch({ count: value })
  }
}
```

##### 异步操作

可以在 actions 中使用异步操作，例如使用 `async/await`：

```javascript
// stores/counter.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);

  const doubleCount = computed(() => count.value * 2);

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  // 异步增加计数
  const asyncIncrement = async () => {
    // 模拟异步操作
    await new Promise((resolve) => setTimeout(resolve, 1000));
    count.value++;
  };

  return { count, doubleCount, increment, decrement, asyncIncrement };
});
```

在组件中调用异步方法：

```vue

<template>
  <div>
    <h1>计数器</h1>
    <p>当前计数：{{ counterStore.count }}</p>
    <p>双倍计数：{{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment">增加</button>
    <button @click="counterStore.decrement">减少</button>
    <button @click="counterStore.asyncIncrement">异步增加</button>
  </div>
</template>


<script setup>
import { useCounterStore } from '../stores/counter';

const counterStore = useCounterStore();
</script>
```

##### 模块化管理

可以将不同的功能模块拆分成多个 Store 文件，每个 Store 独立管理自己的状态。例如：

```javascript
// stores/user.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  const setUser = (userData) => {
    user.value = userData;
  };

  return { user, setUser };
});// stores/user.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  const setUser = (userData) => {
    user.value = userData;
  };

  return { user, setUser };
});
```

然后在组件中同时使用多个 Store：

```vue
<template>
  <div>
    <h1>用户信息</h1>
    <p>用户：{{ userStore.user?.name }}</p>
    <button @click="userStore.setUser({ name: '张三', age: 25 })">设置用户</button>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useCounterStore } from '../stores/counter';

const userStore = useUserStore();
const counterStore = useCounterStore();
</script>
```

##### 数据持久化

为了在页面刷新或关闭后仍能保留 Pinia 存储的数据，可以使用 `pinia-plugin-persistedstate` 插件：

```bash
npm install pinia-plugin-persistedstate
```

在主文件中配置插件：

```javascript
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

在 Store 中启用持久化：

```javascript
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  persist: true
})

//或者
return { 
    token,
    userRoles,
    dynamicRoutes,
    isRoutesLoaded,
    login,
    logout,
    loadDynamicRoutes
  }
},{
  persist: true
}
```

通过以上步骤，可以在 Vue 3 项目中使用 Pinia 进行状态管理，享受其简洁和强大的功能。

在 Vue 3 中，`watch`、`props`、`emits`、`computed` 等功能的使用方式与 Vue 2 有所不同，主要是因为 Vue 3 引入了组合式 API（Composition API），提供了更灵活和强大的功能。以下是这些功能在 Vue 3 中的使用方式：

### watch、computed、props、emits

#### 1. `watch` 的使用

在 Vue 3 中，`watch` 用于响应式地观察数据的变化，可以观察单个值或多个值，并执行相应的回调函数。

##### 观察单个值

```vue
<script setup>
import { ref, watch } from 'vue';

const count = ref(0);

// 观察单个值
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
```

##### 观察多个值

```vue
<script setup>
import { ref, watch } from 'vue';

const count = ref(0);
const name = ref('Alice');

// 观察多个值
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log(`count changed from ${oldCount} to ${newCount}`);
  console.log(`name changed from ${oldName} to ${newName}`);
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Name: {{ name }}</p>
    <button @click="count++">Increment</button>
    <button @click="name = 'Bob'">Change Name</button>
  </div>
</template>
```

①**监视 `reactive()` 定义的响应式数据时，且`默认自动开启了深度监视`，并且该深度监视`不可通过配置项 { deep: false } 关闭`。**

②**监视`ref()`定义的【`引用类型`】数据：直接写数据名，监视的是`源数据`的【`地址值（堆 / 栈 内存的关系`）】，若想深层监视对象内部的数据，则需要`手动开启深度监视`。**

③**监听 `ref()` 定义的【`基本类型`】数据：`watch 参数一` 直接写数据名即可，监听的是其`value`值的改变。**

④**监视 `ref()` 或 `reactive()` 所定义的【`引用数据`类型】数据中的 `某个属性 或 下标值`**

**需要用一个返回该属性的` getter 函数`：**

```typescript
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

#### 2. `props` 的使用

在 Vue 3 中，`props` 用于从父组件向子组件传递数据。可以通过 `defineProps` 来定义组件的 `props`。

##### 基本用法

```vue
<script setup>
import { defineProps } from 'vue';

// 定义 props
const props = defineProps({
  title: String,
  count: Number
});
</script>

<template>
  <div>
    <h1>{{ props.title }}</h1>
    <p>Count: {{ props.count }}</p>
  </div>
</template>
```

##### 父组件传递 `props`

```vue
<template>
  <div>
    <ChildComponent title="Hello World" :count="5" />
  </div>
</template>
```

#### 3. `emits` 的使用

在 Vue 3 中，`emits` 用于子组件向父组件传递事件。可以通过 `defineEmits` 来定义组件的事件。

##### 基本用法

```vue
<script setup>
import { defineEmits } from 'vue';

// 定义 emits
const emit = defineEmits(['increment', 'decrement']);
</script>

<template>
  <div>
    <button @click="emit('increment')">Increment</button>
    <button @click="emit('decrement')">Decrement</button>
  </div>
</template>
```

##### 父组件监听事件

```vue
<template>
  <div>
    <ChildComponent @increment="handleIncrement" @decrement="handleDecrement" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const handleIncrement = () => {
  count.value++;
};

const handleDecrement = () => {
  count.value--;
};
</script>
```

#### 4. `computed` 的使用

在 Vue 3 中，`computed` 用于定义计算属性，其值基于其他响应式数据计算得出。可以通过 `computed` 函数来定义计算属性。

##### 基本用法

```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);

// 定义计算属性
const doubleCount = computed(() => {
  return count.value * 2;
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
```

#### 5.`watchEffect` 的使用

**立即运行一个函数，同时`响应式地追踪其依赖`，并在`依赖更改时重新执行`。**

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const count = ref(0);

// watchEffect 会在组件挂载时立即执行一次，并在依赖的值变化时重新执行
watchEffect(() => {
  console.log(`count changed to ${count.value}`);
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
```

watch 对比 watchEffect 的区别
watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：
• watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。同时还有以下几点：
◦ 懒执行副作用；
◦ 更加明确是应该由哪个状态触发侦听器重新执行；
◦ 可以访问所侦听状态的前一个值和当前值
• watchEffect，初始化时会自动执行一次并响应式的追踪其依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确