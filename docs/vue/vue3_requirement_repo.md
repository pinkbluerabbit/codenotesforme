## 动态菜单与动态路由配置（包含登录逻辑）

### 实现流程

```
sequenceDiagram
    participant User as 用户
    participant Login as 登录页面
    participant API as 后端接口
    participant AuthStore as Pinia Store
    participant Router as Vue Router
    participant Layout as 主布局

    User->>Login: 提交登录表单
    Login->>API: 调用登录接口
    API-->>Login: 返回token和权限信息
    Login->>AuthStore: 保存token和权限数据
    AuthStore->>API: 请求动态路由/菜单
    API-->>AuthStore: 返回路由配置和菜单数据
    AuthStore->>Router: 动态添加路由
    AuthStore->>Layout: 更新菜单数据
    Layout-->>User: 渲染动态菜单
```

### 具体方案

#### 1.路由工具函数，转换路由格式

```java

// router/utils.js
/*******************************************************************************
****函数功能: 转换路由格式，用于关联组件与路由
****入口参数: routes:路由json数据
****出口参数: 
****函数备注: 
********************************************************************************/
export function formatRoutes(routes) {
    return routes.map(route => {
        // 处理meta信息
      if (!route.meta) {
              route.meta = {};
            }
        route.meta.keepAlive = route.meta.keepAlive !== undefined ? route.meta.keepAlive : false;
  
      // 使用 import.meta.glob 动态导入组件
      const modules = import.meta.glob('@/views/**/*.vue');
      const componentPath = `/src/views/${route.component}.vue`;
  
      return ({
        ...route,
        component: modules[componentPath],
        children: route.children ? formatRoutes(route.children) : []
      })
    })
  }


/*******************************************************************************
****函数功能: 根据路由和用户权限过滤路由信息
****入口参数: routes:路由数据
****入口参数: userRoles:用户权限数据
****出口参数: 
****函数备注: 
********************************************************************************/
export function getVisibleRoutes(routes, userRoles) {
    const result = [];
  
    routes.forEach(route => {
      // 过滤隐藏路由
      if (route.meta && route.meta.hidden) return;
  
      // 权限过滤
      if (route.meta && route.meta.roles) {
        if (!route.meta.roles.some(role => userRoles.includes(role))) return;
      }
  
      // 如果是主布局路由（path为'/'），则将其子路由加入结果
      if (route.path === '/') {
        if (route.children) {
          route.children.forEach(childRoute => {
            // 过滤隐藏子路由
            if (childRoute.meta && childRoute.meta.hidden) return;
  
            // 子路由权限过滤
            if (childRoute.meta && childRoute.meta.roles) {
              if (!childRoute.meta.roles.some(role => userRoles.includes(role))) return;
            }
  
            // 跳过没有名称的子路由（可选）
            if (childRoute.name) {
              result.push({
                ...childRoute,
                // 保留父路由的元信息（如果需要）
                meta: {
                  ...route.meta,
                  ...childRoute.meta
                }
              });
            }
          });
        }
      } else {
        // 其他路由直接加入结果
        result.push(route);
      }
    });
  
    return result;
  };
```

#### 2.创建用户权限文件，处理登录逻辑，获取动态路由

```javascript
// stores/authStore.js
import { defineStore } from 'pinia'
import { getRoutes,getUsers } from '@/api/auth'
import router from '@/router'
import { ref } from 'vue'
import {formatRoutes,getVisibleRoutes} from '@/router/utils'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref(localStorage.getItem('token'))
  const userRoles = ref([])
  const dynamicRoutes = ref([])
  const isRoutesLoaded = ref(false)
  

  // 登录
  const login = async (username, password) => {
    const res = await getUsers({ username, password})
    token.value = res.token
    localStorage.setItem('token', token.value)
    userRoles.value = res.roles
    
    // 加载动态路由
    await loadDynamicRoutes()
  }

  // 登出
  const logout = () => {
    token.value = null
    userRoles.value = []
    dynamicRoutes.value = []
    isRoutesLoaded.value = false
    localStorage.removeItem('token')
    
    // 重置路由到初始状态
    router.getRoutes().forEach(route => {
      if (route.name !== 'Login') {
        router.removeRoute(route.name)
      }
    })
    router.push('/login')
  }

  // 加载动态路由
  const loadDynamicRoutes = async () => {
    if (isRoutesLoaded.value) return
    
    const data  = await getRoutes()
    
    // 转换路由配置
    const formattedRoutes = formatRoutes(data)
    dynamicRoutes.value = getVisibleRoutes(formattedRoutes, userRoles.value)
    formattedRoutes.forEach(route => router.addRoute(route))
    
    // 添加404路由
    router.addRoute({ 
      path: '/:pathMatch(.*)*', 
      component: () => import('@/views/404.vue')
    })
    isRoutesLoaded.value = true
  }



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
})
```

#### 3.配置基础路由和路由守卫

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/authStore'
// 静态基础路由
const baseRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/401',
    component: () => import('@/views/401.vue'),
    meta: { title: '无权限', hidden: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  
  // 白名单
  const whiteList = ['/login', '/404']
  if (whiteList.includes(to.path)) return true

  // 未登录
  if (!authStore.token) return '/login'

  // 已登录但未加载路由
  if (!authStore.isRoutesLoaded) {
    try {
      await authStore.loadDynamicRoutes()
      return to.fullPath // 重新跳转
    } catch (error) {
      authStore.logout()
      return '/login?error=1'
    }
  }

  // 权限校验
  if (to.meta.roles) {
    const hasPermission = to.meta.roles.some(r => 
      authStore.userRoles.includes(r)
    )
    if (!hasPermission) return '/401'
  }
})


export default router
```

#### 4.创建动态菜单组件

 components/DynamicMenu.vue

```vue

<template>
  <el-menu :default-active="activePath" router background-color="#304156" text-color="#bfcbd9"
    active-text-color="#409EFF">
    <template v-for="item in routes" :key="item.path">
      <!-- 有子菜单 -->
      <el-sub-menu v-if="item.children?.length" :index="item.path">
        <template #title>
          <i v-if="item.meta.icon" :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <DynamicMenu :routes="item.children" />
      </el-sub-menu>

      <!-- 无子菜单 -->
      <el-menu-item v-else :index="item.path" :disabled="item.meta.hidden">
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  routes: {
    type: Array,
    default: () => []
  }
})


// 当前激活路径
const activePath = computed(() => route.path)
</script>
```

​	views/MainPage.vue

```vue
<template>
    <div class="app-container">
      <el-container>
        <!-- 侧边栏 -->
        <el-aside 
          :width="isCollapse ? '64px' : '240px'"
          class="sidebar-container"
        >
          <div class="logo-container">
            <img src="@/assets/logo.svg" class="logo">
            <h1 v-show="!isCollapse">Admin System</h1>
          </div>
          <DynamicMenu 
            :routes="authStore.dynamicRoutes"
            :is-collapse="isCollapse"
          />
        </el-aside>
  
        <!-- 主内容区 -->
        <el-container>
          <el-header class="header-container">
            <div class="header-left">
              <el-icon @click="toggleCollapse">
                <component :is="isCollapse ? 'Expand' : 'Fold'" />
              </el-icon>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item 
                  v-for="(item, index) in breadcrumbs"
                  :key="index"
                >
                  {{ item.meta.title }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="header-right">
              <el-dropdown>
                <span class="user-info">
                  <el-avatar :size="30" />
                  <span class="username">{{ authStore.username }}</span>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="authStore.logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-header>
  
          <el-main class="main-container">
            <router-view v-slot="{ Component }">
              <transition name="fade-transform" mode="out-in">
                <keep-alive :include="cachedViews">
                  <div>
                    <component :is="Component" />
                  </div>
                </keep-alive>
              </transition>
            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAuthStore } from '@/stores/authStore'
  import DynamicMenu from '@/components/DynamicMenu.vue'

  const authStore = useAuthStore()
  const isCollapse = ref(false)

  // 面包屑导航
  const route = useRoute()
  const breadcrumbs = computed(() => {
    console.log(route.matched)
    return route.matched.filter(item => item.meta.title)
  })
  
  // 缓存页面
  const cachedViews = computed(() => 
    authStore.dynamicRoutes
      .filter(r => r.meta.keepAlive)
      .map(r => r.name)
  )
  
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }
  </script>
  
  <style lang="scss" scoped>
  .app-container {
  width: 100%;
  height: 100vh;
  display: flex;
}

.sidebar-container {
  background-color: #304156;
  transition: width 0.3s;
  flex-shrink: 0; // 确保侧边栏不被压缩

  .logo-container {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: #2b2f3a;

    .logo {
      width: 32px;
      height: 32px;
    }

    h1 {
      color: #fff;
      margin-left: 12px;
      font-size: 18px;
    }
  }
}

.main-container {
  flex: 1; // 主内容区占据剩余空间
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  height: 60px;

  .header-left {
    display: flex;
    align-items: center;

    .el-icon {
      margin-right: 20px;
      cursor: pointer;
      font-size: 20px;
    }
  }

  .user-info {
    display: flex;
    align-items: center;

    .username {
      margin-left: 10px;
    }
  }
}

.content-container {
  flex: 1;
  overflow: auto;
  padding: 20px;
  background-color: #f0f2f5;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```

#### 5.页面刷新处理

App.vue

```vue
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { onMounted } from 'vue';
const authStore = useAuthStore()

// 初始化检查登录状态
onMounted(async()=> {
  if (authStore.token) {
    authStore.isRoutesLoaded = false
  await authStore.loadDynamicRoutes()
}
})
</script>

<style>
#app {
  height: 100vh;
  width:100%;
}
</style>

```

#### 6.vite配置，代理请求

vite.config.js

```javascript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  //接口地址
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



























