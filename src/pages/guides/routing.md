---
layout: ../../layouts/content.astro
title: 路由
published: true
description: This guide will walk you through some common routing scenarios and how to configure the routes option to support them in development.
---

作为一个网络构建工具，Snowpack不知道你的应用程序在生产中是如何（或在哪里）提供的。但是Snowpack的开发服务器可以被定制，以便为本地开发重新创建接近于生产环境的东西。

本指南将引导你了解一些常见的路由场景，以及如何配置`路由`选项以支持它们的开发。

### 场景1：SPA后退路径

单页应用程序（SPA）让客户端应用程序完全控制路由逻辑。虚拟主机本身不知道什么是有效的路由，什么是404，因为这种逻辑完全存在于客户端。因此，每条路由（无论有效与否）都必须提供相同的HTML响应，以便在浏览器中加载和运行HTML/JS/CSS应用程序。这个特殊的文件被称为 "SPA Fallback"。

为了实现这种模式，你要为开发定义一个单一的 "全能 "路由。

```js
// snowpack.config.mjs
export default {
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    },
  ],
};
```

这告诉Snowpack的开发服务器为所有路由提供回退的`/index.html`URL（RegEx中的`.*`表示 "匹配一切"）。

`"匹配"。`"`routes "`指的是所有不包含文件扩展名或包含".html "文件扩展名的URL。如果你把上面的例子改为`"match":"all"`，那么所有的URL（包括JS、CSS、图片文件等）都会响应回退的HTML文件。

### 情景2：代理API路径

许多现代的前端应用程序将直接与一个API对话。通常情况下，这个API是作为一个独立的应用程序托管在另一个域（例如：`api.example.com/users`），不需要特殊的服务器配置来与之对话。然而，在某些情况下，你的API可能被托管在与你的网站相同的域，使用不同的路径方案（例如：`www.example.com/api/users`）。

为了向开发中的`/api/users`这样的URL提供正确的API响应，你可以配置Snowpack来代理一些请求到另一个服务器。在这个例子中，我们将代理所有的"/api/\*"请求到另一个我们在本地运行的`3001`端口的服务器。

```js
// snowpack.config.mjs
import proxy from 'http2-proxy';

export default {
  routes: [
    {
      src: '/api/.*',
      dest: (req, res) => {
        // remove /api prefix (optional)
        req.url = req.url.replace(/^\/api\//, '/');

        return proxy.web(req, res, {
          hostname: 'localhost',
          port: 3001,
        });
      },
    },
  ],
};
```

我们推荐使用[http2-proxy](https://www.npmjs.com/package/http2-proxy)库来代理请求到另一个服务器，它支持大量的选项来定制每个请求的代理方式。但你可以随意实现你喜欢的`dest`代理功能。你自己的服务器逻辑甚至可以直接在`dest`函数中调用，然而这并不推荐在代理中使用。

### 情景3：代理WebSocket请求

代理的请求可以通过 "升级 "事件处理程序升级为WebSocket连接。这允许你在开发期间通过Snowpack开发服务器代理WebSocket请求。你可以在[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism#upgrading_to_a_websocket_connection)上了解更多关于升级机制的信息。

```js
// snowpack.config.mjs
import proxy = from 'http2-proxy';

export default {
  routes: [
    {
      src: '/ws',
      upgrade: (req, socket, head) => {
        const defaultWSHandler = (err, req, socket, head) => {
          if (err) {
            console.error('proxy error', err);
            socket.destroy();
          }
        };

        proxy.ws(
          req,
          socket,
          head,
          {
            hostname: 'localhost',
            port: 3001,
          },
          defaultWSHandler,
        );
      },
    },
  ],
};
```

### 情景4：自定义服务器渲染

如果你只用Snowpack来构建资产，并依靠你自己的自定义服务器（例如：Rails、Laravel等）来提供HTML服务，那么你可能没有路由的用途。可以考虑阅读我们的[服务器端渲染（SSR）](/guides/server-side-render)指南，它解释了如何将Snowpack作为中间件集成到你自己的服务器中。
