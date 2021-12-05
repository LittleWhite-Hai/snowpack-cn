---
layout: ../../layouts/content.astro
title: Snowpack运行机制
description: Snowpack serves your application unbundled during development. Each file is built only once and is cached until it changes.
---

### 摘要

**Snowpack 是一个用于提升 Web 开发效率的轻量级新型构建工具**。传统的 JavaScript 构建工具如 Webpack 和 Parcel，在你每次保存一个文件时都需要重建和打包整个应用程序。这个重建步骤会在保存修改和浏览器响应之间产生明显滞后。

在开发过程中，Snowpack 为你的项目提供了**免打包式(unbundled development)** 的服务。每个文件只需构建一次就被永远缓存起来。当文件发生变化时，Snowpack 重新构建发生变化的文件然后在浏览器中直接更新，而没有在重新打包上浪费时间(通过[模块热替换(HMR)](/concepts/hot-module-replacement)实现)。你可以在[Snowpack 2.0 发布文章](/posts/2020-05-26-snowpack-2-0-release/)中查看这种方法的详细内容。

Snowpack 的**免打包式**工具仍支持你在生产中所习惯的**打包式构建**。当你为生产环境构建项目时，你可以通过 Webpack 或 Rollup（即将推出）的官方 Snowpack 插件插入你喜欢的打包器。由于 Snowpack 已经处理了你的构建，所以不需要复杂的打包器配置。

**Snowpack 为你带来了两全其美的效果:** 快速、免打包式的开发，以及打包式生产构建中的优化性能。

![webpack vs. snowpack diagram](/img/snowpack-unbundled-example-3.png)

### 免打包式开发

**免打包式开发**是指在开发过程中向浏览器发送单个文件的设计。文件仍然可以用你最喜欢的工具（如 Babel、TypeScript、Sass）来构建，然后在浏览器中单独加载，由于 ESM`import`和`export`语法的存在，这些文件具有依赖性。不管什么时候 Snowpack 都只重建发生变化的文件。

另一个选择是**打包式开发**。今天几乎所有流行的 JavaScript 构建工具都专注于打包式开发。通过打包器运行你的整个应用程序会给你的开发工作流程带来额外的工作和复杂性，这是不必要的，因为现在 ESM 已经被广泛支持了。打包式开发会导致文件更新*在每一次保存后* 都得重新打包程序的其他部分，然后更新才能反映在浏览器中。

与传统的打包式开发方法相比，免打包式开发有几个优势。

- 单一文件的构建是快速的。
- 单一文件的构建是确定性的。
- 单一文件的构建更容易进行调试。
- 项目大小不影响开发速度。
- 单个文件的缓存效果更好。

最后一点是关键。**每个文件都是单独构建的，并且被无限期地缓存**。你的开发环境不会对一个文件进行多次构建，你的浏览器也不会对一个文件进行两次下载（直到它改变）。这就是免打包式开发的真正力量。

### 使用 NPM 的依赖关系

NPM 包主要是使用模块语法（Common.js，或 CJS）发布的，如果没有一些构建处理，就不能在浏览器上运行。虽然用浏览器原生的 ESM`import`和`export`语句编写的代码会直接在浏览器中运行，但在导入 npm 包后你都会退回到打包式开发时代。

**Snowpack 采取了一种不同的方法**： Snowpack 没有因为这个打包整个应用程序，而是单独处理 npm 依赖。以下是它的工作原理。

    node_modules/react/**/*     -> http://localhost:3000/web_modules/react.js
    node_modules/react-dom/**/* -> http://localhost:3000/web_modules/react-dom.js

1. Snowpack 扫描网站/应用程序引入的所有 npm 包。
2. Snowpack 从`node_modules`目录中读取这些已安装的依赖包。
3. Snowpack 将所有 npm 依赖分别打包到单个 JavaScript 文件中。例如：`react`和`react-dom`分别转换为`react.js`和`react-dom.js`
4. 每个转换来的文件在经过 ESM 的`import`语句导入后，都可以直接在浏览器中运行。
5. 因为 npm 依赖很少改变，Snowpack 很少需要重建它们。

在 Snowpack 执行完对 npm 依赖的处理后，任何包都可以被导入并直接在浏览器中运行，不需要额外的打包或工具。这种在浏览器中原生导入 npm 包的能力（无需打包器）是所有免打包式开发工具和 Snowpack 建立的基础。

```html
<!-- This runs directly in the browser with `snowpack dev` -->
<body>
  <script type="module">
    import React from "react";
    console.log(React);
  </script>
</body>
```
