---
layout: ../../layouts/content.astro
title: 'Sass'
tags: communityGuide
published: true
img: '/img/logos/sass.svg'
imgBackground: '#bf4080'
description: How to use SASS with Snowpack using the Snowpack SASS plugin
---

[Sass](https://www.sass-lang.com/)是一种被编译为CSS的样式表语言。它允许你使用变量、嵌套规则、混合元素、函数等等，所有这些都是与CSS完全兼容的语法。Sass有助于保持大型样式表的井然有序，并使其易于在项目内和项目间共享设计。

要在[Snowpack](https://www.npmjs.com/package/@snowpack/plugin-sass)中使用Sass，请安装[@snowpack/plugin-sass](https://www.npmjs.com/package/@snowpack/plugin-sass)（自动包含Sass）并将其添加到你的`snowpack.config.mjs`文件。关于插件选项，请参见npm或[GitHub](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-sass#plugin-options)上的README。

```diff
  // snowpack.config.mjs
  export default {
    plugins: [
+    '@snowpack/plugin-sass',
    ],
  };
```
