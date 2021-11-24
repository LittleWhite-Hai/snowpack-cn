---
layout: ../../layouts/content.astro
title: 路由
published: true
description: 本指南将介绍Snowpack下一些常见的路由场景，以及如何配置路由选项以在开发中支持它们。
---

作为一个Web构建工具，Snowpack不知道你的应用在生产环境中是在哪里运行的，也不知道它以何种方式运行。但是Snowpack的开发服务器可以被定制，以便给本地开发创造接近于生产环境的体验。

本指南将引导你了解一些常见的路由场景，以及如何配置`routes`选项以支持这些场景。

### 场景1：SPA Fallback

单页应用（SPA）让客户端应用完全控制路由逻辑。Web主机本身不能区分有效的路由和404，因为这种逻辑完全交给客户端处理了。因此无论路由有效与否，每条路由都必须提供相同的HTML响应，以便在浏览器中正常加载和运行HTML/JS/CSS应用。这个特殊的文件被称为 "SPA Fallback"。

定义一个唯一的 "万能" 路由以实现Fallback。

```js
// snowpack.config.mjs
export default {
  routes: [
    {
      match:'routes',
      src:'.*',
      dest:'/index.html',
    },
  ],
};
```

这告诉Snowpack的开发服务器为所有路由提供唯一的URL`/index.html`（RegEx中的`.*`表示 "匹配一切"）。

`"match":"routes"`指的是所有不含文件扩展名或含 ".html" 的URL。如果你把上面的例子改为`"match":"all"`，那么所有的URL（包括JS、CSS、图片文件等）都会响应Fallback文件。

### 情景2：代理API路径

许多现代的前端应用将直接与一个API对接。通常情况下，这个API作为一个独立的服务托管在另一个域（例如：`api.example.com/users`），服务器不需要特殊配置来与应用通信。然而，在某些情况下，API可能和网站被托管在同一个域的不同路径下（例如：`www.example.com/api/users`）。

为了在开发中给类似`/api/users`的URL提供正确的API响应，你可以配置Snowpack来代理一些请求到另一个服务器。在这个例子中，我们将代理所有的"/api/\*"请求到另一个在本地运行的`3001`端口的服务器。

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

我们推荐使用[http2-proxy](https://www.npmjs.com/package/http2-proxy)库来代理请求到另一个服务器，它支持大量的选项来定制每个请求的代理方式。但你可以随意实现你喜欢的`dest`代理功能。你自己的服务器逻辑甚至可以直接在`dest`函数中调用，不过在代理中这并不推荐。

### 情景3：代理WebSocket请求

代理的请求可以通过 "upgrade" 事件处理器提升为WebSocket连接。这使你在开发期间可以通过Snowpack开发服务器代理WebSocket请求。你可以在[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism#upgrading_to_a_websocket_connection)上了解更多 upgrade 机制的信息。

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

如果你只用Snowpack来构建资源，并靠你自己的自定义服务器（例如：Rails、Laravel等）来提供HTML服务，那么你可能没有路由的用途。可以考虑阅读我们的[服务器端渲染（SSR）](/guides/server-side-render)指南，它解释了如何将Snowpack作为中间件集成到你自己的服务器中。
