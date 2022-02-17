---
layout: ../../layouts/content.astro
title: "Web Workers"
tags: communityGuide
published: true
description: How to use Web Workers in your Snowpack project.
---

[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)是网页内容在后台线程中运行脚本的一种简单手段。

**要在 Snowpack 中使用 Web Worker**。直接使用浏览器的本地[Web Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Web_Workers_API)。

```js
// Example: Load a Web Worker in your project
const myWorker = new Worker(new URL("./worker.js", import.meta.url));
```

建议向 Worker 构造函数传递一个`URL`（而不是一个字符串字面），但不是必须的。使用字符串字面意义（例如：`new Worker('./worker.js')`）可能会在你为生产构建网站时妨碍一些优化。

还要注意的是，传递给`Worker`的 URL 必须与最终的 URL 相匹配，这可能与磁盘上的路径不同。例如，即使磁盘上的原始文件是`worker.ts`，`./worker.js`仍会被使用。如果需要，这里也应使用`挂载`目的地。

### ESM Web Worker 支持

**Web Worker 中的 ESM 语法（`导入`/`导出`**）仍未在所有现代浏览器中得到支持。Snowpack v3.0.0 和 Snowpack Webpack v5 插件一旦发布都将支持自动打包。在此之前，你需要编写独立的、单文件的 Web Worker（没有 ESM`导入`/`导出`语句）或自己预先打包你的 Web Worker。

```js
const worker = new Worker(new URL("./esm-worker.js", import.meta.url), {
  name: "my-worker",
  type: "module",
});
```

<!--
TO REPLACE THE PREVIOUS PARAGRAPH ON v3.0.0 LAUNCH DAY:

Modern browsers have begun to support ESM syntax (`import`/`export`) inside of Web Workers. However, some notable exceptions still exist. To use ESM syntax inside of a web worker, consult [caniuse.com](https://caniuse.com/mdn-api_worker_worker_ecmascript_modules) and choose a supported browser for your local development. When you build for production, choose a bundler that will bundle your Web Worker to remove ESM import/export syntax. Currently, Snowpack's builtin bundler and @snowpack/plugin-webpack both support automatic Web Worker bundling to remove ESM syntax from web workers.


```js
const worker = new Worker(
  new URL('./esm-worker.js', import.meta.url),
  {
    name: 'my-worker',
    type: import.meta.env.MODE === 'development' ? "module" : "classic"
  }
);
```

-->
