---
layout: ../../layouts/content.astro
title: 打包流程
description: Snowpack Build creates a production-ready website with or without a bundler
---

![build output example](/img/snowpack-build-example.png)

`snowpack build`- 当你准备部署项目代码时，运行打包命令来构建生产环境下的网站静态代码。生成的静态代码结构忠于开发环境代码，这样你就能得到一个与开发过程代码的近乎一样的副本。

### 生产环境打包

**当你用某个打包工具的时候，应该是因为你想用，而不是因为你得用**。这是 Snowpack 被设计出来的初衷。Snowpack 将打包视为一种生产环境的优化选项，这意味着你可以自由跳过不必要的打包工作，直到你需要它。

默认情况下，`snowpack build`将使用与`dev`命令相同的免打包方式以构建网站。这对大多数项目来说是很好的，但你也可能仍然想为生产环境打包。旧浏览器兼容、代码压缩、代码分割、tree-shaking、不可达代码清理以及其他性能优化都可以在 Snowpack 中通过打包来处理。

打包器通常需要几十行甚至几百行的配置，但在 Snowpack 中，它只是一个单行的插件，不需要配置。之所以能做到这一点，是因为 Snowpack 在将你的应用程序发送到打包器*之前* 就已经构建好了，所以打包器永远不会看到你的源代码（JSX、TS、Svelte、Vue 等），而只需要关心构建常规的 HTML、CSS 和 JS。

```js
// Bundlers plugins are pre-configured to work with Snowpack apps.
// No config required! You just need to install the plugin first.
{
  "plugins": [["@snowpack/plugin-webpack"]]
}
```

请参阅我们的[打包指南](/guides/optimize-and-bundle)，了解更多在生产环境构建接入打包（或不打包）优化的插件信息。

## 浏览器兼容

你可以通过`package.json`的 "browserslist "属性来定制你想兼容的浏览器集合，一直到 IE11。这些内容在当你运行`snowpack build`为生产环境构建时起作用。

```js
/* package.json */
"browserslist": ">0.75%, not ie 11, not UCAndroid >0, not OperaMini all",
```

如果担心传统的浏览器兼容，你也可以在生产环境构建中添加一个打包器。查看[打包部署的章节](/guides/optimize-and-bundle)以了解更多信息。

注意：在开发过程中`（snowpack dev`），我们不对旧版浏览器进行转码。请确保你在开发过程中使用的是现代浏览器。
