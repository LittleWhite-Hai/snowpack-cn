---
layout: ../../layouts/content.astro
title: 生产环境下的构建优化
published: true
description: How to optimize your Snowpack build for production, with or without a bundler.
---

`snowpack build`将你的网站构建成网络原生 JS、CSS 和 HTML 文件。这种 "免打包式"部署对于小型网站来说已经足够了，但许多开发者更愿意优化和打包他们的最终网站，以提高生产性能。

Snowpack 可以在你的最终构建中运行各种优化，以处理传统的浏览器支持、代码最小化、代码拆分、tree-shaking、dead-code elimination、预加载、打包等等。

Snowpack 的构建优化有两种类型：**内置**（esbuild）和**插件**（webpack、rollup 或其他你可能想运行的东西）。

### 选项 1：内置优化

Snowpack 最近发布了一个由[esbuild](https://esbuild.github.io/)支持的内置优化 pipeline。使用这个内置的优化器，你现在可以比 Webpack 或 Rollup 快 10 倍到 100 倍地打包、转码和最小化你的生产构建。然而，esbuild 还很年轻，还[没有为生产做好准备](https://esbuild.github.io/faq/#production-readiness)。目前，我们只推荐小型项目使用。

```js
// snowpack.config.mjs
// Example: Using Snowpack's built-in bundling support
export default {
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
};
```

完整的支持界面是。

```ts
export interface OptimizeOptions {
  entrypoints: "auto" | string[] | ((options: { files: string[] }) => string[]);
  preload: boolean;
  bundle: boolean;
  loader?: { [ext: string]: Loader };
  sourcemap: boolean | "external" | "inline" | "both";
  splitting: boolean;
  treeshake: boolean;
  manifest: boolean;
  minify: boolean;
  target: "es2020" | "es2019" | "es2018" | "es2017";
}
```

### 选项 2：优化插件

Snowpack 通过插件支持流行的打包器。

- webpack(推荐!):[@snowpack/plugin-webpack](https://www.npmjs.com/package/@snowpack/plugin-webpack)
- Rollup:[snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle)

**目前，我们建议使用@snowpack/plugin-webpack，直到我们的内置优化支持更加成熟**。

查看我们的[插件目录](/plugins)，浏览所有可用的 Snowpack 插件，如果你对创建自己的插件感兴趣，请阅读[插件指南](/guides/plugins)。
