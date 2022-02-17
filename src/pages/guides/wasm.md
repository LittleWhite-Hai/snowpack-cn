---
layout: ../../layouts/content.astro
title: "WASM"
tags: communityGuide
published: true
img: "/img/logos/wasm.svg"
imgBackground: "#f2f2f8"
description: How to use WASM in your Snowpack project.
---

[WASM（WebAssembly 的缩写）](https://webassembly.org/)是一个可移植的编程语言编译目标，能够在网络上部署客户端和服务器应用程序。

**要在 Snowpack 中使用 WASM**。使用浏览器的本地[`WebAssembly`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly)&[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)APIs 来加载一个 WASM 文件到你的应用程序。

```js
// Example: Load WASM in your project
const wasm = await WebAssembly.instantiateStreaming(
  fetch("/example.wasm")
  /* { ... } */
);
```

在未来，我们可能会添加`导入"/example.wasm "`ESM 导入支持，为你自动提供这种支持。然而，今天的 WASM 导入支持因打包工具不同而不同。

在任何情况下，WASM 导入支持将只是上述代码片段的一个快捷方式或包装。今天你可以在你自己的项目中重新创建这个帮助器。

```js
// Example: WASM Loader (move this into some utility/helper file for reuse)
export function loadWasm(url, importObject = {module: {}, env: {abort() {}}}) => {
  const result = await WebAssembly.instantiateStreaming(fetch(url), importObject);
  return result.instance; // or, return result;
}

const wasm = await loadWasm('/example.wasm');
```
