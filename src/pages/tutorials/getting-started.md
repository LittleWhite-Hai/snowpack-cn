---
layout: ../../layouts/content.astro
title: "开始Snowpack"
description: This guide shows you how to set up Snowpack from scratch in a Node.js project. Along the way learn key concepts of Snowpack and unbundled development.
---

欢迎来到 Snowpack！你会在这个学会怎样在 Node.js 项目中从头开始配置 Snowpack。在此过程中，你将了解到 Snowpack 和免打包式开发的关键概念。

在本指南中，你将学习

- 是什么让 Snowpack 如此之快？(提示：免打包式开发！)
- 什么是 JavaScript ES 模块（ESM）？
- 创建你的第一个项目
- 启动 Snowpack 的开发服务器
- 建立你的第一个项目
- 用插件定制 Snowpack

> 💡 提示：本指南将指导你从头创建[Snowpack 最小的应用模板](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/)。[用 create-snowpack-app 命令行工具](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/)生成一个完整副本。

预备知识：Snowpack 是一个从 npm 安装的命令行工具。本指南假设你对 JavaScript、npm 以及如何在终端运行命令有基本的了解。

在开发过程中，Snowpack 还需要一个现代浏览器。例如，任何较新的 Firefox、Chrome、Safari 或 Edge 版本。

## 安装 Snowpack

首先，为 Snowpack 项目创建一个空目录。通过 GUI 或运行命令行来创建新目录，如图所示。

```bash
mkdir my-first-snowpack
cd my-first-snowpack
```

Snowpack 是一个从 npm 安装的软件包。在你的项目目录下创建一个`package.json`文件来管理 npm 项目依赖。在项目中运行这个命令来创建一个空的`package.json`。

```bash
npm init
```

> 💡 提示：比较着急？运行`npm init --yes`可以跳过提示，生成一个带有 npm 默认推荐字段的 package.json。

现在用这个命令将 Snowpack 安装到`开发依赖项`中 。

    npm install --save-dev snowpack

> 💡 提示：Snowpack 可以通过`npm install -g snowpack`进行全局安装。但是，我们建议通过`-save-dev`/`--dev`在每个项目中进行本地安装。通过 package.json "scripts"、npm 的`npx snowpack`或通过`yarn snowpack`在本地运行 snowpack 命令行工具。

## Snowpack 的开发服务器

添加一个基本的 HTML 文件，我们就可以运行 Snowpack 的开发服务器，这是一个用于免打包式开发的即时开发环境。开发服务器只在浏览器需要时才构建文件。这意味着 Snowpack 可以即时(**<50 毫秒**)启动，并且可以扩展到无限大的项目而不降低速度。相比之下，用传统的打包器构建大型项目时，通常会看到 30 多秒的开发启动时间。

在你的项目中创建一个`index.html`，内容如下。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Starter Snowpack App" />
    <title>启动 Snowpack 项目</title>
  </head>
  <body>
    <h1>欢迎来到 Snowpack！</h1>
  </body>
</html>
```

将 Snowpack 开发服务器添加到`package.json`下作为`start`脚本。

```diff
  "scripts": {
+   "start": "snowpack dev",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

运行下面这个命令来启动 Snowpack 开发服务器

    npm run start

如果顺利的话，Snowpack 会自动在一个新的浏览器中打开你的网站!

<div class="frame"><img src="/img/guides/getting-started/run-snowpack.jpg" alt="Side by side of the terminal showing the dev server output. The dev server output displays the localhost address the project is running on. In a browser window you can see the running project on localhost, which is 'Welcome to Snowpack' on a white background." class="screenshot"/></div>

恭喜！你现在有一个正在运行中的 Snowpack 项目了，试着在服务器运行时修改 index.html 并保存，网站应该会自动刷新并响应变化。

## 使用 JavaScript

通过添加一个简单的 "hello world" 脚本，了解更多关于 Snowpack 对 JavaScript 的处理机制。JavaScript 的本地 ES 模块（ESM）语法是 Snowpack 免打包开发背后的魔力。你很可能已经很熟悉 ESM 了，只是你不知道它的存在！你一定用 ESM 实现过浏览器和构建工具可以理解并优化的 import 和 export 功能 。如果你熟悉 JavaScript 中的`import`和`export`关键字，你就已经知道 ESM 了。

创建一个名为`hello-world.js`的新 JavaScript 文件，导出一个`helloWorld`函数。

```js
// my-first-snowpack/hello-world.js
export function helloWorld() {
  console.log("Hello World!");
}
```

然后创建一个`index.js`，使用 ESM 语法导入新模块。

```js
// my-first-snowpack/index.js
import { helloWorld } from "./hello-world.js";

helloWorld();
```

Snowpack 只扫描`index.html`中导入的文件，所以你要把`index.js`添加到`index.html`的``标签的底部。

```diff
  <body>
    <h1>Welcome to Snowpack!</h1>
+   <script type="module" src="/index.js"></script>
  </body>
```

在 Snowpack 网站上查看控制台，你能看到 "Hello World！"。修改一个模块试试，Snowpack 会重建该模块而不重建其他代码。Snowpack**单独构建每个文件，并无限期地缓存它们**。你的开发环境不会对一个文件进行多次构建，在文件改变之前，浏览器也不会下载文件两次。这就是免打包式开发的真正力量，也是 Snowpack 如此快速的秘密所在。

<div class="frame"><img src="/img/guides/getting-started/hello-world.gif" alt="Gif showing the code next to the project running in the browser. On save the console shows 'Hello World!'. On edit and save of the `hello-world.js` file to be 'Hello everyone!' instead, that instantly shows in the browser console." class="screenshot"/></div>

## 使用 npm 包

Snowpack 将任何 npm 包构建成 ESM 模块。npm 包主要是使用模块语法（Common.js，或 CJS）发布的，不经过一些打包处理就不能在浏览器上运行。虽然用浏览器原生的 ESM`import`和`export`语句编写的代码会直接在浏览器中运行，但在导入 npm 包后你都会退回到打包式开发时代

**Snowpack 采取了一种不同的方法**： Snowpack 没有因为这个打包整个应用程序，而是单独处理 npm 依赖。以下是它的工作原理。

    node_modules/react/**/*     -> http://localhost:3000/web_modules/react.js
    node_modules/react-dom/**/* -> http://localhost:3000/web_modules/react-dom.js

1. Snowpack 扫描网站/应用程序引入的所有 npm 包。
2. Snowpack 从`node_modules`目录中读取这些已安装的依赖包。
3. Snowpack 将所有 npm 依赖分别打包到单个 JavaScript 文件中。例如：`react`和`react-dom`分别转换为`react.js`和`react-dom.js`。
4. 每个转换来的文件在经过 ESM 的`import`语句导入后，都可以直接在浏览器中运行。
5. 因为 npm 依赖很少改变，Snowpack 很少需要重建它们。

在 Snowpack 执行完对 npm 依赖的处理后，任何包都可以被导入并直接在浏览器中运行，不需要额外的打包或工具。这种在浏览器中原生导入 npm 包的能力（无需打包器）是所有免打包式开发工具和 Snowpack 建立的基础。

Snowpack 让你在浏览器中直接导入 npm 包。即使软件包采用的是 CommonJS，Snowpack 也会在将其传给浏览器之前将其向上转换为 ESM。

> 💡 提示：当你启动开发服务器或构建项目时，你可能会看到 Snowpack 正在 "安装依赖" 的信息。这意味着 Snowpack 正在转换你的依赖，以在浏览器中运行。

从 npm 安装 canvas-confetti 包，并用以下命令使用它。

```bash
npm install --save canvas-confetti
```

现在前往`index.js`，添加这段代码。

```diff
helloWorld();

+import confetti from 'canvas-confetti';
+confetti.create(document.getElementById('canvas'), {
+  resize: true,
+  useWorker: true,
+ })({ particleCount: 200, spread: 200 });
```

> 💡 提示：你知道吗，在 Snowpack 中，如果你愿意，你也可以直接将这段代码添加到你的 HTML 中

现在你应该可以看到一个漂亮的纸屑效果。

<div class="frame"><img src="/img/guides/getting-started/npm-snowpack-confetti.gif" alt="Gif showing the code next to the project running in the browser. When the code snippet is added and saved, a confetti effect shows in the browser" class="screenshot"/></div>

> 💡 提示：不是所有的 npm 模块都能在浏览器中良好运行。依赖于 Node.js 内置模块的模块需要一次 polyfill。你可以通过将 Snowpack 的[`packageOptions.polyfillNode`](/reference/configuration#packageoptions.polyfillnode) 配置选项设置为`true`来启用 polyfill。

## 添加 CSS

Snowpack 原生支持许多文件类型，比如 CSS 和 CSS 模块。添加一个简单的 CSS 文件来看看它是如何运行的。

添加以下 css 作为一个新的`index.css`文件。

```css
body {
  font-family: sans-serif;
}
```

通过在 index.html 的 `<head />` 中添加它来把它引入你的项目中。

```diff
    <meta name="description" content="Starter Snowpack App" />
+   <link rel="stylesheet" type="text/css" href="/index.css" />
    <title>Starter Snowpack App</title>
```

<div class="frame"><img src="/img/guides/getting-started/snowpack-font-css.jpg" alt="image showing the effects of the new CSS file: the font has changed from serif to sans-serif" class="screenshot"/></div>

## 为生产/部署构建

好了，你现在创建了一个非常简洁的网站。当你想启动它的时候就是用`snowpack build`的时候了。

默认情况下，`snowpack build`将使用与`dev`命令相同的免打包方式以构建网站。生成的静态代码结构忠于开发环境代码，这样你就能得到一个与开发环境代码的近乎一样的副本。

将`snowpack build`命令添加到 package.json 中，以便在命令行中更容易运行。

```diff
  "scripts": {
    "start": "snowpack dev",
+   "build": "snowpack build",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

现在你可以在你的终端运行这个。

```bash
npm run build
```

现在可以看到一个名为`build`的新目录，它包含了 Snowpack 项目的副本，准备部署吧。

<div class="frame"><img src="/img/guides/getting-started/snowpack-build.gif" alt="GIF terminal running Snowpack build, showing output, then clicking on the new `build` directory" class="screenshot"/></div>

## 下一步

你刚刚学会了免打包式开发的主要概念，并建立了一个小小的 Snowpack 项目。但这仅仅是 Snowpack 的开始。

下一步是什么？我们的文档网站有几个很好的资源

- [生产打包指南](/guides/optimize-and-bundle)：如何接入像 Webpack 这样的打包器来优化生产环境的代码部署。
- [插件](/plugins)：让你能将你喜欢的工具接入 Snowpack 的插件列表。
- [模板/示例](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/cli)：预先建立的项目，你可以使用许多流行的框架和工具来建立或探索。
- [指南](/guides)：一步一步深入研究如何使用和建设 Snowpack，包括 React 和 Svelte 等框架。

如果你有任何问题、评论或更正，我们希望在[Snowpack 论坛](https://github.com/snowpackjs/snowpack/discussions)或[Snowpack Discord 社区](https://discord.gg/rS8SnRk)听到你的意见。
