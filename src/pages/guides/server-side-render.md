---
layout: ../../layouts/content.astro
title: 服务端渲染 (SSR)
description: This guide will walk you through three different options for setting up Snowpack with your own custom server.
published: true
---

服务器端渲染（SSR）可以指代几个类似的行为：

- 将 Snowpack 与 Rails 或 Express 等服务器网络框架一起使用
- 使用 Snowpack 为服务器端的前端框架套件（如 Next.js 或 SvelteKit）提供支持
- 任何在运行时生成 HTML 的项目配置，除了静态构建之外

本指南将引导你通过三个选项来设置 Snowpack 与你自己的自定义服务器。

1. `snowpack build --watch`-从静态构建目录中传输文件。
2. `startServer({ ... })`- 通过 Snowpack 的 JavaScript API 按需提供文件。
3. `getServerRuntime({ ... })`- 直接在 Node.js 中运行你构建的 JS 文件的服务器端。

### 选项 1: 静态服务

直接从 Snowpack 的`build/`目录中提供构建的文件是开始使用 Snowpack 的最简单方法。运行`snowpack build`来构建你的网站到一个静态目录，然后确保你的 HTML 服务器响应包括适当的`script`和`link`标签来加载你的 Snowpack 构建的 JavaScript 和 CSS。

```html
<!-- Example: If you own the server HTML response, make sure that you host the built assets and load the correct JS/CSS files in your HTML.  -->
<script type="module" src="/dist/index.js"></script>
```

在开发过程中，Snowpack 会在每次修改时重建文件，这要归功于`--watch`命令。要启用自动页面重载和模块热替换（HMR）等开发功能，请查看我们的 HMR 指南中的["自定义服务器 "部分](/guides/hmr#enable-hmr%3A-custom-server)以了解更多信息。

这种设置也有一个好处，就是在开发和生产中都从同一个`build/`目录中提取。你可以通过向 Snowpack 传递不同的`--out`CLI 标志来控制这种`build/`输出行为，用于开发和生产。你甚至可以通过`--config`CLI 标志传递完全不同的配置文件，或者在你的`snowpack.config.mjs`文件中设置自定义逻辑，以便在不同的构建中表现得不同。

这种静态方法的缺点是，你需要等待 Snowpack 在启动时构建整个`build/`目录，然后你的网站才能运行。这是所有其他构建工具（如 Webpack）必须处理的问题，但 Snowpack 有能力只在浏览器要求时才构建文件，这导致了\~0ms 的启动等待时间。

### 选项 2：按需服务（中间件）

最好的开发者体验是通过按需加载文件来实现的。这消除了启动时的任何工作需要，无论你的项目发展到多大，都能给你一个更快的开发环境。

```js
const {startServer} = require('snowpack');
const server = await startServer({ ... });

// Example: Express
// On request, build each file on request and respond with its built contents
app.use((req, res, next) => {
  try {
    const buildResult = await server.loadUrl(req.url);
    res.send(buildResult.contents);
  } catch (err) {
    next(err);
  }
});
```

请注意，你仍然需要在生产部署的`build/`目录外设置静态文件服务。出于这个原因，这可以被看作是对方案 1 中静态设置的一种改进，以提高开发速度。

虽然我们的官方 API 是用 JavaScript 编写的，需要 Node.js 来运行，但你可以使用`snowpack dev`CLI 命令来实现你自己的 API，用于任何语言/环境，启动服务器并通过获取每个 URL 直接加载资源。

### 选项 3：服务器端渲染（SSR）

一些前端应用程序也被设计为在服务器上运行。在前面两节中，我们只是在加载和提供 Snowpack 文件给客户端。在这最后一节中，我们将研究你的项目如何在服务器上运行 Snowpack 构建的 JavaScript，并将服务器渲染的 HTML 返回给客户端，以加快页面的首次加载。

Snowpack 提供了一个 Node.js SSR Runtime API 来帮助你在服务器端运行和渲染你的应用程序。`getServerRuntime()`返回一个`运行时`实例，可以用来按需将 Snowpack 构建的模块导入你当前的 Node.js 进程。这个运行时处理从浏览器 ESM 到 Node.js Common.js（CJS）的转换，这样它就可以直接在服务器上运行而没有问题。

```js
const {readFileSync} = require('fs');
const {startServer} = require('snowpack');
const server = await startServer({ ... });
const runtime = server.getServerRuntime();

// Advanced Example: Express + React SSR
app.use(async (req, res, next) => {
  // Server-side import our React component
  const importedComponent = await runtime.importModule('/dist/MyReactComponent.js');
  const MyReactComponent = importedComponent.exports.default;
  // Render your react component to HTML
  const html = ReactDOMServer.renderToString(React.createElement(MyReactComponent, null));
  // Load contents of index.html
  const htmlFile = readFileSync('./index.html', 'utf8');
  // Inserts the rendered React HTML into our main div
  const document = htmlFile.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);
  // Sends the response back to the client
  res.send(document);
});
```

`getServerRuntime()`是一个较低级别的工具，帮助你在项目中实现 SSR。然而，建立一个自定义的 SSR 设置是一项高级任务。如果你不愿意自己实现，可以看看一些新的由 Snowpack 驱动的应用程序框架和静态网站生成器，如[SvelteKit](https://svelte.dev/blog/whats-the-deal-with-sveltekit)和[Microsite](https://www.npmjs.com/package/microsite)。
