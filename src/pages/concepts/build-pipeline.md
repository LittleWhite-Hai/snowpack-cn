---
layout: ../../layouts/content.astro
title: 打包流程
description: Snowpack Build creates a production-ready website with or without a bundler
---

![build output example](/img/snowpack-build-example.png)

`snowpack build`- 当你准备部署你的应用程序时，运行打包命令来生成你的网站的静态生产构建。构建与你的开发设置紧密结合，这样你就能保证得到一个与你在开发过程中看到的相同代码的近乎精确的副本。

### 生产环境打包

**当你用某个打包工具的时候，应该是因为你想用，而不是因为你得用**。这是Snowpack被设计出来的初衷。Snowpack将捆绑视为一种可选的生产优化，这意味着你可以自由跳过不必要的打包工作，直到你需要它。

默认情况下，`snowpack build`将使用与`dev`命令相同的免打包方式构建你的网站。这对大多数项目来说是很好的，但你也可能仍然想为生产环境打包。旧浏览器兼容、代码压缩、代码分割、tree-shaking、不可达代码清理以及其他性能优化都可以在Snowpack中通过打包来处理。

打包器通常需要几十行甚至几百行的配置，但在Snowpack中，它只是一个单行的插件，不需要配置。之所以能做到这一点，是因为Snowpack在将你的应用程序发送到打包器*之前* 就已经构建好了，所以打包器永远不会看到你的自定义源代码（JSX、TS、Svelte、Vue等），而只需要担心构建普通的HTML、CSS和JS。

```js
// Bundlers plugins are pre-configured to work with Snowpack apps.
// No config required! You just need to install the plugin first.
{
  "plugins": [["@snowpack/plugin-webpack"]]
}
```

请参阅我们的[打包指南](/guides/optimize-and-bundle)，了解更多关于为您的生产Build接入打包（不打包）优化插件的信息。

## 浏览器兼容

你可以通过`package.json`的 "browserslist "属性来定制你想兼容的浏览器集合，一直到IE11。当你运行`snowpack build`为生产构建时，这些内容会起作用。

```js
/* package.json */
"browserslist": ">0.75%, not ie 11, not UCAndroid >0, not OperaMini all",
```

如果你担心传统的浏览器，你也应该在你的生产构建中添加一个打包器。请查看我们关于[打包部署的章节](/guides/optimize-and-bundle)以了解更多信息。

注意：在开发过程中`（snowpack dev`），我们不对旧版浏览器进行转码。请确保你在开发过程中使用的是现代浏览器。
