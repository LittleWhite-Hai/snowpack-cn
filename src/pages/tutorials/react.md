---
layout: ../../layouts/content-with-cover.astro
title: "React"
description: "Get started with this in-depth tutorial on how to build React applications and websites with Snowpack and developer tools like React Fast Refresh"
date: 2020-12-01
tags: communityGuide
cover: "/img/ReactGuide.jpg"
img: "/img/ReactGuide.jpg"
---

Snowpack 非常适用于任何规模的[React](https://reactjs.org/)项目。它很容易上手，可以扩展到包含数千个组件和页面的项目而不影响开发速度。与传统的 React 应用工具不同，Snowpack 让你免于被复杂的打包环境和配置文件所困扰。

你将看到从一个空目录变成一个完全配置好的 Snowpack 项目的过程，它支持 React 和其他一些有用的开发者工具。在这个过程中，你会学到

- 如何设置 Snowpack 开发环境
- 添加第一个 React 组件
- 使用 CSS、图片和其他 web 资源
- 启用 React 的[快速刷新](https://reactnative.dev/docs/fast-refresh)模式
- 接入你喜欢的工具

预备知识：Snowpack 是一个从 npm 安装的命令行工具。本指南假定你对 Node.js、npm 以及如何在终端运行命令有基本了解。对 React 的了解不是必需的，Snowpack 是学习 React 的一个好方法。

> 💡 提示：如果你想跳过教程直接得到配置完整的 React 项目，[Create Snowpack App React template](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-react)包含了本指南中的所有内容以及其他有用的工具。

## 开始使用

开始一个新的 Snowpack 项目的最简单方法是使用[Create Snowpack App](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/cli)，这是一个在新目录中设置 Snowpack 的工具。`@snowpack/project-template-minimal`是一个创建 Snowpack 应用的模板，用于简单的、基本的 Snowpack 项目配置，本指南的其余部分也是基于它。

现在开始吧，请打开终端，进入你想放入新项目的目录。现在在终端上运行以下命令，创建一个名为`react-snowpack`的新目录，并自动安装基本模板。

```bash
npx create-snowpack-app react-snowpack --template @snowpack/app-template-minimal
```

现在你可以前往新目录，用以下两个命令启动 Snowpack。

```bash
cd react-snowpack
npm run start
```

你能看到网站已经启动并运行了!

> 💡 提示：新项目中的`README.md`包含了每个文件的用途。

<div class="frame"><img src="/img/guides/react/minimalist-hello-world.png" alt="screenshot of project-template-minimal, which shows 'Hello world' in text on a white background." class="screenshot"/></div>

现在你已经有了一个正在运行的基本项目，要安装 React，在项目目录下运行以下命令。

```bash
npm install react react-dom --save
```

> 提示：添加`--use-yarn`或`--use-pnpm`选项以使用 npm 以外的包管理器。

## 创建你的第一个 React 组件

React 依赖于一种名为 JSX 的特殊模板语言。如果你熟悉 React，那么你已经知道了 JSX：它是 React 的模板语言，能让你直接在 JavaScript 代码中写一些像`<App />`或`<Header><Header />`的东西。

Snowpack 在使用`.jsx`扩展名的文件中内置了对 JSX 的支持。这意味着在编写第一个 React 组件时，不需要任何插件或配置。将`index.js`文件重命名为`index.jsx`，这样 Snowpack 就知道要处理文件中的 JSX。

```bash
mv index.js index.jsx
```

> 💡 提示：你不需要更新`index.html`脚本标签引用以指向`index.jsx`。浏览器不认识 JSX(或 TypeScript)，所以任何要被编译为 JS 的文件在最终的构建产物中都会被编译为`.js`。当你在 HTML 的`<script src="">`和`<Link href="">`中引用构建好的文件时，最好将这个提示牢记。

现在你可以在`index.jsx`中导入 React，并添加一个简单的测试组件，以确保它能正常运行。

```diff
  /* Add JavaScript code here! */
- console.log('Hello World! You did it! Welcome to Snowpack :D');
+ import React from 'react';
+ import ReactDOM from 'react-dom';
+ ReactDOM.render(<div>"HELLO REACT"</div>, document.getElementById('root'));
```

由于 React 代码最终被渲染到一个 id 为`root`的元素中，你需要将其添加到`index.html`中。

```diff
  <body>
-   <h1>Welcome to Snowpack!</h1>
+   <div id="root"></div>
    <script type="module" src="/index.js"></script>
  </body>
```

<div class="frame"><img src="/img/guides/react/minimalist-hello-world-react.png" alt="screenshot of the project, which shows 'HELLO REACT' on a white background" class="screenshot"/></div>

你刚刚在 Snowpack 中创建了第一个 React 组件!

## 定制项目结构

由于你将会添加一堆新的文件，你可能不希望它们直接堆在根目录。Snowpack 足够灵活，可以支持你喜欢的任何项目结构。在本指南中，你将学习如何使用 React 社区的一个流行的项目模式。

    📁 src : your React components and their assets (CSS, images)
        ↳ index.jsx
    📁 public : global assets like images, fonts, icons, and global CSS
        ↳ index.css
        ↳ index.html

使用你喜欢的工具来重新排列和重命名文件，或者在终端运行这些命令。

```bash
mkdir src
mkdir public
mv index.jsx src/index.jsx
mv index.html public/index.html
mv index.css public/index.css
```

如果你现在正在运行 Snowpack，那么现在网站已经挂了，因为文件的路径变了。添加一个 "mount" 配置来更新网站的文件结构。

`mount`配置改变了 Snowpack 寻找和构建文件的位置。每个 Snowpack 项目都有一个`snowpack.config.mjs`文件，用于你可能需要的任何配置。现在，你能看到一个带有空选项的配置文件。将这三行添加到空的`mount`对象中。

```diff
  export default {
    mount: {
-     /* ... */
+     // directory name: 'build directory'
+     public: '/',
+     src: '/dist',
    },
  };
```

<img src="/img/guides/react/folderstructure.png" alt="The original file configuration had Snowpack building the directory structure the same as the directories in the project, including root. Now the config builds only src and public. Src to the dist folder and public to root."/>

`mount`是[Snowpack configuration API](/reference/configuration)的一部分。它允许你定制项目的文件结构。键是目录的名称，值是你希望它们在最终构建时的位置。有了这个新的配置，Snowpack 会将`public`目录下的文件，如`public/index.css`目录，构建到`index.css`。它将`src`目录下的文件，如`src/index.js`，构建到`/dist/index.js`中，所以你需要在`index.html`中改变这个路径。

```diff
  <body>
    <h1>Welcome to Snowpack!</h1>
    <div id="root"></div>
-   <script type="module" src="/index.js"></script>
+   <script type="module" src="/dist/index.js"></script>
  </body>
```

你需要重启 Snowpack 来使配置生效。再次启动时，如果成功了，它看起来应该没变。

创建一个`src/App.jsx`新文件，并将以下代码粘贴到里面以创建一个`App`组件。

```jsx
import React, { useState, useEffect } from "react";

function App() {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Update the count (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Page has been open for <code>{count}</code> seconds.
        </p>
      </header>
    </div>
  );
}

export default App;
```

现在把它引入到`index.jsx`中

```diff
  import React from 'react';
  import ReactDOM from 'react-dom';
- ReactDOM.render(<div>"HELLO WORLD"</div>, document.getElementById('root'));
+ import App from './App.jsx';
+ ReactDOM.render(
+   <React.StrictMode>
+     <App />
+   </React.StrictMode>,
+   document.getElementById('root'),
+ );
```

> 💡 提示：[React.StrictMode](https://reactjs.org/docs/strict-mode.html)是一个高亮 React 代码中潜在问题的工具。

不用重启 Snowpack 就能看到效果，它应该是这样的。

<div class="frame"><img src="/img/guides/react/minimalist-hello-world-react-timer.png" alt="screenshot of the project with text that says 'Page has been open for' and the number of seconds then 'seconds'" class="screenshot"/></div>

## 为项目添加样式

当你添加图片或 CSS 等资源时，Snowpack 会将它们引入到最终的构建中。如果你已经了解 React，这个过程看起来应该很熟悉。

> 💡 提示：在你做这个的时候，你不需要重新加载页面或重新启动 Snowpack。Snowpack 会在你编辑代码时自动更新浏览器中的内容。

把文件[`logo.svg`](https://github.com/snowpackjs/snowpack/blob/main/create-snowpack-app/app-template-react/src/logo.svg)添加到`src`目录。现在你可以把它导入`App.jsx`，并在`img`标签中使用它以在页面中展示。

```diff
  import React, { useState, useEffect } from 'react';
+ import logo from './logo.svg';

  function App() {
    // Create the count state.
    const [count, setCount] = useState(0);
    // Create the counter (+1 every second).
    useEffect(() => {
      const timer = setTimeout(() => setCount(count + 1), 1000);
      return () => clearTimeout(timer);
    }, [count, setCount]);
    // Return the App component.
    return (
      <div className="App">
        <header className="App-header">
+       <img src={logo} className="App-logo" alt="logo" />
        <p>
```

<div class="frame"><img src="/img/guides/react/minimalist-hello-world-react-logo.png" alt="the React logo (a blue atom) is now at the top of the page" class="screenshot"/></div>

该项目已经有 index.css 用于全局样式。对于只适用于特定组件的 CSS，常见的实践是将其添加到一个与组件名称相同的 CSS 文件中，比如，`App.jsx`的样式文件将是`App.css`。

> 💡 提示：Snowpack 内置了对[CSS 模块化](/reference/supported-files)的支持，[Sass Plugin](/guides/sass/)是官方支持的 Sass。

创建`src/App.css`并添加这个 CSS。

```css
.App {
  text-align: center;
}

.App p {
  margin: 0.4rem;
}

.App-logo {
  height: 40vmin;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

要使用这个 CSS，请前往`App.jsx`并导入它。

```diff
  import logo from './logo.svg';
+ import './App.css';
```

<div class="frame"><img src="/img/guides/react/react.gif" alt="The page now has centered items, a grey background, styled fonts, and the React logo has an animation that rotates it." class="screenshot"/></div>

## 快速刷新使 Snowpack 更快

[React 快速刷新](https://reactnative.dev/docs/fast-refresh)？那是什么？这是一个 Snowpack 的增强功能，可以让你在不刷新页面或清除组件状态的情况下推送单个文件的变化以更新浏览器。

React 项目通常包含交互的并且包含 state。例如，你正在构建的这个项目有一个 state 维护着在页面上停留的秒数。当开发组件包含 state 时，编辑代码并且不丢失 state 常常很有用。React 的快速刷新机制可以在不刷新整个页面的前提下响应更新。学习如何添加这个功能同时也是熟悉 Snowpack 插件的一个很好的过程。Snowpack 从一个最小的结构开始，它的设计让你可以通过插件系统添加你需要的东西。

首先，在项目中启用[HMR](/concepts/hot-module-replacement)。HMR 是让 Snowpack 在不刷新整个页面的情况下向浏览器推送更新的机制，这是快速刷新的预备条件。你可以通过在`src/index.jsx`文件中添加一小段代码来为 React 启用 HMR。

```diff
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
+ // Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
+ // Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
+ if (import.meta.hot) {
+   import.meta.hot.accept();
+ }
```

现在，当你改变`App.jsx`时，页面会响应更新内容，并且不需要完全刷新。

<div class="frame"><img src="/img/guides/react/hmr.gif" alt="GIF showing code side by side with the app. A change in made to App.jsx and it shows immediately when the file is changed. The counter keeps counting uninterrupted." class="screenshot"/></div>

HMR 本身可以为你节省时间，但你可能会注意到在上面的例子中，页面上的计数器仍然被重设为 0。这可能会降低你的开发效率，特别是当你调试一个特定的组件状态问题时。让我们启用 "快速刷新" 功能，以便在更新时保留组件状态。

要启用快速刷新，你需要安装`@snowpack/plugin-react-refresh`。这个包是一个 Snowpack 插件，你可以用它来增强或定制 Snowpack 的各种新功能。

```bash
npm install @snowpack/plugin-react-refresh --save-dev
```

一旦安装完毕，你需要将该插件添加到 Snowpack 配置文件中来让 Snowpack 知道要用它。

```diff
  module.exports = {
    mount: {
      public: '/',
      src: '/dist',
    },
-   plugins: []
+   plugins: ['@snowpack/plugin-react-refresh'],
  };
```

重新启动 Snowpack 以应用新的插件，然后再次改变`App.jsx`组件。如果 "快速刷新" 运行正常，计数器会在文件修改时保持其数值，而不会重设为零。

<div class="frame"><img src="/img/guides/react/react-fast-refresh.gif" alt="GIF showing code side by side with the app. A change in made to App.jsx and it shows immediately when the file is changed. The counter keeps counting uninterrupted." class="screenshot"/></div>

## 更进一步

干得好 你现在已经可以用 Snowpack 构建你梦想中的 React 项目了。想在 Twitter 上向全世界展示你的成就吗？请点击下面的按钮。

[Twitter](https://twitter.com/share?ref_src=twsrc%5Etfw)

到了这里，你已经掌握了基础知识，对于任何 React 项目这都是一个很好的开端。但如果你与官方的[Snowpack React template](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-react)相比，你会发现它还有一些其他的开发者工具可能很有用。

- [Prettier](https://prettier.io/)- 一个流行的代码格式化工具
- [Test](/guides/testing)- Snowpack 支持任何流行的 JavaScript 测试框架
- [`@snowpack/plugin-dotenv`](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-dotenv)- 在你的 Snowpack 中使用`dotenv`。这对环境特定变量很有用

如果你想在 Snowpack 和 React 中使用 Typescript，请查看[Snowpack React Typescript](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-react-typescript) 启动器。

如果你有任何问题、评论或更正，我们希望在[Snowpack 论坛](https://github.com/snowpackjs/snowpack/discussions)或[Snowpack Discord 社区](https://discord.gg/rS8SnRk)听到你的意见。
