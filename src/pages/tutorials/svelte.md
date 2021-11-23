---
layout: ../../layouts/content-with-cover.astro
title: "Svelte"
description: "Get started with this in-depth tutorial on how to build Svelte applications and websites with Snowpack"
date: 2020-12-01
sidebarTitle: Svelte
tags: communityGuide
cover: "/img/SvelteGuide.jpg"
img: "/img/SvelteGuide.jpg"
---

Snowpack 非常适用于任何规模的[Svelte](https://svelte.dev/)项目。它很容易上手，可以扩展到包含数千个组件和页面的项目而不影响开发速度。与传统的 Svelte 应用程序工具不同，Snowpack 使你不必为复杂的打包环境和配置文件所困扰。

> Snowpack......速度快得惊人，而且有完美的开发体验（模块热替换、错误覆盖等等），我们一直与 Snowpack 团队在 SSR\[服务器端渲染]等功能上紧密合作。模块热替换尤其具有启示意义。-[Rich Harris，Svelte 的创建者](https://svelte.dev/blog/whats-the-deal-with-sveltekit)

本指南从一个空的目录到一个完全配置好的 Snowpack 项目，在这个过程中，你会学到

- 如何设置 Snowpack 开发环境
- 添加你的第一个 Svelte 组件
- 导入图片和其他 web 资源
- 启用模块热替换（HMR）
- 连接你喜欢的工具

先决条件：Snowpack 是一个从 npm 安装的命令行工具。本指南假设你对 Node.js、npm 以及如何在终端运行命令有基本了解。不要求对 Svelte 有了解。Snowpack 是学习 Svelte 的一个很好的方法。

> 💡 提示：在我们的创建 Snowpack 应用程序模板中，有一个[Svelte/Snowpack](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-svelte)工作实例。

## 开始使用

开始一个新的 Snowpack 项目的最简单方法是使用[Create Snowpack App](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/cli)，这是一个基于我们的示例模板创建新项目的工具。`@snowpack/app-template-minimal`是一个 Create Snowpack App 模板，用于简单的、赤裸裸的 Snowpack 项目设置，本指南的其余部分就是建立在此基础上的。

在你的终端运行以下命令，创建一个名为`svelte-snowpack`的新目录，并安装最小模板。

```bash
npx create-snowpack-app svelte-snowpack --template @snowpack/app-template-minimal
```

前往新的`svelte-snowpack`目录，用以下两个命令启动 Snowpack。

```bash
cd svelte-snowpack
npm run start
```

你应该看到你的新网站已经启动并运行了!

<div class="frame"><img src="/img/guides/react/minimalist-hello-world.png" alt="screenshot of project-template-minimal, which shows 'Hello world' in text on a white background." class="screenshot"/></div>

现在，你已经有了一个基本的项目，并开始运行了!下一步是安装 Svelte。在你的项目目录下运行以下命令。

```bash
npm install svelte --save
```

> 提示：添加`--use-yarn`或`--use-pnpm`标志以使用 npm 以外的东西。

```bash
npm install @snowpack/plugin-svelte --save-dev
```

Snowpack[插件](/plugins)是一种扩展 Snowpack 功能的方式，无需自己进行自定义配置。安装`@snowpack/plugin-svelte`插件，以便 Snowpack 知道如何将`.svelte`文件构建为在浏览器中运行的 JavaScript 和 CSS 文件。

安装后，你需要将该插件添加到你的 Snowpack 配置文件`（snowpack.config.mjs`）中，以便 Snowpack 知道要使用它。

```diff
  // snowpack.config.mjs
  export default {
    mount: {
      /* ... */
    },
    plugins: [
-     /* ... */
+     '@snowpack/plugin-svelte',
    ],
  };
```

重新启动你的 Snowpack 开发服务器，以便用新的配置运行它。退出进程（在大多数 Windows/Linux/MacOS 中 ctrl + c），然后用`npm run start`再次启动它。

> 💡 提示。当你对配置进行修改（对`snowpack.config.mjs`的修改）时，重新启动 Snowpack 开发服务器。

Snowpack 将识别新的依赖关系（Svelte，或 "svelte/internal"），并在为前端安装你的依赖关系时打印以下输出。

```bash
[snowpack] installing dependencies...
[snowpack] ✔ install complete! [0.45s]
[snowpack]
  ⦿ web_modules/                                size       gzip       brotli
    ├─ svelte-hmr/runtime/hot-api-esm.js        22.17 KB   7.42 KB    6.3 KB
    ├─ svelte-hmr/runtime/proxy-adapter-dom.js  5.17 KB    1.65 KB    1.38 KB
    └─ svelte/internal.js                       52.78 KB   13.24 KB   11.45 KB
```

## 创建你的第一个 Svelte 组件

现在你的 Snowpack 环境已经设置好了，可以为浏览器构建`.svelte`文件。现在是时候创建你的第一个 Svelte 组件文件了!

在你的项目目录下创建一个名为`App.svelte`的文件，代码如下。

```html
<!-- App.svelte -->
<script>
  /* component logic will go here */
</script>
<style>
  /* css will go here */
</style>
<div class="App">
  <header class="App-header">
    <a
      class="App-link"
      href="https://svelte.dev"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn Svelte
    </a>
  </header>
</div>
```

现在你可以在你的`index.js`中使用这个新的`App.svelte`文件。

```diff
// index.js

/* Add JavaScript code here! */
-console.log('Hello World! You did it! Welcome to Snowpack :D');
+import App from "./App.svelte";

+let app = new App({
+  target: document.body,
+});

+export default app;
```

现在该页面应该显示 "学习 Svelte"。恭喜你！你现在有了你的第一个 Svelte 组件

<div class="frame"><img src="/img/guides/svelte/svelte-component-snowpack.gif" alt="code and site side by side, site is a 'Learn Svelte' link on a white background. When the text is edit to add 'Hello world' and the file saves, the changes show up in the site immediately." class="screenshot"/></div>

## 定制你的项目布局

Snowpack 足够灵活，可以支持你喜欢的任何项目布局。在本指南中，你将学习如何使用一个来自 Svelte 社区的流行项目模式。

    📁 src : your Svelte components and their assets (CSS, images)
        ↳ index.js
        ↳ App.svelte
    📁 public : global assets like images, fonts, icons, and global CSS
        ↳ index.css
        ↳ index.html

使用你喜欢的可视化编辑器来重新排列和重命名，或者在终端运行这些命令。

```bash
mkdir src
mkdir public
mv index.js src/index.js
mv App.svelte src/App.svelte
mv index.html public/index.html
mv index.css public/index.css
```

这意味着如果你现在正在运行 Snowpack，那么现在网站已经坏了，因为文件都在不同的地方。让我们添加一个 "mount "配置来更新你的网站到你的新项目布局。

`挂载`配置改变了 Snowpack 扫描和构建文件的位置。回到你在添加`@snowpack/plugin-svelte`时编辑的`snowpack.config.mjs`文件。把这个添加到空的`mount`对象中。

```diff
  // snowpack.config.mjs
  export default {
    mount: {
-     /* ... */
+     // directory name: 'build directory'
+     public: '/',
+     src: '/dist',
    },
  };
```

<img src="/img/guides/folder-structure.png" alt="Graphic shows the original and new folder structures side by side. Arrows indicate that the files are built to where the arrow points. The Original side shows a folder labeled ./ entire directory with an arrow pointing to a folder labeled  mysite.com/*. The New side shows a folder labeled ./src/* with an arrow pointing to a folder labeled mysite.com/_dist/*. Then a second folder labeled ./public/* with an arrow pointing to a folder labeled mysite.com/* "/>

`mount`是[Snowpack 配置 API](/reference/configuration)的一部分。它允许你定制你的项目的文件结构。键是目录的名称，值是你希望它们在最终构建时的位置。有了这个新的配置，Snowpack 会将`公共`目录下的文件--比如`public/index.css`--构建到`index.css`中。同样，它也会将`src`目录下的文件，如`src/index.js`，构建到`/dist/index.js`中，所以要在你的`index.html`中改变这个路径。

```diff
<!-- public/index.html -->

  <body>
    <h1>Welcome to Snowpack!</h1>
-   <script type="module" src="/index.js"></script>
+   <script type="module" src="/dist/index.js"></script>
  </body>
```

你需要重新启动 Snowpack（在终端中停止进程，然后再次运行`npm start`）来改变配置文件。它看起来应该和以前一模一样，但现在使用你的全新的项目文件夹布局

## 添加一个动画的 Svelte 标志

在 Svelte 中，你可以直接向你的组件添加 CSS。这一步通过添加一个动画标志来展示这一功能。

[下载`logo.svg`](https://github.com/snowpackjs/snowpack/blob/main/create-snowpack-app/app-template-svelte/public/logo.svg)到你的`公共`目录。现在你可以把它添加到你的`App.svelte`中。

```diff
<!-- src/App.svelte -->

  <header class="App-header">
+   <img src="/logo.svg" class="App-logo" alt="logo" />
    <a
      class="App-link"
      href="https://svelte.dev"
      target="_blank"
      rel="noopener noreferrer">
      Learn Svelte
    </a>
```

<div class="frame"><img src="/img/guides/svelte/svelte-logo-snowpack.jpg" alt="Side by side of code and site. The site now has a very large Svelte logo. The code shows the src/App.svelte file " class="screenshot"/></div>

有了 Svelte，CSS 可以直接进入你的`.svelte`组件。将这段代码添加到`App.svelte`的顶部``

```html
<!-- src/App.svelte -->

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

<div class="frame"><img src="/img/guides/svelte/svelte-logo-style-snowpack.gif" alt="code and site side by side, when the css is added to the Svelte component, the background becomes a beige, the logo shrinks down, and the logo has a pulsing animation" class="screenshot"/></div>

## 在你的 Svelte 组件中添加一个计数器

Snowpack 是唯一默认支持快速刷新的 Svelte 开发环境之一。通过快速刷新，当你对`.svelte`文件进行修改时，Snowpack 会向浏览器推送实时更新，而不会丢失你的位置或重设组件状态。为了亲眼看到这一点，请继续在你的 App.svelte 组件中添加一个简单的计时器。

Svelte 组件在``

```html
<!-- src/App.svelte -->

<script>
  import { onMount } from "svelte";
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
<!-- src/App.svelte -->

<div class="App">
    <header class="App-header">
      <img src="/logo.svg" class="App-logo" alt="logo" />
+     <p>Page has been open for <code>{count}</code> seconds.</p>
      <a class="App-link" href="https://svelte.dev" target="_blank" rel="noopener noreferrer">
        Learn Svelte
      </a>
    </header>
</div>
```

改变页面上的一些代码（如 "学习 Svelte "按钮）。你会看到计时器并没有重置。

<div class="frame"><img src="/img/guides/svelte/svelte-snowpack-counter-1.gif" alt="Showing code and site side by side, when the word 'Hello' is added to the .svelte page and the code is saved, the change shows up in the browser without the timer resetting (it keeps counting)" class="screenshot"/></div>

那其他非 Svelte 文件呢，比如`src/index.js`？要在其他文件发生变化时重新渲染你的 Svelte 应用程序，可以在底部添加这个代码段。

```diff
<!-- src/index.js-->

export default app;

+// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
+// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
+if (import.meta.hot) {
+  import.meta.hot.accept();
+  import.meta.hot.dispose(() => {
+    app.$destroy();
+  });
+}
```

## 更进一步

干得好!现在你已经准备好用 Snowpack 构建你梦想中的 Svelte 项目了。想在推特上向全世界展示你的成就吗？请点击下面的按钮。

[推特](https://twitter.com/share?ref_src=twsrc%5Etfw)

在这一点上，你已经掌握了基础知识，为任何 Svelte 项目提供了一个良好的开端。官方的[Snowpack Svelte](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-svelte)例子还有一些其他的工具，你可能会觉得有用。

- [Prettier](https://prettier.io/)- 一个流行的代码格式化器
- [测试](/guides/testing)- Snowpack 支持任何流行的 JavaScript 测试框架
- [`@snowpack/plugin-dotenv`](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-dotenv)- 在你的 Snowpack 中使用`dotenv`。这对环境特定变量很有用

我们还推荐官方的[Svelte](https://svelte.dev/tutorial/basics)教程，它教授了更多关于 Svelte 如何工作以及如何构建 Svelte 组件的知识。

如果你想在 Snowpack 和 Svelte 中使用 Typescript，请查看[Snowpack Svelte Typescript](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-svelte-typescript)模板。

如果你有任何问题、评论或更正，我们希望在 Snowpack[讨论](https://github.com/snowpackjs/snowpack/discussions)论坛或[Snowpack Discord 社区](https://discord.gg/rS8SnRk)听到你的意见。
