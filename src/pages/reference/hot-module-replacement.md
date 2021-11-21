---
layout: ../../layouts/content.astro
title: 模块热替换 (HMR) API
description: Snowpack implements HMR via the esm-hmr spec, an attempted standard for ESM-based Hot Module Replacement (HMR).
---

Snowpack通过[esm-hmr](https://github.com/pikapkg/esm-hmr)规范实现了HMR，这是基于ESM的模块热替换（HMR）的一个尝试性标准。

```js
// HMR Code Snippet Example
if (import.meta.hot) {
  import.meta.hot.accept(({module}) => {
    // Accept the module, apply it into your application.
  });
}
```

完整的API参考：[GitHub上的snowpack/esm-hmr](https://github.com/snowpackjs/esm-hmr)

[了解更多](/concepts/hot-module-replacement)关于HMR、快速刷新以及它在Snowpack中的工作原理。
