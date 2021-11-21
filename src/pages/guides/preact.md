---
layout: ../../layouts/content.astro
title: Preact
tags: communityGuide
img: '/img/logos/preact.svg'
imgBackground: '#333333'
description: With Snowpack you can import and use Preact without any custom configuration needed.
---

你可以导入并使用Preact，而不需要任何自定义配置。

**要使用`preact/compat`**:(Preact+React兼容层) 在你的安装选项中把 "compat "包别名为React。

```js
// Example: Lets you import "react" in your application, but uses preact internally
// snowpack.config.mjs
export default {
  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
  },
};
```
