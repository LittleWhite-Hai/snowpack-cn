---
layout: ../../layouts/content-with-cover.astro
title: 'Getting Started with React'
description: 'Get started with this in-depth tutorial on how to build React applications and websites with Snowpack and developer tools like React Fast Refresh'
date: 2020-12-01
tags: communityGuide
cover: '/img/ReactGuide.jpg'
img: '/img/ReactGuide.jpg'
---

Snowpack非常适用于任何规模的[React](https://reactjs.org/)项目。它很容易上手，可以扩展到包含数千个组件和页面的项目而不影响开发速度。与传统的React应用工具不同，Snowpack让你免于被复杂的捆绑器设置和配置文件所困扰。

在本指南中，你将从一个空目录变成一个完全配置好的Snowpack项目，支持React和其他一些有用的开发者工具。在这个过程中，你会学到

- 如何设置你的Snowpack开发环境
- 添加你的第一个React组件
- 使用CSS、图片和其他网络资产
- 启用React的[快速刷新](https://reactnative.dev/docs/fast-refresh)模式
- 连接你喜欢的工具

先决条件：Snowpack是一个从npm安装的命令行工具。本指南假定你对Node.js、npm以及如何在终端运行命令有基本了解。对React的了解不是必需的，Snowpack是学习React的一个好方法

> 💡 提示：如果你想跳到最后看一个完整的React设置，[Create Snowpack App React模板](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-react)包含了你在本指南中学到的所有内容，以及其他有用的工具。

## 开始使用

开始一个新的Snowpack项目的最简单方法是使用[Create Snowpack App](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/cli)，这是一个在新目录中设置Snowpack的工具。`@snowpack/project-template-minimal`是一个Create Snowpack App模板，用于简单的、光秃秃的Snowpack项目设置，本指南的其余部分也是基于此。

要想开始，请打开你的终端，进入你想放新项目的目录。现在在你的终端上运行以下命令，创建一个名为`react-snowpack`的新目录，并自动安装最小模板。

```bash
npx create-snowpack-app react-snowpack --template @snowpack/app-template-minimal
```

现在你可以前往新目录，用以下两个命令启动Snowpack。

```bash
cd react-snowpack
npm run start
```

你应该看到你的新网站已经启动并运行了!

> 💡 提示：你的新项目中的`README.md`包含了关于每个文件的作用的有用信息。

<div class="frame"><img src="/img/guides/react/minimalist-hello-world.png" alt="screenshot of project-template-minimal, which shows 'Hello world' in text on a white background." class="screenshot"/></div>

现在你已经有了一个基本的项目，要安装React，在你的项目目录下运行以下命令。

```bash
npm install react react-dom --save
```

> 提示：添加`--use-yarn`或`--use-pnpm`标志以使用 npm 以外的东西。

## 创建你的第一个React组件

React依赖于一种特殊的模板语言，称为JSX。如果你熟悉React，那么你已经知道了JSX：它是React的模板语言，允许你直接在你的JavaScript代码中写一些像``或``的东西。

Snowpack已经在使用`.jsx`扩展名的文件中内置了对JSX的支持。这意味着在编写你的第一个React组件时，不需要任何插件或配置。将`index.js`文件重命名为`index.jsx`，这样Snowpack就知道要处理文件中的JSX。

```bash
mv index.js index.jsx
```

> 💡 提示：你不需要更新你的`index.html`脚本标签参考，以指向`index.jsx`。浏览器不会说JJSX（或TypeScript），所以任何编译为JS的文件格式在最终的浏览器构建中会编译为`.js`。当你在HTML``

现在你可以在`index.jsx`中导入React，并添加一个简单的测试组件，以确保它的工作。

```diff
  /* Add JavaScript code here! */
- console.log('Hello World! You did it! Welcome to Snowpack :D');
+ import React from 'react';
+ import ReactDOM from 'react-dom';
+ ReactDOM.render(<div>"HELLO REACT"</div>, document.getElementById('root'));
```

由于React代码被渲染到一个ID为`root`的元素中，你需要将其添加到`index.html`中。

```diff
  <body>
-   <h1>Welcome to Snowpack!</h1>
+   <div id="root"></div>
    <script type="module" src="/index.js"></script>
  </body>
```

<div class="frame"><img src="/img/guides/react/minimalist-hello-world-react.png" alt="screenshot of the project, which shows 'HELLO REACT' on a white background" class="screenshot"/></div>

你刚刚在Snowpack中创建了你的第一个React组件!

## 定制你的项目布局

由于你将会添加一堆新的文件，你可能不希望它们直接挤占你的顶级根目录。Snowpack足够灵活，可以支持你喜欢的任何项目布局。在本指南中，你将学习如何使用React社区的一个流行的项目模式。

    📁 src : your React components and their assets (CSS, images)
        ↳ index.jsx
    📁 public : global assets like images, fonts, icons, and global CSS
        ↳ index.css
        ↳ index.html

使用你喜欢的可视化编辑器来重新排列和重命名，或者在终端运行这些命令。

```bash
mkdir src
mkdir public
mv index.jsx src/index.jsx
mv index.html public/index.html
mv index.css public/index.css
```

这意味着如果你现在正在运行Snowpack，那么现在网站已经坏了，因为文件都在不同的地方。让我们添加一个 "mount "配置来更新你的网站到你的新项目布局。

`mount`配置改变了Snowpack寻找和构建文件的位置。每个Snowpack项目都有一个`snowpack.config.mjs`文件，用于你可能需要的任何配置。现在，你应该看到一个带有空选项的配置文件。将此添加到空的`mount`对象中。

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

`mount`是[Snowpack配置API](/reference/configuration)的一部分。它允许你定制你的项目的文件结构。键是目录的名称，值是你希望它们在最终构建时的位置。有了这个新的配置，Snowpack会将`public`目录下的文件，如`public/index.css`目录，构建到`index.css`。它将`src`目录下的文件，如`src/index.js`，构建到`/dist/index.js`中，所以你需要在你的`index.html`中改变这个路径。

```diff
  <body>
    <h1>Welcome to Snowpack!</h1>
    <div id="root"></div>
-   <script type="module" src="/index.js"></script>
+   <script type="module" src="/dist/index.js"></script>
  </body>
```

你需要重新启动Snowpack来修改配置文件。当你再次启动时，如果成功了，它看起来应该是一样的。

在`src/App.jsx`创建一个新文件，并将以下代码粘贴到这个新文件中，以创建一个`App`组件。

```jsx
import React, {useState, useEffect} from 'react';

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

现在把它包含在`index.jsx`中

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

> 💡 提示。[严格模式](https://reactjs.org/docs/strict-mode.html)是一个突出React代码中潜在问题的工具。

你应该不需要重启Snowpack就能看到这个，它应该是这样的。

<div class="frame"><img src="/img/guides/react/minimalist-hello-world-react-timer.png" alt="screenshot of the project with text that says 'Page has been open for' and the number of seconds then 'seconds'" class="screenshot"/></div>

## 为你的项目造型

当你添加图片或CSS等资产时，Snowpack会将它们包含在你的最终构建中。如果你已经了解React，这个过程看起来应该很熟悉。

> 💡 提示：在你做这个的时候，你应该不需要重新加载页面或重新启动Snowpack。当你编辑代码时，Snowpack会自动更新浏览器中的项目。

把这个文件[`logo.svg`](https://github.com/snowpackjs/snowpack/blob/main/create-snowpack-app/app-template-react/src/logo.svg)添加到你的`src`目录。现在你可以把它导入你的`App.jsx`，并在`img`标签中使用它来显示它。

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

该项目已经有index.css用于全局样式。对于只适用于特定组件的CSS，常见的设计模式是将其添加到一个与组件基本名称相同的CSS文件中。`App.jsx`的样式文件将是`App.css`，采用这种模式。

> 💡 提示。Snowpack内置了对[CSS模块](/reference/supported-files)的支持，如果你想使用Sass，有一个官方的[Sass Plugin](/guides/sass/)。

创建`src/App.css`并添加这个CSS。

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

要使用这个CSS，请前往`App.jsx`并导入它。

```diff
  import logo from './logo.svg';
+ import './App.css';
```

<div class="frame"><img src="/img/guides/react/react.gif" alt="The page now has centered items, a grey background, styled fonts, and the React logo has an animation that rotates it." class="screenshot"/></div>

## 用快速刷新使Snowpack更快

[React快速刷新](https://reactnative.dev/docs/fast-refresh)？那是什么？这是一个Snowpack的增强功能，可以让你在不刷新页面或清除组件状态的情况下推送单个文件的变化以更新浏览器。

React项目通常是互动的，包括状态。例如，你正在构建的这个项目有一个状态，是页面上的时间量。当用状态开发时，不要在编辑代码时丢失状态，这很有用。React快速刷新显示你的更新，而不用刷新整个页面。告诉你如何添加这个也是对Snowpack插件的一个很好的介绍。Snowpack从一个最小的设置开始，其观点是你可以通过插件系统添加你需要的东西。

首先，在你的项目中启用[模块热替换](/concepts/hot-module-replacement)。HMR是让Snowpack在不刷新整个页面的情况下向浏览器推送更新的系统，这是快速刷新的要求。你可以通过在你的`src/index.jsx`文件中添加一小段代码来为React启用HMR。

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

现在，当你改变`App.jsx`时，页面会更新以显示你的改变，而不需要完全刷新。

<div class="frame"><img src="/img/guides/react/hmr.gif" alt="GIF showing code side by side with the app. A change in made to App.jsx and it shows immediately when the file is changed. The counter keeps counting uninterrupted." class="screenshot"/></div>

HMR本身可以为你节省时间，但你可能会注意到在上面的例子中，页面上的计数器仍然重设为0。这可能会减慢你的开发速度，特别是当你试图调试一个特定的组件状态问题时。让我们启用 "快速刷新 "功能，以便在更新时保留组件状态。

要启用快速刷新，你需要安装`@snowpack/plugin-react-refresh`软件包。这个包是一个Snowpack插件，你可以用它来增强或定制Snowpack的各种新行为。要开始，请在你的项目中安装该包。

```bash
npm install @snowpack/plugin-react-refresh --save-dev
```

一旦安装完毕，你需要将该插件添加到你的Snowpack配置文件中，以便Snowpack知道要使用它。

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

重新启动Snowpack以应用新的插件，然后再次尝试改变`App.jsx`组件。如果 "快速刷新 "工作正常，计数器会在各种变化中保持其数值，而不会重设为零。

<div class="frame"><img src="/img/guides/react/react-fast-refresh.gif" alt="GIF showing code side by side with the app. A change in made to App.jsx and it shows immediately when the file is changed. The counter keeps counting uninterrupted." class="screenshot"/></div>

## 更进一步

干得好!你现在已经准备好用Snowpack构建你梦想中的React项目了。想在推特上向全世界展示你的成就吗？请点击下面的按钮。

[推特](https://twitter.com/share?ref_src=twsrc%5Etfw)

在这一点上，你已经掌握了基础知识，对于任何React项目都有一个很好的开端。但如果你与官方的[Snowpack React模板](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-react)相比，你会发现它还有一些其他的开发者工具，你可能会觉得很有用。

- [Prettier](https://prettier.io/)- 一个流行的代码格式化器
- [测试](/guides/testing)- Snowpack支持任何流行的JavaScript测试框架
- [`@snowpack/plugin-dotenv`](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-dotenv)- 在你的Snowpack中使用`dotenv`。这对环境特定变量很有用

如果你想在Snowpack和React中使用Typescript，请查看[Snowpack React Typescript](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-react-typescript)startter。

如果你有任何问题、评论或更正，我们希望在Snowpack[讨论](https://github.com/snowpackjs/snowpack/discussions)论坛或[Snowpack Discord社区](https://discord.gg/rS8SnRk)听到你的意见。
