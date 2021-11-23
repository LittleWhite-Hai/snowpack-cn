---
layout: ../../layouts/content-with-cover.astro
title: "Vue"
description: "Get started with this in-depth tutorial on how to build Vue applications and websites with Snowpack"
date: 2020-12-01
sidebarTitle: Vue
tags: communityGuide
---

Snowpack 非常适用于任何规模的[Vue](https://vuejs.org)项目。它很容易上手，可以扩展到包含数千个组件和页面的项目而不影响开发速度。与传统的 Vue 应用工具不同，Snowpack 让你免于被复杂的打包环境和配置文件所困扰。

你将看到从一个空目录变成一个完全配置好的 Snowpack 项目的过程。在这个过程中，你会学到

- 如何设置你的 Snowpack 开发环境
- 添加你的第一个 Vue 组件
- 导入图片和其他 web 资源
- 启用模块热替换（HMR）
- 接入你喜欢的工具

预备知识：Snowpack 是一个从 npm 安装的命令行工具。本指南假定你对 Node.js、npm 以及如何在终端运行命令有基本了解。对 Vue 的了解不是必需的，Snowpack 是学习 Vue 的一个很好的方法。

> 💡 提示：在我们的 Create Snowpack App 模板中，有一个[Vue/Snowpack](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-vue)工作实例。

## 开始使用

开始一个新的 Snowpack 项目的最简单方法是使用[Create Snowpack App](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/cli)，这是一个基于我们的示例模板创建新项目的工具。`@snowpack/app-template-minimal`是一个 Create Snowpack App 模板，用于简单的、基本的 Snowpack 项目配置，本指南的其余部分也是基于它。

在终端运行以下命令，创建一个名为`vue-snowpack`的新目录，并安装基本模板。

```bash
npx create-snowpack-app vue-snowpack --template @snowpack/app-template-minimal
```

前往新的`vue-snowpack`目录，用以下两个命令启动 Snowpack。

```bash
cd vue-snowpack
npm run start
```

你能看到新网站已经启动并运行了!

<div class="frame"><img src="/img/guides/react/minimalist-hello-world.png" alt="screenshot of project-template-minimal, which shows 'Hello world' in text on a white background." class="screenshot"/></div>

现在你已经有了一个正在运行的基本项目，下一步是安装 Vue。在你的项目目录中运行以下命令。

```bash
npm install vue@3.0.11 --save
```

> 提示：添加`--use-yarn`或`--use-pnpm`选项以使用 npm 以外的东西。

```bash
npm install @snowpack/plugin-vue --save-dev
```

[Snowpack 插件](/plugins) 是一种扩展 Snowpack 功能的方式。安装`@snowpack/plugin-vue`插件，以便 Snowpack 知道如何将`.vue`文件构建成在浏览器中运行的 JavaScript 和 CSS 文件。

安装后，你需要将该插件添加到你的 Snowpack 配置文件`（snowpack.config.mjs`）中来让 Snowpack 知道要用它。

```diff
  // snowpack.config.mjs
  export default {
    mount: {
      /* ... */
    },
    plugins: [
+    '@snowpack/plugin-vue',
    ],
  };
```

重启 Snowpack 开发服务器来启用新的配置。退出进程（在大多数 Windows/Linux/MacOS 中 ctrl + c），然后用`npm run start`再次启动它。

> 💡 提示：每当你修改配置（对`snowpack.config.mjs`的修改）后，记得重启 Snowpack 开发服务。

Snowpack 会识别出新的依赖包（Vue，或 "vue/internal"），并在安装依赖到 Snowpack 时打印出以下输出。

```bash
[snowpack] installing dependencies...
[snowpack] ✔ install complete! [0.45s]
[snowpack]
  + vue@3.0.11
  └── @vue/runtime-dom@3.0.11
    └── @vue/runtime-core@3.0.11
      └── @vue/reactivity@3.0.11
        └── @vue/shared@3.0.11
```

## 创建你的第一个 Vue 组件

现在 Snowpack 环境已经设置好，可以准备为浏览器构建`.vue`文件了，是时候创建第一个 Vue 组件文件了!

在项目目录下创建一个名为`App.vue`的文件，代码如下。

```html
<script>
  export default {
    setup() {
      return {};
    },
  };
</script>
<template>
  <div>Welcome to my Vue app!</div>
</template>
```

在`index.html`中的`body`标签上添加一个 id 属性为`#root`

```diff
// index.html
- <body>
+ <body id="root">
    <h1>Welcome to Snowpack!</h1>
    <script type="module" src="/index.js"></script>
  </body>
```

现在你可以在`index.js`中使用新的`App.vue`文件。

```diff
// index.js
- console.log('Hello World! You did it! Welcome to Snowpack :D');
+ import { createApp } from 'vue';
+ import App from './App.vue';
+ createApp(App).mount('#root');
```

现在页面显示 "欢迎来到我的 Vue App!"。恭喜你！你现在有了第一个 Vue 组件!

## 定制项目结构

Snowpack 足够灵活，可以支持你喜欢的任何项目结构。在本指南中，你将学习如何使用 Vue 社区的一个流行的项目模式。

    ├── src/        <- your Vue components and their assets (CSS, images)
    │   ├── index.js
    │   └── App.vue
    └── public/     <- global assets like images, fonts, icons, and global CSS
        ├── index.css
        └── index.html

使用你喜欢的工具来重新排列和重命名文件，或者在终端运行这些命令。

```bash
mkdir src
mkdir public
mv index.js src/index.js
mv App.vue src/App.vue
mv index.html public/index.html
mv index.css public/index.css
```

如果你现在正在运行 Snowpack，那么现在网站已经挂了，因为文件的路径变了。添加一个 "mount" 配置来更新网站的文件结构。

`mount`配置改变了 Snowpack 扫描和构建文件的位置。回到你在添加`@snowpack/plugin-vue` 时编辑的`snowpack.config.mjs`文件，把这个添加到空的`mount`对象中。

```diff
  // snowpack.config.mjs
  export default {
    mount: {
-     /* ... */
+     public: '/',
+     src: '/dist',
    },
  };
```

<img src="/img/guides/folder-structure.png" alt="Graphic shows the original and new folder structures side by side. Arrows indicate that the files are built to where the arrow points. The Original side shows a folder labeled ./ entire directory with an arrow pointing to a folder labeled  mysite.com/*. The New side shows a folder labeled ./src/* with an arrow pointing to a folder labeled mysite.com/_dist/*. Then a second folder labeled ./public/* with an arrow pointing to a folder labeled mysite.com/* "/>

`mount`是[Snowpack configuration API](/reference/configuration)的一部分。它允许你定制项目的文件结构。键是目录的名称，值是你希望它们在最终构建时的位置。有了这个新的配置，Snowpack 会将`public`目录下的文件，如`public/index.css`目录，构建到`index.css`。它将`src`目录下的文件，如`src/index.js`，构建到`/dist/index.js`中，所以你需要在`index.html`中改变这个路径。

```diff
<!-- public/index.html -->

  <body>
    <h1>Welcome to Snowpack!</h1>
-   <script type="module" src="/index.js"></script>
+   <script type="module" src="/dist/index.js"></script>
  </body>
```

你需要重启 Snowpack 来使配置生效。再次启动时，如果成功了，它看起来应该没变。

## 添加一个 Vue 的动画 Logo

在 Vue 中，你可以直接向组件添加 CSS。这一小节通过添加一个动画 Logo 来演示这一功能。

[下载`logo.svg`](https://github.com/snowpackjs/snowpack/blob/main/create-snowpack-app/app-template-vue/public/logo.svg)到`public`目录。现在你可以把它添加到`App.vue`中。

```diff
<!-- src/App.vue -->

  <header class="App-header">
+   <img src="/logo.svg" class="App-logo" alt="logo" />
    <a
      class="App-link"
      href="https://vuejs.org"
      target="_blank"
      rel="noopener noreferrer">
      Learn Vue
    </a>
```

CSS 可以直接放在`.vue`组件中。将这段代码添加到`App.vue`的顶部的`<style>`标签:

```html
<!-- src/App.vue -->

<style>
  .App-header {
    background-color: #f9f6f6;
    color: #333;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
  }
  .App-logo {
    height: 36vmin;
    pointer-events: none;
    margin-bottom: 3rem;
    animation: App-logo-pulse infinite 1.6s ease-in-out alternate;
  }
  @keyframes App-logo-pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.06);
    }
  }
</style>
```

## 在 Vue 组件中添加一个计数器

Snowpack 是唯一默认支持快速刷新的 Vue 开发环境之一。通过快速刷新，当你对`.vue`文件进行修改时，Snowpack 会向浏览器推送实时更新，而不会重设组件状态。要想亲眼看到这一点，请继续在`App.vue`组件中添加一个简单的计时器。

Vue 组件在`<script>`标签中引入特定于组件的脚本。在`App.vue`的`<script>`标签内添加计数器:

```html
<!-- src/App.vue -->

<script>
  import { onMount } from "vue";
  let count = 0;
  onMount(() => {
    const interval = setInterval(() => count++, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>
```

然后在你的组件 body 的下方，添加这段代码，显示计时器的结果。

```diff
  <!-- src/App.vue -->

  <div class="App">
    <header class="App-header">
      <img src="/logo.svg" class="App-logo" alt="logo" />
+     <p>Page has been open for <code>{count}</code> seconds.</p>
      <a class="App-link" href="https://vuejs.org" target="_blank" rel="noopener noreferrer">
        Learn Vue
      </a>
    </header>
  </div>
```

改变页面上的一些代码（比如 "Learn Vue "按钮）。你会看到计时器并没有重置。

那其他非 Vue 文件呢，比如`src/index.js`？要在其他文件改变时重新渲染你的 Vue 应用程序，请在底部添加这个代码段。

```diff
// src/index.js

  export default app;

+ // Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
+ // Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
+ if (import.meta.hot) {
+   import.meta.hot.accept();
+   import.meta.hot.dispose(() => {
+     app.$destroy();
+   });
+ }
```

## 更进一步

干得好！你现在已经准备好用 Snowpack 构建你梦想中的 Vue 项目了。想在 Twitter 上向全世界展示你的成就吗？请点击下面的按钮。

[Twitter](https://twitter.com/share?ref_src=twsrc%5Etfw)

到了这里，你已经掌握了基础知识，对于任何 Vue 项目这都是一个很好的开端。官方的[Snowpack Vue](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-vue)例子还有一些其他的工具，你可能会觉得很有用。

- [Prettier](https://prettier.io/)- 一个流行的代码格式化器。
- [Test](/guides/testing)- Snowpack 支持任何流行的 JavaScript 测试框架。
- [`@snowpack/plugin-dotenv`](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-dotenv)- 在 Snowpack 中使用`dotenv`，这对环境特定变量很有用。

如果你有任何问题、评论或更正，我们希望在 Snowpack[论坛](https://github.com/snowpackjs/snowpack/discussions)或[Snowpack Discord 社区](https://discord.gg/rS8SnRk)听到你的意见。
