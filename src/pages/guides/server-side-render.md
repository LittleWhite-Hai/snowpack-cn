---
layout: ../../layouts/content.astro
title: 服务端渲染 (SSR)
description: This guide will walk you through three different options for setting up Snowpack with your own custom server.
published: true
---

服务器端渲染（SSR）可以指几个类似的开发者故事。

- 将Snowpack与Rails或Express等服务器网络框架一起使用
- 使用Snowpack为服务器端的前端框架套件（如Next.js或SvelteKit）提供动力。
- 任何在运行时生成HTML的项目配置，在你的静态构建之外。

本指南将引导你通过三个选项来设置Snowpack与你自己的自定义服务器。

1. `snowpack build --watch`--从静态构建目录中传输文件。
2. `startServer({ ... })`- 通过Snowpack的JavaScript API按需提供文件。
3. `getServerRuntime({ ... })`- 直接在Node.js中运行你构建的JS文件的服务器端。

### 选项 1: 静态服务

直接从Snowpack的`build/`目录中提供构建的文件是开始使用Snowpack的最简单方法。运行`snowpack build`来构建你的网站到一个静态目录，然后确保你的HTML服务器响应包括适当的`脚本`和`链接`标签来加载你的Snowpack构建的JavaScript和CSS。

```html
<!-- Example: If you own the server HTML response, make sure that you host the built assets and load the correct JS/CSS files in your HTML.  -->
<script type="module" src="/dist/index.js"></script>
```

在开发过程中，Snowpack会在每次修改时重建文件，这要归功于`--watch`命令。要启用自动页面重载和模块热替换（HMR）等开发功能，请查看我们的HMR指南中的["自定义服务器 "部分](/guides/hmr#enable-hmr%3A-custom-server)以了解更多信息。

这种设置也有一个好处，就是在开发和生产中都从同一个`构建/`目录中提取。你可以通过向Snowpack传递不同的`--out`CLI标志来控制这种`构建/`输出行为，用于开发和生产。你甚至可以通过`--config`CLI 标志传递完全不同的配置文件，或者在你的`snowpack.config.mjs`文件中设置自定义逻辑，以便在不同的构建中表现得不同。

这种静态方法的缺点是，你需要等待Snowpack在启动时构建整个`构建/`目录，然后你的网站才能运行。这是所有其他构建工具（如Webpack）必须处理的问题，但Snowpack有能力只在浏览器要求时才构建文件，这导致了\~0ms的启动等待时间。

### 选项2：按需服务（中间件

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

请注意，你仍然需要在生产部署的`build/`目录外设置静态文件服务。出于这个原因，这可以被看作是对方案1中静态设置的一种改进，以提高开发速度。

虽然我们的官方API是用JavaScript编写的，需要Node.js来运行，但你可以使用`snowpack dev`CLI命令来实现你自己的API，用于任何语言/环境，启动服务器并通过获取每个URL直接加载资产。

### 选项3：服务器端渲染（SSR

一些前端应用程序也被设计为在服务器上运行。在前面两节中，我们只是在加载和提供Snowpack文件给客户端。在这最后一节中，我们将研究你的项目如何在服务器上运行Snowpack构建的JavaScript，并将服务器渲染的HTML返回给客户端，以加快页面的首次加载。

Snowpack提供了一个Node.js SSR Runtime API来帮助你在服务器端运行和渲染你的应用程序。`getServerRuntime()`返回一个`运行时`实例，可以用来按需将Snowpack构建的模块导入你当前的Node.js进程。这个运行时处理从浏览器ESM到Node.js Common.js（CJS）的转换，这样它就可以直接在服务器上运行而没有问题。

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

`getServerRuntime()`是一个较低级别的工具，帮助你在项目中实现SSR。然而，建立一个自定义的SSR设置是一项高级任务。如果你不愿意自己实现，可以看看一些新的由Snowpack驱动的应用程序框架和静态网站生成器，如[SvelteKit](https://svelte.dev/blog/whats-the-deal-with-sveltekit)和[Microsite](https://www.npmjs.com/package/microsite)。
