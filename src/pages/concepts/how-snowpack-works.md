---
layout: ../../layouts/content.astro
title: Snowpack运行机制
description: Snowpack serves your application unbundled during development. Each file is built only once and is cached until it changes.
---

### 摘要

**Snowpack是一个现代的、轻量级的构建工具，用于提升Web开发效率**。传统的JavaScript构建工具，如webpack和Parcel，在你每次保存一个文件时都需要重建和打包整个应用程序。这个重建步骤在保存修改和看到它们反映在浏览器上之间产生了滞后。

Snowpack在开发过程中为你的应用程序提供了**免打包式**(unbundled development)的服务。每个文件只需要被构建一次，然后被永远地缓存起来。当一个文件发生变化时，Snowpack会重新构建该文件。没有时间浪费在重新构建每一处变化上，仅在浏览器中即时更新（通过[模块热替换(HMR)](/concepts/hot-module-replacement)）。你可以在我们的[Snowpack 2.0发布文章](/posts/2020-05-26-snowpack-2-0-release/)中查看更多关于这种方法的说明。

Snowpack的**免打包式**开发仍然支持你在生产中所习惯的**打包式构建**。当你为生产构建你的应用程序时，你可以通过Webpack或Rollup（即将推出）的官方Snowpack插件插入你喜欢的打包器。由于Snowpack已经处理了你的构建，所以不需要复杂的打包器配置。

**Snowpack为你带来了两全其美的效果：**快速、非打包式的开发，以及打包式生产构建中的优化性能。

![webpack vs. snowpack diagram](/img/snowpack-unbundled-example-3.png)

### 非打包式开发

**免打包式开发**是指在开发过程中向浏览器发送单个文件的设计。文件仍然可以用你最喜欢的工具（如Babel、TypeScript、Sass）来构建，然后在浏览器中单独加载，由于ESM`导入`和`导出`语法的存在，这些文件具有依赖性。任何时候你改变一个文件，Snowpack只重建该文件。

另一个选择是**打包式开发**。今天几乎所有流行的JavaScript构建工具都专注于打包式开发。通过打包器运行你的整个应用程序会给你的开发工作流程带来额外的工作和复杂性，而现在ESM已经被广泛支持了，这是不必要的。每一个改变--在每一次保存--都必须与你的应用程序的其他部分重新打包，然后你的改变才能反映在你的浏览器中。

与传统的打包式开发方法相比，免打包式开发有几个优势。

- 单一文件的构建是快速的。
- 单一文件的构建是确定性的。
- 单一文件的构建更容易进行调试。
- 项目大小不影响开发速度。
- 单个文件的缓存效果更好。

最后一点是关键。**每个文件都是单独构建的，并且无限期地缓存**。你的开发环境不会对一个文件进行多次构建，你的浏览器也不会对一个文件进行两次下载（直到它改变）。这就是非打包式开发的真正力量。

### 使用NPM的依赖关系

NPM包主要是使用模块语法（Common.js，或CJS）发布的，如果没有一些构建处理，就不能在网络上运行。即使你使用浏览器原生的ESM`导入`和`导出`语句编写你的应用程序，这些语句都会直接在浏览器中运行，试图导入任何一个npm包都会迫使你回到捆绑式开发。

**Snowpack采取了一种不同的方法**。Snowpack没有为这一个需求打包你的整个应用程序，而是单独处理你的依赖关系。以下是它的工作原理。

    node_modules/react/**/*     -> http://localhost:3000/web_modules/react.js
    node_modules/react-dom/**/* -> http://localhost:3000/web_modules/react-dom.js

1. Snowpack扫描你的网站/应用程序的所有使用的npm包。
2. Snowpack从你的`node_modules`目录中读取这些已安装的依赖项。
3. Snowpack将你所有的依赖项分别打包到单个JavaScript文件中。例如：`react`和`react-dom`分别被转换为`react.js`和`react-dom.js`。
4. 每个产生的文件都可以直接在浏览器中运行，并通过ESM`导入`语句导入。
5. 因为你的依赖关系很少改变，Snowpack很少需要重建它们。

在Snowpack构建了你的依赖关系后，任何包都可以被导入并直接在浏览器中运行，不需要额外的打包或工具。这种在浏览器中原生导入npm包的能力（无需打包器）是所有非打包式开发和Snowpack其他部分建立的基础。

```html
<!-- This runs directly in the browser with `snowpack dev` -->
<body>
  <script type="module">
    import React from 'react';
    console.log(React);
  </script>
</body>
```
