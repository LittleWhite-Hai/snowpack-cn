---
layout: ../../layouts/content.astro
title: '开始一个新项目'
description: This guide shows you how to set up Snowpack from scratch in a Node.js project. Along the way learn key concepts of Snowpack and unbundled development.
---

欢迎来到Snowpack!本指南告诉你如何在一个Node.js项目中从头开始设置Snowpack。在此过程中，您将学习到Snowpack和非捆绑式开发的关键概念。

在本指南中，您将学习

- 是什么让Snowpack如此之快？(提示：非捆绑式开发！)
- 什么是JavaScript ES模块（ESM）？
- 创建你的第一个项目
- 启动Snowpack的开发服务器
- 建立你的第一个项目
- 用插件定制Snowpack

> 💡提示。本指南将指导你从头开始创建[Snowpack最小的应用程序模板](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/)。[使用create-snowpack-app命令行工具](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/)旋转出一个最终的副本。

先决条件：Snowpack是一个从npm安装的命令行工具。本指南假设你对JavaScript、npm以及如何在终端运行命令有基本的了解。

在开发过程中，Snowpack还需要一个现代浏览器。例如，任何半新的Firefox、Chrome、Safari或Edge版本。

## 安装Snowpack

要开始，为你的新Snowpack项目创建一个空目录。使用你喜欢的GUI或通过运行命令行来创建新目录，如图所示。

```bash
mkdir my-first-snowpack
cd my-first-snowpack
```

Snowpack是一个从npm安装的软件包。在你的项目目录下创建一个`package.json`文件来管理你的依赖关系。在你的项目中运行这个命令来创建一个简单的、空的`package.json`。

```bash
npm init
```

> 💡 提示：在匆忙中？运行`npm init --yes`可以跳过提示，生成一个带有npm默认推荐字段的package.json。

现在用这个命令将Snowpack安装到你的`开发依赖项中`。

    npm install --save-dev snowpack

> 💡 提示。Snowpack可以通过`npm install -g snowpack`进行全球安装。但是，我们建议通过`-save-`dev/`--dev`在每个项目中进行本地安装。通过package.json "scripts"、npm的`npx snowpack`或通过`yarn snowpack`在本地运行Snowpack命令行工具。

## Snowpack的开发服务器

添加一个基本的HTML文件，我们就可以运行Snowpack的开发服务器，这是一个用于非捆绑式开发的即时开发环境。开发服务器只在浏览器要求时才构建文件。这意味着Snowpack可以即时启动（通常在**<50毫秒**），并且可以扩展到无限大的项目而不放慢速度。相比之下，用传统的捆绑器构建大型应用程序时，通常会看到30多秒的开发启动时间。

在你的项目中创建一个`index.html`，内容如下。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Starter Snowpack App" />
    <title>Starter Snowpack App</title>
  </head>
  <body>
    <h1>Welcome to Snowpack!</h1>
  </body>
</html>
```

将Snowpack开发服务器添加到`package.json`下作为`启动`脚本。

```diff
  "scripts": {
+   "start": "snowpack dev",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

在命令行上运行以下内容来启动Snowpack开发服务器

    npm run start

如果一切顺利，Snowpack会自动在一个新的浏览器中打开你的网站!

<div class="frame"><img src="/img/guides/getting-started/run-snowpack.jpg" alt="Side by side of the terminal showing the dev server output. The dev server output displays the localhost address the project is running on. In a browser window you can see the running project on localhost, which is 'Welcome to Snowpack' on a white background." class="screenshot"/></div>

恭喜你！你现在有一个Snowpack项目了。你现在已经有了一个Snowpack项目并开始运行了试着在服务器运行时修改index.html并保存，网站应该会自动刷新并显示变化。

## 使用JavaScript

通过添加一个简单的 "hello world "脚本，了解更多关于Snowpack如何处理JavaScript。JavaScript的本地ES模块（ESM）语法是Snowpack非捆绑式开发背后的魔力。很有可能你已经很熟悉ESM了，只是你不知道而已!ESM让你定义明确的导入和导出，浏览器和构建工具可以更好地理解和优化。如果你熟悉JavaScript中的`导入`和`导出`关键字，那么你已经知道ESM了

创建一个名为`hello-world.js`的新JavaScript文件，导出一个`helloWorld`函数。

```js
// my-first-snowpack/hello-world.js
export function helloWorld() {
  console.log('Hello World!');
}
```

然后创建一个`index.js`，使用ESM语法导入你的新模块。

```js
// my-first-snowpack/index.js
import {helloWorld} from './hello-world.js';

helloWorld();
```

Snowpack会扫描`index.html`中引用的文件，所以把你的`index.js`添加到`index.html`的``标签的底部。

```diff
  <body>
    <h1>Welcome to Snowpack!</h1>
+   <script type="module" src="/index.js"></script>
  </body>
```

在你的Snowpack网站上检查你的控制台。你应该看到 "Hello World！"试着对模块做一个改变。Snowpack会重建该模块而不重建你的其他代码。Snowpack**单独构建每个文件，并无限期地缓存它**。你的开发环境不会对一个文件进行多次构建，你的浏览器也不会对一个文件进行两次下载（直到它改变）。这就是非捆绑式开发的真正力量，也是Snowpack之所以如此快速的秘密所在。

<div class="frame"><img src="/img/guides/getting-started/hello-world.gif" alt="Gif showing the code next to the project running in the browser. On save the console shows 'Hello World!'. On edit and save of the `hello-world.js` file to be 'Hello everyone!' instead, that instantly shows in the browser console." class="screenshot"/></div>

## 使用npm包

Snowpack将任何npm包构建成ESM网络模块。npm包主要是使用模块语法（Common.js，或CJS）发布的，不经过一些构建处理就不能在网络上运行。即使你使用浏览器原生的ESM`导入`和`导出`语句编写你的应用程序，这些语句都会直接在浏览器中运行，试图导入任何一个npm包都会迫使你回到捆绑式开发。

**Snowpack采取了一种不同的方法：**Snowpack不为这一个要求捆绑你的整个应用程序，而是单独处理你的依赖关系。以下是它的工作原理。

    node_modules/react/**/*     -> http://localhost:3000/web_modules/react.js
    node_modules/react-dom/**/* -> http://localhost:3000/web_modules/react-dom.js

1. Snowpack扫描你的网站/应用程序的所有使用的npm包。
2. Snowpack从你的`node_modules`目录中读取这些已安装的依赖项。
3. Snowpack将你所有的依赖性分别捆绑到单个JavaScript文件中。例如：`react`和`react-dom`分别转换为`react.js`和`react-dom.js`。
4. 每个产生的文件直接在浏览器中运行，并通过ESM`导入`语句导入。
5. 因为你的依赖关系很少改变，Snowpack很少需要重建它们。

在Snowpack构建了你的依赖关系后，导入任何包并直接在浏览器中运行，没有任何额外的捆绑或工具。这种在浏览器中原生导入npm包的能力（无需捆绑器）是所有非捆绑式开发和Snowpack其他部分建立的基础。

Snowpack让你在浏览器中直接导入npm包。即使软件包使用的是传统格式，Snowpack也会在将其提供给浏览器之前将其向上转换为ESM。

> 💡 提示：当你启动你的开发服务器或运行一个新的构建时，你可能会看到Snowpack正在 "安装依赖 "的信息。这意味着Snowpack正在转换你的依赖项以在浏览器中运行。

从npm安装canvas-confetti包，并用以下命令使用它。

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

> 💡 提示：你知道吗，在Snowpack中，如果你愿意，你也可以直接将这段代码添加到你的HTML中

现在你应该在你的网站上看到一个漂亮的纸屑效果。

<div class="frame"><img src="/img/guides/getting-started/npm-snowpack-confetti.gif" alt="Gif showing the code next to the project running in the browser. When the code snippet is added and saved, a confetti effect shows in the browser" class="screenshot"/></div>

> 💡 提示：不是所有的npm模块都能在浏览器中很好地工作。依赖于Node.js内置模块的模块需要一个polyfill。你可以通过将Snowpack的[`packageOptions.polyfillNode`](/reference/configuration#packageoptions.polyfillnode)配置选项设置为`true`来启用这个polyfill。

## 添加CSS

Snowpack原生支持许多文件类型。例如，CSS和CSS模块。添加一个简单的CSS文件来看看它是如何工作的。

添加以下css作为一个新的`index.css`文件。

```css
body {
  font-family: sans-serif;
}
```

把它加入到你的项目中，在``中加入index.html。

```diff
    <meta name="description" content="Starter Snowpack App" />
+   <link rel="stylesheet" type="text/css" href="/index.css" />
    <title>Starter Snowpack App</title>
```

<div class="frame"><img src="/img/guides/getting-started/snowpack-font-css.jpg" alt="image showing the effects of the new CSS file: the font has changed from serif to sans-serif" class="screenshot"/></div>

## 为生产/部署构建

好了，你现在已经建立了一个非常简单的网站，你想启动它。现在是使用`snowpack build的`时候了。

默认情况下，`snowpack build`使用与`dev`命令相同的非捆绑方式来构建你的网站。构建与你的开发设置集成在一起，这保证了你在开发过程中看到的相同代码的近乎精确的副本。

将`snowpack build`命令添加到package.json中，以便在命令行中更容易运行。

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

你应该看到一个名为`build的`新目录，它包含了你的Snowpack项目的副本，准备进行部署。

<div class="frame"><img src="/img/guides/getting-started/snowpack-build.gif" alt="GIF terminal running Snowpack build, showing output, then clicking on the new `build` directory" class="screenshot"/></div>

## 接下来的步骤

你刚刚学会了非捆绑式开发的主要概念，并建立了一个小小的Snowpack项目。但这仅仅是Snowpack的开始。

下一步是什么？我们的文档网站有几个很好的资源

- [生产捆绑指南](/guides/optimize-and-bundle)：如何连接像Webpack这样的捆绑器来优化生产部署的代码
- [插件](/plugins)：允许你将你喜欢的工具与Snowpack集成的插件列表。
- [模板/示例](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/cli)：预先建立的项目，你可以使用许多流行的框架和工具来建立或探索。
- [指南](/guides)。一步一步地深入研究如何使用Snowpack和为Snowpack进行建设。包括React和Svelte等框架。

如果你有任何问题、评论或更正，我们希望在Snowpack[讨论](https://github.com/snowpackjs/snowpack/discussions)论坛或[Snowpack Discord社区](https://discord.gg/rS8SnRk)听到你的意见。