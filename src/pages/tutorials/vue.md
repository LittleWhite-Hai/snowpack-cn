---
layout: ../../layouts/content-with-cover.astro
title: 'Getting Started with Vue'
description: 'Get started with this in-depth tutorial on how to build Vue applications and websites with Snowpack'
date: 2020-12-01
sidebarTitle: Vue
tags: communityGuide
---

Snowpack非常适用于任何规模的[Vue](https://vuejs.org)项目。它很容易上手，可以扩展到包含数千个组件和页面的项目而不影响开发速度。与传统的Vue应用工具不同，Snowpack让你免于被复杂的捆绑器设置和配置文件所困扰。

本指南从一个空的目录到一个完全配置好的Snowpack项目，在过程中一步步教。

- 如何设置你的Snowpack开发环境
- 添加你的第一个Vue组件
- 导入图片和其他网络资产
- 启用模块热替换（HMR）。
- 连接你喜欢的工具

先决条件：Snowpack是一个从npm安装的命令行工具。本指南假定你对Node.js、npm以及如何在终端运行命令有基本了解。对Vue的了解不是必需的；Snowpack是学习Vue的一个很好的方法。

> 💡 提示：在我们的Create Snowpack App模板中，有一个[Vue/Snowpack](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-vue)工作实例。

## 开始使用

开始一个新的Snowpack项目的最简单方法是使用[Create Snowpack App](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/cli)，这是一个基于我们的示例模板创建新项目的工具。`@snowpack/app-template-minimal`是一个Create Snowpack App模板，用于简单的、赤裸裸的Snowpack项目设置，本指南的其余部分就是建立在此基础上的。

在你的终端运行以下命令，创建一个名为`vue-snowpack`的新目录，并安装最小模板。

```bash
npx create-snowpack-app vue-snowpack --template @snowpack/app-template-minimal
```

前往新的`vue-snowpack`目录，用以下两个命令启动Snowpack。

```bash
cd vue-snowpack
npm run start
```

你应该看到你的新网站已经启动并运行了!

<div class="frame"><img src="/img/guides/react/minimalist-hello-world.png" alt="screenshot of project-template-minimal, which shows 'Hello world' in text on a white background." class="screenshot"/></div>

现在你已经有了一个基本的项目并正在运行，下一步是安装Vue。在你的项目目录中运行以下命令。

```bash
npm install vue@3.0.11 --save
```

> 提示：添加`--use-yarn`或`--use-pnpm`标志以使用 npm 以外的东西。

```bash
npm install @snowpack/plugin-vue --save-dev
```

Snowpack[插件](/plugins)是一种扩展Snowpack功能的方式，而不需要自己进行自定义配置。安装`@snowpack/plugin-vue`插件，以便Snowpack知道如何将`.vue`文件构建成在浏览器中运行的JavaScript和CSS文件。

安装后，你需要将该插件添加到你的Snowpack配置文件`（snowpack.config.mjs`）中，以便Snowpack知道要使用它。

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

重新启动你的Snowpack开发服务器，以便用新的配置运行它。退出进程（在大多数Windows/Linux/MacOS中ctrl + c），然后用`npm run start`再次启动它。

> 💡 提示。当你对配置进行修改（对`snowpack.config.mjs`的修改）时，重新启动Snowpack开发服务器。

Snowpack会识别新的依赖关系（Vue，或 "vue/internal"），并在安装你的前端依赖关系时打印出以下输出。

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

## 创建你的第一个Vue组件

现在你的Snowpack环境已经设置好了，可以为浏览器构建`.vue`文件。现在是时候创建你的第一个Vue组件文件了!

在你的项目目录下创建一个名为`App.vue`的文件，代码如下。

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

在你的`index.html`中的`body`标签上添加一个`#root的`ID

```diff
// index.html
- <body>
+ <body id="root">
    <h1>Welcome to Snowpack!</h1>
    <script type="module" src="/index.js"></script>
  </body>
```

现在你可以在你的`index.js`中使用新的`App.vue`文件。

```diff
// index.js
- console.log('Hello World! You did it! Welcome to Snowpack :D');
+ import { createApp } from 'vue';
+ import App from './App.vue';
+ createApp(App).mount('#root');
```

该页面现在应该说 "欢迎来到我的Vue应用程序！"。恭喜你！你现在有了你的第一个Vue组件。你现在有了你的第一个Vue组件!

## 定制你的项目布局

Snowpack足够灵活，可以支持你喜欢的任何项目布局。在本指南中，你将学习如何使用Vue社区的一个流行项目模式。

    ├── src/        <- your Vue components and their assets (CSS, images)
    │   ├── index.js
    │   └── App.vue
    └── public/     <- global assets like images, fonts, icons, and global CSS
        ├── index.css
        └── index.html

使用你喜欢的可视化编辑器来重新排列和重命名，或者在终端运行这些命令。

```bash
mkdir src
mkdir public
mv index.js src/index.js
mv App.vue src/App.vue
mv index.html public/index.html
mv index.css public/index.css
```

这意味着如果你现在正在运行Snowpack，那么现在网站已经坏了，因为文件都在不同的地方。让我们添加一个 "mount "配置来更新你的网站到你的新项目布局。

`挂载`配置改变了Snowpack扫描和构建文件的位置。回到你在添加`@snowpack/plugin-vue` 时编辑的`snowpack.config.mjs`文件。把这个添加到空的`mount`对象中。

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

`mount`是[Snowpack配置API](/reference/configuration)的一部分。它允许你定制你的项目的文件结构。键是目录的名称，值是你希望它们在最终构建时的位置。有了这个新的配置，Snowpack会在`公共`目录下构建文件（例如，`public/index.css -> [build]/index.css`）。同样，它也会在`src目录`下构建文件（比如`src/index.js -> [build]/dist/index.js`，所以在你的`index.html`中改变这个路径。

```diff
<!-- public/index.html -->

  <body>
    <h1>Welcome to Snowpack!</h1>
-   <script type="module" src="/index.js"></script>
+   <script type="module" src="/dist/index.js"></script>
  </body>
```

你需要重新启动Snowpack（在终端中停止进程，然后再次运行`npm start`）来改变配置文件。它看起来应该和以前一模一样，但现在使用你的全新的项目文件夹布局

## 添加一个Vue的动画标志

在Vue中，你可以直接向你的组件添加CSS。这一步通过添加一个动画标志来演示这一功能。

[下载`logo.svg`](https://github.com/snowpackjs/snowpack/blob/main/create-snowpack-app/app-template-vue/public/logo.svg)到你的`公共`目录。现在你可以把它添加到你的`App.vue`中。

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

使用Vue，CSS可以直接放在你的`.vue`组件中。将这段代码添加到`App.vue`的顶部的``

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

## 在你的Vue组件中添加一个计数器

Snowpack是唯一默认支持快速刷新的Vue开发环境之一。通过快速刷新，当你对`.vue`文件进行修改时，Snowpack会向浏览器推送实时更新，而不会丢失你的位置或重设组件状态。要想亲眼看到这一点，请继续在你的`App.vue`组件中添加一个简单的计时器。

Vue组件在``

```html
<!-- src/App.vue -->

<script>
  import {onMount} from 'vue';
  let count = 0;
  onMount(() => {
    const interval = setInterval(() => count++, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>
```

然后在你的组件主体的下方，添加这段代码，显示计时器的结果。

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

改变页面上的一些代码（比如 "学习Vue "按钮）。你会看到计时器并没有重置。

那其他非Vue文件呢，比如`src/index.js`？要在其他文件改变时重新渲染你的Vue应用程序，请在底部添加这个代码段。

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

干得好!你现在已经准备好用Snowpack建立你梦想中的Vue项目了。想把你的成就推给全世界吗？请点击下面的按钮。

[推特](https://twitter.com/share?ref_src=twsrc%5Etfw)

在这一点上，你已经掌握了基础知识，为任何Vue项目提供了一个很好的开端。官方的[Snowpack Vue](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-vue)例子还有一些其他的工具，你可能会觉得很有用。

- [Prettier](https://prettier.io/)- 一个流行的代码格式化器
- [测试](/guides/testing)- Snowpack支持任何流行的JavaScript测试框架
- [`@snowpack/plugin-dotenv`](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-dotenv)- 在你的Snowpack中使用`dotenv`。这对环境特定变量很有用

如果你有任何问题、评论或更正，我们希望在Snowpack[讨论](https://github.com/snowpackjs/snowpack/discussions)论坛或[Snowpack Discord社区](https://discord.gg/rS8SnRk)听到你的意见。
