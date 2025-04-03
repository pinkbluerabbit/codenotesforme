## 前端场景题

### 一、在前端路由跳转时，如果前一个页面占用了大量内存，可能会导致页面卡顿或性能下降，如何解决。

---

#### **1. 问题分析**
- **内存占用来源**：
  - 大量 DOM 节点未清理。
  - 未释放的事件监听器、定时器、WebSocket 连接等。
  - 缓存了大量数据（如图片、视频、大对象）。
- **表现**：
  - 路由跳转时页面卡顿。
  - 浏览器内存占用持续升高。
  - 页面响应变慢，甚至崩溃。

---

#### **2. 解决方案**

##### **2.1 组件卸载时清理资源**
在 Vue 组件的 `beforeUnmount` 或 `unmounted` 生命周期钩子中，手动清理资源。

```javascript
export default {
  setup() {
    const timer = setInterval(() => {
      console.log('Running...');
    }, 1000);

    const eventListener = () => {
      console.log('Event triggered');
    };
    window.addEventListener('resize', eventListener);

    // 组件卸载时清理
    onUnmounted(() => {
      clearInterval(timer);
      window.removeEventListener('resize', eventListener);
    });
  }
};
```

##### **2.2 使用虚拟列表优化大数据渲染**
如果页面渲染了大量数据，使用虚拟列表技术减少 DOM 节点数量。

```javascript
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const VirtualList = () => (
  <List height={400} itemCount={1000} itemSize={35} width={300}>
    {Row}
  </List>
);
```

##### **2.3 释放大对象和缓存**
在路由跳转前，手动释放不再需要的大对象或缓存数据。

```javascript
import { onBeforeRouteLeave } from 'vue-router';

export default {
  setup() {
    const largeData = new Array(1000000).fill({}); // 大对象

    onBeforeRouteLeave(() => {
      largeData.length = 0; // 释放内存
    });
  }
};
```

##### **2.4 使用 `keep-alive` 缓存组件状态**
对于需要频繁切换的页面，使用 `keep-alive` 缓存组件状态，避免重复渲染。

```vue
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
```

##### **2.5 延迟加载非关键资源**
对于非关键资源（如图片、视频），使用懒加载或按需加载。

```html
<img data-src="image.jpg" class="lazyload" />

<script>
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.lazyload');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
});
</script>
```

##### **2.6 手动触发垃圾回收（谨慎使用）**
在路由跳转时，手动触发垃圾回收（仅适用于调试环境）。

```javascript
if (window.gc) {
  window.gc(); // 手动触发垃圾回收
}
```

---

#### **3. 性能监控与调试**

##### **3.1 使用 Chrome DevTools 分析内存**
- 打开 Chrome DevTools，切换到 **Memory** 面板。
- 使用 **Heap Snapshot** 分析内存占用。
- 使用 **Performance** 面板记录路由跳转过程，定位性能瓶颈。

##### **3.2 使用 Vue Devtools**
- 检查组件树，确保组件正确卸载。
- 查看事件监听器和定时器是否被清理。

##### **3.3 使用 Performance API**
通过 `performance.memory` 监控内存使用情况。

```javascript
console.log(performance.memory);
// 输出：{ totalJSHeapSize, usedJSHeapSize, jsHeapSizeLimit }
```

---

#### **4. 最佳实践总结**

| 场景           | 解决方案                                      |
| -------------- | --------------------------------------------- |
| 未清理的资源   | 在 `unmounted` 钩子中清理事件监听器、定时器等 |
| 大量 DOM 节点  | 使用虚拟列表优化渲染                          |
| 大对象占用内存 | 手动释放不再需要的对象                        |
| 频繁切换的页面 | 使用 `keep-alive` 缓存组件状态                |
| 非关键资源加载 | 使用懒加载或按需加载                          |
| 内存泄漏排查   | 使用 Chrome DevTools 分析内存                 |

---

#### **5. 示例代码**

##### **5.1 清理资源**
```javascript
export default {
  setup() {
    const timer = setInterval(() => {
      console.log('Running...');
    }, 1000);

    const eventListener = () => {
      console.log('Event triggered');
    };
    window.addEventListener('resize', eventListener);

    onUnmounted(() => {
      clearInterval(timer);
      window.removeEventListener('resize', eventListener);
    });
  }
};
```

##### **5.2 虚拟列表**
```javascript
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const VirtualList = () => (
  <List height={400} itemCount={1000} itemSize={35} width={300}>
    {Row}
  </List>
);
```

##### **5.3 释放大对象**
```javascript
import { onBeforeRouteLeave } from 'vue-router';

export default {
  setup() {
    const largeData = new Array(1000000).fill({});

    onBeforeRouteLeave(() => {
      largeData.length = 0; // 释放内存
    });
  }
};
```

---

通过以上方案，可以有效解决前端路由跳转时的内存占用问题，提升页面性能和用户体验。

### 二、刚打开一个页面时，前端可以通过什么方式减少请求？

#### 1. 资源合并
- **合并CSS和JavaScript文件**：将多个CSS文件合并成一个CSS文件，多个JavaScript文件合并成一个JavaScript文件，减少HTTP请求次数。例如，把`style1.css`、`style2.css`合并为`styles.css`，把`script1.js`、`script2.js`合并为`scripts.js`。
- **合并图片资源**：使用CSS Sprites技术，将多个小图标或图片合并成一张大图，通过CSS定位来显示不同的部分，减少图片请求次数。
#### 2. 资源压缩
- **压缩CSS、JavaScript和HTML**：去除文件中的多余空格、注释和换行符等，减小文件大小，加快传输速度。例如，使用`UglifyJS`压缩JavaScript代码，`CSSNano`压缩CSS代码。
- **图片压缩**：对图片进行压缩，减小图片文件的大小，同时尽量不影响视觉效果。可以使用在线工具如`TinyPNG`，或者在代码中使用`compressor`等库。
#### 3. 使用缓存
- **浏览器缓存**：通过设置HTTP头信息，如`Expires`、`Cache-Control`、`ETag`等，让浏览器缓存静态资源，下次访问时直接从缓存中读取，减少请求。例如，设置`Cache-Control: max-age=31536000`，让资源缓存一年。
- **本地存储缓存**：利用浏览器的`localStorage`、`sessionStorage`或`IndexedDB`存储一些经常使用的数据，如用户信息、配置信息等，避免每次请求都从服务器获取。
#### 4. 懒加载
- **图片懒加载**：对于页面中非首屏显示的图片，可以先不加载，等到用户滚动到该区域时再加载，减少初始页面加载时的请求。使用`lazyload`插件或原生的`Intersection Observer` API实现。
- **组件懒加载**：在使用框架如React、Vue等时，可以将不常用的组件进行懒加载，只有在需要时才进行加载，减少初始加载的资源量。
#### 5. 使用CDN
- **内容分发网络（CDN）**：将静态资源部署到CDN上，用户访问时会从离用户最近的CDN节点获取资源，提高访问速度，同时减轻服务器的负担。例如，使用`阿里云CDN`、`七牛云CDN`等。
#### 6. 减少不必要的请求
- **去除冗余资源**：检查页面中是否存在不必要的资源请求，如多余的图片、脚本、样式表等，及时去除。
- **优化API请求**：在页面打开时，只请求必要的数据，避免一次性请求过多数据。可以采用分页加载、按需加载等方式。

#### 7. 使用Service Worker
- **缓存策略**：通过Service Worker可以实现各种缓存策略，如缓存优先、网络优先、缓存和网络结合等，减少对服务器的请求，提高页面的加载速度。
#### 8. 代码分割
- **按路由分割代码**：在使用前端框架时，可以根据不同的路由将代码分割成多个块，用户访问哪个路由就加载对应的代码块，减少初始加载的代码量。
- **按功能分割代码**：将不同功能的代码分割成不同的模块，按需加载，避免一次性加载所有代码。

### 三、前端白屏问题的排查、解决和优化方法

#### 排查方法
#### **1. 检查控制台错误日志**：

- **查看错误信息**：在浏览器的开发者工具中打开控制台面板，查看是否有JavaScript错误信息，包括语法错误、运行时错误等。这些错误可能导致页面无法正常渲染。
- **定位错误代码**：根据错误堆栈信息，定位到具体的代码位置，检查代码的正确性。

#### 2. **查看网络请求**：

- **检查资源加载状态**：在浏览器的开发者工具中打开网络面板，查看页面加载过程中各个资源的加载状态，包括HTML、CSS、JavaScript、图片等。检查是否存在4xx错误码（如404 Not Found、403 Forbidden），以及资源的加载时间。
- **分析网络请求顺序**：查看各个资源的加载顺序，是否存在阻塞页面渲染的资源。

#### 3. **验证资源加载**：

- **检查资源文件的URL**：确保资源文件的URL正确，没有拼写错误或路径错误。
- **检查资源文件的完整性**：确保资源文件没有损坏，如图片文件是否能正常打开，JavaScript和CSS文件是否能正常解析。

#### 4. **调试代码段**：

- **使用断点调试**：在代码中设置断点，逐步执行代码，观察代码的执行流程，找出可能导致白屏的代码段。
- **回退代码版本**：如果怀疑是最近的代码修改导致的问题，可以尝试回退到之前的代码版本，查看是否能正常显示页面。

#### 5. **检查浏览器兼容性**：

- **测试不同浏览器**：在不同的浏览器中测试页面，查看是否存在兼容性问题。
- **使用跨浏览器测试工具**：如BrowserStack、Sauce Labs等工具，对页面进行跨浏览器测试。

#### 6.**检查第三方服务**：

- **禁用第三方服务**：暂时禁用页面中依赖的第三方服务，如广告、统计、社交分享等，查看页面是否能正常显示。
- **检查第三方服务的集成代码**：确保与第三方服务的集成代码正确，服务可用。

#### 7.**检查缓存问题**：

- **清除浏览器缓存**：让用户清除浏览器缓存，重新访问页面，查看是否能正常显示。
- **检查服务器端缓存策略**：确保服务器端的缓存设置合理，避免缓存过期或缓存失效的问题。

#### 8.**检查设备性能**：

- **测试不同设备**：在不同性能的设备上测试页面，查看是否存在设备性能问题导致的白屏。
- **优化页面性能**：使用懒加载、减少DOM操作、优化动画性能等方法，提高页面的渲染速度。

#### 9.**检查安全问题**：

- **关闭安全软件**：让用户暂时关闭安全软件或插件，查看页面是否能正常显示。
- **检查页面的安全策略**：确保页面的安全策略正确，没有违反CSP规则，使用安全工具检查页面是否存在XSS漏洞。

#### 解决和优化方法
#### 1.**路由懒加载**：

- **按需加载组件**：在使用前端框架如Vue、React时，可以将不同路由对应的组件进行懒加载，只有在用户访问该路由时才加载对应的组件，减少初始加载的资源量。

#### 2.**使用骨架屏**：

- **手动实现骨架屏**：在页面加载时，先显示一个简单的骨架布局，待数据加载完成后再替换为实际内容，减少用户的等待感。
- **自动化骨架屏方案**：使用如vue-skeleton-webpack-plugin等插件，自动生成骨架屏。

#### 3.**资源预加载**：

- **预加载关键资源**：在页面头部使用`<link rel="preload">`标签预加载关键资源，如字体、图片等，加快页面的渲染速度。
- **预渲染方案**：对于静态内容较多的页面，可以使用prerender-spa-plugin进行预渲染，生成静态HTML文件。

#### 4.**代码分割**：

- **按路由分割代码**：将不同路由对应的代码分割成不同的块，按需加载，减少初始加载的代码量。
- **按功能分割代码**：将不同功能的代码分割成不同的模块，按需加载，避免一次性加载所有代码。

#### 5.**使用缓存**：

- **浏览器缓存**：通过设置HTTP头信息，如`Cache-Control`、`Expires`等，让浏览器缓存静态资源，减少重复请求。
- **本地存储缓存**：利用浏览器的`localStorage`、`sessionStorage`或`IndexedDB`存储一些经常使用的数据，减少网络请求。

#### 6.**优化图片资源**：

- **图片懒加载**：对于页面中非首屏显示的图片，可以先不加载，等到用户滚动到该区域时再加载，减少初始页面加载时的请求。
- **图片压缩**：对图片进行压缩，减小图片文件的大小，同时尽量不影响视觉效果。

#### 7.**使用CDN**：

- **内容分发网络**：将静态资源部署到CDN上，用户访问时会从离用户最近的CDN节点获取资源，提高访问速度，同时减轻服务器的负担。

#### 8.**提高服务器性能**：

- **优化服务器配置**：如增加服务器的带宽、优化服务器的响应时间等，确保服务器能快速响应用户的请求。
- **使用负载均衡**：在高流量的情况下，使用负载均衡将请求分配到多个服务器上，提高服务器的处理能力。

#### 9.**使用现代前端框架和工具**：

- **选择合适的框架**：如Vue、React等现代前端框架，它们提供了丰富的功能和优化，有助于提高页面的性能。
- **使用构建工具**：如Webpack、Vite等构建工具，可以对代码进行优化、压缩、打包等操作，提高页面的加载速度。

#### 10.**持续优化**：

- **使用性能监控工具**：如Google Analytics、New Relic等，可以实时监控页面的加载速度和性能，发现潜在的问题。
- **定期检查和优化**：定期使用性能监控工具生成报告，分析加载速度和性能，发现潜在的问题，进行优化。