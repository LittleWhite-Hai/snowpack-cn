---
layout: ../../layouts/content.astro
title: 模块热替换(HMR)
description: Snowpack's ESM-powered unbundled development means near-instant single file builds that only take 10-25ms to load and update in the browser.
---

模块热替换（HMR）是将文件更新推送到浏览器而不触发全页面刷新的能力。想象一下，改变一些CSS，点击保存，无需刷新就能立即看到改变反映在页面上。这就是HMR。

HMR并不是Snowpack所独有的。然而，Snowpack利用ESM进行非打包式开发的能力引入了近乎即时的单文件构建，在浏览器中加载和更新只需要10-25ms。

Snowpack为以下文件类型提供了现成的、开箱即用的HMR支持。

- CSS
- CSS Modules
- JSON

JavaScript HMR也是开箱即用的，但通常需要几行额外的代码来与你的前端框架的 "渲染 "功能正确整合。见下面的 "启用HMR+快速刷新"。

## 快速刷新

除了正常的HMR之外，Snowpack还支持大多数流行框架的**快速刷新**，如React、Preact和Svelte。快速刷新是HMR的一个特定框架的增强，它以一种保留组件状态的方式应用单一文件的更新。例如，对`<Timer />`组件的结构样式更改会正常生效，却不会重置该组件的内部状态。

快速刷新使开发效率提升，特别是在处理弹出式窗口和其他次要视图状态时，通常需要在每次更改后点击重新打开或重新访问。

## 启用HMR+快速刷新

Snowpack支持所有流行的前端框架的HMR。**[创建Snowpack App(CSA)](https://github.com/snowpackjs/snowpack/blob/main/create-snowpack-app)默认启用了HMR**。你只需用几行代码就可以自己设置HMR，快速刷新也可以通过插件自动启用。

- Preact:[@prefresh/snowpack](https://www.npmjs.com/package/@prefresh/snowpack)
- React:[@snowpack/plugin-react-refresh](https://www.npmjs.com/package/@snowpack/plugin-react-refresh)
- Svelte:[@snowpack/plugin-svelte](https://www.npmjs.com/package/@snowpack/plugin-svelte)
- Vue(仅适用于HMR):[几行代码](https://github.com/snowpackjs/snowpack/blob/main/create-snowpack-app/app-template-vue/src/index.js#L7-L14)

对于更高级的HMR集成，Snowpack创建了[esm-hmr规范](https://github.com/snowpackjs/esm-hmr)，这是一个用于任何基于ESM开发环境的标准HMR API。

```js
// HMR Code Snippet Example
if (import.meta.hot) {
  import.meta.hot.accept(({module}) => {
    // Accept the module, apply it into your application.
  });
}
```

在GitHub上查看完整的[ESM-HMR API参考](https://github.com/snowpackjs/esm-hmr)。
